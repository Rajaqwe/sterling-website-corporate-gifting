import { prisma } from "@/lib/prisma/client";
import { requirePermission } from "@/lib/auth/permissions";
import { AdminSearchInput } from "@/components/admin/AdminSearchInput";
import { QuoteListClient } from "./QuoteListClient";

export default async function AdminQuotes(props: { searchParams: Promise<{ page?: string, q?: string, sort?: string, order?: string }> }) {
  await requirePermission('quotes.read');
 const searchParams = await props.searchParams;
 const page = Number(searchParams.page) || 1;
 const q = searchParams.q || "";
 const sort = searchParams.sort || "createdAt";
 const order = searchParams.order || "desc";
 const take = 10;
 const skip = (page - 1) * take;

 const where = q ? {
 OR: [
 { quoteNumber: { contains: q, mode: 'insensitive' as const } },
 { companyName: { contains: q, mode: 'insensitive' as const } },
 { fullName: { contains: q, mode: 'insensitive' as const } },
 { workEmail: { contains: q, mode: 'insensitive' as const } }
 ]
 } : {};

 let orderBy: any = {};
 if (sort === 'quoteNumber') {
 orderBy = { quoteNumber: order as any };
 } else if (sort === 'companyName') {
 orderBy = { companyName: order as any };
 } else if (sort === 'status') {
 orderBy = { status: order as any };
 } else {
 orderBy = { createdAt: 'desc' };
 }

 const [quotes, totalQuotes] = await Promise.all([
 prisma.quoteRequest.findMany({
 where,
 select: {
   id: true,
   quoteNumber: true,
   fullName: true,
   companyName: true,
   workEmail: true,
   phone: true,
   status: true,
   quantity: true,
   budgetPerRecipient: true,
   createdAt: true,
   updatedAt: true,
   expiresAt: true,
   items: {
     select: {
       id: true,
       quantity: true,
       unitPrice: true,
       totalPrice: true,
       description: true,
       brandingOption: true,
       notes: true,
       createdAt: true,
       updatedAt: true,
     }
   }
 },
 orderBy,
 skip,
 take,
 }),
 prisma.quoteRequest.count({ where })
 ]);

 return (
 <div className="space-y-6">
 <div>
 <h1 className="text-3xl font-bold text-foreground">Quotes Management</h1>
 <p className="mt-2 text-muted-foreground">Review and respond to incoming corporate quotation requests.</p>
 </div>

 <div className="flex flex-col sm:flex-row sm:items-center gap-4 bg-background p-4 border rounded-md shadow-sm">
 <AdminSearchInput placeholder="Search quotes by reference, company, name, or email..." />
 </div>

 <QuoteListClient 
 quotes={quotes.map(q => ({
 ...q,
 budgetPerRecipient: q.budgetPerRecipient ? Number(q.budgetPerRecipient) : null,
 items: q.items.map(item => ({
 ...item,
 unitPrice: Number(item.unitPrice),
 totalPrice: Number(item.totalPrice),
 createdAt: item.createdAt.toISOString(),
 updatedAt: item.updatedAt.toISOString(),
 })),
 createdAt: q.createdAt.toISOString(),
 updatedAt: q.updatedAt.toISOString(),
 formattedDate: new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(q.createdAt)
 }))} 
 totalCount={totalQuotes} 
 />
 </div>
 );
}
