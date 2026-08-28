import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding demo data...');

  // 1. Users & Companies (Customers)
  const companies = [
    { name: 'TechFlow Solutions', slug: 'techflow-solutions', industry: 'Technology' },
    { name: 'Global Logistics Corp', slug: 'global-logistics-corp', industry: 'Logistics' },
    { name: 'Innovate Health', slug: 'innovate-health', industry: 'Healthcare' },
    { name: 'Apex Financial', slug: 'apex-financial', industry: 'Finance' },
    { name: 'Creative Media Group', slug: 'creative-media-group', industry: 'Media' },
  ];

  const createdCompanies = [];
  for (const c of companies) {
    const company = await prisma.company.upsert({
      where: { slug: c.slug },
      update: {},
      create: {
        name: c.name,
        slug: c.slug,
        industry: c.industry,
        website: `https://${c.slug}.example.com`,
        isActive: true
      }
    });
    createdCompanies.push(company);
  }

  // Creating some users and attaching them to companies
  const demoUsers = [
    { email: 'sarah.j@techflow.example.com', fullName: 'Sarah Jenkins', role: 'CUSTOMER', companyIndex: 0 },
    { email: 'm.chen@global.example.com', fullName: 'Michael Chen', role: 'CUSTOMER', companyIndex: 1 },
    { email: 'elena.r@innovate.example.com', fullName: 'Elena Rodriguez', role: 'CUSTOMER', companyIndex: 2 },
    { email: 'd.smith@apex.example.com', fullName: 'David Smith', role: 'CUSTOMER', companyIndex: 3 },
    { email: 'l.taylor@creative.example.com', fullName: 'Laura Taylor', role: 'CUSTOMER', companyIndex: 4 },
  ];

  const createdUsers = [];
  for (const u of demoUsers) {
    const user = await prisma.user.upsert({
      where: { email: u.email },
      update: {},
      create: {
        email: u.email,
        fullName: u.fullName,
        role: u.role as any,
        isActive: true
      }
    });
    createdUsers.push(user);
    
    // Link to company
    await prisma.companyMember.upsert({
      where: {
        companyId_userId: {
          companyId: createdCompanies[u.companyIndex].id,
          userId: user.id
        }
      },
      update: {},
      create: {
        companyId: createdCompanies[u.companyIndex].id,
        userId: user.id,
        role: 'COMPANY_ADMIN',
        isActive: true
      }
    });
  }

  // 2. Categories
  const categoryNames = ['Executive Gifts', 'Tech Gadgets', 'Drinkware', 'Stationery', 'Wellness Kits'];
  const createdCategories = [];
  for (const cat of categoryNames) {
    const category = await prisma.category.upsert({
      where: { slug: cat.toLowerCase().replace(/\s+/g, '-') },
      update: {},
      create: {
        name: cat,
        slug: cat.toLowerCase().replace(/\s+/g, '-'),
        isActive: true
      }
    });
    createdCategories.push(category);
  }

  // 3. Products
  const products = [
    { name: 'Premium Leather Padfolio', sku: 'PLP-001', price: 3500, stock: 150, categoryId: createdCategories[3].id },
    { name: 'Noise-Cancelling Headphones', sku: 'NCH-002', price: 12500, stock: 45, categoryId: createdCategories[1].id },
    { name: 'Insulated Copper Vacuum Tumbler', sku: 'ICV-003', price: 1800, stock: 300, categoryId: createdCategories[2].id },
    { name: 'Smart Wireless Charger', sku: 'SWC-004', price: 2200, stock: 120, categoryId: createdCategories[1].id },
    { name: 'Executive Pen & Notebook Set', sku: 'EPN-005', price: 1500, stock: 250, categoryId: createdCategories[0].id },
    { name: 'Aromatherapy Diffuser Set', sku: 'ADS-006', price: 3200, stock: 85, categoryId: createdCategories[4].id },
  ];

  const createdProducts = [];
  for (const p of products) {
    const product = await prisma.product.upsert({
      where: { sku: p.sku },
      update: {},
      create: {
        name: p.name,
        slug: p.sku.toLowerCase(),
        sku: p.sku,
        price: p.price,
        stockQuantity: p.stock,
        status: 'ACTIVE',
        categoryId: p.categoryId
      }
    });
    createdProducts.push(product);
  }

  // Create a generic address for orders
  const address = await prisma.address.upsert({
    where: { id: 'demo-address-1' },
    update: {},
    create: {
      id: 'demo-address-1',
      label: 'HQ',
      fullName: 'Demo Address',
      phone: '1234567890',
      addressLine1: '123 Demo St',
      city: 'Mumbai',
      state: 'MH',
      postalCode: '400001',
      country: 'India',
      type: 'BILLING'
    }
  });

  // 4. Orders
  const orderStatuses = ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED'];
  for (let i = 0; i < 8; i++) {
    const user = createdUsers[i % createdUsers.length];
    const company = createdCompanies[i % createdCompanies.length];
    const product = createdProducts[i % createdProducts.length];
    const qty = (i + 1) * 25;
    
    const orderId = `ORD-2024-${1000 + i}`;
    
    const existingOrder = await prisma.order.findUnique({ where: { id: orderId } });
    if (!existingOrder) {
      const subtotal = Number(product.price) * qty;
      await prisma.order.create({
        data: {
          id: orderId,
          orderNumber: orderId,
          user: { connect: { id: user.id } },
          company: { connect: { id: company.id } },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          status: orderStatuses[i % orderStatuses.length] as any,
          subtotal: subtotal,
          tax: subtotal * 0.18,
          shippingCost: 500,
          discount: 0,
          total: subtotal + (subtotal * 0.18) + 500,
          shippingAddress: { connect: { id: address.id } },
          billingAddress: { connect: { id: address.id } },
          items: {
            create: [
              {
                productId: product.id,
                productName: product.name,
                sku: product.sku,
                quantity: qty,
                unitPrice: product.price,
                totalPrice: subtotal
              }
            ]
          }
        }
      });
    }
  }

  // 5. Quotes
  const quoteStatuses = ['NEW', 'REVIEWING', 'CONTACTED', 'APPROVED', 'REJECTED'];
  for (let i = 0; i < 6; i++) {
    const user = createdUsers[i % createdUsers.length];
    const company = createdCompanies[i % createdCompanies.length];
    const product = createdProducts[(i+1) % createdProducts.length];
    const qty = (i + 5) * 50;
    
    const quoteNumber = `QR-2024-00${i+1}`;
    
    const existingQuote = await prisma.quoteRequest.findUnique({ where: { quoteNumber } });
    if (!existingQuote) {
      await prisma.quoteRequest.create({
        data: {
          id: `quote-${i}`,
          quoteNumber: quoteNumber,
          user: { connect: { id: user.id } },
          fullName: user.fullName || 'Demo User',
          companyName: company.name,
          workEmail: user.email,
          phone: '9876543210',
          numberOfRecipients: qty,
          quantity: qty,
          product: { connect: { id: product.id } },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          status: quoteStatuses[i % quoteStatuses.length] as any,
          budgetPerRecipient: Number(product.price) * 0.9,
          requiredDeliveryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          items: {
            create: [
              {
                productId: product.id,
                description: product.name,
                quantity: qty,
                unitPrice: product.price,
                totalPrice: Number(product.price) * qty
              }
            ]
          }
        }
      });
    }
  }
  
  console.log('Seeding completed.');
}

main().catch(e => {
  console.error(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});
