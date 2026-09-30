import { prisma } from "@/lib/prisma/client";
import { requirePermission } from "@/lib/auth/permissions";
import { ProjectGalleryManager } from "./ProjectGalleryManager";

export default async function AdminProjectGalleryPage() {
  await requirePermission("media.manage");

  const items = await prisma.projectGalleryItem.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Project Gallery</h1>
        <p className="mt-2 max-w-3xl text-muted-foreground">
          Add real Sterling project and delivery photos. Keep client details optional and publish only content approved for public display.
        </p>
      </div>
      <ProjectGalleryManager
        initialItems={items.map((item) => ({
          ...item,
          createdAt: item.createdAt.toISOString(),
          updatedAt: item.updatedAt.toISOString(),
        }))}
      />
    </div>
  );
}
