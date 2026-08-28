import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { EmptyState } from "@/components/ui/empty-state";
import { FileSearch, Download, Eye } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma/client";
import { formatINR } from "@/lib/currency";
import { requireUser } from "@/lib/auth/server";

export default async function DashboardQuotes() {
  const auth = await requireUser();
  
  if (!auth?.user) {
    return null;
  }

  const quotes = await prisma.quoteRequest.findMany({
    where: { userId: auth.user.id },
    include: { items: true },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-serif font-bold text-primary">My Quotes</h1>
        <p className="mt-2 text-muted-foreground">Manage and track your corporate gift quotations.</p>
      </div>

      {quotes.length === 0 ? (
        <EmptyState 
          icon={FileSearch}
          title="No quotes found"
          description="You haven't requested any corporate quotes yet. Browse our catalog to get started."
          actionLabel="Browse Catalog"
          actionHref="/corporate-gifts"
        />
      ) : (
        <div className="border border-border/60 rounded-md bg-background overflow-hidden">
          <div className="hidden md:block overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-secondary/20">
                  <TableHead className="font-semibold">Quote Ref</TableHead>
                  <TableHead className="font-semibold">Date</TableHead>
                  <TableHead className="font-semibold">Items</TableHead>
                  <TableHead className="font-semibold">Est. Total</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {quotes.map((quote) => {
                  const itemsTotal = quote.items.reduce((acc, item) => acc + Number(item.totalPrice), 0);
                  const totalQuantity = quote.items.reduce((acc, item) => acc + item.quantity, 0);

                  return (
                    <TableRow key={quote.id}>
                      <TableCell className="font-medium text-primary">{quote.quoteNumber}</TableCell>
                      <TableCell>{quote.createdAt.toLocaleDateString()}</TableCell>
                      <TableCell>{totalQuantity} items</TableCell>
                      <TableCell>{formatINR(itemsTotal)}</TableCell>
                      <TableCell>
                        <StatusBadge status={quote.status} />
                      </TableCell>
                      <TableCell className="text-right flex items-center justify-end gap-3">
                        <a href={`/api/quotes/${quote.id}/pdf`} target="_blank" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 text-sm font-medium" title="Download PDF Quote">
                          <Download className="h-4 w-4" /> PDF
                        </a>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Stacked Cards */}
          <div className="md:hidden divide-y divide-border/40">
            {quotes.map((quote) => {
              const itemsTotal = quote.items.reduce((acc, item) => acc + Number(item.totalPrice), 0);
              
              return (
                <div key={quote.id} className="p-4 flex flex-col gap-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-bold text-foreground">{quote.quoteNumber}</div>
                      <div className="text-sm text-muted-foreground">{quote.createdAt.toLocaleDateString()}</div>
                    </div>
                    <StatusBadge status={quote.status} />
                  </div>
                  
                  <div className="flex justify-between items-center text-sm border-t border-border/40 pt-3">
                    <div>
                      <span className="text-muted-foreground">Total:</span> <span className="font-medium text-primary">{formatINR(itemsTotal)}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 w-full mt-2">
                    <a href={`/api/quotes/${quote.id}/pdf`} target="_blank" className="flex-1 flex items-center justify-center gap-2 p-2 rounded-md border border-border/60 hover:bg-secondary transition-colors text-sm font-medium">
                      <Download className="h-4 w-4" /> Download PDF
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
