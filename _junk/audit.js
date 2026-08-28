const { chromium } = require('@playwright/test');
const fs = require('fs');

const ROUTES = [
  '/',
  '/about',
  '/corporate-gifts',
  '/gift-collections',
  '/personalised-gifts',
  '/request-a-quote',
  '/contact',
  '/faq'
];

async function runAudit() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  // Don't hang on network requests
  page.setDefaultNavigationTimeout(10000);

  let report = `# Sterling Website Audit Report\n\n`;
  report += `*Audit Date: ${new Date().toISOString()}*\n\n`;

  for (const route of ROUTES) {
    const url = `http://localhost:3000${route}`;
    console.log(`Auditing: ${url}`);
    report += `## Route: \`${route}\`\n`;

    const errors = [];
    const missingImages = [];

    const consoleHandler = msg => {
      if (msg.type() === 'error') {
        const text = msg.text();
        if (!text.includes('Failed to load resource: the server responded with a status of 404')) {
           errors.push(`Console Error: ${text}`);
        }
      }
    };
    
    const pageErrorHandler = err => {
      errors.push(`Page Exception: ${err.message}`);
    };

    page.on('console', consoleHandler);
    page.on('pageerror', pageErrorHandler);

    try {
      const response = await page.goto(url, { waitUntil: 'domcontentloaded' });
      
      if (response && !response.ok()) {
         errors.push(`Failed to load page. Status: ${response.status()}`);
      }
      
      // Wait a moment for images to render
      await page.waitForTimeout(2000);

      // Check for broken images
      const images = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('img')).map(img => {
          return {
            src: img.src,
            alt: img.alt,
            complete: img.complete,
            naturalWidth: img.naturalWidth
          };
        });
      });

      images.forEach(img => {
        if (!img.src || img.src.startsWith('data:')) return;
        if (!img.complete || img.naturalWidth === 0) {
          missingImages.push(`Broken image: ${img.src} (alt: "${img.alt}")`);
        }
      });

    } catch (err) {
      errors.push(`Navigation failed: ${err.message}`);
    }

    page.off('console', consoleHandler);
    page.off('pageerror', pageErrorHandler);

    if (errors.length === 0 && missingImages.length === 0) {
      report += `✅ No errors or broken images detected.\n\n`;
    } else {
      if (errors.length > 0) {
        report += `### Console & Page Errors:\n`;
        errors.forEach(e => report += `- ${e}\n`);
        report += `\n`;
      }
      if (missingImages.length > 0) {
        report += `### Broken Images:\n`;
        missingImages.forEach(img => report += `- ${img}\n`);
        report += `\n`;
      }
    }
  }

  await browser.close();

  fs.writeFileSync('WEBSITE_AUDIT_REPORT.md', report);
  console.log("Audit complete.");
}

runAudit().catch(console.error);
