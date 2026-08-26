# Sterling Admin Guide: Managing Products

Welcome to the Sterling Product Management Guide! This document is designed for administrators and catalog managers who need to add, update, and manage the product offerings on the Sterling B2B Corporate Gifting platform.

You don't need any technical or programming knowledge to use this guide. Just follow the step-by-step instructions below.

---

## Table of Contents
1. [Overview of the Product Dashboard](#overview)
2. [How to Add a New Product (Step-by-Step)](#how-to-add-a-new-product)
3. [Managing Existing Products](#managing-existing-products)
   - [Editing a Product](#how-to-edit-a-product)
   - [Duplicating a Product](#how-to-duplicate-a-product)
   - [Archiving a Product](#how-to-archive-a-product)
4. [Bulk Operations](#bulk-operations)
   - [Bulk Import Products](#how-to-bulk-import-products)
   - [Export Products](#how-to-export-products)
5. [Tips & Best Practices](#tips--best-practices)
6. [Frequently Asked Questions](#faq)

---

## 1. Overview of the Product Dashboard <a name="overview"></a>

Before we begin, let's get familiar with the central hub for all your catalog tasks. 

> [!NOTE]
> The Product Dashboard is your master list. From here, you can see every item currently in your store, its stock status, price, and whether it is visible to customers (Published) or hidden (Draft/Archived).

[Screenshot: The main Products dashboard showing a list of products, the search bar, filters on the left, and the 'Add Product' button in the top right.]

From this screen, you can:
- **Search** for products by name or SKU.
- **Filter** products by category, stock status, or price.
- **Add** new products individually or in bulk.
- **Select** multiple products to perform actions on them at once.

---

## 2. How to Add a New Product <a name="how-to-add-a-new-product"></a>

Adding a product involves filling out several tabs of information. Take your time to ensure accuracy, as this information is exactly what your corporate clients will see.

### Step 1: Open the Admin Dashboard
1. Open your web browser (Google Chrome, Safari, or Edge).
2. Go to your Sterling website URL.
3. Add `/admin` to the end of the URL (for example, `https://sterling.com/admin`).
4. Log in using your assigned admin email address and password.

[Screenshot: The Admin Login screen showing email and password fields.]

### Step 2: Navigate to Products
1. Look at the left sidebar menu.
2. Click on **Products** (usually indicated by a box or tag icon).
3. Click the bright **+ Add Product** button located in the top right corner of the screen.

[Screenshot: The left sidebar highlighted on the 'Products' tab, and an arrow pointing to the '+ Add Product' button.]

### Step 3: Fill in General Information
This is the basic identity of your product.

1. **Product Name** - Enter a clear, descriptive name. 
   - *Example:* "Premium Leather Executive Gift Set"
2. **SKU (Stock Keeping Unit)** - Enter a unique product code. 
   - *Example:* "STER-EX-001"
   - > [!IMPORTANT] 
     > The SKU must be unique for every single product in your store. The system will alert you if you try to use a SKU that already exists.
3. **Category** - Select the best fitting product category from the dropdown menu (e.g., Drinkware, Stationery, Tech Gadgets).
4. **Short Description** - Write a brief 1-2 sentence description. This appears in small product cards across the site.
5. **Full Description** - Write the detailed product description. Include all important information, selling points, and what makes it a great corporate gift.

[Screenshot: The 'General Information' tab filled out with sample text for an executive gift set.]

### Step 4: Upload Images
High-quality images are crucial for B2B sales.

1. Click the **Media** tab at the top of the form.
2. Click the **+ Upload Images** button, or simply drag and drop your image files from your computer into the dotted box.
3. You can upload multiple images at the same time.
   - *Supported formats:* JPG, PNG, WebP
   - *Maximum file size:* 5MB per image
4. The first image you upload will automatically become the **primary/thumbnail image** (the main picture customers see).
5. To change the primary image, hover over a different image and click the **Star** icon.
6. To reorder images, click, drag, and drop them into your desired sequence.
7. **Add alt text:** Click on each image to add "alt text" (a brief description of what the image shows, e.g., "Open view of the leather notebook"). This helps visually impaired users and improves Google search rankings.

[Screenshot: The 'Media' tab showing a drag-and-drop zone and several uploaded images, with one marked by a star as the primary image.]

### Step 5: Upload Videos (Optional)
Videos can showcase product features or custom branding examples.

1. In the same Media tab, click **+ Upload Videos**.
   - *Supported formats:* MP4, WebM
   - *Maximum file size:* 100MB per video
2. Add a brief caption and alt text for each video once uploaded.

### Step 6: Set Pricing
Pricing is vital for B2B buyers who order in volume.

1. Click the **Pricing** tab.
2. **Price** - Enter the standard selling price for a single unit (e.g., ₹2,499).
3. **Compare at Price** (optional) - If the product is on sale, enter the original price here. It will show with a strikethrough (e.g., ~~₹2,999~~ ₹2,499).
4. **Minimum Order Quantity (MOQ)** - Enter the smallest number of units a customer is allowed to order (e.g., 50).
5. **Bulk Pricing** (optional) - Click **+ Add Pricing Tier** to set quantity-based discounts. 
   - *Tier 1:* 1-49 units at ₹2,499
   - *Tier 2:* 50-99 units at ₹2,299
   - *Tier 3:* 100-499 units at ₹1,999
   - *Tier 4:* 500+ units (Contact for quote)

> [!TIP]
> Bulk pricing automatically updates the price for the customer at checkout based on how many items they add to their cart.

[Screenshot: The 'Pricing' tab showing the standard price, MOQ field, and a list of bulk pricing tiers.]

### Step 7: Set Inventory
Manage how stock and delivery times are communicated to clients.

1. Click the **Inventory** tab.
2. **Stock Quantity** - Enter how many physical units you currently have available in the warehouse.
3. **Stock Status** - Choose from the dropdown:
   - *In Stock*
   - *Low Stock*
   - *Out of Stock*
   - *Made to Order*
4. **Lead Time** - Enter your standard delivery time in business days for blank (unbranded) items (e.g., "7-10 days").
5. **Custom Branding Lead Time** - Enter the delivery time required when a client requests logo printing or engraving (e.g., "12-15 days").

### Step 8: Add Variants (Optional)
Use this if the product comes in different versions (like sizes or colors).

1. Click the **Variants** tab.
2. Click **+ Add Variant**.
3. Choose the variant type from the list (e.g., Color, Size, Packaging Type).
4. Add the specific options separated by a comma or the enter key (e.g., Black, Blue, Brown).
5. Once created, a table will appear. You can give each specific option (like the "Blue" version) its own unique SKU, price, and stock count if needed.

[Screenshot: The 'Variants' tab showing a table of Color variants (Black, Blue, Brown) with individual price and stock fields.]

### Step 9: Set Customization Options
This is a core feature for corporate gifting.

1. Click the **Customization** tab.
2. Check the boxes for which branding options are available for this specific product:
   - [x] Logo Printing (Screen Print)
   - [x] Laser Engraving
   - [x] UV Printing
   - [x] Custom Packaging / Sleeve
3. For each option you check, you can specify an additional cost (if any), a minimum quantity required for that specific branding, and added lead time.

### Step 10: Add Specifications
Specifications help buyers make informed decisions.

1. Click the **Specifications** tab.
2. Click **+ Add Specification**.
3. Enter the attribute name on the left and the value on the right:
   - *Material:* Premium Vegan Leather
   - *Dimensions:* 25 × 18 × 5 cm
   - *Weight:* 450g
   - *Color:* Midnight Black
   - *Warranty:* 1 Year Manufacturer Warranty

[Screenshot: The 'Specifications' tab displaying a clean list of key-value pairs like Material, Dimensions, and Weight.]

### Step 11: Set SEO Information
SEO (Search Engine Optimization) helps people find your products on Google.

1. Click the **SEO** tab.
2. **SEO Title** - This is the blue clickable link that appears in Google search results. It is auto-generated from your product name, but you can click to customize it.
3. **SEO Description** - This is the small paragraph shown in Google search results. Keep it between 150-160 characters for best results.
4. **URL Slug** - This is the actual web address for the product. It auto-generates (e.g., `premium-leather-executive-gift-set`), but you can manually shorten it if desired.

### Step 12: Save as Draft
1. If you aren't ready to show the product to customers yet, click the **Save Draft** button at the bottom of the page.
2. The product is saved in your database but is NOT visible on the live website.

### Step 13: Preview
1. Click the **Preview** button (usually a small eye icon next to the save button).
2. A new tab will open showing exactly how the product will look to your corporate clients.
3. Check the images, make sure the description formatting looks good, and verify the pricing tiers.
4. Try resizing your browser window to ensure it looks good on mobile devices too.

### Step 14: Publish
1. When you are 100% satisfied with the product, click the solid **Publish** button.
2. Congratulations! The product is now live, visible to customers, and ready to be purchased.

[Screenshot: A success message showing 'Product Published Successfully' at the top of the screen.]

---

## 3. Managing Existing Products <a name="managing-existing-products"></a>

### How to Edit a Product
Need to fix a typo or update a price?
1. Go to **Products** in the admin sidebar.
2. Find the product using the search bar or category filters.
3. Click directly on the product's name, or click the **Edit** button next to it.
4. Make your changes in any of the tabs.
5. Click **Save** (if it's a draft) or **Publish Updates** (if it's already live).

### How to Duplicate a Product
This is the fastest way to add a lot of similar products!
1. Find the product in the product list.
2. Click the **⋮** menu (three vertical dots) on the far right of the product row.
3. Click **Duplicate**.
4. The system will create an exact copy, but it will ask you for a NEW Product Name and a NEW SKU (since SKUs must be unique).
5. The new product will open in Draft mode. Update the necessary details (like changing the images if the new product is a different color).
6. Publish when ready.

[Screenshot: The 'Duplicate' option highlighted in the three-dot action menu on the product list.]

### How to Archive a Product
> [!CAUTION]
> Do not delete products if someone has already ordered them. Deleting a product can break historical order records. Always **Archive** instead!

1. Find the product in the product list.
2. Click the **⋮** menu (three dots).
3. Click **Archive**.
4. Confirm the action in the pop-up window.
5. Archived products are immediately hidden from the live website, but they are safely preserved in your database for your records.

---

## 4. Bulk Operations <a name="bulk-operations"></a>

If you need to add or update hundreds of products at once, use the Bulk Import/Export tools.

### How to Bulk Import Products

#### Step 1: Download the Template
1. Go to **Products** in the sidebar.
2. Click the **Bulk Upload** button at the top right.
3. Click **Download CSV Template**.
4. Open the downloaded file using Microsoft Excel, Apple Numbers, or Google Sheets.

#### Step 2: Fill in Product Data
1. Each row in the spreadsheet represents one product.
2. Do not change the column headers (row 1).
3. Fill in the required fields: `Product Name`, `SKU`, `Category`, and `Price`.
4. Follow the example data provided in the first few rows of the template.
5. Save the file. Make sure it saves as a `.csv` (Comma Separated Values) format, NOT as a standard Excel `.xlsx` file.

[Screenshot: A spreadsheet open in Microsoft Excel showing columns for SKU, Name, Price, and Category.]

#### Step 3: Prepare Images
To attach images in bulk, you need to name your image files perfectly so the system knows which image belongs to which product.
1. Name your image files using the exact SKU:
   - `STER-001-1.jpg` (This is Product STER-001, Primary Image 1)
   - `STER-001-2.jpg` (This is Product STER-001, Secondary Image 2)
   - `STER-002-1.jpg` (This is Product STER-002, Primary Image 1)
2. Put all these images into a single folder on your computer.

#### Step 4: Upload
1. Go back to the **Bulk Upload** page on your Admin Dashboard.
2. Upload your saved CSV spreadsheet file.
3. Next, upload or drag-and-drop all your renamed images into the media uploader box.
4. The system will automatically match the images to the correct products based on the SKUs.

#### Step 5: Validate
1. The system will process your file and show a "Validation Report".
2. Review the results. If you forgot a required field or used a duplicate SKU, it will show an error in red.
3. Fix any errors in your spreadsheet, save it, and re-upload if necessary.

#### Step 6: Import
1. Once validation shows 100% success, click the **Import Products** button.
2. Wait for the loading bar to complete. Do not close the browser window.
3. Once finished, you will see a success summary. You can now view your newly imported products in the main Products list!

### How to Export Products
Exporting is useful for doing mass inventory counts or doing bulk price updates.
1. Go to **Products**.
2. Click the **Export** button at the top.
3. Choose the **CSV** format.
4. The system will download a spreadsheet containing all your product data.
5. *Pro Tip:* To do bulk updates, simply export your products, open the file in Excel, change the prices or stock numbers, save it, and use the **Bulk Import** tool to re-upload it. The system will update the existing products based on their SKUs.

---

## 5. Tips & Best Practices <a name="tips--best-practices"></a>

To ensure your corporate gifting catalog looks premium and functions perfectly, keep these tips in mind:

- **Always add Alt Text:** When uploading images, taking 10 seconds to add descriptive alt text heavily boosts your SEO and helps visually impaired users.
- **Consistent Image Sizing:** For a clean, professional looking website, try to upload images that are all the same aspect ratio (e.g., all perfectly square, 1080x1080 pixels).
- **Clear Product Names:** Avoid using internal company jargon in the product title. Use names that clearly state what the item is.
- **Focus on Gifting Context:** In your descriptions, mention *why* this makes a good gift. (e.g., "Perfect for executive onboarding or year-end employee appreciation.")
- **Set Realistic Lead Times:** Corporate clients plan events around delivery dates. It is always better to over-estimate your custom branding lead times by 1-2 days than to deliver a late order.
- **Update Stock Regularly:** If you are not using an automated warehouse sync, make it a weekly habit to update your stock numbers to prevent clients from ordering out-of-stock items.
- **Use the Duplicate Feature:** Never start from scratch if you don't have to. If you are adding 5 different types of water bottles, create the first one perfectly, and then duplicate it 4 times!

---

## 6. Frequently Asked Questions <a name="faq"></a>

**Q: I accidentally published a product before it was ready. What do I do?**
A: Don't panic! Simply find the product in your Products list, click into it, and change the status from "Published" back to "Draft". Click Save. It will instantly be removed from the live website.

**Q: Why isn't my image uploading?**
A: Check the file size and type. The system only accepts JPG, PNG, and WebP files under 5MB. If you have a massive print-quality photo from a photographer, you may need to compress it first using a free online image compressor.

**Q: How do I arrange the order in which products appear on the main website?**
A: Product order is primarily handled within the "Collections" or "Categories" settings, rather than the individual product page. Navigate to the Categories tab in the sidebar to drag and drop product order.

**Q: Can I set a product to only be visible to a specific corporate client?**
A: Yes. If you are setting up a private company store (e.g., a custom portal for "Acme Corp"), you can assign the product exclusively to their company profile in the "Visibility" settings tab.

**Q: What is the difference between SKU and Barcode?**
A: SKU (Stock Keeping Unit) is your internal Sterling code used to track the product on the website. A Barcode (like a UPC or EAN) is the scannable code physically printed on the product's box. You must have a SKU, but Barcodes are optional.

---

*End of Document. If you require technical support or encounter an error not covered in this guide, please contact the Sterling IT support desk.*
