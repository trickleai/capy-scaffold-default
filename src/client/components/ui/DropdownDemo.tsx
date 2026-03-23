import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import { Button } from "./Button";

export function DropdownDemo() {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button variant="ghost">Quick actions</Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          sideOffset={8}
          className="min-w-52 rounded-3xl bg-white p-2 shadow-card ring-1 ring-black/5"
        >
          <DropdownMenu.Item className="rounded-2xl px-3 py-2 text-sm text-ink outline-none transition hover:bg-sand focus:bg-sand">
            Add a new client page
          </DropdownMenu.Item>
          <DropdownMenu.Item className="rounded-2xl px-3 py-2 text-sm text-ink outline-none transition hover:bg-sand focus:bg-sand">
            Add a Hono API route
          </DropdownMenu.Item>
          <DropdownMenu.Item className="rounded-2xl px-3 py-2 text-sm text-ink outline-none transition hover:bg-sand focus:bg-sand">
            Build and deploy
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

