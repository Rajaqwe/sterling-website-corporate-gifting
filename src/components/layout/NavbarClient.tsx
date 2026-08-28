"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Briefcase, Menu, LogOut, LayoutDashboard, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { SearchBar } from "./SearchBar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { CartDrawer } from "@/components/cart/CartDrawer";

const navLinks = [
  { name: "Corporate Gifts", href: "/corporate-gifts" },
  { name: "Collections", href: "/gift-collections" },
  { name: "Personalised Gifts", href: "/personalised-gifts" },
];

const mobileFooterLinks = [
  { name: "Custom Branding", href: "/custom-branding" },
  { name: "Bulk Orders", href: "/bulk-orders" },
  { name: "Employee Gifting", href: "/employee-gifting" },
  { name: "Event Gifts", href: "/event-gifts" },
];

export function NavbarClient({ user, onSignOut }: { user: any; onSignOut: () => void }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const pathname = usePathname();
  
  const darkHeroPages = [
    "/",
    "/about",
    "/bulk-orders",
    "/careers",
    "/contact",
    "/custom-branding",
    "/employee-gifting",
    "/event-gifts",
    "/faq",
    "/request-a-quote",
    "/sustainability",
    "/values"
  ];

  const isLightText = darkHeroPages.includes(pathname) && !isScrolled;

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 ease-out ${
        isScrolled 
          ? "bg-background/80 backdrop-blur-xl border-b border-border/40 shadow-sm py-3 text-foreground" 
          : "bg-transparent border-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between transition-all duration-300">
          
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <span 
                className={`font-serif font-bold tracking-widest uppercase transition-all duration-300 ${
                  isScrolled ? "text-xl text-primary" : `text-3xl ${isLightText ? "text-white" : "text-primary"}`
                }`}
              >
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
                className={`text-sm font-medium transition-colors ${
                  isScrolled 
                    ? "text-foreground hover:text-primary" 
                    : `${isLightText ? "text-white/90 hover:text-white" : "text-foreground hover:text-primary/70"}`
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Icons & Actions */}
          <div className="hidden md:flex items-center gap-4">
            <SearchBar isLightText={isLightText} />
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger className={`inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent text-sm font-medium transition-all outline-none select-none size-8 ${isScrolled ? "hover:bg-muted text-foreground" : `hover:bg-primary/10 ${isLightText ? "text-white" : "text-primary"}`}`} aria-label="Account">
                  <User className="h-5 w-5" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  {(user.app_metadata?.role === 'ADMIN' || user.app_metadata?.role === 'SUPER_ADMIN') && (
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
                  <DropdownMenuItem className="cursor-pointer p-0" onSelect={() => onSignOut()}>
                    <div className="flex w-full items-center text-destructive px-3 py-2">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login">
                <Button variant="ghost" size="icon" aria-label="Account" className={!isScrolled ? `${isLightText ? "text-white hover:bg-white/20 hover:text-white" : "text-primary hover:bg-primary/10 hover:text-primary"}` : ""}>
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            )}

            <CartDrawer isLightText={isLightText} />

            <Link href="/request-a-quote">
              <Button variant={isScrolled ? "default" : "outline"} className={`gap-2 hidden lg:flex ${!isScrolled && (isLightText ? "bg-transparent border-white text-white hover:bg-white/20 hover:text-white" : "border-primary text-primary hover:bg-primary/5")}`}>
                <Briefcase className="h-4 w-4" />
                <span>Quote</span>
              </Button>
            </Link>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center gap-2">
            <SearchBar isLightText={isLightText} />
            <CartDrawer isLightText={isLightText} />
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger className={`inline-flex items-center justify-center rounded-md p-2 hover:bg-secondary transition-colors ${!isScrolled && (isLightText ? "text-white hover:bg-white/20" : "text-primary")}`}>
                <Menu className="h-6 w-6" />
                <span className="sr-only">Menu</span>
              </SheetTrigger>
              <SheetContent side="left" className="w-full sm:w-full border-none p-0 overflow-hidden flex flex-col bg-background h-[100dvh]">
                <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
                
                <div className="p-4 border-b border-border/40 flex items-center justify-between">
                  <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="font-serif text-2xl font-bold tracking-widest text-primary uppercase">
                    Sterling
                  </Link>
                  <SheetClose className="p-2 hover:bg-secondary rounded-md transition-colors">
                    <span className="sr-only">Close</span>
                  </SheetClose>
                </div>
                
                <div className="flex-1 overflow-y-auto hide-scrollbar">
                  <nav className="flex flex-col p-4 divide-y divide-border/30">
                    <div className="py-2 flex flex-col gap-1">
                      {navLinks.map((link, idx) => (
                        <Link 
                          key={link.name} 
                          href={link.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="text-lg font-medium text-foreground hover:text-primary py-3 transition-colors motion-safe:animate-fade-in-up"
                          style={{ animationDelay: `${idx * 100}ms`, animationFillMode: 'both' }}
                        >
                          {link.name}
                        </Link>
                      ))}
                    </div>
                    
                    <div className="py-4">
                      <button 
                        onClick={() => setIsServicesOpen(!isServicesOpen)}
                        className="flex items-center justify-between w-full text-lg font-medium text-foreground py-2"
                      >
                        Corporate Services
                        <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${isServicesOpen ? "rotate-180 text-primary" : "text-muted-foreground"}`} />
                      </button>
                      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isServicesOpen ? "max-h-64 opacity-100 mt-2" : "max-h-0 opacity-0"}`}>
                        <div className="flex flex-col pl-4 border-l-2 border-primary/20 space-y-3 py-2">
                          {mobileFooterLinks.map(link => (
                            <Link 
                              key={link.name}
                              href={link.href}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="text-muted-foreground hover:text-primary transition-colors block"
                            >
                              {link.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </nav>
                </div>
                
                <div className="p-4 bg-secondary/20 border-t border-border/40 pb-safe">
                  {user ? (
                    <div className="flex flex-col gap-3">
                      <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-between bg-background p-3 rounded-xl border border-border/60 hover:border-primary/50 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <LayoutDashboard className="h-4 w-4 text-primary" />
                          </div>
                          <span className="font-medium">My Dashboard</span>
                        </div>
                      </Link>
                      <button onClick={() => { onSignOut(); setIsMobileMenuOpen(false); }} className="flex items-center gap-3 text-destructive p-3 hover:bg-destructive/10 rounded-xl transition-colors text-left">
                        <LogOut className="h-5 w-5" />
                        <span className="font-medium">Log out</span>
                      </button>
                    </div>
                  ) : (
                    <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground py-3 rounded-xl font-medium">
                      <User className="h-5 w-5" />
                      Sign In / Register
                    </Link>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
          
        </div>
      </div>
    </header>
  );
}
