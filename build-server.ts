import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { build } from "esbuild";

const projectRoot = process.cwd();
const distRoot = path.join(projectRoot, "dist");
const serverOutfile = path.join(distRoot, "server", "index.js");
const deployManifestPath = path.join(distRoot, "deploy.json");

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
      },
      null,
      2,
    )}\n`,
    "utf8",
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

