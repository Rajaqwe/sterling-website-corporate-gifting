"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2, MessageCircle, Send, Sparkles, X } from "lucide-react";

type Step = "category" | "quantity" | "branding" | "location" | "contact" | "done";
type ChatMessage = { role: "bot" | "user"; text: string };
type QuoteDraft = {
  category: string;
  quantity: number;
  quantityRange: string;
  brandingRequired: boolean;
  deliveryLocation: string;
};

const categories = [
  "Employee welcome kits",
  "Festive gifting",
  "Awards & recognition",
  "Client gifting",
  "Branded merchandise",
  "Custom gifting",
];

const quantityOptions = [
  { label: "30–50 pieces", value: 30 },
  { label: "50–100 pieces", value: 50 },
  { label: "100–250 pieces", value: 100 },
  { label: "250–500 pieces", value: 250 },
  { label: "500+ pieces", value: 500 },
];

export function QuoteChatWidget({ isPreviewEnvironment = false }: { isPreviewEnvironment?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<Step>("category");
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "bot", text: "Hi there! 👋 I’m Sterling Assist. I’ll help you get a quote for your corporate gifting requirement." },
    { role: "bot", text: "What are you planning gifts for?" },
  ]);
  const [draft, setDraft] = useState<QuoteDraft>({
    category: "",
    quantity: 30,
    quantityRange: "",
    brandingRequired: true,
    deliveryLocation: "",
  });
  const [locationInput, setLocationInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [quoteNumber, setQuoteNumber] = useState("");
  const [isTestSubmission, setIsTestSubmission] = useState(false);
  const transcriptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && transcriptRef.current) {
      transcriptRef.current.scrollTo({
        top: transcriptRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, step, isOpen, error]);

  function addExchange(userText: string, botText: string, nextStep: Step) {
    setMessages((current) => [
      ...current,
      { role: "user", text: userText },
      { role: "bot", text: botText },
    ]);
    setStep(nextStep);
    setError("");
  }

  function chooseCategory(category: string) {
    setDraft((current) => ({ ...current, category }));
    addExchange(category, "Approximately how many pieces do you need?", "quantity");
  }

  function chooseQuantity(option: { label: string; value: number }) {
    setDraft((current) => ({
      ...current,
      quantity: option.value,
      quantityRange: option.label,
    }));
    addExchange(option.label, "Would you like your logo or branding added?", "branding");
  }

  function chooseBranding(value: boolean) {
    setDraft((current) => ({ ...current, brandingRequired: value }));
    addExchange(
      value ? "Yes, add our branding" : "No branding needed",
      "Which city should we plan delivery for? You can skip this if it’s not decided yet.",
      "location",
    );
  }

  function continueLocation(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const location = locationInput.trim();
    setDraft((current) => ({ ...current, deliveryLocation: location }));
    addExchange(
      location || "Not decided yet",
      "Perfect. Please leave your contact details so our team can follow up about your quote.",
      "contact",
    );
  }

  async function submitContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const form = new FormData(event.currentTarget);
    const contact = {
      fullName: String(form.get("fullName") || "").trim(),
      companyName: String(form.get("companyName") || "").trim(),
      workEmail: String(form.get("workEmail") || "").trim(),
      phone: String(form.get("phone") || "").trim(),
    };

    try {
      const response = await fetch("/api/quote-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...contact,
          ...draft,
          pagePath: window.location.pathname,
        }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(result.error || "We couldn’t submit your request. Please try again.");
      }

      const testSubmission = result.mode === "preview-test";
      setIsTestSubmission(testSubmission);
      setQuoteNumber(String(result.quoteNumber || ""));
      setMessages((current) => [
        ...current,
        { role: "user", text: "I’ve shared my contact details." },
        {
          role: "bot",
          text: testSubmission
            ? "Thanks, " + contact.fullName.split(" ")[0] + "! The preview test worked. No request or contact details were saved."
            : "Thanks, " + contact.fullName.split(" ")[0] + "! Your quote request has been received. Our team can now review your requirement.",
        },
      ]);
      setStep("done");
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "We couldn’t submit your request. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  function restartChat() {
    setDraft({
      category: "",
      quantity: 30,
      quantityRange: "",
      brandingRequired: true,
      deliveryLocation: "",
    });
    setLocationInput("");
    setQuoteNumber("");
    setIsTestSubmission(false);
    setError("");
    setStep("category");
    setMessages([
      { role: "bot", text: "Hi there! 👋 I’m Sterling Assist. I’ll help you get a quote for your corporate gifting requirement." },
      { role: "bot", text: "What are you planning gifts for?" },
    ]);
  }

  return (
    <div className="fixed bottom-5 right-[5.25rem] z-[70] sm:right-24">
      {isOpen && (
        <section
          aria-label="Sterling quote assistant"
          className="fixed bottom-[5.75rem] right-3 flex h-[min(690px,calc(100dvh-7.5rem))] w-[min(390px,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-2xl border border-black/10 bg-white text-slate-800 shadow-2xl sm:right-6"
        >
          <header className="flex items-center justify-between gap-3 bg-[#20b9c3] px-4 py-3.5 text-white">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20">
                <Sparkles className="h-5 w-5" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold">Sterling Assist</div>
                <div className="mt-0.5 flex items-center gap-1.5 text-xs text-white/90">
                  <span className="h-2 w-2 rounded-full bg-emerald-200" />
                  Corporate gifting concierge
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              className="rounded-full p-2 transition hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white"
            >
              <X className="h-5 w-5" />
            </button>
          </header>

          <div ref={transcriptRef} className="flex-1 space-y-3 overflow-y-auto bg-[#f7f8fa] px-3.5 py-4">
            <div className="mb-1 text-center text-[11px] text-slate-400">STERLING CORPORATE GIFTING</div>
            {isPreviewEnvironment && (
              <div role="status" className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs leading-5 text-amber-900">
                <strong>Preview test mode:</strong> use dummy details. Submissions are not saved.
              </div>
            )}
            {messages.map((message, index) => (
              <div
                key={index}
                className={"flex " + (message.role === "user" ? "justify-end" : "justify-start")}
              >
                <div
                  className={
                    "max-w-[88%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-[13px] leading-5 " +
                    (message.role === "user"
                      ? "rounded-br-md bg-[#20b9c3] text-white"
                      : "rounded-bl-md border border-slate-100 bg-white text-slate-700 shadow-sm")
                  }
                >
                  {message.text}
                </div>
              </div>
            ))}

            {step === "category" && (
              <div className="flex flex-wrap gap-2 pl-1">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => chooseCategory(category)}
                    className="rounded-full border border-[#20b9c3]/50 bg-white px-3 py-2 text-left text-xs font-medium text-slate-700 transition hover:border-[#20b9c3] hover:bg-[#eafafb] focus:outline-none focus:ring-2 focus:ring-[#20b9c3]"
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}

            {step === "quantity" && (
              <div className="flex flex-wrap gap-2 pl-1">
                {quantityOptions.map((option) => (
                  <button
                    key={option.label}
                    type="button"
                    onClick={() => chooseQuantity(option)}
                    className="rounded-full border border-[#20b9c3]/50 bg-white px-3 py-2 text-xs font-medium text-slate-700 transition hover:bg-[#eafafb] focus:outline-none focus:ring-2 focus:ring-[#20b9c3]"
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}

            {step === "branding" && (
              <div className="flex flex-wrap gap-2 pl-1">
                <button type="button" onClick={() => chooseBranding(true)} className="rounded-full border border-[#20b9c3]/50 bg-white px-4 py-2 text-xs font-medium hover:bg-[#eafafb] focus:outline-none focus:ring-2 focus:ring-[#20b9c3]">Yes, customise</button>
                <button type="button" onClick={() => chooseBranding(false)} className="rounded-full border border-[#20b9c3]/50 bg-white px-4 py-2 text-xs font-medium hover:bg-[#eafafb] focus:outline-none focus:ring-2 focus:ring-[#20b9c3]">No branding</button>
              </div>
            )}

            {step === "location" && (
              <form onSubmit={continueLocation} className="flex gap-2">
                <input
                  value={locationInput}
                  onChange={(event) => setLocationInput(event.target.value)}
                  maxLength={120}
                  placeholder="City or delivery location"
                  aria-label="Delivery city or location"
                  className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#20b9c3] focus:ring-2 focus:ring-[#20b9c3]/20"
                />
                <button type="submit" className="flex shrink-0 items-center gap-1 rounded-xl bg-[#151515] px-3 py-2.5 text-xs font-semibold text-white transition hover:bg-slate-700">
                  Continue <ArrowRight className="h-3.5 w-3.5" />
                </button>
                <button type="button" onClick={() => { setLocationInput(""); setDraft((current) => ({ ...current, deliveryLocation: "" })); addExchange("Skip for now", "Please leave your contact details so our team can follow up about your quote.", "contact"); }} className="sr-only">Skip location</button>
              </form>
            )}

            {step === "contact" && (
              <form onSubmit={submitContact} className="space-y-2.5 rounded-xl border border-slate-100 bg-white p-3 shadow-sm">
                <div>
                  <label htmlFor="sterling-chat-name" className="mb-1 block text-xs font-medium text-slate-600">Your name</label>
                  <input id="sterling-chat-name" name="fullName" autoComplete="name" required maxLength={100} placeholder="Full name" className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#20b9c3] focus:ring-2 focus:ring-[#20b9c3]/20" />
                </div>
                <div>
                  <label htmlFor="sterling-chat-company" className="mb-1 block text-xs font-medium text-slate-600">Company</label>
                  <input id="sterling-chat-company" name="companyName" autoComplete="organization" required maxLength={150} placeholder="Company name" className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#20b9c3] focus:ring-2 focus:ring-[#20b9c3]/20" />
                </div>
                <div>
                  <label htmlFor="sterling-chat-email" className="mb-1 block text-xs font-medium text-slate-600">Work email</label>
                  <input id="sterling-chat-email" name="workEmail" type="email" autoComplete="email" required maxLength={254} placeholder="you@company.com" className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#20b9c3] focus:ring-2 focus:ring-[#20b9c3]/20" />
                </div>
                <div>
                  <label htmlFor="sterling-chat-phone" className="mb-1 block text-xs font-medium text-slate-600">Phone / WhatsApp</label>
                  <input id="sterling-chat-phone" name="phone" type="tel" autoComplete="tel" required minLength={7} maxLength={24} placeholder="+91 ..." className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#20b9c3] focus:ring-2 focus:ring-[#20b9c3]/20" />
                </div>
                {error && <p role="alert" className="text-xs leading-5 text-red-600">{error}</p>}
                <button type="submit" disabled={isSubmitting} className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#151515] px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-wait disabled:opacity-60">
                  {isSubmitting ? "Sending request…" : "Request my quote"}
                  {!isSubmitting && <Send className="h-4 w-4" />}
                </button>
                <p className="text-[10px] leading-4 text-slate-400">{isPreviewEnvironment ? "Preview test mode — use dummy details. Nothing is saved." : "Your details will be used to respond to this quote request."}</p>
              </form>
            )}

            {step === "done" && (
              <div className="space-y-3 rounded-xl border border-emerald-100 bg-white p-4 text-center shadow-sm">
                <CheckCircle2 className="mx-auto h-8 w-8 text-emerald-600" />
                <p className="text-sm font-semibold text-slate-800">{isTestSubmission ? "Preview test successful" : "Quote request submitted"}</p>
                {quoteNumber && <p className="text-xs text-slate-500">Reference: {quoteNumber}</p>}
                <p className="text-xs leading-5 text-slate-500">{isTestSubmission ? "Test mode only: this request and its contact details were not saved anywhere." : "Thanks for considering Sterling. Keep this reference for your records."}</p>
                <button type="button" onClick={restartChat} className="text-xs font-semibold text-teal-700 underline underline-offset-4">Start another request</button>
              </div>
            )}
          </div>
          <footer className="flex items-center justify-center gap-1.5 border-t border-slate-100 bg-white px-3 py-2.5 text-[10px] text-slate-400">
            <MessageCircle className="h-3 w-3" /> Sterling Assist · Quote support
          </footer>
        </section>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-label={isOpen ? "Close Sterling quote assistant" : "Open Sterling quote assistant"}
        aria-expanded={isOpen}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#20b9c3] text-white shadow-xl transition hover:scale-105 hover:bg-[#119ea8] focus:outline-none focus:ring-4 focus:ring-[#20b9c3]/30"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        {!isOpen && <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 rounded-full border-2 border-white bg-[#d0a15a]" />}
      </button>
    </div>
  );
}
