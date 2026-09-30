"use server";

import crypto from "crypto";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma/client";
import { getAuthUser } from "@/lib/auth/server";
import { rateLimit } from "@/lib/security/rate-limit";
import { requirePermission } from "@/lib/auth/permissions";
import { SampleRequestStatus } from "@/generated/prisma";

const sampleSchema = z.object({
  productId: z.string().optional().or(z.literal("")),
  fullName: z.string().trim().min(2).max(120),
  companyName: z.string().trim().min(2).max(160),
  workEmail: z.string().email().max(180),
  phone: z.string().trim().min(10).max(30),
  estimatedQuantity: z.coerce.number().int().min(1).max(100000),
  sampleType: z.enum(["PHYSICAL_SAMPLE", "BRANDED_SAMPLE"]),
  deliveryLocation: z.string().trim().max(200).optional().or(z.literal("")),
  requiredBy: z.string().optional().or(z.literal("")),
  brandingRequired: z.boolean().default(false),
  notes: z.string().trim().max(1200).optional().or(z.literal("")),
});

function clean(value?: string) {
  const v = value?.trim();
  return v ? v : null;
}

export async function createSampleRequest(payload: FormData | Record<string, unknown>) {
  try {
    const auth = await getAuthUser();
    const identifier = auth?.user?.id || (payload instanceof FormData ? String(payload.get("workEmail") || "anonymous") : "anonymous");
    const limitCheck = await rateLimit("sample_" + identifier, 3, 60000);
    if (!limitCheck.success) return { success: false, error: "Too many requests. Please wait a minute before submitting again." };

    const raw: any = payload instanceof FormData ? Object.fromEntries(payload.entries()) : payload;
    if (payload instanceof FormData) raw.brandingRequired = raw.brandingRequired === "on";
    const parsed = sampleSchema.safeParse(raw);
    if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message || "Please check the form details." };

    let productId = clean(parsed.data.productId);
    let productName: string | null = null;
    if (productId) {
      const product = await prisma.product.findUnique({ where: { id: productId }, select: { id: true, name: true, status: true } });
      if (!product || product.status !== "ACTIVE") return { success: false, error: "The selected product is not currently available." };
      productName = product.name;
    }

    const referenceNumber = "SR-" + new Date().getFullYear() + "-" + crypto.randomBytes(4).toString("hex").toUpperCase();
    const request = await prisma.sampleRequest.create({
      data: {
        referenceNumber, userId: auth?.user?.id, productId,
        fullName: parsed.data.fullName, companyName: parsed.data.companyName, workEmail: parsed.data.workEmail, phone: parsed.data.phone,
        estimatedQuantity: parsed.data.estimatedQuantity, sampleType: parsed.data.sampleType,
        deliveryLocation: clean(parsed.data.deliveryLocation), requiredBy: parsed.data.requiredBy ? new Date(parsed.data.requiredBy) : null,
        brandingRequired: parsed.data.brandingRequired, notes: clean(parsed.data.notes),
      },
    });
    revalidatePath("/request-a-sample");
    revalidatePath("/admin/sample-requests");
    return { success: true, referenceNumber: request.referenceNumber, productName };
  } catch (error) {
    console.error("Create sample request error:", error);
    return { success: false, error: "Failed to submit the sample request. Please try again." };
  }
}

export async function updateSampleRequestStatus(id: string, status: SampleRequestStatus, internalNotes?: string) {
  await requirePermission("quotes.manage");
  try {
    await prisma.sampleRequest.update({ where: { id }, data: { status, ...(internalNotes !== undefined ? { internalNotes: clean(internalNotes) } : {}) } });
    revalidatePath("/admin/sample-requests");
    return { success: true };
  } catch {
    return { success: false, error: "Failed to update the sample request." };
  }
}
