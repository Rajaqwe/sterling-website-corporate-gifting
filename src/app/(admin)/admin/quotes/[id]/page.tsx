import { prisma } from "@/lib/prisma/client";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth/require-admin";
import { requirePermission } from "@/lib/auth/permissions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatINR } from "@/lib/currency";
import { ArrowLeft, Download, ExternalLink, Calendar, Users, Building, Mail, Phone, Package, CheckCircle } from "lucide-react";
import Link from "next/link";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Textarea } from "@/components/ui/textarea";
import { QuoteStateActions } from "./QuoteStateActions";

export default async function AdminQuoteDetailPage(props: { params: Promise<{ id: string }> }) {
 await requireAdmin();
 await requirePermission('quotes.read');
 const params = await props.params;

 const quote = await prisma.quoteRequest.findUnique({
 where: { id: params.id },
 include: {
 product: true,
 category: true,
 user: {
   select: {
     fullName: true,
     email: true
   }
 },
 items: {
   select: {
     id: true,
     quantity: true,
     unitPrice: true,
     totalPrice: true,
     description: true,
     brandingOption: true,
     notes: true,
     productId: true,
   }
 }
 }
 });

 if (!quote) {
 notFound();
 }

 const totalBudget = quote.budgetPerRecipient 
 ? Number(quote.budgetPerRecipient) * quote.numberOfRecipients 
 : 0;

 return (
 <div className="space-y-6 pb-20">
 {/* Header */}
 <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
 <div>
 <Link href="/admin/quotes" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 mb-2">
 <ArrowLeft className="h-4 w-4" /> Back to Quotes
 </Link>
 <div className="flex items-center gap-3">
 <h1 className="text-3xl font-bold text-foreground">Quote {quote.quoteNumber}</h1>
 <StatusBadge status={quote.status} />
 </div>
 <p className="mt-1 text-sm text-muted-foreground">
 Received on {new Date(quote.createdAt).toLocaleDateString()} at {new Date(quote.createdAt).toLocaleTimeString()}
 </p>
 </div>
 <div className="flex gap-2">
 <a href={`/api/quotes/${quote.id}/pdf`} target="_blank">
 <Button variant="outline" type="button">
 <Download className="h-4 w-4 mr-2" /> PDF Export
 </Button>
 </a>
 <Button>Approve & Convert</Button>
 </div>
 </div>

 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
 {/* Main Details */}
 <div className="lg:col-span-2 space-y-6">
 
 <div className="bg-card border rounded-lg shadow-sm overflow-hidden">
 <div className="px-5 py-4 border-b bg-secondary/20 font-semibold text-foreground flex justify-between items-center">
 Request Details
 </div>
 <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
 <div>
 <p className="text-sm text-muted-foreground mb-1 flex items-center gap-1"><Package className="h-4 w-4"/> Target Product</p>
 <div className="font-medium text-foreground">
 {quote.product ? (
 <Link href={`/admin/products/${quote.product.id}`} className="text-accent hover:underline flex items-center gap-1">
 {quote.product.name} <ExternalLink className="h-3 w-3" />
 </Link>
 ) : quote.category ? (
 `Category: ${quote.category.name}`
 ) : (
 'General Request'
 )}
 </div>
 </div>
 
 <div>
 <p className="text-sm text-muted-foreground mb-1 flex items-center gap-1"><Users className="h-4 w-4"/> Quantity</p>
 <p className="font-medium text-foreground">{quote.quantity} units ({quote.numberOfRecipients} recipients)</p>
 </div>

 <div>
 <p className="text-sm text-muted-foreground mb-1 flex items-center gap-1"><Calendar className="h-4 w-4"/> Required By</p>
 <p className="font-medium text-foreground">
 {quote.requiredDeliveryDate ? new Date(quote.requiredDeliveryDate).toLocaleDateString() : 'Flexible'}
 </p>
 </div>
 
 <div>
 <p className="text-sm text-muted-foreground mb-1 flex items-center gap-1"><CheckCircle className="h-4 w-4"/> Budget</p>
 <p className="font-medium text-foreground">
 {quote.budgetPerRecipient ? `${formatINR(Number(quote.budgetPerRecipient))} / recipient` : 'Not specified'}
 </p>
 {totalBudget > 0 && (
 <p className="text-xs text-muted-foreground">Est. Total: {formatINR(totalBudget)}</p>
 )}
 </div>
 
 <div>
 <p className="text-sm text-muted-foreground mb-1">Branding Required</p>
 <Badge variant={quote.brandingRequired ? 'default' : 'secondary'}>
 {quote.brandingRequired ? 'Yes' : 'No'}
 </Badge>
 </div>

 <div>
 <p className="text-sm text-muted-foreground mb-1">Reminders Sent</p>
 <p className="font-medium text-foreground">
 {quote.reminderCount} {quote.lastReminderAt && <span className="text-sm text-muted-foreground font-normal ml-2">(Last: {new Date(quote.lastReminderAt).toLocaleDateString()})</span>}
 </p>
 </div>
 
 <div>
 <p className="text-sm text-muted-foreground mb-1">Event Type</p>
 <p className="font-medium text-foreground">{quote.eventType || 'Not specified'}</p>
 </div>
 </div>
 </div>

 <div className="bg-card border rounded-lg shadow-sm overflow-hidden">
 <div className="px-5 py-4 border-b bg-secondary/20 font-semibold text-foreground">
 Additional Requirements
 </div>
 <div className="p-5">
 <p className="text-muted-foreground whitespace-pre-wrap">
 {quote.additionalRequirements || <span className="italic text-muted-foreground">No additional requirements provided.</span>}
 </p>
 
 {quote.fileUrl && (
 <div className="mt-4 pt-4 border-t">
 <p className="text-sm font-medium text-muted-foreground mb-2">Attached File:</p>
 <a href={quote.fileUrl} target="_blank" className="text-accent hover:underline flex items-center gap-1 text-sm font-medium">
 <Download className="h-4 w-4" /> {quote.fileName || 'Download Attachment'}
 </a>
 </div>
 )}
 </div>
 </div>
 
 <div className="bg-card border rounded-lg shadow-sm overflow-hidden">
 <div className="px-5 py-4 border-b bg-secondary/20 font-semibold text-foreground">
 Internal Admin Notes
 </div>
 <div className="p-5">
 <form action={async (formData: FormData) => {
 'use server';
 const notes = formData.get('notes') as string;
 const { saveQuoteNotes } = await import('../actions');
 await saveQuoteNotes(quote.id, notes || '');
 }} className="space-y-4">
 <Textarea 
 name="notes"
 defaultValue={quote.internalNotes || ''} 
 placeholder="Add private notes for the sales team here. These are not visible to the customer."
 className="min-h-[120px]"
 />
 <Button type="submit" variant="secondary">Save Notes</Button>
 </form>
 </div>
 </div>

 </div>

 {/* Sidebar */}
 <div className="space-y-6">
 <div className="bg-card border rounded-lg shadow-sm overflow-hidden">
 <div className="px-5 py-4 border-b bg-secondary/20 font-semibold text-foreground flex items-center gap-2">
 <Users className="h-5 w-5 text-muted-foreground" /> Client Details
 </div>
 <div className="p-5 space-y-4 text-sm">
 <div>
 <p className="text-muted-foreground mb-1 flex items-center gap-1"><Building className="h-4 w-4"/> Company</p>
 <p className="font-semibold text-foreground text-base">{quote.companyName}</p>
 </div>
 
 <div>
 <p className="text-muted-foreground mb-1 flex items-center gap-1"><Users className="h-4 w-4"/> Contact Person</p>
 <p className="font-medium text-foreground">{quote.fullName}</p>
 {quote.user && (
 <Badge variant="outline" className="mt-1 text-xs">Registered User</Badge>
 )}
 </div>
 
 <div>
 <p className="text-muted-foreground mb-1 flex items-center gap-1"><Mail className="h-4 w-4"/> Email</p>
 <a href={`mailto:${quote.workEmail}`} className="font-medium text-accent hover:underline">
 {quote.workEmail}
 </a>
 </div>
 
 <div>
 <p className="text-muted-foreground mb-1 flex items-center gap-1"><Phone className="h-4 w-4"/> Phone</p>
 <a href={`tel:${quote.phone}`} className="font-medium text-foreground hover:underline">
 {quote.phone}
 </a>
 </div>
 
 {quote.deliveryLocation && (
 <div>
 <p className="text-muted-foreground mb-1 flex items-center gap-1">Location</p>
 <p className="font-medium text-foreground">{quote.deliveryLocation}</p>
 </div>
 )}
 </div>
 </div>
 
 <div className="bg-card border rounded-lg shadow-sm overflow-hidden">
 <div className="px-5 py-4 border-b bg-secondary/20 font-semibold text-foreground">
 Actions
 </div>
 <div className="p-5">
 <QuoteStateActions quoteId={quote.id} currentStatus={quote.status} />
 </div>
 </div>
 </div>
 </div>
 </div>
 );
}
