# Capy Default App

Default full-stack scaffold for the Capy app platform.

## Stack

- Vite + React for the client
- TailwindCSS v4 for styling
- Radix UI primitives for accessible interactions
- Hono for the Worker-native API layer

## Commands

```bash
npm install
npm run dev
npm run typecheck
npm run build
```

The scaffold includes a local `.npmrc` with `include=dev`, so installs still pull `vite`, `typescript`, and `esbuild` even when a sandbox exports `NODE_ENV=production`.

## Build Output

`npm run build` produces a deployable `dist/` directory:

```text
dist/
  client/
  server/
    index.js
  deploy.json
```

`deploy.json` is generated automatically and matches the platform deploy contract:

```json
{
  "worker": {
    "entry": "server/index.js",
    "modules": []
  },
  "assets": {
    "directory": "client"
  }
}
```

You do not need to hand-author `deploy.json` for the default scaffold. It is emitted by `build-server.ts` during `npm run build`.

## Project Structure

```text
src/
  client/
    components/
    lib/
    pages/
    styles/
  server/
    routes/
```

The example page includes a client-side API call to `/api/example` and a few Radix UI primitives so Agents have a working baseline to extend.
