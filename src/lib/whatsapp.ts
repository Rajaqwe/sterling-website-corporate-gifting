const DEFAULT_WHATSAPP_NUMBER = "919054935136";

export function getWhatsAppNumber() {
  return (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || DEFAULT_WHATSAPP_NUMBER).replace(/\D/g, "");
}

export function buildWhatsAppUrl(message: string, number = getWhatsAppNumber()) {
  const normalized = number.replace(/\D/g, "");
  return "https://wa.me/" + normalized + "?text=" + encodeURIComponent(message);
}

export function buildProductWhatsAppMessage({ productName, productUrl, quantity, intent = "bulk enquiry" }: { productName: string; productUrl?: string; quantity?: number; intent?: "bulk enquiry" | "sample request" }) {
  const lines = [
    "Hi Sterling Prime, I would like help with a " + intent + ".",
    "Product: " + productName,
    quantity ? "Estimated quantity: " + quantity + " units" : "",
    productUrl ? "Product link: " + productUrl : "",
    "Please share the relevant availability, branding and next-step details.",
  ].filter(Boolean);
  return lines.join("\n");
}
