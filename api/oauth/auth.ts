import type { Context } from "hono";
import { setCookie, getSignedCookie, setSignedCookie } from "hono/cookie";
import * as jose from "jose";
import * as cookie from "cookie";
import { env } from "../lib/env";
import { getSessionCookieOptions } from "../lib/cookies";
import { Session } from "@contracts/constants";
import { Errors } from "@contracts/errors";
import { signSessionToken, verifySessionToken } from "./session";
import { users as kimiUsers } from "./platform";
import { findUserByUnionId, upsertUser } from "../queries/users";
import { getDb } from "../queries/connection";
import { sessions } from "../../db/schema";
import { eq } from "drizzle-orm";
import type { TokenResponse } from "./types";

async function exchangeAuthCode(
  code: string,
  redirectUri: string,
): Promise<TokenResponse> {
  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    client_id: env.appId,
    redirect_uri: redirectUri,
    client_secret: env.appSecret,
  });

  const resp = await fetch(`${env.authServerUrl}/api/oauth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`Token exchange failed (${resp.status}): ${text}`);
  }

  return resp.json() as Promise<TokenResponse>;
}

const jwks = jose.createRemoteJWKSet(
  new URL(`${env.authServerUrl}/api/.well-known/jwks.json`),
);

async function verifyAccessToken(
  accessToken: string,
): Promise<{ userId: string; clientId: string }> {
  const { payload } = await jose.jwtVerify(accessToken, jwks);
  const userId = payload.user_id as string;
  const clientId = payload.client_id as string;
  if (!userId) {
    throw new Error("user_id missing from access token");
  }
  return { userId, clientId };
}

export async function authenticateRequest(req: Request) {
  const cookies = cookie.parse(req.headers.get("cookie") || "");
  const token = cookies[Session.cookieName];
  if (!token) {
    console.warn("[auth] No session cookie found in request.");
    throw Errors.forbidden("Invalid authentication token.");
  }
  const claim = await verifySessionToken(token);
  if (!claim) {
    throw Errors.forbidden("Invalid authentication token.");
  }
  const user = await findUserByUnionId(claim.unionId);
  if (!user) {
    throw Errors.forbidden("User not found. Please re-login.");
  }

  const { createHash } = await import("node:crypto");
  const tokenHash = createHash("sha256").update(token).digest("hex");
  const sessionRow = await getDb()
    .select()
    .from(sessions)
    .where(eq(sessions.tokenHash, tokenHash))
    .limit(1);
  
  const activeSession = sessionRow.at(0);
  if (
    !activeSession ||
    activeSession.revokedAt !== null ||
    (activeSession.expiresAt && activeSession.expiresAt < new Date())
  ) {
    throw Errors.forbidden("Session is invalid or expired. Please re-login.");
  }

  const currentUserAgent = req.headers.get("user-agent") || null;
  if (activeSession.userAgent && activeSession.userAgent !== currentUserAgent) {
    throw Errors.forbidden("Session hijacked or invalid context. Please re-login.");
  }

  return user;
}

export function createOAuthLoginHandler() {
  return async (c: Context) => {
    const { randomUUID } = await import("node:crypto");
    const state = randomUUID();
    const rawBase = process.env.APP_BASE_URL ?? new URL(c.req.url).origin;
    const redirectUri = `${rawBase.replace(/\/+$/, '')}/api/oauth/callback`;
    
    await setSignedCookie(c, 'oauth_state', state, env.appSecret, {
      path: '/',
      secure: env.isProduction,
      httpOnly: true,
      maxAge: 60 * 10,
      sameSite: 'Lax',
    });

    const url = new URL(`${env.authServerUrl}/api/oauth/authorize`);
    url.searchParams.set("client_id", env.appId);
    url.searchParams.set("redirect_uri", redirectUri);
    url.searchParams.set("response_type", "code");
    url.searchParams.set("scope", "profile");
    url.searchParams.set("state", state);

    return c.redirect(url.toString(), 302);
  };
}

export function createOAuthCallbackHandler() {
  return async (c: Context) => {
    const code = c.req.query("code");
    const state = c.req.query("state");
    const error = c.req.query("error");
    const errorDescription = c.req.query("error_description");

    if (error) {
      if (error === "access_denied") {
        return c.redirect("/", 302);
      }
      return c.json(
        { error, error_description: errorDescription },
        400,
      );
    }

    if (!code || !state) {
      return c.json({ error: "code and state are required" }, 400);
    }

    try {
      const storedState = await getSignedCookie(c, env.appSecret, 'oauth_state');
      if (!storedState || storedState !== state) {
        return c.json({ error: "Invalid state parameter" }, 400);
      }

      const rawBase = process.env.APP_BASE_URL ?? new URL(c.req.url).origin;
      const redirectUri = `${rawBase.replace(/\/+$/, '')}/api/oauth/callback`;

      const tokenResp = await exchangeAuthCode(code, redirectUri);
      const { userId } = await verifyAccessToken(tokenResp.access_token);
      const userProfile = await kimiUsers.getProfile(tokenResp.access_token);
      if (!userProfile) {
        throw new Error("Failed to fetch user profile from Kimi Open");
      }

      await upsertUser({
        unionId: userId,
        name: userProfile.name,
        avatar: userProfile.avatar_url,
        lastSignInAt: new Date(),
      });

      const token = await signSessionToken({
        unionId: userId,
        clientId: env.appId,
      });

      const user = await findUserByUnionId(userId);
      if (!user) throw new Error("User missing after upsert");

      const { createHash } = await import("node:crypto");
      const tokenHash = createHash("sha256").update(token).digest("hex");
      const expiresAt = new Date(Date.now() + Session.maxAgeMs);
      const userAgent = c.req.header("user-agent") || null;
      let ipAddress = c.req.header("x-forwarded-for")?.split(",")[0]?.trim() || null;
      if (ipAddress) {
        const net = await import("node:net");
        if (net.isIP(ipAddress) === 0 || ipAddress.length > 45) {
          ipAddress = null;
        }
      }

      await getDb().insert(sessions).values({
        userId: user.id,
        tokenHash,
        expiresAt,
        userAgent,
        ipAddress,
      });

      const cookieOpts = getSessionCookieOptions(c.req.raw.headers);
      setCookie(c, Session.cookieName, token, {
        ...cookieOpts,
        maxAge: Session.maxAgeMs / 1000,
      });

      return c.redirect("/", 302);
    } catch (error) {
      console.error("[OAuth] Callback failed", error);
      return c.json({ error: "OAuth callback failed" }, 500);
    }
  };
}

export { exchangeAuthCode, verifyAccessToken };
