import * as Dialog from "@radix-ui/react-dialog";

import { Button } from "./Button";

export function DialogDemo() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button variant="secondary">Open launch notes</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-ink/35 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-1/2 top-1/2 w-[min(92vw,28rem)] -translate-x-1/2 -translate-y-1/2 rounded-4xl bg-white p-6 shadow-card">
          <Dialog.Title className="text-lg font-semibold text-ink">
            Scaffold launch notes
          </Dialog.Title>
          <Dialog.Description className="mt-2 text-sm leading-6 text-ink/70">
            This default app ships with a React client, a Hono Worker API, and a
            build output that already matches the platform deploy contract.
          </Dialog.Description>
          <div className="mt-6 flex justify-end">
            <Dialog.Close asChild>
              <Button>Close</Button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

