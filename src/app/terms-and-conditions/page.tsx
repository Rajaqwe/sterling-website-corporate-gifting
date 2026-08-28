import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Sterling',
  description: 'Terms of service for Sterling corporate gifting.',
};

export default function TermsAndConditionsPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 max-w-4xl min-h-[80vh]">
      <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8 tracking-tight">Terms & Conditions</h1>
      <div className="prose prose-slate max-w-none">
        
      <p className="text-sm text-slate-500 mb-8">Last Updated: October 2024</p>
      
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-slate-900">1. Orders & Pricing</h2>
      <p className="mb-4 text-slate-700 leading-relaxed">All orders are subject to availability and acceptance. Prices are exclusive of applicable taxes unless stated otherwise. Bulk pricing tiers apply only to qualifying quantities.</p>
      
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-slate-900">2. Customization</h2>
      <p className="mb-4 text-slate-700 leading-relaxed">Clients are responsible for providing high-quality artwork for branding. Once a digital proof is approved by the client, Sterling is not liable for errors in the approved design.</p>
      
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-slate-900">3. Payments</h2>
      <p className="mb-4 text-slate-700 leading-relaxed">For custom and bulk orders, a standard advance payment is required before production begins. Final payment terms are strictly as per the agreed invoice.</p>
      
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-slate-900">4. Intellectual Property</h2>
      <p className="mb-4 text-slate-700 leading-relaxed">All website content, design, and imagery are the intellectual property of Sterling and may not be used without explicit permission.</p>
    
        
  <div className="mt-12 p-6 bg-slate-50 rounded-lg border border-slate-100">
    <h3 className="font-semibold text-lg mb-2">Sterling</h3>
    <p className="text-slate-600 mb-1">Premium Corporate Gifting & B2B Solutions</p>
    <p className="text-slate-600 mb-1">India</p>
    <p className="text-slate-600 mb-1">Email: <a href="mailto:hello@sterlinggifts.com" className="text-primary hover:underline">hello@sterlinggifts.com</a></p>
    <p className="text-slate-600 mb-1">Phone: +91 1800 123 4567</p>
    <p className="text-slate-600">Business hours: Monday-Saturday, 9:00 AM-6:00 PM IST</p>
  </div>

      </div>
    </div>
  );
}
