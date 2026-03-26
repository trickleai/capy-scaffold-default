import type { OutputAsset, OutputChunk } from "rollup";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";

function inlineEntrypointAssets(): Plugin {
  return {
    name: "inline-entrypoint-assets",
    apply: "build",
    enforce: "post",
    generateBundle(_, bundle) {
      const htmlAsset = bundle["index.html"];
      if (!htmlAsset || !isOutputAsset(htmlAsset)) {
        return;
      }

      const inlinedFiles = new Set<string>();
      let html = readAssetSource(htmlAsset);

      html = html.replace(/<script type="module"[^>]*src="([^"]+)"[^>]*><\/script>/g, (match: string, src: string) => {
        const fileName = normalizeBundlePath(src);
        const entry = bundle[fileName];
        if (!entry || !isOutputChunk(entry)) {
          return match;
        }

        inlinedFiles.add(fileName);
        return `<script type="module">${escapeInlineTagContent(entry.code)}</script>`;
      });

      html = html.replace(/<link rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/g, (match: string, href: string) => {
        const fileName = normalizeBundlePath(href);
        const entry = bundle[fileName];
        if (!entry || !isOutputAsset(entry)) {
          return match;
        }

        inlinedFiles.add(fileName);
        return `<style>${escapeInlineTagContent(readAssetSource(entry))}</style>`;
      });

      htmlAsset.source = html;

      for (const fileName of inlinedFiles) {
        delete bundle[fileName];
      }
    },
  };
}

function normalizeBundlePath(value: string): string {
  return value.replace(/^\/+/, "");
}

function isOutputAsset(entry: OutputAsset | OutputChunk): entry is OutputAsset {
  return entry.type === "asset";
}

function isOutputChunk(entry: OutputAsset | OutputChunk): entry is OutputChunk {
  return entry.type === "chunk";
}

function readAssetSource(entry: OutputAsset): string {
  return typeof entry.source === "string"
    ? entry.source
    : Buffer.from(entry.source).toString("utf8");
}

function escapeInlineTagContent(value: string): string {
  return value.replace(/<\/(script|style)/gi, "<\\/$1");
}

export default defineConfig({
  plugins: [react(), inlineEntrypointAssets()],
  build: {
    outDir: "dist/client",
    emptyOutDir: false,
  },
  server: {
    host: "0.0.0.0",
  },
  preview: {
    host: "0.0.0.0",
  },
});
