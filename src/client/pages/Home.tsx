import { useState } from "react";

import { Button } from "../components/ui/Button";
import { DialogDemo } from "../components/ui/DialogDemo";
import { DropdownDemo } from "../components/ui/DropdownDemo";
import { fetchExampleMessage, type ExampleApiResponse } from "../lib/api";

export function Home() {
  const [payload, setPayload] = useState<ExampleApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleLoadExample() {
    setIsLoading(true);
    setError(null);

    try {
      const nextPayload = await fetchExampleMessage();
      setPayload(nextPayload);
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Unknown error");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(218,106,78,0.18),_transparent_35%),linear-gradient(180deg,#fffaf3_0%,#f5efe5_45%,#efe4d3_100%)] px-6 py-10 text-ink">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <section className="grid gap-6 rounded-[2rem] bg-white/80 p-8 shadow-card ring-1 ring-black/5 backdrop-blur md:grid-cols-[1.5fr_1fr]">
          <div className="space-y-5">
            <p className="inline-flex rounded-full bg-coral/10 px-3 py-1 text-sm font-semibold text-coral">
              Capy task-003 default scaffold
            </p>
            <div className="space-y-3">
              <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-balance md:text-6xl">
                Ship a full-stack Worker app without hand-wiring the basics.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-ink/72 md:text-lg">
                This starter couples a React client with a Hono Worker API and
                generates the deploy manifest your platform already understands.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button onClick={handleLoadExample} disabled={isLoading}>
                {isLoading ? "Loading API response..." : "Call example API"}
              </Button>
              <DialogDemo />
              <DropdownDemo />
            </div>
          </div>

          <div className="rounded-[1.75rem] bg-ink p-6 text-sand">
            <p className="text-sm uppercase tracking-[0.24em] text-sand/60">
              Build contract
            </p>
            <div className="mt-4 space-y-3 text-sm leading-6 text-sand/90">
              <p>
                <span className="font-semibold text-white">worker.entry</span>:
                {" "}
                <code>server/index.js</code>
              </p>
              <p>
                <span className="font-semibold text-white">assets.directory</span>:
                {" "}
                <code>client</code>
              </p>
              <p>
                <span className="font-semibold text-white">runtime</span>:
                {" "}
                Workers for Platforms
              </p>
              <p>
                <span className="font-semibold text-white">database</span>:
                {" "}
                <code>DB</code> via Cloudflare D1 + Drizzle
              </p>
            </div>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
          <article className="rounded-[2rem] bg-white p-8 shadow-card ring-1 ring-black/5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold">Example API response</h2>
                <p className="mt-2 text-sm leading-6 text-ink/70">
                  Use this as the first round-trip test after you deploy to
                  <code className="mx-1 rounded bg-sand px-1.5 py-0.5 text-xs">*.samdy.run</code>.
                </p>
              </div>
            </div>

            <div className="mt-6 min-h-60 rounded-[1.5rem] bg-sand p-5 ring-1 ring-black/5">
              {payload ? (
                <pre className="overflow-x-auto text-sm leading-6 text-ink">
                  {JSON.stringify(payload, null, 2)}
                </pre>
              ) : (
                <p className="text-sm leading-6 text-ink/60">
                  No response loaded yet. Trigger the example request to verify
                  the Hono route and asset serving are both live.
                </p>
              )}
              {error ? (
                <p className="mt-4 rounded-2xl bg-coral/10 px-4 py-3 text-sm text-coral">
                  {error}
                </p>
              ) : null}
            </div>
          </article>

          <article className="rounded-[2rem] bg-white p-8 shadow-card ring-1 ring-black/5">
            <h2 className="text-2xl font-semibold">Suggested next edits</h2>
            <ul className="mt-6 space-y-3 text-sm leading-6 text-ink/78">
              <li className="rounded-[1.25rem] bg-sand px-4 py-3">
                Add routes under <code>src/server/routes</code> for your app
                API.
              </li>
              <li className="rounded-[1.25rem] bg-sand px-4 py-3">
                Replace the marketing-style client page with your product UI.
              </li>
              <li className="rounded-[1.25rem] bg-sand px-4 py-3">
                Update <code>src/server/db/schema.ts</code>, then run <code>npm run db:generate</code>.
              </li>
              <li className="rounded-[1.25rem] bg-sand px-4 py-3">
                Run <code>npm run build</code> to emit <code>dist/deploy.json</code> and <code>dist/migrations</code>.
              </li>
            </ul>
          </article>
        </section>
      </div>
    </main>
  );
}
