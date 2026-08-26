"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  FileText, 
  Package, 
  Building2, 
  Settings,
  LogOut
} from "lucide-react";

const navigation = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "My Quotes", href: "/dashboard/quotes", icon: FileText },
  { name: "Orders", href: "/dashboard/orders", icon: Package },
  { name: "Company", href: "/dashboard/company", icon: Building2 },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col bg-secondary/30 border-r">
      <div className="flex h-20 shrink-0 items-center px-6 border-b">
        <Link href="/">
          <span className="font-serif text-2xl font-bold tracking-widest text-primary uppercase">
            Sterling
          </span>
        </Link>
      </div>
      <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
        <nav className="mt-5 flex-1 space-y-1 px-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-primary/10 hover:text-primary",
                  "group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors"
                )}
              >
                <item.icon
                  className={cn(
                    isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-primary",
                    "mr-3 h-5 w-5 flex-shrink-0"
                  )}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="flex flex-shrink-0 border-t p-4">
        <button className="group block w-full flex-shrink-0 text-left">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-9 w-9 rounded-full bg-primary/20 flex items-center justify-center text-primary font-medium">
                JS
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-foreground">John Smith</p>
              <p className="text-xs font-medium text-muted-foreground hover:text-primary flex items-center mt-1">
                <LogOut className="mr-1 h-3 w-3" /> Sign Out
              </p>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}
