import { prisma } from "@/lib/prisma/client";
import { requirePermission } from "@/lib/auth/permissions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cpu, Database, CheckCircle, AlertCircle } from "lucide-react";

export default async function AdminSystemPage() {
 await requirePermission('system.health');

 const start = Date.now();

 // Test database connectivity
 let dbStatus: 'healthy' | 'error' = 'healthy';
 let dbLatency = 0;
 let userCount = 0;
 let productCount = 0;
 let orderCount = 0;
 let quoteCount = 0;
 let webhookEventCount = 0;

 try {
 const dbStart = Date.now();
 [userCount, productCount, orderCount, quoteCount, webhookEventCount] = await Promise.all([
 prisma.user.count(),
 prisma.product.count(),
 prisma.order.count(),
 prisma.quoteRequest.count(),
 prisma.paymentWebhookEvent.count(),
 ]);
 dbLatency = Date.now() - dbStart;
 } catch {
 dbStatus = 'error';
 }

 const totalTime = Date.now() - start;

 const stats = [
 { label: "Users", value: userCount },
 { label: "Products", value: productCount },
 { label: "Orders", value: orderCount },
 { label: "Quotes", value: quoteCount },
 { label: "Webhook Events", value: webhookEventCount },
 ];

 return (
 <div className="space-y-6">
 <div>
 <h1 className="text-3xl font-bold tracking-tight">System Health</h1>
 <p className="text-muted-foreground mt-1">Application and database status overview</p>
 </div>

 <div className="grid gap-4 md:grid-cols-2">
 <Card className={dbStatus === 'healthy' ? "border-green-200" : "border-red-200"}>
 <CardHeader>
 <CardTitle className="flex items-center gap-2 text-base">
 <Database className="h-5 w-5" />
 Database
 {dbStatus === 'healthy'
 ? <Badge className="bg-green-100 text-green-800 ml-auto">Healthy</Badge>
 : <Badge variant="destructive" className="ml-auto">Error</Badge>}
 </CardTitle>
 </CardHeader>
 <CardContent className="space-y-2 text-sm">
 <div className="flex justify-between">
 <span className="text-muted-foreground">Connection</span>
 <span className="font-medium">{dbStatus === 'healthy' ? 'Connected' : 'Failed'}</span>
 </div>
 <div className="flex justify-between">
 <span className="text-muted-foreground">Query Latency</span>
 <span className="font-medium">{dbLatency}ms</span>
 </div>
 <div className="flex justify-between">
 <span className="text-muted-foreground">Total Page Time</span>
 <span className="font-medium">{totalTime}ms</span>
 </div>
 </CardContent>
 </Card>

 <Card className="border-green-200">
 <CardHeader>
 <CardTitle className="flex items-center gap-2 text-base">
 <Cpu className="h-5 w-5" />
 Application
 <Badge className="bg-green-100 text-green-800 ml-auto">Running</Badge>
 </CardTitle>
 </CardHeader>
 <CardContent className="space-y-2 text-sm">
 <div className="flex justify-between">
 <span className="text-muted-foreground">Node Environment</span>
 <span className="font-medium">{process.env.NODE_ENV}</span>
 </div>
 <div className="flex justify-between">
 <span className="text-muted-foreground">Time (UTC)</span>
 <span className="font-medium">{new Date().toISOString()}</span>
 </div>
 </CardContent>
 </Card>
 </div>

 <Card>
 <CardHeader>
 <CardTitle>Database Record Counts</CardTitle>
 </CardHeader>
 <CardContent>
 <div className="grid gap-3 md:grid-cols-3">
 {stats.map(stat => (
 <div key={stat.label} className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg">
 <span className="text-sm text-muted-foreground">{stat.label}</span>
 <span className="font-bold">{stat.value.toLocaleString()}</span>
 </div>
 ))}
 </div>
 </CardContent>
 </Card>

 <Card>
 <CardHeader>
 <CardTitle>Checklist</CardTitle>
 </CardHeader>
 <CardContent>
 <div className="space-y-3 text-sm">
 {[
 { label: "Database reachable", ok: dbStatus === 'healthy' },
 { label: "Supabase auth configured", ok: !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY && process.env.SUPABASE_SERVICE_ROLE_KEY) },
 { label: "Razorpay credentials set", ok: !!(process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) },
 { label: "Email transport configured", ok: !!(process.env.SMTP_HOST || process.env.RESEND_API_KEY) },
 { label: "Cron secret set", ok: !!process.env.CRON_SECRET },
 ].map(item => (
 <div key={item.label} className="flex items-center gap-3">
 {item.ok
 ? <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
 : <AlertCircle className="h-4 w-4 text-amber-500 flex-shrink-0" />}
 <span className={item.ok ? "text-muted-foreground" : "text-amber-700"}>{item.label}</span>
 <Badge className={`ml-auto text-xs ${item.ok ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}`}>
 {item.ok ? "OK" : "Check config"}
 </Badge>
 </div>
 ))}
 </div>
 </CardContent>
 </Card>
 </div>
 );
}
