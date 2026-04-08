import { existsSync } from "node:fs";
import { cp, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { build } from "esbuild";

const projectRoot = process.cwd();
const distRoot = path.join(projectRoot, "dist");
const serverOutfile = path.join(distRoot, "server", "index.js");
const deployManifestPath = path.join(distRoot, "deploy.json");
const migrationsSourcePath = path.join(projectRoot, "migrations");
const migrationsOutputPath = path.join(distRoot, "migrations");

async function main() {
  await mkdir(path.dirname(serverOutfile), { recursive: true });

  await build({
    entryPoints: [path.join(projectRoot, "src", "server", "index.ts")],
    outfile: serverOutfile,
    bundle: true,
    format: "esm",
    platform: "browser",
    target: "es2022",
    jsx: "automatic",
    sourcemap: false,
    minify: false,
    conditions: ["worker", "browser"],
    define: {
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV ?? "production"),
    },
  });

  await writeFile(
    deployManifestPath,
    `${JSON.stringify(
      {
        worker: {
          entry: "server/index.js",
          modules: [],
        },
        assets: {
          directory: "client",
        },
        database: {
          migrations: "migrations",
        },
      },
      null,
      2,
    )}\n`,
    "utf8",
  );

  if (existsSync(migrationsSourcePath)) {
    await cp(migrationsSourcePath, migrationsOutputPath, { recursive: true });
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
