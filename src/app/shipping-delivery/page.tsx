import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shipping & Delivery | Sterling',
  description: 'Information on Sterling shipping timelines and logistics.',
};

export default function ShippingDeliveryPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 max-w-4xl min-h-[80vh]">
      <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8 tracking-tight">Shipping & Delivery</h1>
      <div className="prose prose-slate max-w-none">
        
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-slate-900">Delivery Timelines</h2>
      <p className="mb-4 text-slate-700 leading-relaxed">Standard, unbranded products generally dispatch within 2-4 business days. Custom-branded bulk orders require 7-14 business days for production after artwork approval, plus transit time.</p>
      
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-slate-900">Shipping Locations</h2>
      <p className="mb-4 text-slate-700 leading-relaxed">We ship PAN India across all major cities and pin codes. International shipping is available upon request for specific corporate orders.</p>
      
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-slate-900">Tracking & Coordination</h2>
      <p className="mb-4 text-slate-700 leading-relaxed">For bulk event deliveries or multi-location employee shipments, our dedicated logistics team provides centralized tracking and coordination to ensure on-time arrival.</p>
    
        
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
