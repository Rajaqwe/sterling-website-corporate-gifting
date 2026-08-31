import type { Metadata } from "next";

import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/layout/Navbar";
import { ConditionalFooter } from "@/components/layout/ConditionalFooter";
import { HideOnDashboard } from "@/components/layout/HideOnDashboard";
import { createClient } from "@/lib/supabase/server";
import { FloatingButtons } from "@/components/layout/FloatingButtons";
import { AuthProvider } from "@/components/layout/AuthProvider";
import { CartProvider } from "@/components/cart/CartContext";
import { prisma } from "@/lib/prisma/client";
import NextTopLoader from 'nextjs-toploader';



export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
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


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  const user = session?.user;

  let initialCartCount = 0;
  if (user) {
    const result = await prisma.cartItem.aggregate({
      _sum: { quantity: true },
      where: { cart: { userId: user.id } }
    });
    initialCartCount = result._sum.quantity || 0;
  }

  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased flex flex-col"
        )}
      >
        <NextTopLoader color="#ca9d55" height={3} showSpinner={false} />
        <AuthProvider accessToken={session?.access_token || null}>
          <CartProvider initialCount={initialCartCount}>
            <HideOnDashboard>
              <Navbar />
            </HideOnDashboard>
            <main className="flex-1">
              {children}
            </main>
            <ConditionalFooter />
            <HideOnDashboard>
              <FloatingButtons />
            </HideOnDashboard>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
