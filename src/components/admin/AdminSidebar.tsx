"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Package, 
  FileText, 
  Users, 
  Settings,
  ShoppingBag,
  LogOut
} from "lucide-react";

const navigation = [
  { name: "Overview", href: "/admin", icon: LayoutDashboard },
  { name: "Quotes", href: "/admin/quotes", icon: FileText },
  { name: "Orders", href: "/admin/orders", icon: ShoppingBag },
  { name: "Products", href: "/admin/products", icon: Package },
  { name: "Customers", href: "/admin/customers", icon: Users },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col bg-[#0f172a] text-slate-300">
      <div className="flex h-20 shrink-0 items-center px-6 border-b border-slate-800">
        <Link href="/admin">
          <span className="font-serif text-2xl font-bold tracking-widest text-white uppercase">
            Sterling<span className="text-xs text-slate-400 ml-2 tracking-normal">ADMIN</span>
          </span>
        </Link>
      </div>
      <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
        <nav className="mt-5 flex-1 space-y-1 px-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href || (pathname?.startsWith(item.href + '/') && item.href !== '/admin');
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  isActive
                    ? "bg-slate-800 text-white"
                    : "hover:bg-slate-800 hover:text-white",
                  "group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors"
                )}
              >
                <item.icon
                  className={cn(
                    isActive ? "text-white" : "text-slate-400 group-hover:text-white",
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
      <div className="flex flex-shrink-0 border-t border-slate-800 p-4">
        <button className="group block w-full flex-shrink-0 text-left">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-9 w-9 rounded-full bg-slate-700 flex items-center justify-center text-white font-medium">
                AD
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-white">Admin User</p>
              <p className="text-xs font-medium text-slate-400 hover:text-white flex items-center mt-1">
                <LogOut className="mr-1 h-3 w-3" /> Sign Out
              </p>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}
