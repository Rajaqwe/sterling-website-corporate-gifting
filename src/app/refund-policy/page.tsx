import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Refund & Return Policy | Sterling',
  description: 'Sterling return and refund guidelines.',
};

export default function RefundPolicyPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 max-w-4xl min-h-[80vh]">
      <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8 tracking-tight">Refund & Return Policy</h1>
      <div className="prose prose-slate max-w-none">
        
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-slate-900">Eligible Returns</h2>
      <p className="mb-4 text-slate-700 leading-relaxed">non-customized products within 7 days of delivery if the items are defective or damaged. The items must be unused and in original packaging. We do not accept returns for standard products.</p>
      
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-slate-900">Customized Products</h2>
      <p className="mb-4 text-slate-700 leading-relaxed">Due to the personalized nature of our corporate gifts, <strong>custom-branded products cannot be returned or refunded</strong> unless there is a clear manufacturing defect.</p>
      
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-slate-900">Refund Processing</h2>
      <p className="mb-4 text-slate-700 leading-relaxed">Approved refunds will be processed within 5-7 business days to the original payment method. For corporate bank transfers, processing times may vary based on banking cycles.</p>
    
        
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
