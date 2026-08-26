import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function DashboardQuotes() {
  const quotes = [
    { id: "QR-2024-0042", date: "Oct 12, 2024", items: 2, total: ",500", status: "Reviewing" },
    { id: "QR-2024-0038", date: "Sep 28, 2024", items: 5, total: ",200", status: "Approved" },
    { id: "QR-2024-0021", date: "Aug 15, 2024", items: 1, total: "", status: "Completed" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-serif font-bold text-primary">My Quotes</h1>
        <p className="mt-2 text-muted-foreground">Manage and track your corporate gift quotations.</p>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Quote Ref</TableHead>
              <TableHead>Date Requested</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Est. Total</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {quotes.map((quote) => (
              <TableRow key={quote.id}>
                <TableCell className="font-medium text-primary">{quote.id}</TableCell>
                <TableCell>{quote.date}</TableCell>
                <TableCell>{quote.items} items</TableCell>
                <TableCell>{quote.total}</TableCell>
                <TableCell>
                  <Badge variant={quote.status === "Approved" ? "default" : quote.status === "Completed" ? "outline" : "secondary"}>
                    {quote.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
