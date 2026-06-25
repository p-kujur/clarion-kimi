import { authRouter } from "./auth-router";
import { notesRouter } from "./notes-router";
import { contactRouter } from "./contact-router";
import { createRouter, publicQuery } from "./middleware";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  auth: authRouter,
  notes: notesRouter,
  contact: contactRouter,
});

export type AppRouter = typeof appRouter;
