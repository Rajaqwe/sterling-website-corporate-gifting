"use server";

import { prisma } from "@/lib/prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requirePermission } from "@/lib/auth/permissions";

const projectSchema = z.object({
  title: z.string().min(2, "Project title is required").max(120),
  description: z.string().max(600).optional().or(z.literal("")),
  imageUrl: z.string().url("Use a public image URL"),
  altText: z.string().max(180).optional().or(z.literal("")),
  projectType: z.string().max(80).optional().or(z.literal("")),
  clientName: z.string().max(120).optional().or(z.literal("")),
  quantityLabel: z.string().max(80).optional().or(z.literal("")),
  deliveryLabel: z.string().max(120).optional().or(z.literal("")),
  isPublished: z.boolean().default(false),
  sortOrder: z.coerce.number().int().min(0).default(0),
});

export type ProjectGalleryPayload = z.infer<typeof projectSchema>;

function cleanOptional(value?: string) {
  const v = value?.trim();
  return v ? v : null;
}

function revalidateGallery() {
  revalidatePath("/");
  revalidatePath("/project-gallery");
  revalidatePath("/admin/project-gallery");
}

export async function createProjectGalleryItem(data: ProjectGalleryPayload) {
  await requirePermission("media.manage");
  const parsed = projectSchema.safeParse(data);
  if (!parsed.success) return { error: "Please check the gallery fields." };

  try {
    await prisma.projectGalleryItem.create({
      data: {
        title: parsed.data.title.trim(),
        description: cleanOptional(parsed.data.description),
        imageUrl: parsed.data.imageUrl.trim(),
        altText: cleanOptional(parsed.data.altText),
        projectType: cleanOptional(parsed.data.projectType),
        clientName: cleanOptional(parsed.data.clientName),
        quantityLabel: cleanOptional(parsed.data.quantityLabel),
        deliveryLabel: cleanOptional(parsed.data.deliveryLabel),
        isPublished: parsed.data.isPublished,
        sortOrder: parsed.data.sortOrder,
      },
    });
    revalidateGallery();
    return { success: true };
  } catch {
    return { error: "Failed to create project gallery item." };
  }
}

export async function updateProjectGalleryItem(id: string, data: ProjectGalleryPayload) {
  await requirePermission("media.manage");
  const parsed = projectSchema.safeParse(data);
  if (!parsed.success) return { error: "Please check the gallery fields." };

  try {
    await prisma.projectGalleryItem.update({
      where: { id },
      data: {
        title: parsed.data.title.trim(),
        description: cleanOptional(parsed.data.description),
        imageUrl: parsed.data.imageUrl.trim(),
        altText: cleanOptional(parsed.data.altText),
        projectType: cleanOptional(parsed.data.projectType),
        clientName: cleanOptional(parsed.data.clientName),
        quantityLabel: cleanOptional(parsed.data.quantityLabel),
        deliveryLabel: cleanOptional(parsed.data.deliveryLabel),
        isPublished: parsed.data.isPublished,
        sortOrder: parsed.data.sortOrder,
      },
    });
    revalidateGallery();
    return { success: true };
  } catch {
    return { error: "Failed to update project gallery item." };
  }
}

export async function deleteProjectGalleryItem(id: string) {
  await requirePermission("media.manage");
  try {
    await prisma.projectGalleryItem.delete({ where: { id } });
    revalidateGallery();
    return { success: true };
  } catch {
    return { error: "Failed to delete project gallery item." };
  }
}
