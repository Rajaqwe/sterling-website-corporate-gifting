import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";

const inter = Inter({ subsets: ['latin'], variable: '--font-sans', weight: ['400', '500', '600'] });
const poppins = Poppins({ subsets: ['latin'], variable: '--font-serif', weight: ['400', '500', '600', '700', '800'] });

import "./globals.css";
import { Suspense } from "react";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/layout/Navbar";
import { ConditionalFooter } from "@/components/layout/ConditionalFooter";
import { HideOnDashboard } from "@/components/layout/HideOnDashboard";
import { createClient } from "@/lib/supabase/server";
import { FloatingButtons } from "@/components/layout/FloatingButtons";
import { Analytics } from "@/components/analytics/Analytics";

import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/components/layout/AuthProvider";
import { CartProvider } from "@/components/cart/CartContext";
import { prisma } from "@/lib/prisma/client";
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from 'sonner';

const configuredSiteUrl = process.env.NEXT_PUBLIC_APP_URL?.trim();
const isLocalSiteUrl =
  configuredSiteUrl === "http://localhost:3000" ||
  configuredSiteUrl === "http://127.0.0.1:3000";
const SITE_URL =
  configuredSiteUrl && !isLocalSiteUrl
    ? configuredSiteUrl.replace(/\/+$/, "")
    : "https://sterling-website-corporate-gifting-sterling17.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  title: {
    template: "%s | Sterling Corporate",
    default: "Sterling | Premium B2B Corporate Gifting",
  },
  description: "Thoughtfully curated corporate gifts for enterprise clients, startups, and executive teams.",
  keywords: ["corporate gifting", "B2B gifts", "executive gifts", "bulk gifting", "employee gifts", "custom merchandise", "swag"],
  authors: [{ name: "Sterling Team" }],
  openGraph: {
    title: "Sterling Corporate Gifting",
    description: "Premium B2B Corporate Gifting platform for enterprise clients.",
    url: "/",
    siteName: "Sterling",
    images: [
      {
        url: "/og-image.jpg", // Placeholder
        width: 1200,
        height: 630,
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sterling Corporate",
    description: "Premium B2B Corporate Gifting.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // NOTE: previously this called both getSession() AND getUser() on every request.
  // getUser() makes a real network round trip to the Supabase Auth server, so doing
  // that on top of getSession() doubled auth latency on every single page load for
  // a value (the cart count) that isn't security-sensitive. getSession() alone is
  // sufficient here; reserve getUser() for places that need server-verified identity
  // (e.g. admin/role checks), not for display-only data like an item count badge.
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  const user = session?.user ?? null;

  let initialCartCount = 0;
  if (user) {
    try {
      const result = await prisma.cartItem.aggregate({
        _sum: { quantity: true },
        where: { cart: { userId: user.id } }
      });
      initialCartCount = result._sum.quantity || 0;
    } catch (err) {
      console.warn("Failed to fetch initial cart count in layout:", err);
    }
  }

  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased flex flex-col overflow-x-hidden", inter.variable, poppins.variable
        )}
      >
        <NextTopLoader color="#ca9d55" height={3} showSpinner={false} />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <AuthProvider accessToken={session?.access_token || null}>
          <CartProvider initialCount={initialCartCount}>
            <a
              href="#main-content"
              className="sr-only fixed left-4 top-4 z-[100] rounded-lg bg-background px-4 py-3 text-sm font-semibold text-foreground shadow-lg focus:not-sr-only focus:outline-none focus:ring-2 focus:ring-ring"
            >
              Skip to content
            </a>
            <HideOnDashboard>
              <Navbar />
            </HideOnDashboard>
            <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
              {children}
            </main>
            <ConditionalFooter />
            <HideOnDashboard>
              <FloatingButtons />
            </HideOnDashboard>
          </CartProvider>
        </AuthProvider>
        </ThemeProvider>
        <Toaster visibleToasts={3} />
        <Analytics />
      </body>
    </html>
  );
}
