import { prisma } from "@/lib/prisma/client";
import { requirePermission } from "@/lib/auth/permissions";
import { SampleRequestList } from "./SampleRequestList";

export default async function AdminSampleRequestsPage() {
  await requirePermission("quotes.read");
  const requests = await prisma.sampleRequest.findMany({
    include: { product: { select: { id: true, name: true, slug: true } } },
    orderBy: { createdAt: "desc" },
    take: 100,
  });
  return <div className="space-y-6"><div><h1 className="text-3xl font-bold text-foreground">Sample Requests</h1><p className="mt-2 max-w-3xl text-muted-foreground">Review and track customers who want to evaluate a product before a bulk order.</p></div><SampleRequestList requests={requests.map((request) => ({ id: request.id, referenceNumber: request.referenceNumber, fullName: request.fullName, companyName: request.companyName, workEmail: request.workEmail, phone: request.phone, estimatedQuantity: request.estimatedQuantity, sampleType: request.sampleType, deliveryLocation: request.deliveryLocation, requiredBy: request.requiredBy?.toISOString() || null, brandingRequired: request.brandingRequired, notes: request.notes, status: request.status, createdAt: request.createdAt.toISOString(), product: request.product }))} /></div>;
}
