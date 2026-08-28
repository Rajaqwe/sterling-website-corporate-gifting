import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/client";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q");

  if (!q || q.length < 2) {
    return NextResponse.json({ results: [] });
  }

  try {
    const products = await prisma.product.findMany({
      where: {
        status: "ACTIVE",
        OR: [
          { name: { contains: q, mode: "insensitive" } },
          { sku: { contains: q, mode: "insensitive" } },
          { category: { name: { contains: q, mode: "insensitive" } } },
        ],
      },
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
    });

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

    return NextResponse.json({ results: formatted });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
