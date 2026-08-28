const fs = require('fs');

const BASE_URL = 'http://127.0.0.1:3000';
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

async function runFastAudit() {
  let report = `# Sterling Website Audit Report\n\n`;
  report += `*Audit Date: ${new Date().toISOString()}*\n\n`;
  
  let hasAnyErrors = false;

  for (const route of ROUTES) {
    const url = `${BASE_URL}${route}`;
    console.log(`Auditing: ${url}`);
    report += `## Route: \`${route}\`\n`;

    const errors = [];
    const missingImages = [];

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 215000);
      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (!response.ok) {
         errors.push(`Page returned HTTP ${response.status} ${response.statusText}`);
      }
      
      const html = await response.text();
      
      // Extract all image src using regex
      const imageSources = new Set();
      const imgRegex = /<img[^>]+src=["']([^"']+)["']/g;
      let match;
      while ((match = imgRegex.exec(html)) !== null) {
        let src = match[1];
        if (src && !src.startsWith('data:')) {
           // Handle relative URLs
           if (src.startsWith('/')) {
             src = `${BASE_URL}${src}`;
           } else if (!src.startsWith('http')) {
             src = `${BASE_URL}/${src}`;
           }
           imageSources.add(src);
        }
      }
      
      // Check for any obvious server error text
      if (html.includes('Application error: a client-side exception has occurred')) {
        errors.push(`Client-side Next.js exception detected in HTML.`);
      }
      if (html.includes('Internal Server Error')) {
        errors.push(`Server error detected in HTML.`);
      }

      // Check images
      for (const src of imageSources) {
        try {
          const imgController = new AbortController();
          const imgTimeoutId = setTimeout(() => imgController.abort(), 15000);
          
          let imgRes = await fetch(src, { method: 'HEAD', signal: imgController.signal });
          clearTimeout(imgTimeoutId);

          if (!imgRes.ok && imgRes.status !== 405) {
             const getController = new AbortController();
             const getTimeoutId = setTimeout(() => getController.abort(), 15000);
             imgRes = await fetch(src, { signal: getController.signal });
             clearTimeout(getTimeoutId);
             
             if (!imgRes.ok) {
               missingImages.push(`Broken image link: ${src} (HTTP ${imgRes.status})`);
             }
          }
        } catch (e) {
          missingImages.push(`Failed to fetch image: ${src} (${e.message})`);
        }
      }

    } catch (err) {
      errors.push(`Navigation/fetch failed: ${err.message}`);
    }

    if (errors.length === 0 && missingImages.length === 0) {
      report += `✅ No page load errors or broken images detected.\n\n`;
    } else {
      hasAnyErrors = true;
      if (errors.length > 0) {
        report += `### Page Errors:\n`;
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

  fs.writeFileSync('WEBSITE_AUDIT_REPORT.md', report);
  console.log("Audit complete. Report generated.");
}

runFastAudit().catch(console.error);
