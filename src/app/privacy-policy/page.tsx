import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Sterling',
  description: 'How Sterling handles and protects your data.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 md:py-24 max-w-4xl min-h-[80vh]">
      <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8 tracking-tight">Privacy Policy</h1>
      <div className="prose prose-slate max-w-none">
        
      <p className="text-sm text-slate-500 mb-8">Last Updated: October 2024</p>
      
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-slate-900">1. Information We Collect</h2>
      <p className="mb-4 text-slate-700 leading-relaxed">We collect personal and company information that you provide when creating an account, requesting quotes, or placing orders. This includes names, emails, phone numbers, and addresses.</p>
      
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-slate-900">2. How We Use Your Information</h2>
      <p className="mb-4 text-slate-700 leading-relaxed">We use your data to process orders, provide customer support, manage your corporate account, and improve our website analytics. We do not sell your personal data to third parties.</p>
      
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-slate-900">3. Data Security</h2>
      <p className="mb-4 text-slate-700 leading-relaxed">We implement industry-standard security measures to protect your data. All payment information is encrypted and processed via secure gateways.</p>
      
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-slate-900">4. Cookies</h2>
      <p className="mb-4 text-slate-700 leading-relaxed">Our website uses cookies to enhance user experience and analyze site traffic. You can manage cookie preferences in your browser settings.</p>
    
        
  <div className="mt-12 p-6 bg-muted/50 rounded-lg border border-slate-100">
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
