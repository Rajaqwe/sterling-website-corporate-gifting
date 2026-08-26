# Testing Strategy & Documentation

This document outlines the comprehensive testing strategy, tools, conventions, and implementation details for the **Sterling** platform—a premium B2B corporate gifting solution. Ensuring the reliability, performance, and correctness of our application is paramount to delivering a seamless experience to our enterprise clients.

---

## 1. Testing Stack

Our testing ecosystem is built on modern, fast, and robust tools designed for Next.js and React applications.

- **Vitest**: Chosen for unit and integration testing due to its exceptional speed, native ESM support, and seamless integration with our Vite/Next.js tooling. It acts as a drop-in replacement for Jest but with superior performance.
- **Playwright**: The framework of choice for End-to-End (E2E) testing. It provides cross-browser support (Chromium, Firefox, WebKit), auto-waiting, parallel execution, and powerful tracing capabilities for debugging complex UI flows.
- **React Testing Library (RTL)**: Used in conjunction with Vitest for component testing. It enforces testing applications the way users interact with them, focusing on behavior and accessibility rather than implementation details.
- **MSW (Mock Service Worker)**: Employed for API mocking. It intercepts network requests at the service worker level, allowing us to test our frontend completely independently of the backend without polluting our code with mock API calls.
- **Faker.js**: Used for generating realistic, randomized test data for our unit tests, API mocks, and database seeding.

---

## 2. Test Directory Structure

We maintain a strict separation of test types to ensure our test suites are organized, easy to run in isolation, and intuitive to navigate.

```text
tests/
├── unit/                       # Fast, isolated tests for individual functions/components
│   ├── services/               # Business logic and service layer tests
│   ├── utils/                  # Utility function tests
│   ├── hooks/                  # Custom React hooks tests
│   └── components/             # Isolated UI component tests
├── integration/                # Tests that verify components/systems working together
│   ├── api/                    # API route handler tests
│   ├── database/               # Database queries, transactions, and Prisma interactions
│   └── auth/                   # Authentication and authorization flows
└── e2e/                        # End-to-end user flows testing the entire stack
    ├── public/                 # Public-facing pages (Home, Catalog, Policies)
    ├── auth/                   # Registration, Login, Password Reset
    ├── products/               # Product discovery, filtering, viewing
    ├── quotes/                 # Quote request and management flows
    ├── orders/                 # Order placement and tracking flows
    ├── admin/                  # Admin dashboard and management flows
    └── responsive/             # Cross-device layout and responsive behavior tests
```

---

## 3. Unit Tests

Unit tests are the foundation of our testing pyramid. They must execute rapidly and independently. Below is the exhaustive list of targets for unit testing.

### Utility Functions
Every utility function must be tested with positive, negative, and edge-case inputs.
- `formatCurrency()`: Tests for different locales, zero values, negative values, and rounding behavior.
- `formatDate()`: Tests for different formats, timezones, leap years, and invalid dates.
- `generateSlug()`: Tests for handling special characters, multiple spaces, capitalization, and unicode normalization.
- `generateOrderNumber()`: Tests for sequence formatting, uniqueness constraints, and prefixing.
- `generateQuoteNumber()`: Tests for prefixing and padding.
- `validateEmail()`: Tests against valid, invalid, missing domain, and special character emails.
- `validatePhone()`: Tests for international formats, missing extensions, and invalid characters.
- `sanitizeFilename()`: Tests for stripping malicious paths, spaces, and reserved characters.
- `calculateBulkPrice()`: Tests tier logic, boundary conditions, zero quantity, and maximum quantities.
- `calculateOrderTotal()`: Tests summation of line items, tax application, shipping costs, and discount deductions.

### Validation Schemas
Zod schemas must be tested to ensure they enforce correct data structures and return appropriate error messages.
- `productSchema`: Required fields, max lengths, array validations (images).
- `quoteRequestSchema`: Minimum quantities, company details requirements.
- `contactFormSchema`: Email validity, message length constraints.
- `addressSchema`: Postal code formats, state/country relations.
- `userProfileSchema`: Allowed field updates.
- `categorySchema`: Parent-child relationship validity.
- `orderSchema`: Line item minimums, valid status transitions.

### Service Layer
Service layer tests mock the underlying database (Prisma) to verify business logic.
- `ProductService.create()`: Data normalization, transaction integrity.
- `ProductService.update()`: Partial updates, cache invalidation hooks.
- `ProductService.delete()`: Soft delete logic, relation cascading logic.
- `ProductService.search()`: Full-text search string building, pagination off-by-one errors.
- `ProductService.getBySlug()`: Not found handling, active-only filtering.
- `QuoteService.create()`: Initial status setting, notification triggers.
- `QuoteService.updateStatus()`: Status transition rules, email dispatching.
- `OrderService.create()`: Inventory decrementing, payment intent generation.
- `OrderService.updateStatus()`: Fulfillment logic, shipment tracking attachment.
- `MediaService.upload()`: File type validation, size limits, CDN path generation.
- `MediaService.delete()`: Storage bucket cleanup.
- `AuthService.validateRole()`: Role hierarchy, permission mapping.

### React Hooks
Custom hooks must be tested using `@testing-library/react-hooks` or React 18's native renderHook.
- `useCart()`: State persistence, adding/removing items, duplicate item handling, quantity updates.
- `useWishlist()`: Syncing with server state, optimistic UI updates.
- `useDebounce()`: Timing assertions, cancellation of previous timers.
- `useMediaQuery()`: Window resize event listeners, initial state evaluation.

### Components
Component tests focus on rendering, accessibility (a11y), and user interactions.
- `ProductCard`: Rendering of discounted prices, out-of-stock states, hover effects.
- `PriceDisplay`: Display of bulk pricing tiers, currency symbols.
- `QuantitySelector`: Minimum Order Quantity (MOQ) limits, maximum limits, direct input handling.
- `StatusBadge`: Variant rendering (success, warning, error) based on props.
- `SearchBar`: Input handling, clear button functionality, submit event firing.
- `FilterPanel`: Checkbox states, range slider boundaries, apply/reset actions.
- `Pagination`: Page number calculation, disabled state on bounds, ellipsis rendering.

---

## 4. Integration Tests

Integration tests verify that different pieces of the application work together correctly, particularly focusing on the boundary between our application and external dependencies (Database, Auth provider).

### API Routes
We use Next.js testing utilities and Supertest/fetch testing to hit our actual Route Handlers.
- **Products API**: Verifies CRUD operations, asserts pagination metadata, tests complex filtering (by category, price, attributes), and fuzzy search capabilities.
- **Categories API**: Tests CRUD operations, particularly the retrieval of nested tree structures and cycle prevention.
- **Quotes API**: Tests the creation flow, status update restrictions, and thread/message additions.
- **Orders API**: Tests creation (including cart validation), and webhook handling for status updates.
- **Auth API**: Tests registration endpoints, login credential validation, cookie setting/clearing for logout, and password reset token generation.
- **Wishlist API**: Tests add, remove, and list functionalities ensuring user isolation.
- **Contact API**: Tests form submission and verifies IP-based rate limiting responses (HTTP 429).
- **Admin Products API**: Asserts that all administrative operations succeed for admins and fail for standard users.
- **Admin Orders API**: Verifies bulk updates, export generation triggers.
- **Admin Quotes API**: Verifies status manipulation and assignment logic.
- **Upload API**: Integration with mock Supabase storage for valid files, enforcing size limits and rejecting executable file types.
- **Bulk Import API**: Tests CSV parsing, batch transaction commits, and error reporting for invalid rows.

### Database
These tests run against a real PostgreSQL test database using Prisma.
- **Product creation with relations**: Ensuring a product, its variants, and categories are saved atomically.
- **Order creation with items**: Verifying referential integrity between orders and product snapshots.
- **Quote with items and messages**: Testing deeply nested inserts.
- **Company with members**: Verifying role assignments within a company context.
- **Cascading deletes**: Asserting that deleting a company removes associated users, quotes, and addresses without leaving orphans.
- **Unique constraints**: Verifying DB-level rejections of duplicate emails, slugs, or SKU numbers.
- **Index performance**: Basic query execution time checks on highly indexed tables.

### Authentication
Integration tests for auth verify the flow between our app and Supabase Auth.
- **Registration flow**: User creation in Auth and mirroring to our public `users` table.
- **Login with valid/invalid credentials**: Session creation and error messaging.
- **Session management**: Token refresh logic and expiry handling.
- **Role-based route access**: Middleware evaluation of JWT claims.
- **Protected API routes**: Asserting HTTP 401 Unauthorized for missing tokens.
- **Admin routes**: Asserting HTTP 403 Forbidden for authenticated but non-admin users.
- **Company data isolation**: Ensuring User A cannot access User B's quotes or orders via API manipulation.

---

## 5. End-to-End Tests (Playwright)

E2E tests ensure that the entire system, from the frontend UI to the database, functions correctly from the user's perspective.

### Public Pages
- **Homepage**: Loads correctly, hero banner is visible, featured products render.
- **Navigation**: Desktop megamenu and mobile hamburger menu functionality.
- **Product Listing**: Loads with correct initial state, pagination works across multiple pages.
- **Product Filters**: Applying category and price filters updates the URL and product grid without full page reload.
- **Product Search**: Typeahead search returns relevant results, enter key redirects to search page.
- **Product Detail**: Displays title, images, specifications, bulk pricing table, and actionable buttons.
- **Quote Request Form**: End-to-end submission including form validation, successful network request, and success screen display.
- **Contact Form**: Form validation and successful submission.
- **FAQ Page**: Accordion expand/collapse functionality.
- **Policy Pages**: Terms, Privacy, Shipping pages load with correct static content.

### Authentication
- **User Registration Flow**: Filling form, email verification step, successful redirect.
- **User Login Flow**: Credential entry, session establishment, redirect to dashboard or intended page.
- **User Logout Flow**: Session termination, UI updates to reflect logged-out state.
- **Password Reset Flow**: Requesting link, entering new password, successful login with new password.
- **Protected Routes**: Attempting to access `/dashboard` while logged out redirects to `/login?callbackUrl=/dashboard`.

### Customer Dashboard
- **Profile Update**: Modifying name/phone and verifying persistence.
- **Address Management**: Adding, editing, deleting, and setting default billing/shipping addresses.
- **Quote History**: Viewing list of quotes, clicking into details, verifying status consistency.
- **Order History**: Viewing past orders, downloading invoices, clicking to view tracking information.
- **Wishlist Management**: Removing items from wishlist via dashboard interface.

### Admin Dashboard
- **Admin Login**: Specific login flow for administrators.
- **Dashboard Analytics**: Verifying charts and KPI cards render with data.
- **Product CRUD**: End-to-end flow of creating a product, uploading an image, publishing, editing details, and archiving.
- **Category Management**: Creating parent and child categories, reordering.
- **Quote Management**: Admin viewing a customer quote, adding pricing, changing status to "Proposal Sent".
- **Order Management**: Viewing order details, updating tracking number, changing status to "Shipped".
- **Customer Management**: Viewing customer profiles, order history, and company affiliation.
- **Content Management**: Updating FAQs or testimonials and verifying they reflect on the public site.
- **Bulk Product Import**: Uploading a CSV and verifying products appear in the catalog.
- **Product Export**: Triggering download and verifying file existence.
- **Audit Log**: Viewing system logs for sensitive actions.

### Cart & Checkout
- **Add to Cart**: Adding item from product page, verifying mini-cart updates.
- **Update Quantity**: Changing quantities in cart, verifying price recalculations and MOQ restrictions.
- **Remove from Cart**: Deleting items, verifying empty cart state.
- **Proceed to Checkout**: Transition from cart to checkout flow.
- **Address Selection**: Selecting existing or entering new addresses for shipping/billing.
- **Order Placement**: Simulating payment intent success, verifying order confirmation page.

### Responsive Tests
Playwright projects configured for multiple viewports.
- **Mobile Navigation** (320px, 375px, 390px, 430px): Drawer navigation, touch targets.
- **Tablet Layout** (768px): Grid adjustments, sidebar behaviors.
- **Desktop Layout** (1024px, 1440px): Standard comprehensive view.
- **Product Cards**: Stacking and resizing behaviors.
- **Forms**: Input visibility, virtual keyboard avoidance on mobile.
- **Admin Dashboard**: Sidebar collapse/expand, table horizontal scrolling on smaller screens.

---

## 6. Test Configuration

Our testing environment requires meticulous configuration to ensure consistency, speed, and isolation.

- **vitest.config.ts**: 
  - Configured with `environment: 'jsdom'` for component tests.
  - Setup files included for global MSW server instantiation and React Testing Library `cleanup`.
  - Path aliases (`@/*`) resolved mirroring `tsconfig.json`.
  - Coverage provider set to `v8` with strict thresholds.

- **playwright.config.ts**:
  - Base URL configured to local dev server or CI staging URL.
  - `fullyParallel: true` to maximize execution speed.
  - Retries set to `1` in CI to handle flaky network issues.
  - Trace recording set to `retain-on-failure`.
  - Projects configured for Desktop Chrome, Desktop Firefox, Desktop Safari, and Mobile Chrome/Safari viewports.

- **Environment Variables**:
  - A dedicated `.env.test` file is used to provide test-specific credentials.
  - Secret keys are mocked where possible; CI environments use GitHub Secrets.

- **Test Database Setup/Teardown**:
  - Integration tests use a dynamically provisioned PostgreSQL schema or a Dockerized database to ensure total isolation.
  - Global setup script runs Prisma migrations (`prisma migrate deploy`) before the test suite starts.
  - Database state is cleaned/truncated between test files to prevent data bleeding.

- **CI/CD Integration**:
  - GitHub Actions workflows are defined for automated testing.
  - Caching strategies for `node_modules` and Playwright binaries to reduce execution time.

---

## 7. Test Data

Reliable tests require deterministic and comprehensive test data.

- **Factories/Fixtures**: We utilize a factory pattern (using Faker.js) to generate consistent entities. e.g., `createMockProduct()`, `createMockUser()`.
- **Seed Data for E2E**: Playwright tests rely on a known baseline state. A specific `seed:e2e` script populates the database with standard users, catalog items, and historical data before the E2E suite runs.
- **Deterministic Test Data**: When asserting specific text or calculations, static fixtures (hardcoded JSON objects) are preferred over randomized data to prevent flaky tests.

---

## 8. Coverage Targets

We enforce strict code coverage metrics to maintain code quality. Coverage gates are integrated into our CI pipeline.

- **Unit Tests**: Minimum **80%** statement and branch coverage overall. Critical utilities (e.g., pricing calculations) require **100%** coverage.
- **Integration Tests**: 100% of all API routes must be touched by at least one successful and one failure integration test.
- **E2E Tests**: 100% of critical user flows (Registration, Quote Request, Checkout, Admin Core Workflows) must have passing Playwright tests.

---

## 9. Test Commands

The `package.json` provides standard scripts for executing tests locally and in CI.

```bash
# Unit & Integration Tests
npm run test          # Run all unit tests using Vitest
npm run test:watch    # Run Vitest in watch mode (for development)
npm run test:coverage # Run Vitest and generate a coverage report
npm run test:integration # Run only the integration test suite

# End-to-End Tests
npm run test:e2e      # Run Playwright E2E tests across all configured browsers (headless)
npm run test:e2e:ui   # Open Playwright's interactive UI mode (excellent for debugging)
npm run test:e2e:debug # Run Playwright with the inspector enabled

# All Tests
npm run test:all      # Run linting, type-checking, unit, integration, and E2E sequentially
```

---

## 10. CI/CD Testing Pipeline

Our Continuous Integration pipeline acts as the ultimate gatekeeper for code quality.

- **On Every PR (Pull Request)**:
  - Code format check (Prettier) and Linting (ESLint).
  - TypeScript compilation check (`tsc --noEmit`).
  - Unit and Integration tests run. PR is blocked if coverage drops or tests fail.
- **On PRs targeting `main` (Production Bound)**:
  - All above checks.
  - Complete Playwright E2E suite runs against a localized build.
- **Post-Deployment**:
  - A subset of Playwright tests designated as "Smoke Tests" run against the actual production URL to verify basic health (Homepage loads, API is responsive) without generating junk data.

This comprehensive strategy ensures that Sterling remains a robust, enterprise-grade platform capable of handling complex B2B workflows flawlessly.
