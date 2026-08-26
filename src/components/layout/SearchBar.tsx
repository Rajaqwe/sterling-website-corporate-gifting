'use client';

import { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

export function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      // Focus the input when opened
      setTimeout(() => inputRef.current?.focus(), 100);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setIsOpen(false);
      router.push(`/corporate-gifts?q=${encodeURIComponent(query)}`);
      setQuery("");
    }
  };

  return (
    <div className="relative" ref={containerRef}>
      <Button 
        variant="ghost" 
        size="icon" 
        aria-label="Search"
        onClick={() => setIsOpen(!isOpen)}
        className={isOpen ? "bg-accent text-accent-foreground" : ""}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
      </Button>

      {isOpen && (
        <div className="absolute right-0 top-[calc(100%+0.5rem)] w-72 sm:w-96 bg-background border rounded-lg shadow-lg p-3 animate-in fade-in zoom-in-95 z-50">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              ref={inputRef}
              type="text"
              placeholder="Search products, collections..."
              className="w-full pl-9 pr-4"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button type="submit" className="sr-only">Search</Button>
          </form>
        </div>
      )}
    </div>
  );
}
