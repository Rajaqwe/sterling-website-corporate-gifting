"use client";
import { buttonVariants } from "@/components/ui/button";

import React, { useState, useEffect, startTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { User, Briefcase, Menu, LogOut, LayoutDashboard, ChevronDown, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { SearchBar } from "./SearchBar";
import { useTheme } from "next-themes";
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

const ThemeToggle = ({ isLightText }: { isLightText?: boolean }) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="w-9 h-9" />;
  
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={`transition-colors ${isLightText ? "text-white/90 hover:text-white" : "text-foreground hover:text-primary"}`}
      aria-label="Toggle Theme"
    >
      {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  );
};

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
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  
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
  const isDarkBg = isLightText || (mounted && theme === 'dark');

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-[padding] duration-500 ease-in-out ${
        isScrolled ? "py-3" : "py-5"
      }`}
    >
      {/* Background with opacity transition for smoothness */}
      <div 
        className={`absolute inset-0 bg-background/85 backdrop-blur-2xl border-b border-border/50 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] transition-opacity duration-500 ease-in-out ${
          isScrolled ? "opacity-100" : "opacity-0"
        }`} 
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center justify-between">

          
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 group transition-[height,width]">
              <div className={`relative transition-all duration-500 ease-in-out ${isScrolled ? "w-[125px] h-[38px]" : "w-[155px] h-[46px]"}`}>
                {/*
                  The SVG embeds a PNG with an opaque white background.
                  - Light backgrounds: multiply makes the white backdrop disappear.
                  - Dark backgrounds: invert + screen does the same while keeping
                    the mark light (brightness-0 invert would paint a solid
                    white box over the hero).
                */}
                <Image src="/logos/sterling-logo-full.svg" alt="Sterling Logo" fill className={`object-contain transition-all duration-500 ${isDarkBg ? "invert mix-blend-screen" : "mix-blend-multiply dark:mix-blend-normal"}`} priority />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2 lg:gap-3 px-3 py-1.5 rounded-full bg-background/40 dark:bg-white/5 backdrop-blur-md border border-border/30">
            {navLinks.map((link) => {
              const isActive = pathname.startsWith(link.href);
              return (
                <Link 
                  key={link.name} 
                  href={link.href}
                  className={`text-sm font-medium px-4 py-1.5 rounded-full transition-all duration-300 relative ${
                    isActive 
                      ? "bg-accent/20 text-accent font-semibold shadow-sm border border-accent/30" 
                      : isScrolled 
                        ? "text-foreground/80 hover:text-foreground hover:bg-secondary/60" 
                        : isLightText 
                          ? "text-white/85 hover:text-white hover:bg-white/10" 
                          : "text-foreground/80 hover:text-foreground hover:bg-secondary/60"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Icons & Actions */}
          <div className="hidden md:flex items-center gap-3">
            <SearchBar isLightText={isLightText && !isScrolled} />
            
            <ThemeToggle isLightText={isLightText && !isScrolled} />

            {user ? (
              <Link href={(user.app_metadata?.role === 'ADMIN' || user.app_metadata?.role === 'SUPER_ADMIN') ? "/admin" : "/dashboard"} className={`${buttonVariants({ variant: "ghost", size: "icon" })} ${isLightText && !isScrolled ? "text-white/90 hover:text-white" : "text-foreground hover:text-primary"}`}>
                  <User className="h-5 w-5" />
                </Link>
            ) : (
              <Link href="/login" className={`${buttonVariants({ variant: "ghost", size: "icon" })} ${isLightText && !isScrolled ? "text-white/90 hover:text-white" : "text-foreground hover:text-primary"}`}>
                  <User className="h-5 w-5" />
                </Link>
            )}

            <CartDrawer isLightText={isLightText && !isScrolled} />

            <Link href="/request-a-quote" className="btn-gold h-10 px-5 text-xs font-heading font-bold uppercase tracking-wider flex items-center gap-2 shadow-md hover:shadow-lg transition-all duration-300">
              <Briefcase className="h-3.5 w-3.5" />
              <span>Request a Quote</span>
            </Link>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center gap-2">
            <SearchBar isLightText={isLightText && !isScrolled} />
            <CartDrawer isLightText={isLightText && !isScrolled} />
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger aria-label="Open menu" className={`inline-flex items-center justify-center rounded-md p-2 transition-colors duration-500 hover:bg-secondary ${!isScrolled && (isLightText ? "text-white hover:bg-background/20" : "text-primary")}`}>
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
                          className={`text-lg font-medium py-3 transition-colors motion-safe:animate-fade-in ${
                            pathname.startsWith(link.href) ? "text-accent font-semibold" : "text-foreground hover:text-primary"
                          }`}
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
                      <div className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${isServicesOpen ? "grid-rows-[1fr] opacity-100 mt-2" : "grid-rows-[0fr] opacity-0"}`}>
                        <div className="overflow-hidden">
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
                    </div>
                  </nav>
                </div>
                
                <div className="p-4 bg-secondary/20 border-t border-border/40 pb-safe flex flex-col gap-3">
                  <Link href="/request-a-quote" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-center gap-2 w-full bg-accent hover:bg-gold-hover text-accent-foreground py-3 rounded-xl font-medium transition-colors shadow-sm">
                    <Briefcase className="h-5 w-5" />
                    Request a Quote
                  </Link>

                  {user ? (
                    <div className="flex flex-col gap-3">
                      <Link href={(user.app_metadata?.role === 'ADMIN' || user.app_metadata?.role === 'SUPER_ADMIN') ? "/admin" : "/dashboard"} onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-between bg-background p-3 rounded-xl border border-border/60 hover:border-primary/50 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <LayoutDashboard className="h-4 w-4 text-primary" />
                          </div>
                          <span className="font-medium">My Dashboard</span>
                        </div>
                      </Link>
                      <button onClick={() => { 
                        startTransition(() => {
                          onSignOut(); 
                        });
                        setIsMobileMenuOpen(false); 
                      }} className="flex items-center gap-3 text-destructive p-3 hover:bg-destructive/10 rounded-xl transition-colors text-left">
                        <LogOut className="h-5 w-5" />
                        <span className="font-medium">Log out</span>
                      </button>
                    </div>
                  ) : (
                    <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-center gap-2 w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 rounded-xl font-medium transition-colors">
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
