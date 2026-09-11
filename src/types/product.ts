/**
 * Sterling B2B Corporate Gifting Platform - Product Domain Types
 */

export type CustomizationType =
  | 'laser_engraving'
  | 'silk_screen'
  | 'debossing'
  | 'embroidery'
  | 'uv_full_color'
  | 'custom_sleeve'
  | 'foil_stamping'
  | 'logo_print'
  | 'custom_packaging';

export interface PriceTier {
  minQuantity: number;
  maxQuantity: number | null;
  unitPrice: number;
  savingsPercent?: number;
}

export type PricingOpportunity = {
  currentTier: PriceTier | null;
  nextTier: PriceTier | null;
  unitsToNextTier: number | null;
  currentUnitPrice: number;
  nextUnitPrice: number | null;
  incrementalSavingsPerUnit: number | null;
  incrementalSavingsTotal: number | null;
};

export interface CustomizationOption {
  id: string;
  name: string;
  type: CustomizationType;
  description: string;
  setupFee: number;
  unitCost: number;
  placementOptions?: string[];
  isDefault?: boolean;
  leadTimeDays?: number;
}

export interface ProductSpecification {
  material?: string;
  materials?: string[];
  dimensions?: string;
  weight?: string;
  imprintArea?: string;
  productionTimeDays?: number;
  turnaroundTime?: string;
  packaging?: string;
  originCountry?: string;
  countryOfOrigin?: string;
  ecoFriendly?: boolean;
  compliance?: string[];
  brandingMethods?: string[];
  customKeyValues?: Record<string, string>;
}

export interface ProductVariant {
  id: string;
  name: string;
  sku: string;
  colorHex?: string;
  colorName?: string;
  image?: string;
  inStock: boolean;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description?: string;
  itemCount?: number;
  featuredImage?: string;
  icon?: string;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  name?: string;
  subtitle?: string;
  tagline?: string;
  description: string;
  category: string;
  categoryId?: string;
  categorySlug: string;
  moq: number;
  startingPrice: number; // lowest tier bulk unit price or starting price at MOQ
  basePrice: number;     // single unit / MOQ tier unit price
  lowestPrice?: number;  // lowest bulk tier price
  currency: string;
  images: string[];
  featuredImage?: string;
  priceTiers: PriceTier[];
  customizations: CustomizationOption[];
  customizationOptions?: CustomizationOption[];
  specifications: ProductSpecification;
  variants?: ProductVariant[];
  tags: string[];
  badge?: 'Bestseller' | 'Eco Choice' | 'Executive' | 'Quick Ship' | 'New' | 'Popular' | 'Premium' | string;
  rating?: number;
  reviewCount?: number;
  leadTime?: string;
  isFeatured?: boolean;
  featured?: boolean;
  isBestSeller?: boolean;
  isEcoFriendly?: boolean;
}

export interface FilterState {
  category: string | null;
  categories?: string[];
  minPrice: number | null;
  maxPrice: number | null;
  maxMoq: number | null;
  searchQuery: string;
  tags?: string[];
  sortBy: 'price-asc' | 'price-desc' | 'moq-asc' | 'moq-desc' | 'featured' | 'title' | 'rating-desc' | 'name-asc';
}

export interface QuoteCalculation {
  quantity: number;
  baseUnitPrice: number;
  tierUnitPrice: number;
  unitPrice: number;
  productSubtotal: number;
  customizationSetupTotal: number;
  customizationUnitTotal: number;
  customizationSubtotal: number;
  setupFeesTotal: number;
  estimatedTotal: number;
  effectiveUnitCost: number;
  savingsPercent: number;
  savingsTotal: number;
  isMoqSatisfied: boolean;
  isBelowMoq: boolean;
  activeTier?: PriceTier;
  opportunity?: PricingOpportunity;
}

export interface CustomizationConfiguration {
  customizationId: string;
  placement?: string;
}

export interface ProductConfiguration {
  quantity: number;
  variantId: string | null;
  customizations: CustomizationConfiguration[];
  artworkAssetIds: string[];
}

export interface QuoteRequestCustomization {
  optionId: string;
  optionName: string;
  placement?: string;
  notes?: string;
  setupFee?: number;
  unitCost?: number;
}

export interface QuoteRequest {
  productId: string;
  productSlug: string;
  productName: string;
  variantId?: string;
  variantName?: string;
  quantity: number;
  unitPrice: number;
  selectedCustomizations: QuoteRequestCustomization[];
  setupFeeTotal: number;
  estimatedTotal: number;
  customerInfo: {
    fullName: string;
    email: string;
    companyName: string;
    phone?: string;
    deliveryDate?: string;
    shippingZip?: string;
    notes?: string;
  };
  submittedAt?: string;
  status: 'draft' | 'submitted' | 'under_review' | 'quoted';
}
