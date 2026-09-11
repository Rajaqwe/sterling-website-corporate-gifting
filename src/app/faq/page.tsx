import type { Metadata } from "next";
import { FaqContent } from "./FaqContent";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description: "Answers to common questions about Sterling's corporate gifting: bulk pricing, customisation, branding, delivery, and order timelines.",
};

export default function FaqPage() {
  return <FaqContent />;
}
