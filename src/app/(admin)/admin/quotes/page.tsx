import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { EmptyState } from "@/components/ui/empty-state";
import { FileSearch, Download } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma/client";
import { formatINR } from "@/lib/currency";
import { AdminSearchInput } from "@/components/admin/AdminSearchInput";
import { AdminPagination } from "@/components/admin/AdminPagination";

export default async function AdminQuotes(props: { searchParams: Promise<{ page?: string, q?: string }> }) {
  const searchParams = await props.searchParams;
  const page = Number(searchParams.page) || 1;
  const q = searchParams.q || "";
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

  const [quotes, totalQuotes] = await Promise.all([
    prisma.quoteRequest.findMany({
      where,
      include: {
        items: true
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take,
    }),
    prisma.quoteRequest.count({ where })
  ]);

  const totalPages = Math.ceil(totalQuotes / take);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Quotes Management</h1>
        <p className="mt-2 text-slate-500">Review and respond to incoming corporate quotation requests.</p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4 bg-background p-4 border rounded-md shadow-sm">
        <AdminSearchInput placeholder="Search quotes by reference, company, name, or email..." />
      </div>

      {quotes.length === 0 ? (
        <EmptyState 
          icon={FileSearch}
          title="No quotes found"
          description={q ? "No quotes matched your search query. Try different keywords." : "There are currently no quote requests in the system."}
          actionLabel={q ? "Clear Search" : ""}
          actionHref={q ? "/admin/quotes" : ""}
        />
      ) : (
        <div className="border border-slate-200 rounded-md bg-background">
          {/* Desktop Table (Hidden on Mobile) */}
          <div className="hidden md:block overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50 hover:bg-slate-50">
                  <TableHead className="font-semibold text-slate-700">Quote Ref</TableHead>
                  <TableHead className="font-semibold text-slate-700">Company</TableHead>
                  <TableHead className="font-semibold text-slate-700">Date</TableHead>
                  <TableHead className="font-semibold text-slate-700">Est. Budget</TableHead>
                  <TableHead className="font-semibold text-slate-700">Status</TableHead>
                  <TableHead className="font-semibold text-slate-700 text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {quotes.map((quote) => {
                  const totalBudget = quote.budgetPerRecipient 
                    ? Number(quote.budgetPerRecipient) * quote.numberOfRecipients 
                    : 0;

                  return (
                    <TableRow key={quote.id}>
                      <TableCell className="font-medium text-slate-900">{quote.quoteNumber}</TableCell>
                      <TableCell>{quote.companyName || 'N/A'}</TableCell>
                      <TableCell>{quote.createdAt.toLocaleDateString()}</TableCell>
                      <TableCell>{formatINR(totalBudget)}</TableCell>
                      <TableCell>
                        <StatusBadge status={quote.status} />
                      </TableCell>
                      <TableCell className="text-right flex items-center justify-end gap-3">
                        <a href={`/api/quotes/${quote.id}/pdf`} target="_blank" className="text-slate-500 hover:text-slate-900 transition-colors" title="Download PDF Quote">
                          <Download className="h-4 w-4" />
                        </a>
                        <Link href={`/admin/quotes/${quote.id}`} className="text-accent hover:underline text-sm font-semibold">
                          Review
                        </Link>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
          
          {/* Mobile Stacked Cards */}
          <div className="md:hidden divide-y divide-slate-100">
            {quotes.map((quote) => {
              const totalBudget = quote.budgetPerRecipient 
                ? Number(quote.budgetPerRecipient) * quote.numberOfRecipients 
                : 0;

              return (
                <div key={quote.id} className="p-4 flex flex-col gap-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-bold text-slate-900">{quote.quoteNumber}</div>
                      <div className="text-sm text-slate-500">{quote.companyName || 'N/A'}</div>
                    </div>
                    <StatusBadge status={quote.status} />
                  </div>
                  
                  <div className="flex justify-between items-center text-sm border-t border-slate-100 pt-3">
                    <div>
                      <span className="text-slate-500">Date:</span> <span className="font-medium">{quote.createdAt.toLocaleDateString()}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Budget:</span> <span className="font-medium">{formatINR(totalBudget)}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 w-full mt-2">
                    <a href={`/api/quotes/${quote.id}/pdf`} target="_blank" className="flex items-center justify-center p-2 rounded-md bg-slate-100 text-slate-600 hover:bg-slate-200">
                      <Download className="h-5 w-5" />
                    </a>
                    <Link href={`/admin/quotes/${quote.id}`} className="flex-1 text-center bg-secondary/50 text-accent font-semibold py-2 rounded-md hover:bg-secondary">
                      Review Request
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {totalPages > 1 && <AdminPagination totalPages={totalPages} currentPage={page} />}
    </div>
  );
}
