import { Hono } from "hono";

import { createDb } from "../db";
import { todos } from "../db/schema";
import type { Bindings } from "../index";

const exampleRoutes = new Hono<{ Bindings: Bindings }>();

exampleRoutes.get("/example", async (c) => {
  const db = c.env.DB ? createDb(c.env.DB) : null;
  const sampleTodos = db ? await db.select().from(todos).limit(3) : [];

  return c.json({
    message: "Capy scaffold API is live",
    runtime: "cloudflare-worker",
    generatedAt: new Date().toISOString(),
    database: {
      configured: Boolean(c.env.DB),
      driver: c.env.DB ? "cloudflare-d1" : null,
      todoCount: sampleTodos.length,
      sampleTitles: sampleTodos.map((todo) => todo.title),
    },
    tips: [
      "Add your own routes in src/server/routes",
      "Edit src/server/db/schema.ts and run npm run db:generate after schema changes",
      "Build to generate dist/deploy.json",
      "Deploy the dist directory with the platform CLI",
    ],
  });
});

export default exampleRoutes;
