-- CreateTable
CREATE TABLE "ProjectGalleryItem" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "imageUrl" TEXT NOT NULL,
    "altText" TEXT,
    "projectType" TEXT,
    "clientName" TEXT,
    "quantityLabel" TEXT,
    "deliveryLabel" TEXT,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProjectGalleryItem_pkey" PRIMARY KEY ("id")
);
