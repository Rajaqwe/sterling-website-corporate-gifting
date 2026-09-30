"use client";

import React from "react";
import { usePathname } from "next/navigation";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isFunctionalArea =
    pathname.startsWith("/admin") ||
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/register") ||
    pathname.startsWith("/forgot-password") ||
    pathname.startsWith("/reset-password");

  return (
    <div
      key={pathname}
      className={isFunctionalArea ? "" : "motion-safe:animate-fade-up"}
    >
      {children}
    </div>
  );
}
