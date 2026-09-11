"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

export function CommandSearch() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex h-9 items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 w-full sm:w-64 lg:w-80 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
      >
        <span className="flex items-center">
          <Search className="mr-2 h-4 w-4" />
          <span>Search admin...</span>
        </span>
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Modules">
            <CommandItem onSelect={() => runCommand(() => router.push("/admin/products"))}>
              Products
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/admin/orders"))}>
              Orders
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/admin/quotes"))}>
              Quotes
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/admin/customers"))}>
              Customers
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/admin/companies"))}>
              Companies
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/admin/reviews"))}>
              Reviews
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem onSelect={() => runCommand(() => router.push("/admin/settings"))}>
              General Settings
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
