import Link from "next/link";
import { User, Briefcase, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SearchBar } from "./SearchBar";

const navLinks = [
  { name: "Corporate Gifts", href: "/corporate-gifts" },
  { name: "Collections", href: "/gift-collections" },
  { name: "Personalised Gifts", href: "/personalised-gifts" },
];

import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/app/(auth)/actions";
import { NavbarClient } from "./NavbarClient";

export async function Navbar() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    const { prisma } = await import("@/lib/prisma/client");
    const dbUser = await prisma.user.findUnique({ where: { id: user.id }, select: { role: true } });
    if (dbUser) {
      if (!user.app_metadata) user.app_metadata = {};
      user.app_metadata.role = dbUser.role; // Override with true DB role
    }
  }

  return <NavbarClient user={user} onSignOut={signOut} />;
}
