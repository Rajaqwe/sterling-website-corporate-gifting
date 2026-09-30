'use client';

import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function ProductSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [isPending, startTransition] = useTransition();

  const submitSearch = () => {
    const params = new URLSearchParams(searchParams.toString());
    const trimmed = query.trim();

    if (trimmed) params.set("q", trimmed);
    else params.delete("q");
    params.delete("page");

    const nextUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
    startTransition(() => router.push(nextUrl));
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submitSearch();
      }}
      className="flex w-full max-w-xl items-center gap-2"
      role="search"
    >
      <div className="relative flex-1">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search corporate gifts..."
          aria-label="Search corporate gifts"
          className="h-11 rounded-full border-border/70 bg-background pl-10 pr-4 shadow-sm focus-visible:ring-accent"
          disabled={isPending}
        />
      </div>
      <Button
        type="submit"
        size="icon"
        aria-label="Search catalogue"
        disabled={isPending}
        className="h-11 w-11 shrink-0 rounded-full transition-ui"
      >
        <Search className="h-4 w-4" aria-hidden="true" />
      </Button>
    </form>
  );
}
