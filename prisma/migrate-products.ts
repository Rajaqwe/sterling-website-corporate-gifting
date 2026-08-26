import { prisma } from '../src/lib/prisma/client';
import { CATEGORIES, PRODUCTS } from '../src/lib/constants/products';

async function main() {
  console.log('Starting product migration...');

  // 1. Migrate Categories
  console.log(`Migrating ${CATEGORIES.length} categories...`);
  for (const cat of CATEGORIES) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {
        name: cat.name,
        description: cat.description || '',
      },
      create: {
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        description: cat.description || '',
      },
    });
  }

  // 2. Migrate Products
  console.log(`Migrating ${PRODUCTS.length} products...`);
  for (const prod of PRODUCTS) {
    // Determine category id (the mock products use categoryId like 'cat-1', we need the real DB id if it differs, but we forced the id above to be the same)
    
    await prisma.product.upsert({
      where: { slug: prod.slug },
      update: {
        name: prod.title,
        sku: prod.id, 
        categoryId: prod.categoryId!,
        price: prod.startingPrice,
        stockQuantity: 100,
        minimumOrderQuantity: prod.moq,
        status: 'ACTIVE',
        description: prod.description,
        isFeatured: prod.isFeatured || prod.featured || false,
        leadTimeDays: 7,
      },
      create: {
        id: prod.id,
        name: prod.title,
        slug: prod.slug,
        sku: prod.id, 
        categoryId: prod.categoryId!,
        price: prod.startingPrice,
        stockQuantity: 100,
        minimumOrderQuantity: prod.moq,
        status: 'ACTIVE',
        description: prod.description,
        isFeatured: prod.isFeatured || prod.featured || false,
        leadTimeDays: 7,
      },
    });

    // 3. Migrate Images as ProductMedia
    if (prod.images && prod.images.length > 0) {
      await prisma.productMedia.deleteMany({
        where: { productId: prod.id }
      });
      
      const mediaData = prod.images.map((img: string, idx: number) => ({
        productId: prod.id,
        url: img,
        type: 'IMAGE' as const,
        isPrimary: idx === 0,
        sortOrder: idx
      }));
      
      await prisma.productMedia.createMany({
        data: mediaData
      });
    }
  }

  console.log('Migration completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
