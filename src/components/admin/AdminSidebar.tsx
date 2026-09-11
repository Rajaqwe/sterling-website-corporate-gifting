"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { startTransition, useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight } from "lucide-react";
import { 
  LayoutDashboard, 
  Package, 
  FileText, 
  Users,
  Building2,
  Settings,
  ShoppingBag,
  Star,
  LogOut,
  Tag,
  Palette,
  Layers,
  BarChart3,
  CreditCard,
  Warehouse,
  Shield,
  Activity,
  FileDown,
  Bell,
  Cpu,
  ExternalLink,
  LucideIcon
} from "lucide-react";

type NavItem = {
  name: string;
  href: string;
  icon: LucideIcon;
  exact?: boolean;
};

type NavGroup = {
  label: string | null;
  items: NavItem[];
};

const navGroups: NavGroup[] = [
  {
    label: null,
    items: [
      { name: "Overview", href: "/admin", icon: LayoutDashboard, exact: true },
    ]
  },
  {
    label: "Catalog",
    items: [
      { name: "Products", href: "/admin/products", icon: Package },
      { name: "Categories", href: "/admin/categories", icon: Tag },
      { name: "Attributes", href: "/admin/attributes", icon: Layers },
      { name: "Branding Options", href: "/admin/branding", icon: Palette },
    ]
  },
  {
    label: "Commerce",
    items: [
      { name: "Orders", href: "/admin/orders", icon: ShoppingBag },
      { name: "Quotes", href: "/admin/quotes", icon: FileText },
      { name: "Inventory", href: "/admin/inventory", icon: Warehouse },
    ]
  },
  {
    label: "Customers",
    items: [
      { name: "Customers", href: "/admin/customers", icon: Users },
      { name: "Companies", href: "/admin/companies", icon: Building2 },
    ]
  },
  {
    label: "Finance",
    items: [
      { name: "Payments", href: "/admin/payments", icon: CreditCard },
    ]
  },
  {
    label: "Content",
    items: [
      { name: "Reviews", href: "/admin/reviews", icon: Star },
    ]
  },
  {
    label: "Reports",
    items: [
      { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
      { name: "Exports", href: "/admin/exports", icon: FileDown },
    ]
  },
  {
    label: "Administration",
    items: [
      { name: "Staff", href: "/admin/staff", icon: Shield },
      { name: "Notifications", href: "/admin/notifications", icon: Bell },
      { name: "System Health", href: "/admin/system", icon: Cpu },
      { name: "Audit Logs", href: "/admin/audit", icon: Activity },
      { name: "Settings", href: "/admin/settings", icon: Settings },
    ]
  },
];

function NavGroupComponent({ group, pathname }: { group: NavGroup, pathname: string }) {
  const isActive = group.items.some(item => 
    item.exact ? pathname === item.href : pathname === item.href || pathname?.startsWith(item.href + '/')
  );
  const [open, setOpen] = React.useState(isActive || !group.label);

  return (
    <div>
      {group.label && (
        <button
          onClick={() => setOpen(o => !o)}
          className="w-full flex items-center justify-between px-3 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider hover:text-foreground transition-colors"
        >
          {group.label}
          {open ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
        </button>
      )}
      {open && (
        <div className="space-y-0.5">
          {group.items.map((item) => {
            const active = item.exact
              ? pathname === item.href
              : pathname === item.href || pathname?.startsWith(item.href + '/');
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  active
                    ? "bg-accent text-primary"
                    : "hover:bg-accent/50 hover:text-primary",
                  "group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors"
                )}
              >
                <item.icon
                  className={cn(
                    active ? "text-primary" : "text-muted-foreground group-hover:text-primary",
                    "mr-3 h-4 w-4 flex-shrink-0"
                  )}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col bg-secondary text-secondary-foreground">
      <div className="flex h-16 shrink-0 items-center px-6 border-b border-border/40">
        <Link href="/admin">
          <span className="font-serif text-xl font-bold tracking-widest text-primary uppercase">
            Sterling<span className="text-xs text-muted-foreground ml-2 tracking-normal">ADMIN</span>
          </span>
        </Link>
      </div>
      <div className="flex flex-1 flex-col overflow-y-auto pt-4 pb-4">
        <nav className="flex-1 space-y-3 px-3">
          {navGroups.map((group, i) => (
            <NavGroupComponent key={i} group={group} pathname={pathname} />
          ))}
        </nav>
      </div>
      <div className="flex flex-shrink-0 flex-col border-t border-border/40 p-4 gap-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
        >
          <ExternalLink className="h-4 w-4" />
          View Website
        </Link>
        <button 
          onClick={() => {
            startTransition(async () => {
              const { signOut } = await import("@/app/(auth)/actions");
              await signOut();
            });
          }} 
          className="group block w-full flex-shrink-0 text-left"
        >
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium text-sm" aria-hidden="true">
                SP
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-foreground">Admin workspace</p>
              <p className="text-xs font-medium text-muted-foreground hover:text-foreground flex items-center mt-1">
                <LogOut className="mr-1 h-3 w-3" /> Log out
              </p>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}
