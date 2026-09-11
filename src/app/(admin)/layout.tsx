import { ReactNode } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { requireAdmin } from "@/lib/auth/require-admin";

export default async function AdminLayout({ children }: { children: ReactNode }) {
 await requireAdmin();
 
 return (
 <div className="flex h-screen overflow-hidden bg-secondary/20 ">
 {/* Static sidebar for desktop */}
 <div className="hidden md:flex md:flex-shrink-0">
 <AdminSidebar />
 </div>

 {/* Main Content Area */}
 <div className="flex flex-1 flex-col overflow-hidden">
 <AdminHeader />
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
