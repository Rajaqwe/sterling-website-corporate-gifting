import { ReactNode } from "react";
import { requireUser } from "@/lib/auth/server";
import { DashboardShell } from "@/components/dashboard/DashboardShell";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const auth = await requireUser();

  return (
    <DashboardShell
      userName={auth.user.fullName}
      userEmail={auth.user.email}
    >
      {children}
    </DashboardShell>
  );
}
