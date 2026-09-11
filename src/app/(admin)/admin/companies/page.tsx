import { prisma } from "@/lib/prisma/client";
import { requirePermission } from "@/lib/auth/permissions";
import { AdminSearchInput } from "@/components/admin/AdminSearchInput";
import { CompanyListClient } from "./CompanyListClient";

export default async function AdminCompanies(props: { searchParams: Promise<{ page?: string, q?: string, sort?: string, order?: string }> }) {
  await requirePermission('companies.read');
 const searchParams = await props.searchParams;
 const page = Number(searchParams.page) || 1;
 const q = searchParams.q || "";
 const sort = searchParams.sort || "createdAt";
 const order = searchParams.order || "desc";
 const take = 10;
 const skip = (page - 1) * take;

 const where = q ? {
 OR: [
 { name: { contains: q, mode: 'insensitive' as const } },
 { email: { contains: q, mode: 'insensitive' as const } },
 { industry: { contains: q, mode: 'insensitive' as const } },
 ]
 } : {};

 let orderBy: any = {};
 if (sort === 'name') {
 orderBy = { name: order as any };
 } else if (sort === 'industry') {
 orderBy = { industry: order as any };
 } else if (sort === 'isActive') {
 orderBy = { isActive: order as any };
 } else {
 orderBy = { createdAt: 'desc' };
 }

 const [companies, totalCompanies] = await Promise.all([
 prisma.company.findMany({
 where,
 include: {
 _count: {
 select: { members: true, orders: true }
 }
 },
 orderBy,
 skip,
 take,
 }),
 prisma.company.count({ where })
 ]);

 return (
 <div className="space-y-6">
 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
 <div>
 <h1 className="text-3xl font-bold text-foreground">Companies</h1>
 <p className="mt-2 text-muted-foreground">Manage B2B organizations and accounts.</p>
 </div>
 </div>

 <div className="flex items-center gap-4 bg-background p-4 border rounded-md shadow-sm">
 <AdminSearchInput placeholder="Search companies by name, email, or industry..." />
 </div>

 <CompanyListClient 
 companies={companies.map(c => ({
 ...c,
 createdAt: c.createdAt.toISOString(),
 updatedAt: c.updatedAt.toISOString(),
 formattedDate: new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(c.createdAt)
 }))} 
 totalCount={totalCompanies} 
 />
 </div>
 );
}
