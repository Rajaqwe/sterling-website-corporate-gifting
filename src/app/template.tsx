"use client";

import React from "react";
import { usePathname } from "next/navigation";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  let animationClass = "";
  if (
    pathname === "/" ||
    pathname.startsWith("/about") ||
    pathname.startsWith("/contact") ||
    pathname.startsWith("/values") ||
    pathname.startsWith("/sustainability")
  ) {
    animationClass = "motion-safe:animate-fade";
  } else if (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/dashboard")
  ) {
    animationClass = ""; // No global animation for functional areas
  }

  return (
    <div key={pathname} className={animationClass}>
      {children}
    </div>
  );
}
