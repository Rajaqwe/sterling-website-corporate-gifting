export const revalidate = 3600;

import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma/client";
import { ProductDetailClient } from "@/components/products/ProductDetailClient";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Metadata } from "next";
import { serializeData } from "@/lib/utils/serialize";

export async function generateMetadata(
  props: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const params = await props.params;

  try {
    const product = await prisma.product.findUnique({
      where: { slug: params.slug },
      include: { category: true, media: true },
    });

    if (!product) {
      return { title: "Product Not Found | Sterling" };
    }

    const primaryImage =
      product.media.find((m) => m.isPrimary)?.url || product.media[0]?.url;

    return {
      title:
        product.seoTitle ||
        `${product.name} | Sterling Corporate Gifting`,
      description:
        product.seoDescription ||
        product.shortDescription ||
        `Buy ${product.name} from Sterling's premium corporate gifting collection.`,
      alternates: {
        canonical: `/products/${params.slug}`,
      },
      openGraph: {
        title: product.seoTitle || product.name,
        description: product.seoDescription || product.shortDescription || "",
        url: `/products/${params.slug}`,
        images: primaryImage ? [primaryImage] : [],
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: product.name,
        images: primaryImage ? [primaryImage] : [],
      },
    };
  } catch (error) {
    console.error("Product metadata query failed:", error);
    return {
      title: "Corporate Gift | Sterling",
      description: "Explore Sterling's corporate gifting catalogue.",
    };
  }
}

export async function generateStaticParams() {
  try {
    const products = await prisma.product.findMany({
      select: { slug: true },
      where: { status: "ACTIVE" },
    });

    return products.map((product) => ({
      slug: product.slug,
    }));
  } catch (error) {
    console.warn(
      "Skipping product pre-rendering because the database is unavailable during build.",
      error
    );
    return [];
  }
}

export default async function ProductDetailPage(
  props: { params: Promise<{ slug: string }> }
) {
  const params = await props.params;
  const slug = params.slug;

  let product: any = null;

  try {
    product = await prisma.product.findUnique({
      where: { slug },
      include: {
        category: true,
        media: { orderBy: { sortOrder: "asc" } },
        variants: { orderBy: { sortOrder: "asc" } },
        bulkPricingTiers: { orderBy: { minQuantity: "asc" } },
        brandingOptions: {
          include: { brandingOption: true },
        },
        reviews: {
          include: {
            user: {
              select: {
                fullName: true,
                avatarUrl: true,
              },
            },
          },
          orderBy: { createdAt: "desc" },
        },
      },
    });
  } catch (error) {
    console.error("Rich product query failed:", error);

    try {
      product = await prisma.product.findUnique({
        where: { slug },
        include: {
          category: true,
          media: { orderBy: { sortOrder: "asc" } },
        },
      });

      if (product) {
        product = {
          ...product,
          variants: [],
          bulkPricingTiers: [],
          brandingOptions: [],
          reviews: [],
        };
      }
    } catch (fallbackError) {
      console.error("Fallback product query failed:", fallbackError);
    }
  }

  if (!product) {
    notFound();
  }

  let relatedProducts: any[] = [];
  try {
    relatedProducts = await prisma.product.findMany({
      where: {
        categoryId: product.categoryId,
        id: { not: product.id },
        status: "ACTIVE",
      },
      include: {
        category: true,
        media: true,
      },
      take: 4,
    });
  } catch (error) {
    console.error("Related products query failed:", error);
  }

  let user: any = null;
  let isInWishlist = false;
  let isLiked = false;

  try {
    const supabase = await createClient();
    const sessionResult = await supabase.auth.getUser();
    user = sessionResult.data.user;

    if (user) {
      try {
        const wishlist = await prisma.wishlist.findUnique({
          where: { userId: user.id },
          include: {
            items: {
              where: { productId: product.id },
            },
          },
        });
        isInWishlist = !!wishlist?.items.length;
      } catch (error) {
        console.warn(
          "Wishlist state unavailable on product page:",
          error
        );
      }

      try {
        const like = await prisma.productLike.findUnique({
          where: {
            userId_productId: {
              userId: user.id,
              productId: product.id,
            },
          },
        });
        isLiked = !!like;
      } catch (error) {
        console.warn("Like state unavailable on product page:", error);
      }
    }
  } catch (error) {
    console.warn("Auth state unavailable on product page:", error);
  }

  const mappedProduct = {
    ...product,
    brandingOptions: Array.isArray(product.brandingOptions)
      ? product.brandingOptions
          .map((bo: any) => bo.brandingOption || bo)
          .filter(Boolean)
      : [],
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image:
      product.media?.find((m: any) => m.isPrimary)?.url ||
      product.media?.[0]?.url,
    description: product.seoDescription || product.shortDescription,
    sku: product.sku,
    offers: {
      "@type": "Offer",
      price: Number(product.price),
      priceCurrency: "INR",
      availability:
        product.stockQuantity > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
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
