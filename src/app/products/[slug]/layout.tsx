import type { Metadata } from "next";

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const params = await props.params;
  const slug = params.slug;
  const title = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  return {
    title: `${title} | Sterling Corporate Gifts`,
    description: `Premium ${title} for corporate gifting and enterprise bulk orders.`,
    openGraph: {
      title: `${title} | Sterling Corporate Gifts`,
      description: `Premium ${title} for corporate gifting and enterprise bulk orders.`,
    },
  };
}

export default function ProductLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
