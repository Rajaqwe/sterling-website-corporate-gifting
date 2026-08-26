import { PRODUCTS, CATEGORIES } from "@/lib/constants/products";
import {
  CustomizationOption,
  FilterState,
  PriceTier,
  Product,
  QuoteCalculation,
} from "@/types/product";

/**
 * Filter, search, and sort products in a pure immutable pipeline.
 */
export function queryProducts(
  products: Product[] = PRODUCTS,
  filters: Partial<FilterState> = {}
): Product[] {
  const {
    category = null,
    categories = [],
    minPrice = null,
    maxPrice = null,
    maxMoq = null,
    searchQuery = "",
    tags = [],
    sortBy = "featured",
  } = filters;

  const normalizedQuery = searchQuery ? searchQuery.trim().toLowerCase() : "";

  // Combine category and categories
  const targetCategories = new Set<string>();
  if (category && category !== "all") {
    targetCategories.add(category.toLowerCase());
  }
  if (categories && categories.length > 0) {
    categories.forEach((cat) => {
      if (cat && cat !== "all") targetCategories.add(cat.toLowerCase());
    });
  }

  const filtered = products.filter((product) => {
    // 1. Category filter
    if (targetCategories.size > 0) {
      const prodCatSlug = (product.categorySlug || "").toLowerCase();
      const prodCatId = (product.categoryId || "").toLowerCase();
      const prodCatName = (product.category || "").toLowerCase();

      const matches =
        targetCategories.has(prodCatSlug) ||
        targetCategories.has(prodCatId) ||
        targetCategories.has(prodCatName);

      if (!matches) return false;
    }

    // 2. MOQ filter (products with product.moq <= maxMoq match)
    if (maxMoq !== null && maxMoq !== undefined && maxMoq > 0) {
      if (product.moq > maxMoq) return false;
    }

    // 3. Price bounds filter (evaluated against startingPrice / basePrice)
    if (minPrice !== null && minPrice !== undefined && minPrice > 0) {
      const checkPrice = product.startingPrice ?? product.basePrice;
      if (checkPrice < minPrice && (product.basePrice ?? 0) < minPrice) {
        return false;
      }
    }

    if (maxPrice !== null && maxPrice !== undefined && maxPrice > 0) {
      const checkPrice = product.startingPrice ?? product.basePrice;
      if (checkPrice > maxPrice) {
        return false;
      }
    }

    // 4. Tags filter
    if (tags && tags.length > 0) {
      const prodTags = (product.tags || []).map((t) => t.toLowerCase());
      const matchesTag = tags.some((t) => prodTags.includes(t.toLowerCase()));
      if (!matchesTag) return false;
    }

    // 5. Search query matching
    if (normalizedQuery.length > 0) {
      const inTitle = (product.title || product.name || "").toLowerCase().includes(normalizedQuery);
      const inTagline = (product.tagline || product.subtitle || "").toLowerCase().includes(normalizedQuery);
      const inDesc = (product.description || "").toLowerCase().includes(normalizedQuery);
      const inCategory = (product.category || "").toLowerCase().includes(normalizedQuery);
      const inTags = (product.tags || []).some((t) => t.toLowerCase().includes(normalizedQuery));

      const inMaterial =
        (product.specifications?.material || "").toLowerCase().includes(normalizedQuery) ||
        (product.specifications?.materials || []).some((m) => m.toLowerCase().includes(normalizedQuery));

      const inBranding = (product.specifications?.brandingMethods || []).some((b) =>
        b.toLowerCase().includes(normalizedQuery)
      );

      if (!inTitle && !inTagline && !inDesc && !inCategory && !inTags && !inMaterial && !inBranding) {
        return false;
      }
    }

    return true;
  });

  // 6. Sorting
  return filtered.sort((a, b) => {
    const titleA = a.title || a.name || "";
    const titleB = b.title || b.name || "";
    const priceA = a.startingPrice ?? a.basePrice ?? 0;
    const priceB = b.startingPrice ?? b.basePrice ?? 0;

    switch (sortBy) {
      case "price-asc":
        return priceA - priceB;
      case "price-desc":
        return priceB - priceA;
      case "moq-asc":
        return a.moq - b.moq;
      case "moq-desc":
        return b.moq - a.moq;
      case "name-asc":
      case "title":
        return titleA.localeCompare(titleB);
      case "rating-desc":
        return (b.rating ?? 0) - (a.rating ?? 0);
      case "featured":
      default: {
        const featA = a.isFeatured || a.featured ? 1 : 0;
        const featB = b.isFeatured || b.featured ? 1 : 0;
        if (featA !== featB) return featB - featA;
        return titleA.localeCompare(titleB);
      }
    }
  });
}

/**
 * Calculates real-time tiered volume pricing and customization costs.
 */
export function calculateQuotePricing(
  product: Product,
  quantity: number,
  selectedCustomizations: string[] | CustomizationOption[] = []
): QuoteCalculation {
  const isMoqSatisfied = quantity >= product.moq;
  const isBelowMoq = !isMoqSatisfied;

  // Resolve matching price tier
  const tiers = product.priceTiers || [];
  let activeTier: PriceTier = tiers[0] || {
    minQuantity: product.moq,
    maxQuantity: null,
    unitPrice: product.basePrice || product.startingPrice || 0,
    savingsPercent: 0,
  };

  for (const tier of tiers) {
    if (quantity >= tier.minQuantity) {
      if (tier.maxQuantity === null || quantity <= tier.maxQuantity) {
        activeTier = tier;
        break;
      }
    }
  }

  // If quantity is higher than the max of all defined tiers, select highest bracket
  if (tiers.length > 0) {
    const highestTier = tiers[tiers.length - 1];
    if (quantity >= highestTier.minQuantity) {
      activeTier = highestTier;
    }
  }

  const baseUnitPrice = product.basePrice || tiers[0]?.unitPrice || product.startingPrice || 0;
  const tierUnitPrice = activeTier.unitPrice;
  const productSubtotal = tierUnitPrice * quantity;

  // Resolve selected customizations
  const availableCustomizations = product.customizations || product.customizationOptions || [];
  const resolvedCustomizations: CustomizationOption[] = [];

  for (const item of selectedCustomizations) {
    if (typeof item === "string") {
      const match = availableCustomizations.find((c) => c.id === item);
      if (match) resolvedCustomizations.push(match);
    } else if (item && typeof item === "object" && "setupFee" in item) {
      resolvedCustomizations.push(item);
    }
  }

  let customizationSetupTotal = 0;
  let customizationUnitTotal = 0;

  for (const opt of resolvedCustomizations) {
    customizationSetupTotal += opt.setupFee || 0;
    customizationUnitTotal += (opt.unitCost || 0) * quantity;
  }

  const customizationSubtotal = customizationSetupTotal + customizationUnitTotal;
  const estimatedTotal = productSubtotal + customizationSubtotal;
  const effectiveUnitCost = quantity > 0 ? Number((estimatedTotal / quantity).toFixed(2)) : 0;

  // Calculate savings vs base price
  const baseSubtotal = baseUnitPrice * quantity;
  const savingsTotal = Math.max(0, baseSubtotal - productSubtotal);
  const savingsPercent =
    activeTier.savingsPercent ??
    (baseUnitPrice > 0 ? Math.round(((baseUnitPrice - tierUnitPrice) / baseUnitPrice) * 100) : 0);

  return {
    quantity,
    baseUnitPrice,
    tierUnitPrice,
    unitPrice: tierUnitPrice,
    productSubtotal,
    customizationSetupTotal,
    customizationUnitTotal,
    customizationSubtotal,
    setupFeesTotal: customizationSetupTotal,
    estimatedTotal,
    effectiveUnitCost,
    savingsPercent,
    savingsTotal,
    isMoqSatisfied,
    isBelowMoq,
    activeTier,
  };
}

/**
 * Retrieve a single product by its slug or ID.
 */
export function getProductBySlug(slug: string): Product | undefined {
  if (!slug) return undefined;
  const normalized = slug.trim().toLowerCase();
  return PRODUCTS.find(
    (p) => p.slug.toLowerCase() === normalized || p.id.toLowerCase() === normalized
  );
}

/**
 * Get all categories with dynamic product counts.
 */
export function getAllCategories(): {
  id: string;
  name: string;
  slug: string;
  count: number;
  description?: string;
  featuredImage?: string;
}[] {
  return CATEGORIES.map((cat) => {
    const count = PRODUCTS.filter(
      (p) => p.categorySlug === cat.slug || p.categoryId === cat.id
    ).length;
    return {
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
      count,
      description: cat.description,
      featuredImage: cat.featuredImage,
    };
  });
}
