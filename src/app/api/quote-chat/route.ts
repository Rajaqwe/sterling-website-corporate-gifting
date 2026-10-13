import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/client";

export const runtime = "nodejs";

const allowedCategories = new Set([
  "Employee welcome kits",
  "Festive gifting",
  "Awards & recognition",
  "Client gifting",
  "Branded merchandise",
  "Custom gifting",
]);

const quantityRanges: Record<string, number> = {
  "30–50 pieces": 30,
  "50–100 pieces": 50,
  "100–250 pieces": 100,
  "250–500 pieces": 250,
  "500+ pieces": 500,
};

function cleanText(value: unknown, maxLength: number): string {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }

    const input = body as Record<string, unknown>;
    const fullName = cleanText(input.fullName, 100);
    const companyName = cleanText(input.companyName, 150);
    const workEmail = cleanText(input.workEmail, 254).toLowerCase();
    const phone = cleanText(input.phone, 24);
    const category = cleanText(input.category, 80);
    const quantityRange = cleanText(input.quantityRange, 40);
    const deliveryLocation = cleanText(input.deliveryLocation, 120);
    const pagePathRaw = cleanText(input.pagePath, 300);
    const pagePath = pagePathRaw.startsWith("/") && !pagePathRaw.startsWith("//")
      ? pagePathRaw
      : "";

    if (!fullName || !companyName || !workEmail || !phone) {
      return NextResponse.json({ error: "Please complete all contact fields." }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(workEmail)) {
      return NextResponse.json({ error: "Please enter a valid work email." }, { status: 400 });
    }
    if (phone.replace(/\D/g, "").length < 7) {
      return NextResponse.json({ error: "Please enter a valid phone number." }, { status: 400 });
    }
    if (!allowedCategories.has(category) || !(quantityRange in quantityRanges)) {
      return NextResponse.json({ error: "Please select a valid gifting category and quantity." }, { status: 400 });
    }

    const quantity = quantityRanges[quantityRange];
    const brandingRequired = input.brandingRequired === true;

    // Preview/dev submissions are validation-only: never store personal details
    // or touch the production database from a test deployment.
    const isPreviewTest =
      process.env.VERCEL_ENV === "preview" ||
      process.env.NODE_ENV !== "production";

    if (isPreviewTest) {
      const quoteNumber =
        "STQ-TEST-" + randomUUID().slice(0, 8).toUpperCase();
      return NextResponse.json(
        { ok: true, mode: "preview-test", quoteNumber },
        { status: 201 },
      );
    }

    const notes = [
      "Approximate quantity selected: " + quantityRange,
      "Branding requested: " + (brandingRequired ? "Yes" : "No"),
      pagePath ? "Submitted from page: " + pagePath : "",
    ].filter(Boolean).join("\n");

    const created = await prisma.quoteRequest.create({
      data: {
        quoteNumber: "STQ-" + Date.now().toString(36).toUpperCase() + "-" + randomUUID().slice(0, 6).toUpperCase(),
        fullName,
        companyName,
        workEmail,
        phone,
        numberOfRecipients: quantity,
        quantity,
        eventType: category,
        brandingRequired,
        deliveryLocation: deliveryLocation || null,
        additionalRequirements: notes,
      },
      select: { quoteNumber: true },
    });

    return NextResponse.json({ ok: true, quoteNumber: created.quoteNumber }, { status: 201 });
  } catch (error) {
    console.error("Quote chat submission failed:", error);
    return NextResponse.json(
      { error: "We couldn’t submit your request right now. Please try again in a moment." },
      { status: 500 },
    );
  }
}
