import { Hono } from "hono";

const exampleRoutes = new Hono();

exampleRoutes.get("/example", (c) => {
  return c.json({
    message: "Capy scaffold API is live",
    runtime: "cloudflare-worker",
    generatedAt: new Date().toISOString(),
    tips: [
      "Add your own routes in src/server/routes",
      "Build to generate dist/deploy.json",
      "Deploy the dist directory with the platform CLI",
    ],
  });
});

export default exampleRoutes;
