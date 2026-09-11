import { prisma } from "@/lib/prisma/client";
import { requirePermission } from "@/lib/auth/permissions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default async function AdminStaffPage() {
 await requirePermission('admins.manage');

 const staffMembers = await prisma.user.findMany({
 where: { role: { in: ['ADMIN', 'SUPER_ADMIN'] } },
 orderBy: { createdAt: 'desc' }
 });

 return (
 <div className="space-y-6">
 <div>
 <h1 className="text-3xl font-bold tracking-tight">Staff Management</h1>
 <p className="text-muted-foreground mt-1">Manage admin users and their permissions</p>
 </div>

 <Card>
 <CardHeader>
 <CardTitle className="flex items-center gap-2">
 <Users className="h-5 w-5" />
 Administrative Users
 </CardTitle>
 </CardHeader>
 <CardContent>
 <div className="rounded-md border overflow-hidden">
 <table className="w-full text-sm">
 <thead className="bg-secondary/20 border-b ">
 <tr>
 <th className="text-left px-4 py-3 font-medium text-muted-foreground dark:text-muted-foreground">Name</th>
 <th className="text-left px-4 py-3 font-medium text-muted-foreground dark:text-muted-foreground">Email</th>
 <th className="text-center px-4 py-3 font-medium text-muted-foreground dark:text-muted-foreground">Role</th>
 <th className="text-left px-4 py-3 font-medium text-muted-foreground dark:text-muted-foreground">Joined</th>
 </tr>
 </thead>
 <tbody className="divide-y dark:divide-slate-800">
 {staffMembers.map(staff => (
 <tr key={staff.id} className="hover:bg-secondary/20 dark:hover:bg-muted/50">
 <td className="px-4 py-3 font-medium">{staff.fullName || '—'}</td>
 <td className="px-4 py-3 text-muted-foreground dark:text-muted-foreground">{staff.email}</td>
 <td className="px-4 py-3 text-center">
 <Badge variant={staff.role === 'SUPER_ADMIN' ? 'default' : 'secondary'} className={staff.role === 'SUPER_ADMIN' ? "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200" : ""}>
 {staff.role === 'SUPER_ADMIN' ? <Shield className="w-3 h-3 mr-1" /> : null}
 {staff.role.replace('_', ' ')}
 </Badge>
 </td>
 <td className="px-4 py-3 text-muted-foreground text-xs">
 {staff.createdAt.toLocaleDateString()}
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
