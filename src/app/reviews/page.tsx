import type { Metadata } from "next";
import { VerifiedTestimonials } from "@/components/home/VerifiedTestimonials";

export const metadata: Metadata = {
  title: "Verified Customer Reviews | Sterling Corporate Gifting",
  description: "Read purchase-verified customer feedback from Sterling Corporate Gifting.",
};

export default function ReviewsPage() {
  return (
    <main className="min-h-screen bg-background pt-16">
      <VerifiedTestimonials limit={12} />
    </main>
  );
}
