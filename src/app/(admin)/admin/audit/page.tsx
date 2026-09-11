import { prisma } from "@/lib/prisma/client";
import { requirePermission } from "@/lib/auth/permissions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity } from "lucide-react";

export default async function AdminAuditLogsPage() {
 await requirePermission('audit.read');

 const logs = await prisma.auditLog.findMany({
 orderBy: { createdAt: 'desc' },
 take: 200,
 include: {
 actor: { select: { fullName: true, email: true } }
 }
 });

 const resourceColors: Record<string, string> = {
 Order: 'bg-blue-100 text-blue-800',
 Quote: 'bg-amber-100 text-amber-800',
 Product: 'bg-green-100 text-green-800',
 Customer: 'bg-purple-100 text-purple-800',
 Company: 'bg-indigo-100 text-indigo-800',
 Category: 'bg-pink-100 text-pink-800',
 ProductVariant: 'bg-teal-100 text-teal-800',
 };

 return (
 <div className="space-y-6">
 <div>
 <h1 className="text-3xl font-bold tracking-tight">Audit Logs</h1>
 <p className="text-muted-foreground mt-1">System-wide record of all administrative actions</p>
 </div>

 <Card>
 <CardHeader>
 <CardTitle className="flex items-center gap-2">
 <Activity className="h-5 w-5" />
 Recent Activity ({logs.length} entries)
 </CardTitle>
 </CardHeader>
 <CardContent>
 <div className="rounded-md border overflow-hidden">
 <table className="w-full text-sm">
 <thead className="bg-secondary/20 border-b">
 <tr>
 <th className="text-left px-4 py-3 font-medium text-muted-foreground">Timestamp</th>
 <th className="text-left px-4 py-3 font-medium text-muted-foreground">Actor</th>
 <th className="text-left px-4 py-3 font-medium text-muted-foreground">Action</th>
 <th className="text-left px-4 py-3 font-medium text-muted-foreground">Resource</th>
 <th className="text-left px-4 py-3 font-medium text-muted-foreground">Resource ID</th>
 </tr>
 </thead>
 <tbody className="divide-y">
 {logs.length === 0 && (
 <tr>
 <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">No audit logs found.</td>
 </tr>
 )}
 {logs.map(log => (
 <tr key={log.id} className="hover:bg-secondary/20">
 <td className="px-4 py-3 text-muted-foreground text-xs font-mono whitespace-nowrap">
 {log.createdAt.toLocaleString()}
 </td>
 <td className="px-4 py-3">
 <div className="font-medium text-foreground">{log.actor?.fullName || 'System'}</div>
 <div className="text-xs text-muted-foreground">{log.actor?.email}</div>
 </td>
 <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{log.action}</td>
 <td className="px-4 py-3">
 {log.resource && (
 <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${resourceColors[log.resource] || 'bg-muted text-muted-foreground'}`}>
 {log.resource}
 </span>
 )}
 </td>
 <td className="px-4 py-3 text-muted-foreground text-xs font-mono">
 {log.resourceId ? log.resourceId.substring(0, 12) + '...' : '—'}
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 </CardContent>
 </Card>
 </div>
 );
}
