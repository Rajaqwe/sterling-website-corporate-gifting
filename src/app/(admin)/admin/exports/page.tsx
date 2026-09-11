import { requirePermission } from "@/lib/auth/permissions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileDown, Download } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default async function AdminExportsPage() {
 await requirePermission('invoices.read'); // Using an existing permission for exports

 return (
 <div className="space-y-6">
 <div>
 <h1 className="text-3xl font-bold tracking-tight">Data Exports</h1>
 <p className="text-muted-foreground mt-1">Export system data to CSV format</p>
 </div>

 <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
 <Card>
 <CardHeader>
 <CardTitle className="text-lg flex items-center gap-2">
 <FileDown className="h-5 w-5 text-blue-500" />
 Orders Export
 </CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <p className="text-sm text-muted-foreground dark:text-muted-foreground">
 Download all completed and pending orders, including line items and totals.
 </p>
 <a href="/api/admin/exports/orders" target="_blank" className={cn(buttonVariants({ variant: "outline" }), "w-full sm:w-auto")}><Download className="w-4 h-4 mr-2" /> Export Orders</a>
 </CardContent>
 </Card>

 <Card>
 <CardHeader>
 <CardTitle className="text-lg flex items-center gap-2">
 <FileDown className="h-5 w-5 text-green-500" />
 Products Export
 </CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <p className="text-sm text-muted-foreground dark:text-muted-foreground">
 Download current product catalog with pricing and stock levels.
 </p>
 <a href="/api/admin/exports/products" target="_blank" className={cn(buttonVariants({ variant: "outline" }), "w-full sm:w-auto")}><Download className="w-4 h-4 mr-2" /> Export Products</a>
 </CardContent>
 </Card>

 <Card>
 <CardHeader>
 <CardTitle className="text-lg flex items-center gap-2">
 <FileDown className="h-5 w-5 text-purple-500" />
 Customers Export
 </CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <p className="text-sm text-muted-foreground dark:text-muted-foreground">
 Download a list of all registered users and their associated companies.
 </p>
 <a href="/api/admin/exports/customers" target="_blank" className={cn(buttonVariants({ variant: "outline" }), "w-full sm:w-auto")}><Download className="w-4 h-4 mr-2" /> Export Customers</a>
 </CardContent>
 </Card>
 </div>
 </div>
 );
}
