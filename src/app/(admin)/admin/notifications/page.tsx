import { requirePermission } from "@/lib/auth/permissions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Info, AlertTriangle, CheckCircle } from "lucide-react";

export default async function AdminNotificationsPage() {
 await requirePermission('notifications.manage');

 // Dummy data for now, since we don't have a Notification model in Prisma yet
 const notifications = [
 { id: 1, type: 'alert', message: 'Database connection latency is high (>500ms).', time: '10 mins ago', read: false },
 { id: 2, type: 'info', message: 'New super admin user created.', time: '1 hour ago', read: false },
 { id: 3, type: 'success', message: 'Weekly data export completed successfully.', time: '1 day ago', read: true },
 ];

 return (
 <div className="space-y-6">
 <div>
 <h1 className="text-3xl font-bold tracking-tight">Notifications Center</h1>
 <p className="text-muted-foreground mt-1">System alerts and administrative notifications</p>
 </div>

 <Card>
 <CardHeader>
 <CardTitle className="flex items-center gap-2">
 <Bell className="h-5 w-5" />
 Recent Alerts
 </CardTitle>
 </CardHeader>
 <CardContent>
 <div className="space-y-4">
 {notifications.length === 0 ? (
 <p className="text-sm text-muted-foreground text-center py-8">No notifications.</p>
 ) : (
 notifications.map(n => (
 <div key={n.id} className={`flex items-start gap-4 p-4 rounded-lg border ${n.read ? 'bg-secondary/20 opacity-70 /50' : 'bg-card shadow-sm border-blue-100 dark:border-blue-900'}`}>
 {n.type === 'alert' && <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />}
 {n.type === 'info' && <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />}
 {n.type === 'success' && <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />}
 <div className="flex-1">
 <p className={`text-sm ${n.read ? 'text-muted-foreground dark:text-muted-foreground' : 'font-medium text-foreground '}`}>
 {n.message}
 </p>
 <p className="text-xs text-muted-foreground mt-1">{n.time}</p>
 </div>
 </div>
 ))
 )}
 </div>
 </CardContent>
 </Card>
 </div>
 );
}
