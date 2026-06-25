import * as cookie from "cookie";
import { Session } from "@contracts/constants";
import { getSessionCookieOptions } from "./lib/cookies";
import { getDb } from "./queries/connection";
import { sessions } from "../db/schema";
import { eq } from "drizzle-orm";
import { createRouter, authedQuery } from "./middleware";

export const authRouter = createRouter({
  me: authedQuery.query((opts) => opts.ctx.user),
  logout: authedQuery.mutation(async ({ ctx }) => {
    const opts = getSessionCookieOptions(ctx.req.headers);
    ctx.resHeaders.append(
      "set-cookie",
      cookie.serialize(Session.cookieName, "", {
        httpOnly: opts.httpOnly,
        path: opts.path,
        sameSite: opts.sameSite?.toLowerCase() as "lax" | "none",
        secure: opts.secure,
        maxAge: 0,
      }),
    );

    const cookies = cookie.parse(ctx.req.headers.get("cookie") || "");
    const token = cookies[Session.cookieName];
    if (token) {
      const { createHash } = await import("node:crypto");
      const tokenHash = createHash("sha256").update(token).digest("hex");
      await getDb()
        .update(sessions)
        .set({ revokedAt: new Date() })
        .where(eq(sessions.tokenHash, tokenHash));
    }
    return { success: true };
  }),
});
