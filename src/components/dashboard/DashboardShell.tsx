"use client";

import { useState, useRef, useEffect } from "react";
import { Menu } from "lucide-react";
import { Sidebar } from "@/components/dashboard/Sidebar";

interface DashboardShellProps {
  children: React.ReactNode;
  userName?: string | null;
  userEmail?: string | null;
}

export function DashboardShell({ children, userName, userEmail }: DashboardShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (mobileOpen && !dialog.open) dialog.showModal();
    if (!mobileOpen && dialog.open) dialog.close();
  }, [mobileOpen]);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* ── Desktop sidebar ── */}
      <div className="hidden md:flex md:flex-shrink-0">
        <Sidebar userName={userName} userEmail={userEmail} />
      </div>

      {/* ── Mobile sidebar overlay ── */}
      <dialog 
        ref={dialogRef}
        onClose={() => setMobileOpen(false)}
        onClick={(e) => {
          if (e.target === dialogRef.current) setMobileOpen(false);
        }}
        className="fixed inset-y-0 left-0 z-50 m-0 h-full w-64 max-w-full border-0 bg-transparent p-0 flex flex-col md:hidden backdrop:bg-black/40 backdrop:backdrop-blur-sm"
      >
        <Sidebar
          userName={userName}
          userEmail={userEmail}
          onClose={() => setMobileOpen(false)}
          isMobile
        />
      </dialog>

      {/* ── Main content ── */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Mobile top bar */}
        <header className="flex md:hidden h-14 items-center border-b bg-background px-4 gap-3 flex-shrink-0">
          <button
            onClick={() => setMobileOpen(true)}
            className="rounded-md p-2 text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <span className="font-serif text-lg font-bold tracking-widest text-primary uppercase">
            Sterling
          </span>
        </header>

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
