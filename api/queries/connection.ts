import { drizzle } from "drizzle-orm/mysql2";
import { env } from "../lib/env";
import * as schema from "@db/schema";

const fullSchema = { ...schema };

let instance: ReturnType<typeof drizzle<typeof fullSchema>>;

export function getDb() {
  if (!instance) {
    instance = drizzle(env.databaseUrl, {
      mode: "default",
      schema: fullSchema,
    });
  }
  return instance;
}
