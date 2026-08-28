const fs = require('fs');
const path = require('path');

const companyDetails = `
  <div className="mt-12 p-6 bg-slate-50 rounded-lg border border-slate-100">
    <h3 className="font-semibold text-lg mb-2">Sterling</h3>
    <p className="text-slate-600 mb-1">Premium Corporate Gifting & B2B Solutions</p>
    <p className="text-slate-600 mb-1">India</p>
    <p className="text-slate-600 mb-1">Email: <a href="mailto:hello@sterlinggifts.com" className="text-primary hover:underline">hello@sterlinggifts.com</a></p>
    <p className="text-slate-600 mb-1">Phone: +91 1800 123 4567</p>
    <p className="text-slate-600">Business hours: Monday-Saturday, 9:00 AM-6:00 PM IST</p>
  </div>
`;

const pages = [
  {
    route: 'about',
    title: 'About Sterling',
    desc: 'Premium corporate gifting solutions for businesses, employee engagement, client relationships, events and brand recognition.',
    content: `
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-slate-900">Who We Are</h2>
      <p className="mb-4 text-slate-700 leading-relaxed">Sterling provides premium corporate gifting solutions designed to strengthen business relationships, enhance employee engagement, and elevate brand recognition. We curate high-quality products that reflect the excellence of your organization.</p>
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-slate-900">Our Mission</h2>
      <p className="mb-4 text-slate-700 leading-relaxed">To deliver exceptional gifting experiences that help companies express genuine appreciation and build lasting connections with their clients, partners, and teams.</p>
    `
  },
  {
    route: 'values',
    title: 'Our Values',
    desc: 'The core values that drive Sterling.',
    content: `
      <div className="grid gap-6 md:grid-cols-2 mt-8 text-slate-700">
        <div className="p-6 border rounded-lg bg-white shadow-sm">
          <h3 className="font-semibold text-xl mb-2 text-slate-900">Quality</h3>
          <p>We source only premium, durable products that meet the highest standards of craftsmanship.</p>
        </div>
        <div className="p-6 border rounded-lg bg-white shadow-sm">
          <h3 className="font-semibold text-xl mb-2 text-slate-900">Reliability</h3>
          <p>We deliver on our promises with on-time fulfillment and consistent service excellence.</p>
        </div>
        <div className="p-6 border rounded-lg bg-white shadow-sm">
          <h3 className="font-semibold text-xl mb-2 text-slate-900">Customer First</h3>
          <p>Your success is our priority. We provide dedicated support for every order, large or small.</p>
        </div>
        <div className="p-6 border rounded-lg bg-white shadow-sm">
          <h3 className="font-semibold text-xl mb-2 text-slate-900">Creativity</h3>
          <p>We offer innovative customization and unique curation to make your gifts stand out.</p>
        </div>
        <div className="p-6 border rounded-lg bg-white shadow-sm">
          <h3 className="font-semibold text-xl mb-2 text-slate-900">Transparency</h3>
          <p>Clear communication, honest pricing, and upfront timelines for every project.</p>
        </div>
        <div className="p-6 border rounded-lg bg-white shadow-sm">
          <h3 className="font-semibold text-xl mb-2 text-slate-900">Sustainability</h3>
          <p>Commitment to eco-friendly options and responsible packaging in our supply chain.</p>
        </div>
      </div>
    `
  },
  {
    route: 'sustainability',
    title: 'Sustainability',
    desc: 'Our commitment to eco-friendly corporate gifting.',
    content: `
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-slate-900">Eco-Friendly Corporate Gifting</h2>
      <p className="mb-4 text-slate-700 leading-relaxed">At Sterling, we understand the importance of environmental responsibility. We actively expand our catalog with sustainable gifting options.</p>
      <ul className="list-disc pl-6 space-y-3 mb-6 text-slate-700 leading-relaxed">
        <li><strong>Eco-Friendly Products:</strong> Items made from recycled, biodegradable, or highly renewable materials.</li>
        <li><strong>Responsible Packaging:</strong> We minimize unnecessary plastic and use recyclable packaging materials wherever possible.</li>
        <li><strong>Reusable Products:</strong> Curating high-utility gifts designed for long-term use rather than single-use disposables.</li>
        <li><strong>Ethical Sourcing:</strong> Partnering with manufacturers who adhere to fair labor and environmental standards.</li>
      </ul>
    `
  },
  {
    route: 'careers',
    title: 'Careers at Sterling',
    desc: 'Join our growing team of corporate gifting experts.',
    content: `
      <p className="text-lg mb-6 text-slate-700 leading-relaxed">Sterling is growing rapidly! We are always looking for passionate individuals to join our mission of delivering exceptional corporate gifting solutions.</p>
      
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-slate-900">Current Openings</h2>
      
      <div className="space-y-6 text-slate-700">
        <div className="p-6 border rounded-lg bg-white shadow-sm">
          <h3 className="font-semibold text-xl mb-1 text-slate-900">Business Development Executive</h3>
          <p className="text-sm text-slate-500 mb-4 font-medium">Full-time • Mumbai / Remote</p>
          <p className="mb-4">Drive new corporate partnerships and expand our B2B client portfolio.</p>
        </div>
        
        <div className="p-6 border rounded-lg bg-white shadow-sm">
          <h3 className="font-semibold text-xl mb-1 text-slate-900">Corporate Sales Manager</h3>
          <p className="text-sm text-slate-500 mb-4 font-medium">Full-time • Mumbai</p>
          <p className="mb-4">Lead a team of sales executives and manage relationships with enterprise clients.</p>
        </div>
        
        <div className="p-6 border rounded-lg bg-white shadow-sm">
          <h3 className="font-semibold text-xl mb-1 text-slate-900">Product & Sourcing Specialist</h3>
          <p className="text-sm text-slate-500 mb-4 font-medium">Full-time • Hybrid</p>
          <p className="mb-4">Identify trending premium products and manage supplier relationships.</p>
        </div>
        
        <div className="p-6 border rounded-lg bg-white shadow-sm">
          <h3 className="font-semibold text-xl mb-1 text-slate-900">Customer Success Executive</h3>
          <p className="text-sm text-slate-500 mb-4 font-medium">Full-time • Remote</p>
          <p className="mb-4">Ensure flawless order execution and provide dedicated support for our corporate clients.</p>
        </div>
      </div>

      <div className="mt-8">
        <Link href="/contact" className="inline-flex h-10 items-center justify-center rounded-md bg-slate-900 px-8 text-sm font-medium text-white shadow hover:bg-slate-800 transition-colors">
          Apply Now
        </Link>
      </div>
    `
  },
  {
    route: 'privacy-policy',
    title: 'Privacy Policy',
    desc: 'How Sterling handles and protects your data.',
    content: `
      <p className="text-sm text-slate-500 mb-8">Last Updated: October 2024</p>
      
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-slate-900">1. Information We Collect</h2>
      <p className="mb-4 text-slate-700 leading-relaxed">We collect personal and company information that you provide when creating an account, requesting quotes, or placing orders. This includes names, emails, phone numbers, and addresses.</p>
      
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-slate-900">2. How We Use Your Information</h2>
      <p className="mb-4 text-slate-700 leading-relaxed">We use your data to process orders, provide customer support, manage your corporate account, and improve our website analytics. We do not sell your personal data to third parties.</p>
      
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-slate-900">3. Data Security</h2>
      <p className="mb-4 text-slate-700 leading-relaxed">We implement industry-standard security measures to protect your data. All payment information is encrypted and processed via secure gateways.</p>
      
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-slate-900">4. Cookies</h2>
      <p className="mb-4 text-slate-700 leading-relaxed">Our website uses cookies to enhance user experience and analyze site traffic. You can manage cookie preferences in your browser settings.</p>
    `
  },
  {
    route: 'terms-and-conditions',
    title: 'Terms & Conditions',
    desc: 'Terms of service for Sterling corporate gifting.',
    content: `
      <p className="text-sm text-slate-500 mb-8">Last Updated: October 2024</p>
      
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-slate-900">1. Orders & Pricing</h2>
      <p className="mb-4 text-slate-700 leading-relaxed">All orders are subject to availability and acceptance. Prices are exclusive of applicable taxes unless stated otherwise. Bulk pricing tiers apply only to qualifying quantities.</p>
      
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-slate-900">2. Customization</h2>
      <p className="mb-4 text-slate-700 leading-relaxed">Clients are responsible for providing high-quality artwork for branding. Once a digital proof is approved by the client, Sterling is not liable for errors in the approved design.</p>
      
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-slate-900">3. Payments</h2>
      <p className="mb-4 text-slate-700 leading-relaxed">For custom and bulk orders, a standard advance payment is required before production begins. Final payment terms are strictly as per the agreed invoice.</p>
      
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-slate-900">4. Intellectual Property</h2>
      <p className="mb-4 text-slate-700 leading-relaxed">All website content, design, and imagery are the intellectual property of Sterling and may not be used without explicit permission.</p>
    `
  },
  {
    route: 'refund-policy',
    title: 'Refund & Return Policy',
    desc: 'Sterling return and refund guidelines.',
    content: `
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-slate-900">Eligible Returns</h2>
      <p className="mb-4 text-slate-700 leading-relaxed">We accept returns for standard, non-customized products within 7 days of delivery if the items are defective, damaged in transit, or incorrect. The items must be unused and in original packaging.</p>
      
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-slate-900">Customized Products</h2>
      <p className="mb-4 text-slate-700 leading-relaxed">Due to the personalized nature of our corporate gifts, <strong>custom-branded products cannot be returned or refunded</strong> unless there is a clear manufacturing defect or a deviation from the approved digital proof.</p>
      
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-slate-900">Refund Processing</h2>
      <p className="mb-4 text-slate-700 leading-relaxed">Approved refunds will be processed within 5-7 business days to the original payment method. For corporate bank transfers, processing times may vary based on banking cycles.</p>
    `
  },
  {
    route: 'shipping-delivery',
    title: 'Shipping & Delivery',
    desc: 'Information on Sterling shipping timelines and logistics.',
    content: `
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-slate-900">Delivery Timelines</h2>
      <p className="mb-4 text-slate-700 leading-relaxed">Standard, unbranded products generally dispatch within 2-4 business days. Custom-branded bulk orders require 7-14 business days for production after artwork approval, plus transit time.</p>
      
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-slate-900">Shipping Locations</h2>
      <p className="mb-4 text-slate-700 leading-relaxed">We ship PAN India across all major cities and pin codes. International shipping is available upon request for specific corporate orders.</p>
      
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-slate-900">Tracking & Coordination</h2>
      <p className="mb-4 text-slate-700 leading-relaxed">For bulk event deliveries or multi-location employee shipments, our dedicated logistics team provides centralized tracking and coordination to ensure on-time arrival.</p>
    `
  },
  {
    route: 'faq',
    title: 'Frequently Asked Questions',
    desc: 'Answers to common questions about Sterling corporate gifting.',
    content: `
      <div className="space-y-6 mt-8">
        <div className="pb-4 border-b">
          <h3 className="font-semibold text-lg text-slate-900">What is your Minimum Order Quantity (MOQ)?</h3>
          <p className="text-slate-600 mt-2 leading-relaxed">Standard MOQs depend on the product and customization type. Generally, custom-branded items require a minimum of 25-50 units.</p>
        </div>
        <div className="pb-4 border-b">
          <h3 className="font-semibold text-lg text-slate-900">Do you offer custom branding?</h3>
          <p className="text-slate-600 mt-2 leading-relaxed">Yes, we offer laser engraving, screen printing, UV printing, and custom packaging boxes tailored to your brand identity.</p>
        </div>
        <div className="pb-4 border-b">
          <h3 className="font-semibold text-lg text-slate-900">Can I order a sample before placing a bulk order?</h3>
          <p className="text-slate-600 mt-2 leading-relaxed">Absolutely. Paid samples are available for quality checking. Sample costs are often adjusted against the final bulk invoice.</p>
        </div>
        <div className="pb-4 border-b">
          <h3 className="font-semibold text-lg text-slate-900">Do you provide GST invoices for corporate purchases?</h3>
          <p className="text-slate-600 mt-2 leading-relaxed">Yes, we provide valid GST invoices for all B2B orders to enable input tax credit claims.</p>
        </div>
      </div>
    `
  },
  {
    route: 'custom-branding',
    title: 'Custom Branding',
    desc: 'Personalize corporate gifts with your logo and brand colors.',
    content: `
      <p className="text-lg mb-6 text-slate-700 leading-relaxed">Transform premium products into powerful brand ambassadors. Our custom branding services ensure your corporate gifts make a lasting, professional impression.</p>
      
      <div className="grid gap-6 md:grid-cols-2 mt-8 mb-8">
        <div className="p-6 border rounded-lg bg-white shadow-sm">
          <h3 className="font-semibold text-xl mb-2 text-slate-900">Logo Printing & Engraving</h3>
          <p className="text-slate-700">We utilize precision laser engraving, vibrant UV printing, and classic screen printing to seamlessly integrate your logo onto our products.</p>
        </div>
        <div className="p-6 border rounded-lg bg-white shadow-sm">
          <h3 className="font-semibold text-xl mb-2 text-slate-900">Custom Packaging</h3>
          <p className="text-slate-700">Elevate the unboxing experience with customized gift boxes, personalized sleeves, and branded ribbon tied finishes.</p>
        </div>
        <div className="p-6 border rounded-lg bg-white shadow-sm">
          <h3 className="font-semibold text-xl mb-2 text-slate-900">Brand Colors</h3>
          <p className="text-slate-700">We strictly adhere to your corporate brand guidelines, ensuring accurate color matching across all printed materials.</p>
        </div>
        <div className="p-6 border rounded-lg bg-white shadow-sm">
          <h3 className="font-semibold text-xl mb-2 text-slate-900">Minimum Order Quantities</h3>
          <p className="text-slate-700">Customization is available on bulk orders. Typical MOQs start at just 25 units for standard branding options.</p>
        </div>
      </div>
      
      <div className="mt-8 flex gap-4">
        <Link href="/request-a-quote" className="inline-flex h-10 items-center justify-center rounded-md bg-slate-900 px-8 text-sm font-medium text-white shadow hover:bg-slate-800 transition-colors">
          Start Customization
        </Link>
      </div>
    `
  },
  {
    route: 'bulk-orders',
    title: 'Bulk Corporate Orders',
    desc: 'Streamlined procurement for large-volume corporate gifting.',
    content: `
      <p className="text-lg mb-6 text-slate-700 leading-relaxed">Sterling makes large-volume procurement effortless. From tiered pricing to dedicated account management, we handle the complexities of bulk orders so you don't have to.</p>
      
      <ul className="list-disc pl-6 space-y-4 mb-8 text-slate-700 leading-relaxed">
        <li><strong>Bulk Pricing Tiers:</strong> Enjoy significant volume discounts as your order quantity increases.</li>
        <li><strong>Dedicated Account Management:</strong> A single point of contact to assist you from product curation to final delivery.</li>
        <li><strong>Procurement Support:</strong> We provide detailed quotations, valid GST invoices, and compliance documentation.</li>
        <li><strong>Delivery Coordination:</strong> Seamless dispatch and tracking for large shipments across multiple corporate offices.</li>
      </ul>
      
      <div className="mt-8">
        <Link href="/request-a-quote" className="inline-flex h-10 items-center justify-center rounded-md bg-slate-900 px-8 text-sm font-medium text-white shadow hover:bg-slate-800 transition-colors">
          Request Bulk Pricing
        </Link>
      </div>
    `
  },
  {
    route: 'employee-gifting',
    title: 'Employee Gifting Programs',
    desc: 'Celebrate your team with premium, thoughtful corporate gifts.',
    content: `
      <p className="text-lg mb-6 text-slate-700 leading-relaxed">Show genuine appreciation to your workforce. Our curated employee gifting solutions boost morale, improve retention, and foster a strong company culture.</p>
      
      <div className="grid gap-6 md:grid-cols-2 mt-8 mb-8 text-slate-700">
        <div className="p-6 border rounded-lg bg-white shadow-sm">
          <h3 className="font-semibold text-xl mb-2 text-slate-900">Welcome Kits</h3>
          <p>Make a stellar first impression on new hires with comprehensive, branded onboarding kits.</p>
        </div>
        <div className="p-6 border rounded-lg bg-white shadow-sm">
          <h3 className="font-semibold text-xl mb-2 text-slate-900">Festival Gifting</h3>
          <p>Curated hampers and premium gifts to celebrate Diwali, Christmas, and other major festivals.</p>
        </div>
        <div className="p-6 border rounded-lg bg-white shadow-sm">
          <h3 className="font-semibold text-xl mb-2 text-slate-900">Work Anniversaries</h3>
          <p>Recognize loyalty and milestones with tiered, personalized rewards for long-serving employees.</p>
        </div>
        <div className="p-6 border rounded-lg bg-white shadow-sm">
          <h3 className="font-semibold text-xl mb-2 text-slate-900">Performance Rewards</h3>
          <p>Premium incentives to celebrate exceptional achievements and motivate your high-performers.</p>
        </div>
      </div>
      
      <div className="mt-8">
        <Link href="/request-a-quote" className="inline-flex h-10 items-center justify-center rounded-md bg-slate-900 px-8 text-sm font-medium text-white shadow hover:bg-slate-800 transition-colors">
          Curate Employee Gifts
        </Link>
      </div>
    `
  },
  {
    route: 'event-gifts',
    title: 'Event & Conference Gifts',
    desc: 'Memorable merchandise and kits for corporate events.',
    content: `
      <p className="text-lg mb-6 text-slate-700 leading-relaxed">Leave a lasting impression on your attendees. We provide high-quality, customized merchandise tailored for seminars, product launches, and major corporate events.</p>
      
      <ul className="list-disc pl-6 space-y-4 mb-8 text-slate-700 leading-relaxed">
        <li><strong>Conference Kits:</strong> Cohesive sets including branded notebooks, pens, lanyards, and drinkware.</li>
        <li><strong>Promotional Merchandise:</strong> Cost-effective, high-utility items designed for mass distribution and brand visibility.</li>
        <li><strong>Client & VIP Events:</strong> Exclusive, premium luxury gifts curated for executives and high-value clients.</li>
        <li><strong>Launch Events:</strong> Unique, thematic gifts that align perfectly with your new product or brand identity.</li>
      </ul>
      
      <div className="mt-8">
        <Link href="/request-a-quote" className="inline-flex h-10 items-center justify-center rounded-md bg-slate-900 px-8 text-sm font-medium text-white shadow hover:bg-slate-800 transition-colors">
          Plan Event Gifting
        </Link>
      </div>
    `
  }
];

const appDir = path.join(process.cwd(), 'src/app');

pages.forEach(p => {
  const routePath = path.join(appDir, p.route);
  if (!fs.existsSync(routePath)) {
    fs.mkdirSync(routePath, { recursive: true });
  }

  const fileContent = `import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '${p.title} | Sterling',
  description: '${p.desc}',
};

export default function ${p.route.replace(/-./g, x=>x[1].toUpperCase()).replace(/^./, x=>x.toUpperCase())}Page() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24 max-w-4xl min-h-[80vh]">
      <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8 tracking-tight">${p.title}</h1>
      <div className="prose prose-slate max-w-none">
        ${p.content}
        ${companyDetails}
      </div>
    </div>
  );
}
`;

  fs.writeFileSync(path.join(routePath, 'page.tsx'), fileContent);
});

console.log('Pages generated successfully!');
