import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { prisma } from "@/lib/prisma/client";
import { formatINR } from "@/lib/currency";

export default async function AdminQuotes() {
  const quotes = await prisma.quoteRequest.findMany({
    include: {
      items: true
    },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Quotes Management</h1>
        <p className="mt-2 text-slate-500">Review and respond to incoming corporate quotation requests.</p>
      </div>

      <div className="border border-slate-200 rounded-md bg-white overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Quote Ref</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Est. Budget</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {quotes.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-48 text-center text-slate-500">
                  No quotes found
                </TableCell>
              </TableRow>
            ) : (
              quotes.map((quote) => {
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
                      <Badge variant={quote.status === "APPROVED" ? "default" : "secondary"}>
                        {quote.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Link href={`/admin/quotes/${quote.id}`} className="text-blue-600 hover:underline text-sm font-medium">
                        Review
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
