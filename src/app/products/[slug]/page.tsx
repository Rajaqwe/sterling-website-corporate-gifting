import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma/client";
import { ProductDetailClient } from "@/components/products/ProductDetailClient";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Layers } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
    include: { category: true, media: true }
  });

  if (!product) {
    return { title: "Product Not Found | Sterling" };
  }

  const primaryImage = product.media.find(m => m.isPrimary)?.url || product.media[0]?.url;

  return {
    title: product.seoTitle || `${product.name} | Sterling Corporate Gifting`,
    description: product.seoDescription || product.shortDescription || `Buy ${product.name} from Sterling's premium corporate gifting collection.`,
    openGraph: {
      title: product.seoTitle || product.name,
      description: product.seoDescription || product.shortDescription || "",
      images: primaryImage ? [primaryImage] : [],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      images: primaryImage ? [primaryImage] : [],
    }
  };
}

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const slug = params.slug;

  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      category: true,
      media: { orderBy: { sortOrder: 'asc' } },
      variants: { orderBy: { sortOrder: 'asc' } },
      bulkPricingTiers: { orderBy: { minQuantity: 'asc' } },
      brandingOptions: {
        include: { brandingOption: true }
      },
      reviews: {
        include: { user: true },
        orderBy: { createdAt: 'desc' }
      }
    }
  });

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-24 min-h-[60vh] flex flex-col items-center justify-center text-center">
        <div className="h-16 w-16 rounded-full bg-secondary flex items-center justify-center mb-4 text-muted-foreground">
          <Layers className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-3xl font-serif font-bold text-primary mb-3">
          Corporate Gift Not Found
        </h1>
        <p className="text-muted-foreground max-w-md mb-8">
          The corporate gift item you requested could not be located in our active catalog.
          It may have been discontinued or updated.
        </p>
        <Link href="/corporate-gifts">
          <Button className="bg-accent text-primary hover:bg-accent/90 gap-2 font-semibold px-6">
            <ArrowLeft className="h-4 w-4" />
            Return to Corporate Catalog
          </Button>
        </Link>
      </div>
    );
  }

  const relatedProducts = await prisma.product.findMany({
    where: {
      categoryId: product.categoryId,
      id: { not: product.id },
      status: 'ACTIVE'
    },
    include: {
      category: true,
      media: true,
    },
    take: 4
  });

  // Get user session to pass wishlist/cart state
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let isInWishlist = false;
  let isLiked = false;
  if (user) {
    const wishlist = await prisma.wishlist.findUnique({
      where: { userId: user.id },
      include: { items: { where: { productId: product.id } } }
    });
    if (wishlist && wishlist.items.length > 0) {
      isInWishlist = true;
    }

    const like = await prisma.productLike.findUnique({
      where: {
        userId_productId: {
          userId: user.id,
          productId: product.id
        }
      }
    });
    if (like) {
      isLiked = true;
    }
  }

  // Map brandingOptions correctly since it's a join table
  const mappedProduct = {
    ...product,
    brandingOptions: product.brandingOptions.map(bo => bo.brandingOption)
  };

  return (
    <ProductDetailClient 
      product={mappedProduct} 
      relatedProducts={relatedProducts} 
      initialIsWishlisted={isInWishlist}
      initialIsLiked={isLiked}
      isLoggedIn={!!user}
    />
  );
}
