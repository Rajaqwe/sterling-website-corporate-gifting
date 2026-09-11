import { getCartItems } from "./actions";
import { CartClient } from "./CartClient";

export const metadata = {
  title: "Your Cart | Sterling",
  description: "Review your corporate gifting selection",
  robots: { index: false, follow: false },
};

export default async function CartPage() {
  const res = await getCartItems();
  const initialItems = res.success && res.items ? res.items : [];

  return (
    <main className="min-h-screen bg-background pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <h1 className="text-3xl font-serif text-primary mb-8">Your Cart</h1>
        <CartClient initialItems={initialItems} />
      </div>
    </main>
  );
}
