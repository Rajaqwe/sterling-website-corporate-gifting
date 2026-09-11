"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useTransition, useState, useEffect } from "react";

export function AdminSearchInput({ placeholder = "Search..." }: { placeholder?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [query, setQuery] = useState(searchParams.get("q") || "");

  // Update URL after typing with a debounce
  useEffect(() => {
    const currentQ = searchParams.get("q") || "";
    if (currentQ === query) return; // Prevent infinite re-render loop on pagination

    const delay = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (query) {
        params.set("q", query);
        params.delete("page"); // Reset page when searching
      } else {
        params.delete("q");
      }
      
      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`);
      });
    }, 400);

    return () => clearTimeout(delay);
  }, [query, pathname, router, searchParams]);

  return (
    <div className="relative flex-1 max-w-md">
      <Search className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${isPending ? "text-primary animate-pulse" : "text-slate-400"}`} />
      <Input 
        type="search"
        placeholder={placeholder} 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="pl-9 pr-10 h-10" 
      />
    </div>
  );
}
