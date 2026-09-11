import { prisma } from "@/lib/prisma/client";
import { requirePermission } from "@/lib/auth/permissions";
import { AdminSearchInput } from "@/components/admin/AdminSearchInput";
import { ReviewListClient } from "./ReviewListClient";

export default async function AdminReviewsPage(props: { searchParams: Promise<{ page?: string, q?: string, sort?: string, order?: string }> }) {
  await requirePermission('reviews.read');
 const searchParams = await props.searchParams;
 const page = Number(searchParams.page) || 1;
 const q = searchParams.q || "";
 const sort = searchParams.sort || "createdAt";
 const order = searchParams.order || "desc";
 const take = 10;
 const skip = (page - 1) * take;

 const where = q ? {
 OR: [
 { title: { contains: q, mode: 'insensitive' as const } },
 { content: { contains: q, mode: 'insensitive' as const } },
 { product: { name: { contains: q, mode: 'insensitive' as const } } },
 { user: { fullName: { contains: q, mode: 'insensitive' as const } } }
 ]
 } : {};

 let orderBy: any = {};
 if (sort === 'rating') {
 orderBy = { rating: order as any };
 } else if (sort === 'isVerified') {
 orderBy = { isVerified: order as any };
 } else {
 orderBy = { createdAt: 'desc' };
 }

 const [reviews, totalReviews] = await Promise.all([
 prisma.review.findMany({
 where,
 include: {
 product: { select: { id: true, name: true } },
 user: { select: { fullName: true, email: true } }
 },
 orderBy,
 skip,
 take,
 }),
 prisma.review.count({ where })
 ]);

 return (
 <div className="space-y-6">
 <div>
 <h1 className="text-3xl font-bold text-foreground">Review Moderation</h1>
 <p className="mt-2 text-muted-foreground">Approve or reject customer product reviews.</p>
 </div>

 <div className="flex items-center gap-4 bg-background p-4 border rounded-md shadow-sm">
 <AdminSearchInput placeholder="Search reviews by content, product, or reviewer..." />
 </div>

 <ReviewListClient 
 reviews={reviews.map(r => ({
 ...r,
 rating: Number(r.rating),
 createdAt: r.createdAt.toISOString(),
 updatedAt: r.updatedAt.toISOString(),
 formattedDate: new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(r.createdAt)
 }))} 
 totalCount={totalReviews} 
 />
 </div>
 );
}
