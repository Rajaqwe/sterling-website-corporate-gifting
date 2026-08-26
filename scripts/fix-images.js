const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const defaultImages = [
  "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1586816879360-004f5b0c51e3?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800"
];

async function main() {
  console.log("Checking products...");
  const products = await prisma.product.findMany({
    include: { media: true }
  });

  for (let i = 0; i < products.length; i++) {
    const p = products[i];
    if (p.media.length === 0) {
      await prisma.productMedia.create({
        data: {
          productId: p.id,
          type: "IMAGE",
          url: defaultImages[i % defaultImages.length],
          isPrimary: true,
          sortOrder: 0
        }
      });
      console.log(`Added image for ${p.name}`);
    }
  }
  console.log("Done!");
}

main().catch(console.error).finally(() => prisma.$disconnect());
