"use client";

import { MessageCircle } from "lucide-react";
import { buildProductWhatsAppMessage, buildWhatsAppUrl } from "@/lib/whatsapp";

type Props = {
  productName?: string;
  productUrl?: string;
  quantity?: number;
  intent?: "bulk enquiry" | "sample request";
  label?: string;
  className?: string;
  compact?: boolean;
};

export function WhatsAppConciergeButton({ productName, productUrl, quantity, intent = "bulk enquiry", label = "Chat on WhatsApp", className = "", compact = false }: Props) {
  const href = productName
    ? buildWhatsAppUrl(buildProductWhatsAppMessage({ productName, productUrl, quantity, intent }))
    : buildWhatsAppUrl("Hi Sterling Prime, I need help with a corporate gifting requirement.");

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      data-track-event={intent === "sample request" ? "whatsapp_sample_enquiry" : "whatsapp_bulk_enquiry"}
      className={
        "inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/15 hover:border-emerald-500/50 dark:text-emerald-300 dark:bg-emerald-500/10 transition-[background-color,border-color,transform] duration-300 ease-out hover:-translate-y-0.5 " +
        (compact ? "h-10 px-3 text-xs font-semibold " : "h-11 px-4 text-sm font-semibold ") + className
      }
    >
      <MessageCircle className={compact ? "h-4 w-4" : "h-4.5 w-4.5"} />
      {label}
    </a>
  );
}

export default WhatsAppConciergeButton;
