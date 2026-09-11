import { prisma } from "@/lib/prisma/client";
import { VariantsForm } from "./VariantsForm";
import { notFound } from "next/navigation";

export default async function ProductVariantsPage(props: { params: Promise<{ id: string }> }) {
 const params = await props.params;
 const id = params.id;

 const product = await prisma.product.findUnique({
 where: { id },
 include: {
 variants: {
 orderBy: { sortOrder: 'asc' }
 }
 }
 });

 if (!product) {
 notFound();
 }

 // Serialize to avoid decimal warnings
 const safeVariants = JSON.parse(JSON.stringify(product.variants, (key, value) =>
 typeof value === 'object' && value !== null && value.d !== undefined && value.e !== undefined
 ? value.toString()
 : value
 ));

 return (
 <div className="pb-10">
 <VariantsForm productId={id} initialVariants={safeVariants} />
 </div>
 );
}
