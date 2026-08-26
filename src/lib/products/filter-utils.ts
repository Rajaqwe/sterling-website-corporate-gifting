import { prisma } from "@/lib/prisma/client";

export interface ParsedProductFilters {
  q: string;
  minPrice: number | undefined;
  maxPrice: number | undefined;
  minMoq: number | undefined;
  maxMoq: number | undefined;
  categories: string[];
  attributes: Record<string, string[]>;
  rating: number | undefined;
  isDiscounted: boolean | undefined;
  sort: string;
}

export function parseSearchParams(searchParams: Record<string, string | string[] | undefined>): ParsedProductFilters {
  const getSingle = (param: string | string[] | undefined) => Array.isArray(param) ? param[0] : param;
  const getArray = (param: string | string[] | undefined) => {
    if (!param) return [];
    if (Array.isArray(param)) return param;
    return param.split(',').map(s => s.trim());
  };

  const getNumber = (param: string | string[] | undefined) => {
    const val = getSingle(param);
    return val ? parseFloat(val) : undefined;
  };

  const attributes: Record<string, string[]> = {};
  
  // We can treat any key that isn't a standard filter as an attribute filter
  const standardKeys = ['q', 'minPrice', 'maxPrice', 'minMoq', 'maxMoq', 'category', 'rating', 'isDiscounted', 'sort', 'page'];
  Object.keys(searchParams).forEach(key => {
    if (!standardKeys.includes(key)) {
      const vals = getArray(searchParams[key]);
      if (vals.length > 0) {
        attributes[key] = vals;
      }
    }
  });

  return {
    q: getSingle(searchParams.q) || '',
    minPrice: getNumber(searchParams.minPrice),
    maxPrice: getNumber(searchParams.maxPrice),
    minMoq: getNumber(searchParams.minMoq),
    maxMoq: getNumber(searchParams.maxMoq),
    categories: getArray(searchParams.category),
    attributes,
    rating: getNumber(searchParams.rating),
    isDiscounted: getSingle(searchParams.isDiscounted) === 'true' ? true : undefined,
    sort: getSingle(searchParams.sort) || '',
  };
}

export function buildPrismaWhereClause(filters: ParsedProductFilters, baseCategoryId?: string) {
  const where: Record<string, unknown> = { status: 'ACTIVE' };
  const AND: Record<string, unknown>[] = [];

  // Search query
  if (filters.q) {
    AND.push({ name: { contains: filters.q, mode: 'insensitive' } });
  }

  // Price
  if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
    const priceFilter: Record<string, unknown> = {};
    if (filters.minPrice !== undefined) priceFilter.gte = filters.minPrice;
    if (filters.maxPrice !== undefined) priceFilter.lte = filters.maxPrice;
    AND.push({ price: priceFilter });
  }

  // MOQ
  if (filters.minMoq !== undefined || filters.maxMoq !== undefined) {
    const moqFilter: Record<string, unknown> = {};
    if (filters.minMoq !== undefined) moqFilter.gte = filters.minMoq;
    if (filters.maxMoq !== undefined) moqFilter.lte = filters.maxMoq;
    AND.push({ minimumOrderQuantity: moqFilter });
  }

  // Rating
  if (filters.rating !== undefined) {
    AND.push({ rating: { gte: filters.rating } });
  }

  // Discount
  if (filters.isDiscounted) {
    AND.push({ isDiscounted: true });
  }

  // Categories
  if (filters.categories.length > 0) {
    AND.push({ category: { slug: { in: filters.categories } } });
  } else if (baseCategoryId) {
    // If we have a base category (like Gift Collections) and no specific category selected
    // (We could fetch the base category ID in the server component and pass it)
    // AND.push({ categoryId: baseCategoryId });
  }

  // Dynamic Attributes
  if (Object.keys(filters.attributes).length > 0) {
    Object.entries(filters.attributes).forEach(([attrName, values]) => {
      AND.push({
        attributeValues: {
          some: {
            attributeValue: {
              attribute: { name: { equals: attrName, mode: 'insensitive' } },
              value: { in: values }
            }
          }
        }
      });
    });
  }

  if (AND.length > 0) {
    where.AND = AND;
  }

  return where;
}

export function buildPrismaOrderBy(sort: string): any {
  switch (sort) {
    case 'price-asc': return { price: 'asc' };
    case 'price-desc': return { price: 'desc' };
    case 'moq-asc': return { minimumOrderQuantity: 'asc' };
    case 'moq-desc': return { minimumOrderQuantity: 'desc' };
    case 'rating-desc': return { rating: 'desc' };
    case 'title': return { name: 'asc' };
    default: return { createdAt: 'desc' }; // default 'Newest'
  }
}

// Fetch all available filter attributes and their values, plus categories
export async function getAvailableFilters() {
  const [categories, attributes, minMaxResult] = await Promise.all([
    prisma.category.findMany({
      where: { isActive: true },
      select: { id: true, name: true, slug: true, _count: { select: { products: { where: { status: 'ACTIVE' } } } } }
    }),
    prisma.attribute.findMany({
      include: {
        values: {
          select: { id: true, value: true, _count: { select: { products: true } } }
        }
      }
    }),
    prisma.product.aggregate({
      where: { status: 'ACTIVE' },
      _min: { price: true },
      _max: { price: true }
    })
  ]);

  return {
    categories: categories.map(c => ({ ...c, count: c._count.products })),
    attributes: attributes.map(a => ({
      ...a,
      values: a.values.map(v => ({ id: v.id, name: v.value, value: v.value, count: v._count.products }))
    })),
    priceRange: {
      min: minMaxResult._min.price ? Number(minMaxResult._min.price) : 0,
      max: minMaxResult._max.price ? Number(minMaxResult._max.price) : 20000,
    }
  };
}
