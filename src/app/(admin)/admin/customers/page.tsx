import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Users, Building2, Search } from "lucide-react";
import { prisma } from "@/lib/prisma/client";
import { Input } from "@/components/ui/input";

export default async function AdminCustomers() {
  const users = await prisma.user.findMany({
    include: {
      companyMembers: {
        include: { company: true }
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Clients & Users</h1>
          <p className="mt-2 text-slate-500">Manage corporate accounts and individual users.</p>
        </div>
      </div>

      <div className="flex items-center gap-4 bg-white p-4 border rounded-md shadow-sm">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input placeholder="Search customers..." className="pl-9 h-10" />
        </div>
      </div>

      <div className="border border-slate-200 rounded-md bg-white overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Client Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Joined</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-64 text-center">
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <Users className="h-12 w-12 text-slate-300" />
                    <h3 className="text-lg font-medium text-slate-900">No clients found</h3>
                    <p className="text-slate-500 max-w-sm text-center">There are currently no active users in the system.</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium text-slate-900">
                    {user.fullName || 'N/A'}
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {user.companyMembers.length > 0 ? (
                      <div className="flex items-center text-sm text-slate-600">
                        <Building2 className="mr-2 h-4 w-4 text-slate-400" />
                        {user.companyMembers[0].company.name}
                      </div>
                    ) : (
                      <span className="text-slate-400 italic">No company</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.role === 'ADMIN' ? 'default' : 'secondary'}>
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.isActive ? 'default' : 'destructive'} className={user.isActive ? "bg-green-100 text-green-800 hover:bg-green-100" : ""}>
                      {user.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-slate-500">
                    {user.createdAt.toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
