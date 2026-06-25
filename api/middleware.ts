import { ErrorMessages } from "@contracts/constants";
import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import type { TrpcContext } from "./context";

const t = initTRPC.context<TrpcContext>().create({
  transformer: superjson,
});

export const createRouter = t.router;
function getRequestOrigin(req: Request): string | null {
  return req.headers.get("origin") ?? req.headers.get("referer") ?? null;
}

function isTrustedOrigin(origin: string): boolean {
  const trusted = [
    "http://localhost:5173",
    "http://localhost:3000",
    process.env.APP_BASE_URL ?? "",
  ].filter(Boolean);
  try {
    const parsedOrigin = new URL(origin).origin;
    return trusted.some((t) => new URL(t).origin === parsedOrigin);
  } catch {
    return false;
  }
}

const csrfProtection = t.middleware(async (opts) => {
  const { ctx, next, type } = opts;
  if (type === "mutation") {
    const origin = getRequestOrigin(ctx.req);
    if (!origin || !isTrustedOrigin(origin)) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "CSRF check failed.",
      });
    }
  }
  return next();
});

export const publicQuery = t.procedure.use(csrfProtection);

const requireAuth = t.middleware(async (opts) => {
  const { ctx, next } = opts;

  if (!ctx.user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: ErrorMessages.unauthenticated,
    });
  }

  return next({ ctx: { ...ctx, user: ctx.user } });
});

function requireRole(role: string) {
  return t.middleware(async (opts) => {
    const { ctx, next } = opts;

    if (!ctx.user || ctx.user.role !== role) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: ErrorMessages.insufficientRole,
      });
    }

    return next({ ctx: { ...ctx, user: ctx.user } });
  });
}

export const authedQuery = t.procedure.use(requireAuth);
export const adminQuery = authedQuery.use(requireRole("admin"));
