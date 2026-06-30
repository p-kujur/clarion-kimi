export const Session = {
  cookieName: "clarion_sid",
  maxAgeMs: 7 * 24 * 60 * 60 * 1000,
} as const;

export const ErrorMessages = {
  unauthenticated: "Authentication required",
  insufficientRole: "Insufficient permissions",
} as const;

export const Paths = {
  login: "/login",
  oauthLogin: "/api/oauth/login",
  oauthCallback: "/api/oauth/callback",
} as const;
