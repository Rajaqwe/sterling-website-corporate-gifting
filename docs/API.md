# Sterling API Documentation

Welcome to the Sterling API documentation. This API powers the Sterling B2B corporate gifting platform, providing endpoints for public access, authenticated customers, and administrators. The API is built with Next.js App Router (Route Handlers) and follows RESTful principles, returning JSON responses.

## Table of Contents
- [Base Concepts](#base-concepts)
  - [API Response Format](#api-response-format)
  - [Error Format](#error-format)
  - [Pagination Format](#pagination-format)
  - [Authentication](#authentication)
  - [Rate Limiting](#rate-limiting)
  - [Validation](#validation)
  - [Middleware](#middleware)
- [Public API Routes](#public-api-routes)
- [Authenticated Customer API Routes](#authenticated-customer-api-routes)
- [Admin API Routes](#admin-api-routes)
- [Webhook Routes](#webhook-routes)
- [Payment Routes](#payment-routes)

---

## Base Concepts

### API Response Format
All API responses follow a standard envelope format to ensure consistency across the platform.

```typescript
interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: ApiError;
  message?: string;
}
```

**Example Success Response:**
```json
{
  "success": true,
  "data": {
    "id": "123",
    "name": "Premium Notebook"
  },
  "message": "Product retrieved successfully"
}
```

### Error Format
When an error occurs, the `success` flag will be `false`, and the `error` object will be populated.

```typescript
interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any> | z.ZodIssue[];
}
```

**Example Error Response:**
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input provided",
    "details": [
      {
        "field": "email",
        "message": "Must be a valid email address"
      }
    ]
  }
}
```

### Pagination Format
List endpoints that support pagination will return a paginated response format.

```typescript
interface PaginatedResponse<T> {
  success: boolean;
  data: {
    items: T[];
    meta: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    }
  };
}
```

### Authentication
Authentication is handled via Supabase Auth. The API expects either a Bearer token in the `Authorization` header or cookie-based session management for web clients.

- **Public**: No authentication required.
- **Customer**: Requires a valid user session.
- **Admin**: Requires a valid user session with the `role` claim set to `admin`.
- **Super Admin**: Requires a valid user session with the `role` claim set to `super_admin`.

### Rate Limiting
Public and sensitive endpoints are rate-limited using a sliding window approach (e.g., via Upstash Redis).
- Standard rate limit: 100 requests per minute per IP.
- Quote/Contact submissions: 5 requests per minute per IP.
When a limit is exceeded, the API returns a `429 Too Many Requests` status code.

### Validation
All incoming requests (params, query strings, and body) are validated using [Zod](https://zod.dev/). Validation errors immediately return a `400 Bad Request` with `VALIDATION_ERROR` code.

### Middleware
Next.js Edge Middleware is utilized to:
1. Intercept requests and perform rate limiting.
2. Verify session cookies/tokens for protected routes.
3. Inject the user context into request headers for downstream handlers.
4. Enforce role-based access control (RBAC).

---

## Public API Routes

### Products

#### `GET /api/products`
List products with pagination, filtering, and sorting.

- **Auth:** Public
- **Query Params:**
  - `page` (number, default: 1)
  - `limit` (number, default: 20)
  - `category` (string, optional)
  - `search` (string, optional)
  - `minPrice` (number, optional)
  - `maxPrice` (number, optional)
  - `moq` (number, optional)
  - `branding` (string[], optional)
  - `status` (string, default: 'active')
  - `sort` (string: 'price_asc' | 'price_desc' | 'newest', default: 'newest')
  - `tags` (string[], optional)
- **Response:** `PaginatedResponse<Product>`
- **Error Codes:** 400 (Bad Request)

#### `GET /api/products/[slug]`
Get a specific product by its slug.

- **Auth:** Public
- **Response:** `ApiResponse<Product>`
- **Error Codes:** 404 (Not Found)

#### `GET /api/products/featured`
Retrieve a list of featured products.

- **Auth:** Public
- **Response:** `ApiResponse<Product[]>`

#### `GET /api/products/search`
Perform full-text search on products.

- **Auth:** Public
- **Query Params:** `q` (string, required)
- **Response:** `ApiResponse<Product[]>`

### Categories

#### `GET /api/categories`
List all active categories (nested structure).

- **Auth:** Public
- **Response:** `ApiResponse<Category[]>`

#### `GET /api/categories/[slug]`
Get a category and its associated products.

- **Auth:** Public
- **Response:** `ApiResponse<{ category: Category, products: Product[] }>`

### Collections

#### `GET /api/collections`
List all active collections.

- **Auth:** Public
- **Response:** `ApiResponse<Collection[]>`

#### `GET /api/collections/[slug]`
Get a specific collection and its associated products.

- **Auth:** Public
- **Response:** `ApiResponse<{ collection: Collection, products: Product[] }>`

### Quotes

#### `POST /api/quotes`
Submit a new quote request from a guest user.

- **Auth:** Public
- **Rate Limit:** 5 requests / minute
- **Request Body:**
  ```typescript
  interface CreateQuoteRequest {
    name: string;
    email: string;
    company: string;
    phone?: string;
    items: Array<{ productId: string; quantity: number }>;
    message?: string;
  }
  ```
- **Response:** `ApiResponse<Quote>`

### Contact

#### `POST /api/contact`
Submit a contact form inquiry.

- **Auth:** Public
- **Rate Limit:** 5 requests / minute
- **Request Body:**
  ```typescript
  interface ContactRequest {
    name: string;
    email: string;
    subject: string;
    message: string;
  }
  ```
- **Response:** `ApiResponse<void>`

### FAQ

#### `GET /api/faqs`
Get active FAQs grouped by category.

- **Auth:** Public
- **Response:** `ApiResponse<FaqCategory[]>`

### Content

#### `GET /api/content/homepage`
Get structured content for the homepage sections.

- **Auth:** Public
- **Response:** `ApiResponse<HomepageData>`

#### `GET /api/content/banners`
Get active promotional banners.

- **Auth:** Public
- **Response:** `ApiResponse<Banner[]>`

#### `GET /api/content/testimonials`
Get active testimonials.

- **Auth:** Public
- **Response:** `ApiResponse<Testimonial[]>`

---

## Authenticated Customer API Routes (require auth)

### Profile

#### `GET /api/me`
Retrieve the current authenticated user's profile.

- **Auth:** Customer
- **Response:** `ApiResponse<UserProfile>`

#### `PATCH /api/me`
Update user profile information.

- **Auth:** Customer
- **Request Body:**
  ```typescript
  interface UpdateProfileRequest {
    firstName?: string;
    lastName?: string;
    phone?: string;
  }
  ```
- **Response:** `ApiResponse<UserProfile>`

#### `GET /api/me/company`
Get the user's company details.

- **Auth:** Customer
- **Response:** `ApiResponse<Company>`

#### `PATCH /api/me/company`
Update user's company details.

- **Auth:** Customer
- **Request Body:**
  ```typescript
  interface UpdateCompanyRequest {
    name?: string;
    gstNumber?: string;
    industry?: string;
    website?: string;
  }
  ```
- **Response:** `ApiResponse<Company>`

### Addresses

#### `GET /api/addresses`
List all addresses saved by the user.

- **Auth:** Customer
- **Response:** `ApiResponse<Address[]>`

#### `POST /api/addresses`
Create a new address.

- **Auth:** Customer
- **Request Body:**
  ```typescript
  interface CreateAddressRequest {
    label: string;
    line1: string;
    line2?: string;
    city: string;
    state: string;
    pincode: string;
    isDefault?: boolean;
  }
  ```
- **Response:** `ApiResponse<Address>`

#### `PATCH /api/addresses/[id]`
Update an existing address.

- **Auth:** Customer
- **Response:** `ApiResponse<Address>`

#### `DELETE /api/addresses/[id]`
Delete an address.

- **Auth:** Customer
- **Response:** `ApiResponse<void>`

### Quotes (authenticated)

#### `GET /api/me/quotes`
List quotes submitted by the user.

- **Auth:** Customer
- **Response:** `PaginatedResponse<Quote>`

#### `GET /api/me/quotes/[id]`
Get detailed information for a specific quote.

- **Auth:** Customer
- **Response:** `ApiResponse<Quote>`

#### `POST /api/me/quotes/[id]/messages`
Add a message to an ongoing quote negotiation.

- **Auth:** Customer
- **Request Body:**
  ```typescript
  interface AddQuoteMessageRequest {
    content: string;
  }
  ```
- **Response:** `ApiResponse<QuoteMessage>`

### Orders

#### `GET /api/me/orders`
List user's orders.

- **Auth:** Customer
- **Response:** `PaginatedResponse<Order>`

#### `GET /api/me/orders/[id]`
Get detailed order information.

- **Auth:** Customer
- **Response:** `ApiResponse<Order>`

#### `POST /api/orders`
Create a new order (from cart or approved quote).

- **Auth:** Customer
- **Request Body:**
  ```typescript
  interface CreateOrderRequest {
    source: 'cart' | 'quote';
    sourceId?: string;
    billingAddressId: string;
    shippingAddressId: string;
    paymentMethod: 'razorpay' | 'stripe' | 'invoice';
  }
  ```
- **Response:** `ApiResponse<Order>`

### Wishlist

#### `GET /api/wishlist`
Get user's wishlist.

- **Auth:** Customer
- **Response:** `ApiResponse<WishlistItem[]>`

#### `POST /api/wishlist`
Add an item to wishlist.

- **Auth:** Customer
- **Request Body:** `{ productId: string }`
- **Response:** `ApiResponse<WishlistItem>`

#### `DELETE /api/wishlist/[productId]`
Remove an item from the wishlist.

- **Auth:** Customer
- **Response:** `ApiResponse<void>`

### Cart

#### `GET /api/cart`
Retrieve the current user's shopping cart.

- **Auth:** Customer
- **Response:** `ApiResponse<Cart>`

#### `POST /api/cart`
Add an item to the cart.

- **Auth:** Customer
- **Request Body:**
  ```typescript
  interface AddToCartRequest {
    productId: string;
    quantity: number;
    brandingOptions?: any;
  }
  ```
- **Response:** `ApiResponse<Cart>`

#### `PATCH /api/cart/[itemId]`
Update quantity or options for a cart item.

- **Auth:** Customer
- **Request Body:** `{ quantity: number }`
- **Response:** `ApiResponse<Cart>`

#### `DELETE /api/cart/[itemId]`
Remove an item from the cart.

- **Auth:** Customer
- **Response:** `ApiResponse<Cart>`

### Invoices

#### `GET /api/me/invoices`
List user invoices.

- **Auth:** Customer
- **Response:** `PaginatedResponse<Invoice>`

#### `GET /api/me/invoices/[id]/download`
Download an invoice as PDF.

- **Auth:** Customer
- **Response:** Binary PDF stream (application/pdf)

---

## Admin API Routes (require admin auth)

### Dashboard

#### `GET /api/admin/analytics`
Retrieve dashboard KPI metrics and analytics data.

- **Auth:** Admin
- **Response:** `ApiResponse<DashboardAnalytics>`

#### `GET /api/admin/activity`
Retrieve recent activity logs (new orders, quotes, signups).

- **Auth:** Admin
- **Response:** `ApiResponse<ActivityLog[]>`

### Products

#### `GET /api/admin/products`
List all products with advanced admin filtering.

- **Auth:** Admin
- **Response:** `PaginatedResponse<AdminProduct>`

#### `POST /api/admin/products`
Create a new product.

- **Auth:** Admin
- **Request Body:** `CreateProductDto`
- **Response:** `ApiResponse<Product>`

#### `GET /api/admin/products/[id]`
Get product details (admin view).

- **Auth:** Admin
- **Response:** `ApiResponse<AdminProduct>`

#### `PATCH /api/admin/products/[id]`
Update an existing product.

- **Auth:** Admin
- **Request Body:** `UpdateProductDto`
- **Response:** `ApiResponse<Product>`

#### `DELETE /api/admin/products/[id]`
Archive a product (soft delete).

- **Auth:** Admin
- **Response:** `ApiResponse<void>`

#### `POST /api/admin/products/[id]/duplicate`
Duplicate an existing product.

- **Auth:** Admin
- **Response:** `ApiResponse<Product>`

#### `POST /api/admin/products/[id]/media`
Upload media for a product.

- **Auth:** Admin
- **Request Body:** `FormData` (multipart/form-data)
- **Response:** `ApiResponse<ProductMedia>`

#### `DELETE /api/admin/products/[id]/media/[mediaId]`
Delete a specific media item.

- **Auth:** Admin
- **Response:** `ApiResponse<void>`

#### `PATCH /api/admin/products/[id]/media/reorder`
Reorder media items.

- **Auth:** Admin
- **Request Body:** `{ mediaIds: string[] }`
- **Response:** `ApiResponse<void>`

#### `POST /api/admin/products/bulk-upload`
Bulk upload products via CSV.

- **Auth:** Admin
- **Request Body:** `FormData` containing CSV file
- **Response:** `ApiResponse<BulkImportResult>`

#### `GET /api/admin/products/export`
Export products to CSV.

- **Auth:** Admin
- **Response:** CSV string

#### `GET /api/admin/products/template`
Download CSV template for bulk import.

- **Auth:** Admin
- **Response:** CSV string

### Categories

#### `GET /api/admin/categories`
List all categories.

- **Auth:** Admin
- **Response:** `ApiResponse<Category[]>`

#### `POST /api/admin/categories`
Create a category.

- **Auth:** Admin
- **Request Body:** `CreateCategoryDto`
- **Response:** `ApiResponse<Category>`

#### `PATCH /api/admin/categories/[id]`
Update a category.

- **Auth:** Admin
- **Request Body:** `UpdateCategoryDto`
- **Response:** `ApiResponse<Category>`

#### `DELETE /api/admin/categories/[id]`
Archive a category.

- **Auth:** Admin
- **Response:** `ApiResponse<void>`

#### `PATCH /api/admin/categories/reorder`
Reorder categories structure.

- **Auth:** Admin
- **Request Body:** `{ tree: CategoryTreeDto[] }`
- **Response:** `ApiResponse<void>`

### Orders

#### `GET /api/admin/orders`
List all orders.

- **Auth:** Admin
- **Response:** `PaginatedResponse<Order>`

#### `GET /api/admin/orders/[id]`
Get detailed order information.

- **Auth:** Admin
- **Response:** `ApiResponse<Order>`

#### `PATCH /api/admin/orders/[id]`
Update order status (e.g., Processing, Shipped).

- **Auth:** Admin
- **Request Body:** `{ status: OrderStatus }`
- **Response:** `ApiResponse<Order>`

#### `POST /api/admin/orders/[id]/shipment`
Add a shipment record (tracking info).

- **Auth:** Admin
- **Request Body:** `CreateShipmentDto`
- **Response:** `ApiResponse<Shipment>`

#### `PATCH /api/admin/orders/[id]/shipment`
Update shipment status.

- **Auth:** Admin
- **Request Body:** `{ trackingStatus: string }`
- **Response:** `ApiResponse<Shipment>`

#### `POST /api/admin/orders/[id]/invoice`
Generate an invoice for the order.

- **Auth:** Admin
- **Response:** `ApiResponse<Invoice>`

### Quotes

#### `GET /api/admin/quotes`
List all quotes.

- **Auth:** Admin
- **Response:** `PaginatedResponse<Quote>`

#### `GET /api/admin/quotes/[id]`
Get quote detail.

- **Auth:** Admin
- **Response:** `ApiResponse<Quote>`

#### `PATCH /api/admin/quotes/[id]`
Update quote status (e.g., Pending, Responded, Approved).

- **Auth:** Admin
- **Request Body:** `{ status: QuoteStatus }`
- **Response:** `ApiResponse<Quote>`

#### `POST /api/admin/quotes/[id]/items`
Add or update an item in a quote (for negotiation).

- **Auth:** Admin
- **Request Body:** `QuoteItemDto`
- **Response:** `ApiResponse<QuoteItem>`

#### `POST /api/admin/quotes/[id]/convert`
Convert an approved quote directly to an order.

- **Auth:** Admin
- **Response:** `ApiResponse<Order>`

#### `POST /api/admin/quotes/[id]/messages`
Add a message to the customer on a quote.

- **Auth:** Admin
- **Request Body:** `{ content: string }`
- **Response:** `ApiResponse<QuoteMessage>`

### Customers

#### `GET /api/admin/customers`
List all registered customers.

- **Auth:** Admin
- **Response:** `PaginatedResponse<Customer>`

#### `GET /api/admin/customers/[id]`
Get detailed customer profile, including order history.

- **Auth:** Admin
- **Response:** `ApiResponse<Customer>`

#### `PATCH /api/admin/customers/[id]`
Update customer details or status (e.g., block user).

- **Auth:** Admin
- **Request Body:** `UpdateCustomerDto`
- **Response:** `ApiResponse<Customer>`

### Companies

#### `GET /api/admin/companies`
List registered companies.

- **Auth:** Admin
- **Response:** `PaginatedResponse<Company>`

#### `GET /api/admin/companies/[id]`
Company detailed view.

- **Auth:** Admin
- **Response:** `ApiResponse<Company>`

### Content Management

#### `GET / PATCH /api/admin/content/homepage`
Manage dynamic homepage sections.

- **Auth:** Admin
- **Response:** `ApiResponse<HomepageData>`

#### `CRUD /api/admin/content/testimonials`
Manage testimonials (GET list, POST create, PATCH update, DELETE).

- **Auth:** Admin

#### `CRUD /api/admin/content/faqs`
Manage FAQs (GET list, POST create, PATCH update, DELETE).

- **Auth:** Admin

#### `CRUD /api/admin/content/banners`
Manage promotional banners (GET list, POST create, PATCH update, DELETE).

- **Auth:** Admin

#### `CRUD /api/admin/content/collections`
Manage product collections (GET list, POST create, PATCH update, DELETE).

- **Auth:** Admin

### Admin Users

#### `GET /api/admin/users`
List internal admin users.

- **Auth:** Super Admin
- **Response:** `ApiResponse<AdminUser[]>`

#### `POST /api/admin/users`
Create a new admin user.

- **Auth:** Super Admin
- **Request Body:** `CreateAdminDto`
- **Response:** `ApiResponse<AdminUser>`

#### `PATCH /api/admin/users/[id]`
Update admin user roles/status.

- **Auth:** Super Admin
- **Response:** `ApiResponse<AdminUser>`

### Audit Log

#### `GET /api/admin/audit-log`
View system audit logs for admin actions.

- **Auth:** Super Admin
- **Response:** `PaginatedResponse<AuditLog>`

### Import History

#### `GET /api/admin/imports`
List history of bulk imports.

- **Auth:** Admin
- **Response:** `PaginatedResponse<ImportJob>`

#### `GET /api/admin/imports/[id]`
View details and errors for a specific import job.

- **Auth:** Admin
- **Response:** `ApiResponse<ImportJobDetail>`

---

## Webhook Routes

#### `POST /api/webhooks/razorpay`
Handle Razorpay payment lifecycle events.

- **Auth:** Validated via Razorpay Webhook Signature
- **Method:** POST
- **Response:** 200 OK (no JSON payload typically needed)

#### `POST /api/webhooks/stripe`
Handle Stripe payment lifecycle events.

- **Auth:** Validated via Stripe Signature header
- **Method:** POST
- **Response:** 200 OK

---

## Payment Routes

#### `POST /api/payments/create-order`
Create an order representation in the payment gateway.

- **Auth:** Customer
- **Request Body:**
  ```typescript
  interface CreatePaymentOrderRequest {
    orderId: string;
    gateway: 'razorpay' | 'stripe';
  }
  ```
- **Response:** `ApiResponse<PaymentOrderResponse>`

#### `POST /api/payments/verify`
Verify a payment post-checkout.

- **Auth:** Customer
- **Request Body:**
  ```typescript
  interface VerifyPaymentRequest {
    gateway: 'razorpay' | 'stripe';
    paymentId: string;
    orderId: string;
    signature: string;
  }
  ```
- **Response:** `ApiResponse<{ verified: boolean }>`
