import type { Metadata } from "next";
import { RequestQuoteForm } from "./RequestQuoteForm";

export const metadata: Metadata = {
  title: "Request a Corporate Quote",
  description: "Tell us your gifting requirements — quantity, budget, and branding — and get a custom corporate gifting quote from Sterling.",
};

export default async function RequestQuotePage({
  searchParams,
}: {
  searchParams: Promise<{
    budgetPerRecipient?: string;
    numberOfRecipients?: string;
    eventType?: string;
    productId?: string;
  }>;
}) {
  const params = await searchParams;

  const toPositiveInt = (value?: string) => {
    const n = Number(value);
    return Number.isFinite(n) && n > 0 ? Math.round(n) : undefined;
  };

  return (
    <RequestQuoteForm
      initialValues={{
        budgetPerRecipient: toPositiveInt(params.budgetPerRecipient),
        numberOfRecipients: toPositiveInt(params.numberOfRecipients),
        eventType: params.eventType || "",
        productId: params.productId || "",
      }}
    />
  );
}
