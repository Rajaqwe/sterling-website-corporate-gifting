'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function ProductTabs({ productId }: { productId: string }) {
 const pathname = usePathname();
 
 const tabs = [
 { name: 'General', path: `/admin/products/${productId}` },
 { name: 'Variants', path: `/admin/products/${productId}/variants` },
 { name: 'Bulk Pricing', path: `/admin/products/${productId}/pricing` },
 { name: 'Reviews', path: `/admin/products/${productId}/reviews` },
 ];

 return (
 <div className="border-b mb-6 flex overflow-x-auto">
 {tabs.map(tab => {
 const isActive = pathname === tab.path;
 return (
 <Link
 key={tab.path}
 href={tab.path}
 className={`px-4 py-2 border-b-2 text-sm font-medium whitespace-nowrap ${
 isActive 
 ? 'border-black text-black dark:border-white dark:text-white' 
 : 'border-transparent text-muted-foreground hover:text-black dark:hover:text-white'
 }`}
 >
 {tab.name}
 </Link>
 );
 })}
 </div>
 );
}
