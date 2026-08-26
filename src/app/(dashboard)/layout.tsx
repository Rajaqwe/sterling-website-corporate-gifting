import { ReactNode } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { requireUser } from "@/lib/auth/server";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  await requireUser();

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Static sidebar for desktop */}
      <div className="hidden md:flex md:flex-shrink-0">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
