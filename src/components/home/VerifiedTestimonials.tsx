import Link from "next/link";
import { ArrowRight, BadgeCheck, Quote, Star } from "lucide-react";
import { prisma } from "@/lib/prisma/client";
import { Reveal, StaggerContainer } from "@/components/ui/reveal";

function reviewerName(fullName?: string | null) {
  if (!fullName) return "Verified customer";
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 1) return parts[0];
  return `${parts[0]} ${parts[parts.length - 1][0]}.`;
}

async function getVerifiedReviews(limit: number) {
  try {
    return await prisma.review.findMany({
      where: {
        isVerified: true,
        product: { status: "ACTIVE" },
        OR: [{ content: { not: null } }, { title: { not: null } }],
      },
      include: {
        user: { select: { fullName: true } },
        product: { select: { name: true, slug: true } },
      },
      orderBy: { createdAt: "desc" },
      take: limit,
    });
  } catch {
    return [];
  }
}

export async function VerifiedTestimonials({
  limit = 3,
  showHeading = true,
  compact = false,
}: {
  limit?: number;
  showHeading?: boolean;
  compact?: boolean;
}) {
  const reviews = await getVerifiedReviews(limit);

  return (
    <section className={`border-y border-border/60 bg-background ${compact ? "py-12" : "py-20 sm:py-24"}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {showHeading && (
          <Reveal animationType="fade-up">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-accent">
                Verified customer feedback
              </span>
              <h2 className="mt-4 font-serif text-3xl font-bold tracking-[-0.035em] text-primary sm:text-4xl">
                What customers say after delivery.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                Only reviews linked to a completed Sterling purchase are shown in this section.
              </p>
            </div>
          </Reveal>
        )}

        {reviews.length > 0 ? (
          <>
            <StaggerContainer
              staggerDelay={70}
              className={`mx-auto mt-10 grid gap-4 ${reviews.length === 1 ? "max-w-xl" : "md:grid-cols-2 lg:grid-cols-3"}`}
            >
              {reviews.map((review) => (
                <Reveal key={review.id}>
                  <article className="group flex h-full flex-col rounded-2xl border border-border/70 bg-card/80 p-6 shadow-sm transition-[border-color,box-shadow,transform] duration-300 ease-out hover:-translate-y-1 hover:border-accent/40 hover:shadow-xl dark:bg-card/60">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-1" aria-label={`${review.rating} out of 5 stars`}>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-4 w-4 ${star <= review.rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"}`}
                          />
                        ))}
                      </div>
                      <BadgeCheck className="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" aria-label="Verified purchase" />
                    </div>

                    <Quote className="mt-6 h-7 w-7 text-accent/50" aria-hidden="true" />

                    <blockquote className="mt-3 flex-1">
                      {review.title && (
                        <h3 className="text-base font-bold text-foreground">{review.title}</h3>
                      )}
                      {review.content && (
                        <p className="mt-2 text-sm leading-7 text-muted-foreground">
                          “{review.content}”
                        </p>
                      )}
                    </blockquote>

                    <div className="mt-6 border-t border-border/50 pt-4">
                      <p className="text-sm font-bold text-foreground">
                        {reviewerName(review.user?.fullName)}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Verified purchase · {review.product.name}
                      </p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </StaggerContainer>

            {!compact && (
              <div className="mt-9 text-center">
                <Link
                  href="/reviews"
                  className="inline-flex items-center text-sm font-bold text-primary transition-colors hover:text-accent"
                >
                  Read verified customer feedback
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            )}
          </>
        ) : (
          <Reveal animationType="fade-up">
            <div className="mx-auto mt-10 max-w-2xl rounded-2xl border border-dashed border-border bg-card/60 p-8 text-center shadow-sm">
              <BadgeCheck className="mx-auto h-8 w-8 text-emerald-600 dark:text-emerald-400" />
              <h3 className="mt-4 text-lg font-bold text-foreground">
                Verified customer feedback will appear here.
              </h3>
              <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground">
                Sterling publishes purchase-verified reviews only. Customers can submit a review after a delivered order.
              </p>
              <Link
                href="/corporate-gifts"
                className="mt-5 inline-flex items-center text-sm font-bold text-primary transition-colors hover:text-accent"
              >
                Explore the catalogue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
