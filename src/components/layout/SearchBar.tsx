'use client';

import { useState, useRef, useEffect } from "react";
import { Search, X, Loader2, FolderSearch, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import Image from "next/image";

export function SearchBar({ isLightText = false }: { isLightText?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [categories, setCategories] = useState<{ id: string; name: string; slug: string }[]>([]);
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
          setResults(data.products || data.results || []);
          setCategories(data.categories || []);
        } catch (e) {
          console.error(e);
        } finally {
          setIsLoading(false);
        }
      } else {
        setResults([]);
        setCategories([]);
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

  const handleCategorySelect = (slug: string) => {
    setIsOpen(false);
    router.push(`/corporate-gifts?category=${encodeURIComponent(slug)}`);
  };

  return (
    <div className="relative inline-block">
      <Button 
        variant="ghost" 
        size="icon" 
        aria-label="Search"
        onClick={() => setIsOpen(!isOpen)}
        className={isOpen ? "bg-accent text-accent-foreground relative rounded-full" : `relative rounded-full ${isLightText ? "text-white hover:bg-background/20 hover:text-white" : "text-primary hover:bg-primary/10 hover:text-primary"}`}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
      </Button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40 bg-foreground/5 backdrop-blur-sm animate-fade" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-[calc(100%+0.5rem)] z-50 w-[95vw] sm:w-[450px] origin-top-right bg-background border border-border/40 rounded-xl shadow-xl overflow-hidden animate-scale-soft">
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
                className="flex h-12 w-full rounded-md bg-transparent py-3 pr-10 text-sm outline-none focus-visible:outline-none focus-visible:ring-0 placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 [&::-webkit-search-cancel-button]:hidden"
              />
              {isLoading && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
            </div>
            
            <Command.List className="max-h-[300px] overflow-y-auto p-2 hide-scrollbar">
              {query.length === 1 && (
                <Command.Empty className="py-6 text-center text-sm text-muted-foreground">
                  Keep typing to search (at least 2 characters)...
                </Command.Empty>
              )}
              {query.length > 1 && results.length === 0 && categories.length === 0 && !isLoading && (
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
              {categories.length > 0 && (
                <Command.Group heading="Categories" className="mt-2 px-2 text-xs font-medium text-muted-foreground">
                  {categories.map((category) => (
                    <Command.Item key={category.id} value={category.name} onSelect={() => handleCategorySelect(category.slug)} className="flex cursor-pointer items-center gap-3 rounded-md px-2 py-2.5 text-sm outline-none data-[selected=true]:bg-primary/5 data-[selected=true]:text-primary">
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary text-primary"><FolderSearch className="h-4 w-4" /></span>
                      <span className="flex-1 font-medium">{category.name}</span><ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </Command.Item>
                  ))}
                </Command.Group>
              )}
            </Command.List>
            {query.trim().length > 0 && (
              <button type="button" onClick={handleSearchSubmit} className="flex w-full items-center justify-between border-t border-border/50 px-4 py-3 text-left text-sm font-semibold text-primary transition-colors hover:bg-secondary/40">
                See all results for “{query.trim()}” <ArrowRight className="h-4 w-4" />
              </button>
            )}
                      </Command>
          </div>
        </>
      )}
    </div>
  );
}
