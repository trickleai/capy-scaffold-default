# Capy Default App

Default full-stack scaffold for the Capy app platform.

This scaffold is intended to be published from `https://github.com/trickleai/capy-scaffold-default.git`.

## Stack

- Vite + React for the client
- TailwindCSS v4 for styling
- Radix UI primitives for accessible interactions
- Hono for the Worker-native API layer

## Commands

```bash
npm install
npm run dev
npm run db:generate
npm run typecheck
npm run build
```

The scaffold includes a local `.npmrc` with `include=dev`, so installs still pull `vite`, `typescript`, and `esbuild` even when a sandbox exports `NODE_ENV=production`.

## Build Output

`npm run build` produces a deployable `dist/` directory:

```text
dist/
  client/
    index.html
  migrations/
    0000_initial.sql
    meta/_journal.json
  server/
    index.js
  deploy.json
```

The default scaffold intentionally inlines the compiled client JS and CSS into `dist/client/index.html`.
This avoids blank previews on the current Workers for Platforms setup when asset responses are served with an incorrect MIME type for module scripts or stylesheets.

`deploy.json` is generated automatically and matches the platform deploy contract:

```json
{
  "worker": {
    "entry": "server/index.js",
    "modules": []
  },
  "assets": {
    "directory": "client"
  },
  "database": {
    "migrations": "migrations"
  }
}
```

You do not need to hand-author `deploy.json` for the default scaffold. It is emitted by `build-server.ts` during `npm run build`, and the build also copies `migrations/` into `dist/migrations/`.

## Database Workflow

The scaffold includes:

- `drizzle.config.ts`
- `src/server/db/schema.ts`
- `src/server/db/index.ts`
- starter migrations under `migrations/`

After changing the schema, run:

```bash
npm run db:generate
npm run build
```

The platform deploy pipeline reads `dist/migrations/meta/_journal.json`, applies only new migrations, and injects a `DB` binding into the Worker at deploy time.

## Project Structure

```text
src/
  client/
    components/
    lib/
    pages/
    styles/
  server/
    db/
    routes/
```

The example page includes a client-side API call to `/api/example`, and the example route now reports basic D1-backed data so Agents have a working baseline to extend.
