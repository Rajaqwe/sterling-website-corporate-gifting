"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";

/** Hides children on dashboard and admin routes */
export function HideOnDashboard({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname.startsWith("/dashboard") || pathname.startsWith("/admin")) {
    return null;
  }
  return <>{children}</>;
}
