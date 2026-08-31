import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-[100vh] flex flex-col md:flex-row w-full bg-background">
      {/* Left side: Premium Brand Story / Image */}
      <div className="hidden md:flex md:w-1/2 lg:w-3/5 relative bg-primary flex-col justify-center px-12 py-24 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/videos/posters/demo-2.jpg')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent"></div>
        <div className="relative z-10 max-w-lg mx-auto">
          <h2 className="text-4xl lg:text-5xl font-serif font-bold leading-tight mb-6">
            Corporate Gifting, <br/>Elevated.
          </h2>
          <p className="text-lg text-white/80 leading-relaxed mb-8">
            Access your corporate dashboard to manage quotes, track bulk shipments, and curate premium gifts for your stakeholders.
          </p>
          <div className="flex items-center gap-4 text-sm font-medium">
            <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-accent"></div> Curated Quality</span>
            <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-accent"></div> Custom Branding</span>
            <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-accent"></div> Global Delivery</span>
          </div>
        </div>
      </div>

      {/* Right side: Form */}
      <div className="flex-1 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 relative z-10 bg-background shadow-[-20px_0_40px_-15px_rgba(0,0,0,0.05)]">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
}
