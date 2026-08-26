import Link from "next/link";
import { User, Briefcase, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SearchBar } from "./SearchBar";

const navLinks = [
  { name: "Corporate Gifts", href: "/corporate-gifts" },
  { name: "Collections", href: "/gift-collections" },
  { name: "Personalised Gifts", href: "/personalised-gifts" },
];

import { createClient } from "@/lib/supabase/server";
import { LogOut, LayoutDashboard } from "lucide-react";
import { signOut } from "@/app/(auth)/actions";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export async function Navbar() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <span className="font-serif text-2xl font-bold tracking-widest text-primary uppercase">
                Sterling
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Icons & Actions */}
          <div className="hidden md:flex items-center gap-4">
            <SearchBar />
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none hover:bg-muted hover:text-foreground size-8" aria-label="Account">
                  <User className="h-5 w-5 text-primary" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  {(user.user_metadata?.role === 'ADMIN' || user.user_metadata?.role === 'SUPER_ADMIN') && (
                    <DropdownMenuItem className="cursor-pointer p-0">
                      <Link href="/admin" className="flex items-center w-full px-3 py-2 font-medium text-amber-600">
                        <Briefcase className="mr-2 h-4 w-4" />
                        <span>Admin Portal</span>
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem className="cursor-pointer p-0">
                    <Link href="/dashboard" className="flex items-center w-full px-3 py-2">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      <span>My Account</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer p-0">
                    <form action={signOut} className="w-full">
                      <button type="submit" className="flex w-full items-center text-destructive px-3 py-2">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </button>
                    </form>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login">
                <Button variant="ghost" size="icon" aria-label="Account">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            )}

            <Link href="/request-a-quote">
              <Button variant="outline" className="gap-2 hidden lg:flex">
                <Briefcase className="h-4 w-4" />
                <span>Quote</span>
              </Button>
            </Link>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center gap-4">
            <SearchBar />
            <Sheet>
              <SheetTrigger className="inline-flex items-center justify-center rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground h-10 w-10">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Menu</span>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-6 mt-8">
                  {navLinks.map((link) => (
                    <Link 
                      key={link.name} 
                      href={link.href}
                      className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  ))}
                  <div className="h-px bg-border my-4" />
                  
                  {user ? (
                    <>
                      <Link href="/dashboard" className="flex items-center gap-3 text-lg font-medium text-foreground hover:text-primary">
                        <LayoutDashboard className="h-5 w-5" />
                        My Dashboard
                      </Link>
                      <form action={signOut}>
                        <button type="submit" className="flex items-center gap-3 text-lg font-medium text-destructive hover:text-destructive/80">
                          <LogOut className="h-5 w-5" />
                          Log out
                        </button>
                      </form>
                    </>
                  ) : (
                    <Link href="/login" className="flex items-center gap-3 text-lg font-medium text-foreground hover:text-primary">
                      <User className="h-5 w-5" />
                      Account / Login
                    </Link>
                  )}

                  <Link href="/request-a-quote" className="flex items-center gap-3 text-lg font-medium text-foreground hover:text-primary">
                    <Briefcase className="h-5 w-5" />
                    My Quote
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
          
        </div>
      </div>
    </header>
  );
}
