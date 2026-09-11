import { prisma } from "@/lib/prisma/client";
import { requirePermission } from "@/lib/auth/permissions";
import { ReviewsClient } from "./ReviewsClient";
import { notFound } from "next/navigation";

export default async function ProductReviewsPage(props: { params: Promise<{ id: string }> }) {
  await requirePermission('reviews.read');
  const params = await props.params;
  const id = params.id;

  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      reviews: {
        include: {
          user: {
            select: { id: true, email: true, fullName: true }
          }
        },
        orderBy: { createdAt: 'desc' }
      }
    }
  });

  if (!product) {
    notFound();
  }

  const users = await prisma.user.findMany({
    orderBy: { email: 'asc' },
    select: { id: true, email: true, fullName: true }
  });

  return (
    <div className="pb-10">
      <ReviewsClient productId={id} initialReviews={product.reviews} users={users} />
    </div>
  );
}
