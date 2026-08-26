import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/layout/Navbar";
import { ConditionalFooter } from "@/components/layout/ConditionalFooter";
import { FloatingButtons } from "@/components/layout/FloatingButtons";
import { AuthProvider } from "@/components/layout/AuthProvider";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontSerif = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Sterling Corporate",
    default: "Sterling | Premium B2B Corporate Gifting",
  },
  description: "Thoughtfully curated corporate gifts for enterprise clients, startups, and executive teams.",
  keywords: ["corporate gifting", "B2B gifts", "executive gifts", "bulk corporate orders", "employee welcome kits", "branded company gifts"],
  authors: [{ name: "Sterling Operations" }],
  openGraph: {
    title: "Sterling | Premium B2B Corporate Gifting",
    description: "Thoughtfully curated corporate gifts for enterprise clients, startups, and executive teams.",
    url: "https://sterlinggifting.com",
    siteName: "Sterling Corporate",
    images: [
      {
        url: "https://sterlinggifting.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Sterling Corporate Gifts",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sterling | Corporate Gifting",
    description: "Premium enterprise gifts.",
    images: ["https://sterlinggifting.com/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased flex flex-col",
          fontSans.variable,
          fontSerif.variable
        )}
      >
        <AuthProvider>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <ConditionalFooter />
          <FloatingButtons />
        </AuthProvider>
      </body>
    </html>
  );
}
