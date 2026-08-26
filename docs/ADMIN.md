# Sterling - Admin Documentation

This document provides a comprehensive overview of the administrative capabilities, dashboard interface, and management workflows for the Sterling corporate gifting platform. It is intended for platform administrators and operators.

## 1. Admin Dashboard Overview

The Admin Dashboard is the central hub for managing all aspects of the Sterling platform, from catalog management to order processing.

### Access and Authentication
- **URL**: `https://www.sterlinggifting.com/admin` (or `/admin` on your deployed domain).
- **Authentication**: Access is strictly controlled via Supabase Authentication. Only users with specific administrative roles can log in to this area.
- **Roles**:
  - `SUPER_ADMIN`: Has full access to all modules, including user management, system settings, and destructive actions.
  - `ADMIN`: Has standard access to manage products, orders, quotes, and content, but cannot alter system settings or manage other admin users.

## 2. Dashboard Home

Upon logging in, administrators are greeted with the Dashboard Home, designed to provide an at-a-glance view of business health.

### 2.1 KPI Cards
Top-level metrics displaying current performance (with comparisons to the previous period):
- **Total Revenue**: Aggregated sales volume.
- **Total Orders**: Number of confirmed orders.
- **Quote Requests**: Number of pending corporate quote requests.
- **New Customers**: Number of new user registrations/company onboardings.

### 2.2 Charts and Visualizations
- **Revenue Trend**: A line chart showing revenue over the last 7, 30, or 90 days.
- **Order Status Distribution**: A pie or donut chart showing the breakdown of current orders (Pending, Processing, Shipped, etc.).

### 2.3 Actionable Widgets
- **Recent Activity Feed**: A real-time log of important events (new orders, new quotes, user signups).
- **Low Stock Alerts**: Highlights products whose inventory has dropped below the defined threshold.
- **Pending Quotes**: Quick access list of the most recent quote requests requiring attention.
- **Pending Orders**: Quick access list of recent orders that need to be processed.

## 3. Product Management

The product catalog is the core of the application. The system supports detailed product configurations.

### 3.1 Individual Product Creation
Creating a product involves a multi-step wizard to ensure all necessary data is captured:
1. **General**: Title, Description, Short Description, Category selection.
2. **Media**: Image and video uploads (see 3.4).
3. **Pricing**: Base price, MSRP, B2B tiered pricing, tax class.
4. **Inventory**: SKU, barcode, stock quantity, low stock threshold.
5. **Variants**: Creating variations based on attributes (e.g., Size, Color, Material). Each variant can have its own SKU, price, and inventory.
6. **Customization**: Defining allowed branding options (e.g., Screen printing, Laser engraving, Embroidery) and placement areas.
7. **Specifications**: Adding key-value pairs for technical specs (e.g., Weight: 200g, Dimensions: 10x10x5cm).
8. **SEO**: Meta title, meta description, and custom URL slug.
9. **Preview**: Reviewing the product as it will appear on the storefront.
10. **Publish**: Setting the status.

**Product Statuses:**
- `DRAFT`: Being edited, not visible to customers.
- `ACTIVE`: Published and purchasable.
- `OUT_OF_STOCK`: Visible but cannot be purchased (can request quote).
- `ARCHIVED`: Hidden from store, retained for historical order data.

### 3.2 Bulk Product Upload
For large catalogs, products can be imported via CSV.
- **CSV Template Download**: Provides a standardized format.
- **Upload Process**: Upload the CSV along with a ZIP file of associated media.
- **Validation**: The system checks for errors (e.g., duplicate SKUs, missing required fields) before importing.
- **Preview & Import**: Review valid rows and execute the import.
- **Import History**: View logs of past imports and any associated errors.

### 3.3 Product Export
- Export the entire catalog or a filtered subset as a CSV file for reporting or external editing.

### 3.4 Media Management
- **Multi-image upload**: Support for bulk uploading product images.
- **Video upload**: Support for MP4 or external links (YouTube/Vimeo).
- **Drag-and-drop reorder**: Easily change the order of images.
- **Primary Image**: Set the main thumbnail.
- **Alt Text**: Add descriptive text to images for accessibility and SEO.

## 4. Category Management

Categories organize the catalog for navigation.
- **CRUD Operations**: Create, Read, Update, Delete categories.
- **Hierarchy**: Support for subcategories (parent-child relationships) to build a robust navigation tree.
- **Category Media**: Upload banner images or icons for category landing pages.
- **SEO Fields**: Custom meta titles and descriptions for category pages.
- **Reordering**: Drag-and-drop to change the display order in the frontend navigation menu.

## 5. Order Management

Processing standard B2B and direct purchases.

### 5.1 Order Listing
- A comprehensive table of all orders with robust filtering (by date, status, customer, value) and search (by Order ID, Customer Name).

### 5.2 Order Detail View
- Displays customer info, shipping/billing addresses, line items, payment status, and order totals.

### 5.3 Status Updates
Orders progress through a defined lifecycle. Admins can update statuses:
- `PENDING`: Order placed, payment pending.
- `CONFIRMED`: Payment received, awaiting processing.
- `PROCESSING`: Order is being picked from the warehouse.
- `BRANDING`: Items are undergoing custom branding/personalization.
- `PACKED`: Order is boxed and awaiting carrier pickup.
- `SHIPPED`: Handed over to the logistics partner.
- `DELIVERED`: Confirmed received by the customer.

### 5.4 Order Actions
- **Shipment Tracking**: Add tracking numbers and carrier details.
- **Invoice Generation**: Generate and download PDF invoices.
- **Refunds/Cancellations**: Process partial or full refunds (integrates with payment gateway).

## 6. Quote Management

For bulk corporate gifting, customers often request customized quotes rather than checking out directly.

### 6.1 Quote Listing & Detail
- Similar to orders, quotes are listed with filters and have a detailed view showing requested products, quantities, desired customization, and target delivery dates.

### 6.2 Status Workflow
Quotes follow a negotiation lifecycle:
- `NEW`: Customer submitted the request.
- `REVIEWING`: Admin is currently assessing feasibility and pricing.
- `CONTACTED`: Admin has reached out to the customer for clarification.
- `PROPOSAL_SENT`: A formal quote/pricing proposal has been sent via email.
- `NEGOTIATION`: Customer has responded, adjusting terms.
- `APPROVED` / `REJECTED`: Customer decision.
- `COMPLETED`: Quote finalized.

### 6.3 Quote Actions
- **Internal Notes**: Private comments for the sales team.
- **Convert to Order**: Once a quote is `APPROVED`, a single click converts it into an actionable Order, generating an invoice link for the customer.
- **Communication**: Send emails directly from the quote detail page.

## 7. Customer Management

Managing the CRM aspect of the platform.

### 7.1 Customer & Company Lists
- View all registered users. For B2B, users are often associated with a Company profile.

### 7.2 Customer Detail
- Complete 360-degree view of a customer:
  - Personal/Company details.
  - Complete Order history.
  - Complete Quote request history.
  - Saved addresses.

### 7.3 Account Management
- Admins can reset passwords, update contact info, or suspend accounts if necessary.

## 8. Content Management

Manage frontend marketing and informational content without code changes.

- **Homepage Editor**: Customize hero banners, select featured product carousels, and manage promotional sections.
- **Testimonials CRUD**: Add, edit, and approve client testimonials to build trust.
- **FAQ CRUD**: Manage Frequently Asked Questions, organized by Categories (e.g., Shipping, Customization, Returns).
- **Banners CRUD**: Manage promotional banners that appear across the site.
- **Collections CRUD**: Create curated groups of products (e.g., "Diwali Gifts", "Onboarding Kits") for marketing campaigns.
- **Featured Products**: Manually select which products appear in prominent "Featured" blocks.

## 9. Analytics

Built-in reporting to track business performance.

- **Revenue Metrics**: Daily, weekly, monthly, and yearly revenue reports.
- **Order Metrics**: Average Order Value (AOV), order volume trends.
- **Quote Conversion Rate**: Percentage of quotes that successfully convert into orders.
- **Top Products**: Best-selling items by volume and revenue.
- **Top Categories**: Most popular product categories.
- **Customer Growth**: New signups over time.

## 10. Admin Users

*(SUPER_ADMIN only)*
- **User Management**: Invite new administrators via email.
- **Role Assignment**: Assign `ADMIN` or `SUPER_ADMIN` roles.
- **Revoke Access**: Remove admin privileges.

## 11. Audit Log

Security and compliance tracking.
- **Action Tracking**: Every significant action taken in the admin panel (e.g., "User X updated Product Y price", "User Z changed Order 123 status to Shipped") is recorded.
- **Filters**: Search logs by action type, specific admin user, or date range.
- **Export**: Export audit logs for compliance reviews.

## 12. Settings

Global platform configuration.

- **Site Settings**: Store name, contact email, phone number, physical address, and social media links.
- **Email Configuration**: Templates and triggers for automated emails (Welcome, Order Confirmation, Quote Received).
- **Payment Configuration**: Toggle payment methods (Razorpay, Stripe, Bank Transfer), manage API keys (handled securely, usually via env vars but toggles in UI).
- **Shipping Configuration**: Define shipping zones, flat rates, free shipping thresholds, and tax calculation settings.

---
*End of Admin Documentation. Maintained by the Sterling Product Team.*
