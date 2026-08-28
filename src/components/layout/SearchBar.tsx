'use client';

import { useState, useRef, useEffect } from "react";
import { Search, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import Image from "next/image";

export function SearchBar({ isLightText = false }: { isLightText?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  // Debounced search
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.trim().length >= 2) {
        setIsLoading(true);
        try {
          const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
          const data = await res.json();
          setResults(data.results || []);
        } catch (e) {
          console.error(e);
        } finally {
          setIsLoading(false);
        }
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Global hotkey Ctrl+K
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSelect = (slug: string) => {
    setIsOpen(false);
    router.push(`/products/${slug}`);
  };

  const handleSearchSubmit = () => {
    if (query.trim()) {
      setIsOpen(false);
      router.push(`/corporate-gifts?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <>
      <Button 
        variant="ghost" 
        size="icon" 
        aria-label="Search"
        onClick={() => setIsOpen(!isOpen)}
        className={isOpen ? "bg-accent text-accent-foreground relative rounded-full" : `relative rounded-full ${isLightText ? "text-white hover:bg-white/20 hover:text-white" : "text-primary hover:bg-primary/10 hover:text-primary"}`}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
      </Button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm animate-in fade-in" 
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed left-[50%] top-[15vh] z-50 w-[95vw] sm:w-[500px] translate-x-[-50%] bg-background border border-border/40 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95">
            <Command 
            className="w-full flex flex-col" 
            shouldFilter={false} // We filter on the server
            onKeyDown={(e) => {
              if (e.key === "Escape") setIsOpen(false);
              if (e.key === "Enter" && !results.length) {
                e.preventDefault();
                handleSearchSubmit();
              }
            }}
          >
            <div className="flex items-center border-b border-border/40 px-3" cmdk-input-wrapper="">
              <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
              <Command.Input 
                autoFocus
                placeholder="Search products, categories..." 
                value={query}
                onValueChange={setQuery}
                className="flex h-12 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
              />
              {isLoading && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
            </div>
            
            <Command.List className="max-h-[300px] overflow-y-auto p-2 hide-scrollbar">
              {query.length > 0 && results.length === 0 && !isLoading && (
                <Command.Empty className="py-6 text-center text-sm text-muted-foreground">
                  No products found. Press Enter to search all.
                </Command.Empty>
              )}

              {results.length > 0 && (
                <Command.Group heading="Products" className="px-2 text-xs font-medium text-muted-foreground pt-2">
                  {results.map((product) => (
                    <Command.Item
                      key={product.id}
                      value={product.name}
                      onSelect={() => handleSelect(product.slug)}
                      className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-2.5 text-sm outline-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground mt-1 group"
                    >
                      <div className="relative h-10 w-10 mr-3 overflow-hidden rounded bg-secondary/50">
                        <Image 
                          src={product.image} 
                          alt={product.name}
                          fill
                          className="object-cover"
                          sizes="40px"
                        />
                      </div>
                      <div className="flex flex-col flex-1 text-left">
                        <span className="font-medium text-foreground truncate block">{product.name}</span>
                        <span className="text-xs text-muted-foreground truncate">{product.category}</span>
                      </div>
                      <span className="font-semibold text-xs ml-2 opacity-0 group-data-[selected=true]:opacity-100 transition-opacity">
                        Enter ↵
                      </span>
                    </Command.Item>
                  ))}
                </Command.Group>
              )}
            </Command.List>
                      </Command>
          </div>
        </>
      )}
    </>
  );
}
