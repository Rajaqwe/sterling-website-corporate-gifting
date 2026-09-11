import { prisma } from "@/lib/prisma/client";
import { notFound } from "next/navigation";
import { ProductTabs } from "./ProductTabs";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function ProductEditLayout(
 props: { children: React.ReactNode, params: Promise<{ id: string }> }
) {
 const params = await props.params;
 const id = params.id;

 const product = await prisma.product.findUnique({
 where: { id },
 select: { name: true }
 });

 if (!product) {
 notFound();
 }

 return (
 <div className="max-w-5xl mx-auto space-y-6">
 <div className="flex items-center gap-4">
 <Link href="/admin/products" className="text-muted-foreground hover:text-black dark:hover:text-white transition">
 <ArrowLeft className="w-5 h-5" />
 </Link>
 <h1 className="text-3xl font-bold tracking-tight">Edit: {product.name}</h1>
 </div>
 
 <ProductTabs productId={id} />
 
 <div>
 {props.children}
 </div>
 </div>
 );
}
