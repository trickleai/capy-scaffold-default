import { Hono } from "hono";
import { cors } from "hono/cors";

import exampleRoutes from "./routes/example";

export interface AssetFetcher {
  fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response>;
}

export type Bindings = {
  ASSETS?: AssetFetcher;
  DB?: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();

app.use("/api/*", cors());
app.route("/api", exampleRoutes);

app.get("*", async (c) => {
  if (!c.env.ASSETS) {
    return c.text("ASSETS binding is not configured", 500);
  }

  return c.env.ASSETS.fetch(c.req.raw);
});

export default app;
