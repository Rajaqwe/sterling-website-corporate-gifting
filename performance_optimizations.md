# Website Performance Optimization Guide

This document outlines various strategies and best practices to significantly improve the loading speed and overall performance of your Next.js application.

## 1. Image Optimization

Images often account for the largest portion of a web page's weight. Optimizing them can drastically reduce load times.

*   **Use the Next.js `<Image>` Component:** Replace standard `<img>` tags with `next/image`. This automatically provides:
    *   **Size Optimization:** Automatically serves correctly sized images for each device, using modern formats like WebP and AVIF.
    *   **Lazy Loading:** Images are only loaded when they enter the viewport.
    *   **Visual Stability:** Prevents Cumulative Layout Shift (CLS) automatically.
*   **Prioritize Critical Images:** For the Largest Contentful Paint (LCP) image (like a hero banner), use the `priority` prop on the `<Image>` component to preload it.

## 2. Database & Data Fetching (Prisma)

Slow database queries will directly impact your server response times (TTFB).

*   **Avoid N+1 Queries:** Ensure you are using `include` in Prisma rather than mapping over results and fetching related data individually.
*   **Select Only What You Need:** Use the `select` property in Prisma to only pull down the specific columns you need for the UI, reducing the payload size.
*   **Database Indexes:** Make sure your database tables have appropriate indexes on columns that are frequently used in `where` clauses, `orderBy`, or foreign keys.
*   **Connection Pooling:** You are already using Supabase Pooler (PgBouncer), which is great. Ensure your pool size matches your traffic needs.

## 3. Next.js Caching Strategies (App Router)

Next.js provides powerful caching mechanisms that you should leverage:

*   **Data Cache:** By default, Next.js caches `fetch` requests. Use options like `next: { revalidate: 3600 }` to cache data for an hour, or use time-based/on-demand revalidation.
*   **Full Route Cache:** Pages that don't depend on user-specific dynamic data (like search params or cookies) should be statically rendered at build time.
*   **React `cache`:** For data fetched via Prisma (which doesn't use the standard `fetch` API), wrap your data-fetching functions in React's `cache()` to deduplicate requests across components in the same render pass.

## 4. Component Loading & Bundle Size

Sending too much JavaScript to the client slows down the browser's ability to render the page.

*   **Maximize Server Components:** Keep as many components as possible as Server Components (default in App Router). Only add `"use client"` to components that strictly need interactivity (hooks, state, event listeners).
*   **Dynamic Imports:** Use `next/dynamic` to lazy-load heavy client components (like complex charts, modals, or rich text editors) so they aren't included in the initial JavaScript bundle.

    ```tsx
    import dynamic from 'next/dynamic'
    const HeavyModal = dynamic(() => import('./HeavyModal'))
    ```
*   **Analyze Bundle Size:** Run `@next/bundle-analyzer` to visually inspect what packages are taking up the most space and look for lighter alternatives.

## 5. Fonts and Third-Party Scripts

*   **Next.js Font Optimization:** Use `next/font/google` or `next/font/local`. This hosts fonts locally and zero-layout-shift loads them, eliminating network requests to Google servers on page load.
*   **Script Optimization:** Load third-party scripts (analytics, customer support chats) using the `next/script` component. Use the `strategy="lazyOnload"` or `strategy="worker"` props so they don't block the main thread during initial rendering.

## 6. Pagination and UI Patterns

*   **Don't Load Everything:** If you have pages showing many corporate gifts or products, implement Pagination, "Load More" buttons, or Infinite Scrolling rather than fetching and rendering hundreds of items at once.
*   **Skeleton Screens / Streaming:** Use Next.js `loading.tsx` and React `<Suspense>` boundaries to instantly show a UI skeleton while the data is fetching in the background. This improves perceived performance.
