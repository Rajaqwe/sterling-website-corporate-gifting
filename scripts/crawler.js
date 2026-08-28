const { chromium } = require('playwright');
const fs = require('fs');

const URLS_TO_VISIT = [
  'http://localhost:3000/',
  'http://localhost:3000/corporate-gifts',
  'http://localhost:3000/about',
  'http://localhost:3000/faq',
  'http://localhost:3000/contact',
  'http://localhost:3000/login',
  'http://localhost:3000/register'
];

async function runAudit() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  const report = {
    errors: [],
    brokenImages: [],
    pageStatuses: {}
  };

  page.on('console', msg => {
    if (msg.type() === 'error') {
      report.errors.push(`[Console Error] ${msg.text()}`);
    }
  });

  page.on('pageerror', error => {
    report.errors.push(`[Page Error] ${error.message}`);
  });

  page.on('requestfailed', request => {
    const type = request.resourceType();
    if (type === 'image') {
      report.brokenImages.push(request.url());
    } else {
      report.errors.push(`[Failed Request] ${request.url()} - ${request.failure()?.errorText}`);
    }
  });

  for (const url of URLS_TO_VISIT) {
    try {
      console.log(`Visiting ${url}...`);
      const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
      report.pageStatuses[url] = response.status();
      
      // Look for broken images explicitly by querying img tags and checking naturalWidth
      const imgChecks = await page.evaluate(() => {
        const imgs = Array.from(document.querySelectorAll('img'));
        return imgs.map(img => ({
          src: img.src,
          broken: img.naturalWidth === 0
        }));
      });
      
      imgChecks.forEach(img => {
        if (img.broken && !report.brokenImages.includes(img.src)) {
          report.brokenImages.push(`Broken NaturalWidth: ${img.src}`);
        }
      });

    } catch (err) {
      report.pageStatuses[url] = 'Failed to load';
      report.errors.push(`[Navigation Error] ${url}: ${err.message}`);
    }
  }

  await browser.close();
  
  fs.writeFileSync('audit-report.json', JSON.stringify(report, null, 2));
  console.log('Audit complete, report saved to audit-report.json');
}

runAudit();
