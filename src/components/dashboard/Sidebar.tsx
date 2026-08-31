"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { startTransition } from "react";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  FileText, 
  Package, 
  Building2, 
  Settings,
  LogOut,
  X
} from "lucide-react";

const navigation = [
  { name: "Overview",  href: "/dashboard",          icon: LayoutDashboard },
  { name: "My Quotes", href: "/dashboard/quotes",   icon: FileText },
  { name: "Orders",    href: "/dashboard/orders",   icon: Package },
  { name: "Company",   href: "/dashboard/company",  icon: Building2 },
  { name: "Settings",  href: "/dashboard/settings", icon: Settings },
];

function isNavItemActive(pathname: string | null, href: string) {
  return pathname === href || (href !== "/dashboard" && pathname?.startsWith(href + "/"));
}

interface SidebarProps {
  userName?: string | null;
  userEmail?: string | null;
  onClose?: () => void;
  isMobile?: boolean;
}

export function Sidebar({ userName, userEmail, onClose, isMobile }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  // Derive initials for avatar
  const initials = userName
    ? userName.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2)
    : userEmail
    ? userEmail[0].toUpperCase()
    : "?";

  const displayName = userName || userEmail || "My Account";

  function handleSignOut() {
    startTransition(async () => {
      const { signOut } = await import("@/app/(auth)/actions");
      await signOut();
    });
  }

  return (
    <div className="flex h-full w-64 flex-col bg-secondary/30 border-r">
      {/* Logo / close button for mobile */}
      <div className="flex h-16 shrink-0 items-center justify-between px-6 border-b">
        <Link href="/" onClick={onClose}>
          <span className="font-serif text-xl font-bold tracking-widest text-primary uppercase">
            Sterling
          </span>
        </Link>
        {isMobile && (
          <button
            onClick={onClose}
            className="rounded-md p-1 text-muted-foreground hover:text-foreground"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Nav links */}
      <div className="flex flex-1 flex-col overflow-y-auto pt-4 pb-4">
        <nav className="flex-1 space-y-1 px-3">
          {navigation.map((item) => {
            const isActive = isNavItemActive(pathname, item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className={cn(
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-primary/10 hover:text-primary",
                  "group flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150"
                )}
              >
                <item.icon
                  className={cn(
                    isActive
                      ? "text-primary-foreground"
                      : "text-muted-foreground group-hover:text-primary",
                    "mr-3 h-4 w-4 flex-shrink-0 transition-colors"
                  )}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User block */}
      <div className="flex flex-shrink-0 border-t p-3">
        <div className="flex w-full items-center gap-3">
          {/* Avatar */}
          <div className="h-9 w-9 flex-shrink-0 rounded-full bg-primary/15 flex items-center justify-center text-primary text-sm font-semibold">
            {initials}
          </div>
          {/* Name + sign out */}
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-foreground leading-tight">
              {displayName}
            </p>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive transition-colors mt-0.5"
            >
              <LogOut className="h-3 w-3" />
              Log out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
