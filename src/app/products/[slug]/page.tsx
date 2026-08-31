export const revalidate = 3600;

import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma/client";
import { ProductDetailClient } from "@/components/products/ProductDetailClient";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Layers } from "lucide-react";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Metadata } from "next";
import { serializeData } from "@/lib/utils/serialize";

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const params = await props.params;
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

export async function generateStaticParams() {
  const products = await prisma.product.findMany({
    select: { slug: true },
    where: { status: 'ACTIVE' }
  });
  
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductDetailPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
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
        include: {
          user: {
            select: {
              fullName: true,
              avatarUrl: true
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      }
    }
  });

  if (!product) {
    notFound();
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
  const supabase = await createClient();
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

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.media.find(m => m.isPrimary)?.url || product.media[0]?.url,
    description: product.seoDescription || product.shortDescription,
    sku: product.sku,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'INR',
      availability: product.stockQuantity > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetailClient 
        product={serializeData(mappedProduct)} 
        relatedProducts={serializeData(relatedProducts)} 
        initialIsWishlisted={isInWishlist}
        initialIsLiked={isLiked}
        isLoggedIn={!!user}
      />
    </>
  );
}
