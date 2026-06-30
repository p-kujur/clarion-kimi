import { z } from "zod";
import { createRouter, publicQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { contactSubmissions } from "../db/schema";

export const contactRouter = createRouter({
  submit: publicQuery
    .input(
      z.object({
        name: z
          .string()
          .min(1, "Name is required")
          .max(255)
          .transform((v) => v.trim()),
        email: z
          .string()
          .email("Valid email is required")
          .max(320)
          .transform((v) => v.trim().toLowerCase()),
        organization: z
          .string()
          .max(255)
          .transform((v) => v.trim())
          .optional(),
        subject: z
          .string()
          .max(255)
          .transform((v) => v.trim())
          .optional(),
        message: z
          .string()
          .min(1, "Message is required")
          .max(5000)
          .transform((v) => v.trim()),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const result = await db.insert(contactSubmissions).values({
        name: input.name,
        email: input.email,
        organization: input.organization || null,
        subject: input.subject || null,
        message: input.message,
      });

      return { success: true, id: Number(result[0].insertId) };
    }),
});
