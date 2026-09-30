CREATE TABLE "SampleRequest" (
  "id" TEXT NOT NULL,
  "referenceNumber" TEXT NOT NULL,
  "userId" TEXT,
  "productId" TEXT,
  "fullName" TEXT NOT NULL,
  "companyName" TEXT NOT NULL,
  "workEmail" TEXT NOT NULL,
  "phone" TEXT NOT NULL,
  "estimatedQuantity" INTEGER NOT NULL,
  "sampleType" TEXT NOT NULL DEFAULT 'PHYSICAL_SAMPLE',
  "deliveryLocation" TEXT,
  "requiredBy" TIMESTAMP(3),
  "brandingRequired" BOOLEAN NOT NULL DEFAULT false,
  "notes" TEXT,
  "status" TEXT NOT NULL DEFAULT 'NEW',
  "internalNotes" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "SampleRequest_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "SampleRequest_referenceNumber_key" ON "SampleRequest"("referenceNumber");
CREATE INDEX "SampleRequest_status_createdAt_idx" ON "SampleRequest"("status", "createdAt");
CREATE INDEX "SampleRequest_productId_idx" ON "SampleRequest"("productId");
ALTER TABLE "SampleRequest" ADD CONSTRAINT "SampleRequest_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "SampleRequest" ADD CONSTRAINT "SampleRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
