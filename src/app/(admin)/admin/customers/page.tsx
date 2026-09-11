import { Download } from "lucide-react";
import { requirePermission } from "@/lib/auth/permissions";
import { prisma } from "@/lib/prisma/client";
import { AdminSearchInput } from "@/components/admin/AdminSearchInput";
import { CustomerListClient } from "./CustomerListClient";

export default async function AdminCustomers(props: { searchParams: Promise<{ page?: string, q?: string, sort?: string, order?: string }> }) {
  await requirePermission('customers.read');
 const searchParams = await props.searchParams;
 const page = Number(searchParams.page) || 1;
 const q = searchParams.q || "";
 const sort = searchParams.sort || "createdAt";
 const order = searchParams.order || "desc";
 const take = 10;
 const skip = (page - 1) * take;

 const where = q ? {
 OR: [
 { fullName: { contains: q, mode: 'insensitive' as const } },
 { email: { contains: q, mode: 'insensitive' as const } },
 { companyMembers: { some: { company: { name: { contains: q, mode: 'insensitive' as const } } } } },
 ]
 } : {};

 let orderBy: any = {};
 if (sort === 'fullName') {
 orderBy = { fullName: order as any };
 } else if (sort === 'email') {
 orderBy = { email: order as any };
 } else if (sort === 'role') {
 orderBy = { role: order as any };
 } else if (sort === 'isActive') {
 orderBy = { isActive: order as any };
 } else {
 orderBy = { createdAt: 'desc' };
 }

 const [users, totalUsers] = await Promise.all([
 prisma.user.findMany({
 where,
 include: {
 companyMembers: {
 include: { company: true }
 }
 },
 orderBy,
 skip,
 take,
 }),
 prisma.user.count({ where })
 ]);

 return (
 <div className="space-y-6">
 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
 <div className="flex justify-between items-end gap-4 w-full">
 <div>
 <h1 className="text-3xl font-bold text-foreground">Clients & Users</h1>
 <p className="mt-2 text-muted-foreground">Manage corporate accounts and individual users.</p>
 </div>
 <a href="/api/admin/exports/customers" target="_blank" className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 flex items-center gap-2 text-sm font-medium">
 <Download className="w-4 h-4" /> Export CSV
 </a>
 </div>
 </div>

 <div className="flex items-center gap-4 bg-background p-4 border rounded-md shadow-sm">
 <AdminSearchInput placeholder="Search customers by name, email, or company..." />
 </div>

 <CustomerListClient 
 users={users.map(u => ({
 ...u,
 companyMembers: u.companyMembers.map(cm => ({
 ...cm,
 createdAt: cm.createdAt.toISOString(),
 updatedAt: cm.updatedAt.toISOString(),
 company: {
 ...cm.company,
 createdAt: cm.company.createdAt.toISOString(),
 updatedAt: cm.company.updatedAt.toISOString(),
 }
 })),
 createdAt: u.createdAt.toISOString(),
 updatedAt: u.updatedAt.toISOString(),
 formattedDate: new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(u.createdAt)
 }))} 
 totalCount={totalUsers} 
 />
 </div>
 );
}
