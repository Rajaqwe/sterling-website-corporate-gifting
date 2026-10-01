export interface QuoteShortlistItem {
  id: string;
  slug: string;
  name: string;
  imageUrl?: string;
  category?: string;
  price?: number;
  moq?: number;
  leadTimeDays?: number;
}

export const QUOTE_SHORTLIST_STORAGE_KEY = "sterling-quote-shortlist";
export const QUOTE_SHORTLIST_EVENT = "sterling-quote-shortlist-updated";

export function readQuoteShortlist(): QuoteShortlistItem[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(QUOTE_SHORTLIST_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item): item is QuoteShortlistItem => (
      item &&
      typeof item.id === "string" &&
      typeof item.slug === "string" &&
      typeof item.name === "string"
    ));
  } catch {
    return [];
  }
}

export function writeQuoteShortlist(items: QuoteShortlistItem[]) {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(
    QUOTE_SHORTLIST_STORAGE_KEY,
    JSON.stringify(items.slice(0, 12))
  );
  window.dispatchEvent(new Event(QUOTE_SHORTLIST_EVENT));
}
