import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/client";
import { parseSearchParams, buildPrismaWhereClause } from "@/lib/products/filter-utils";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q");

  if (!q || q.length < 2) {
    return NextResponse.json({ products: [], categories: [] });
  }

  try {
    const [products, categories] = await Promise.all([
      prisma.product.findMany({
      where: buildPrismaWhereClause(parseSearchParams({ q })),
      select: {
        id: true,
        name: true,
        sku: true,
        slug: true,
        price: true,
        media: true,
        category: { select: { name: true } },
      },
        take: 5,
      }),
      prisma.category.findMany({
        where: { isActive: true, name: { contains: q, mode: "insensitive" } },
        select: { id: true, name: true, slug: true },
        take: 4,
      }),
    ]);

    // Handle stringified media
    const formatted = products.map((p) => {
      let firstImage = "/placeholder-product.jpg";
      if (p.media && typeof p.media === 'string') {
        try {
          const parsed = JSON.parse(p.media as string);
          firstImage = parsed[0]?.url || firstImage;
        } catch {
          // ignore parsing error
        }
      } else if (Array.isArray(p.media) && p.media.length > 0 && typeof p.media[0] === 'object' && p.media[0] !== null && 'url' in p.media[0]) {
        firstImage = (p.media[0] as any).url;
      }
      return {
        id: p.id,
        name: p.name,
        slug: p.slug,
        price: Number(p.price),
        image: firstImage,
        category: p.category?.name,
      };
    });

    return NextResponse.json({ products: formatted, categories });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
