-- Sterling Corporate Gifting - Row Level Security (RLS) Policies
-- Run this script in the Supabase SQL Editor to enforce security on your database.

-- 1. Enable RLS on all relevant tables
ALTER TABLE "QuoteRequest" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Order" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Company" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "CompanyMember" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Address" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Invoice" ENABLE ROW LEVEL SECURITY;

-- 2. Policies for "QuoteRequest"
-- Users can only view and insert their own quotes.
CREATE POLICY "Users can view own quotes" ON "QuoteRequest"
FOR SELECT USING (auth.uid()::text = "userId");

CREATE POLICY "Users can insert own quotes" ON "QuoteRequest"
FOR INSERT WITH CHECK (auth.uid()::text = "userId");

CREATE POLICY "Users can update own quotes" ON "QuoteRequest"
FOR UPDATE USING (auth.uid()::text = "userId");

-- 3. Policies for "Order"
CREATE POLICY "Users can view own orders" ON "Order"
FOR SELECT USING (auth.uid()::text = "userId");

-- 4. Policies for "Address"
CREATE POLICY "Users can manage own addresses" ON "Address"
FOR ALL USING (auth.uid()::text = "userId");

-- 5. Policies for "Company"
-- A company is visible if the user is a member
CREATE POLICY "Users can view their companies" ON "Company"
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM "CompanyMember" 
    WHERE "CompanyMember"."companyId" = "Company"."id" 
    AND "CompanyMember"."userId" = auth.uid()::text
  )
);

-- 6. Policies for "CompanyMember"
-- Users can see other members in their company
CREATE POLICY "Users can view company members" ON "CompanyMember"
FOR SELECT USING (
  "companyId" IN (
    SELECT "companyId" FROM "CompanyMember" WHERE "userId" = auth.uid()::text
  )
);

-- 7. Policies for "Invoice"
CREATE POLICY "Users can view own invoices" ON "Invoice"
FOR SELECT USING (auth.uid()::text = "userId");

-- Note: The Prisma Client runs in the Node.js backend using the DATABASE_URL (postgres user), 
-- which bypasses RLS. These policies act as Defense-in-Depth for any future 
-- client-side queries made via Supabase anonymous/authenticated roles.
