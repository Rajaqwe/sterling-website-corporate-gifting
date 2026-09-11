import type { Metadata } from "next";
import { RequestQuoteForm } from "./RequestQuoteForm";

export const metadata: Metadata = {
  title: "Request a Corporate Quote",
  description: "Tell us your gifting requirements — quantity, budget, and branding — and get a custom corporate gifting quote from Sterling.",
};

export default function RequestQuotePage() {
  return <RequestQuoteForm />;
}
