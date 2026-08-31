"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";

export function ConditionalNavbar() {
  const pathname = usePathname();

  // Hide the main site navbar on dashboard and admin pages —
  // those sections have their own sidebar navigation.
  if (pathname.startsWith("/dashboard") || pathname.startsWith("/admin")) {
    return null;
  }

  return <Navbar />;
}
