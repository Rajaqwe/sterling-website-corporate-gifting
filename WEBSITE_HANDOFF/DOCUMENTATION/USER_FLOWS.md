# User Flows

**Purchase Flow**:
1. User browses `/corporate-gifts`.
2. Selects a product -> navigates to `/products/[slug]`.
3. Chooses a variant, views bulk pricing, adjusts quantity.
4. Clicks "Add to Cart" (stock warning shown if backordered).
5. Opens Cart Drawer or visits `/cart`.
6. Clicks "Proceed to Checkout".
7. Enters shipping/billing info in `/checkout`.

**Quote Flow**:
1. From PDP or Cart, user clicks "Convert to Quote".
2. Submits requirements (quantities, customizations).
3. Server calculates tier pricing and saves the Quote request.