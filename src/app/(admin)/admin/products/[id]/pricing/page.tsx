import { prisma } from "@/lib/prisma/client";
import { PricingForm } from "./PricingForm";
import { notFound } from "next/navigation";

export default async function ProductPricingPage(props: { params: Promise<{ id: string }> }) {
 const params = await props.params;
 const id = params.id;

 const product = await prisma.product.findUnique({
 where: { id },
 include: {
 bulkPricingTiers: {
 orderBy: { minQuantity: 'asc' }
 }
 }
 });

 if (!product) {
 notFound();
 }

 // Serialize to avoid decimal warnings
 const safePricingTiers = JSON.parse(JSON.stringify(product.bulkPricingTiers, (key, value) =>
 typeof value === 'object' && value !== null && value.d !== undefined && value.e !== undefined
 ? value.toString()
 : value
 ));

 return (
 <div className="pb-10">
 <PricingForm productId={id} initialTiers={safePricingTiers} />
 </div>
 );
}
