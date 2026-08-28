const http = require('http');
const https = require('https');
const fs = require('fs');

const BASE = 'http://127.0.0.1:3000';

const ROUTES = [
  '/',
  '/about',
  '/corporate-gifts',
  '/gift-collections',
  '/personalised-gifts',
  '/request-a-quote',
  '/contact',
  '/faq',
];

function get(url, redirectCount = 0) {
  return new Promise((resolve, reject) => {
    if (redirectCount > 5) return reject(new Error('Too many redirects'));
    const lib = url.startsWith('https') ? https : http;
    const req = lib.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0', 'Accept': 'text/html,application/xhtml+xml' }
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        const next = res.headers.location.startsWith('http')
          ? res.headers.location
          : BASE + res.headers.location;
        return resolve(get(next, redirectCount + 1));
      }
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve({ status: res.statusCode, body: data, finalUrl: url }));
    });
    req.setTimeout(30000, () => { req.destroy(); reject(new Error('Timeout after 30s')); });
    req.on('error', reject);
  });
}

function checkAsset(url) {
  return new Promise((resolve) => {
    const lib = url.startsWith('https') ? https : http;
    const req = lib.request(url, { method: 'HEAD', headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      resolve({ status: res.statusCode, url });
    });
    req.setTimeout(10000, () => { req.destroy(); resolve({ status: 'TIMEOUT', url }); });
    req.on('error', () => resolve({ status: 'ERROR', url }));
    req.end();
  });
}

function extractImages(html, baseUrl) {
  const imgs = new Set();

  // <img src="...">
  const imgRe = /<img[^>]+src=["']([^"']+)["']/g;
  let m;
  while ((m = imgRe.exec(html)) !== null) {
    let src = m[1];
    if (src.startsWith('data:') || src.startsWith('/_next/')) continue;
    if (!src.startsWith('http')) src = BASE + (src.startsWith('/') ? src : '/' + src);
    imgs.add(src);
  }

  // Next.js Image srcSet
  const srcsetRe = /srcset=["']([^"']+)["']/g;
  while ((m = srcsetRe.exec(html)) !== null) {
    const parts = m[1].split(',');
    for (const part of parts) {
      let src = part.trim().split(' ')[0];
      if (!src || src.startsWith('data:') || src.startsWith('/_next/')) continue;
      if (!src.startsWith('http')) src = BASE + (src.startsWith('/') ? src : '/' + src);
      imgs.add(src);
    }
  }

  // background-image: url(...) — only in <style> tags, not in className attrs
  const bgRe = /url\(["']?([^"')]+)["']?\)/g;
  while ((m = bgRe.exec(html)) !== null) {
    let src = m[1];
    // Skip HTML-entity-encoded URLs (these are Tailwind bg-[url()] class attrs, not real broken imgs)
    if (src.includes('&#') || src.includes('&amp;')) continue;
    if (src.startsWith('data:') || src.startsWith('/_next/') || src.startsWith('blob:')) continue;
    if (!src.startsWith('http')) src = BASE + (src.startsWith('/') ? src : '/' + src);
    imgs.add(src);
  }

  return imgs;
}

function checkHtmlIssues(html, route) {
  const issues = [];

  if (html.includes('Application error') || html.includes('Unhandled Runtime Error')) {
    issues.push('❌ NEXT.JS RUNTIME ERROR detected in page HTML');
  }
  if (html.includes('Internal Server Error') && !html.includes('duration-500')) {
    issues.push('❌ Internal Server Error text found');
  }
  if (html.includes('undefined') && html.includes('TypeError')) {
    issues.push('⚠️ TypeError/undefined string found in HTML');
  }
  // Check for empty product grids
  if ((route === '/corporate-gifts' || route === '/gift-collections' || route === '/personalised-gifts') && html.includes('No products')) {
    issues.push('⚠️ "No products" text visible — product data may not be loading');
  }
  // Check for "Loading..." stuck states
  if (html.includes('Loading...') && html.length < 5000) {
    issues.push('⚠️ Page may be stuck in a loading state');
  }

  return issues;
}

async function run() {
  const report = [];
  report.push('# Sterling Website Full Audit Report');
  report.push(`*Run at: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}*`);
  report.push('');

  let totalBroken = 0;
  let totalErrors = 0;

  for (const route of ROUTES) {
    const url = BASE + route;
    console.log(`\nAuditing ${route}...`);
    report.push(`## Page: \`${route}\``);

    let res;
    try {
      res = await get(url);
    } catch (e) {
      report.push(`❌ **FATAL – Could not load page**: ${e.message}`);
      report.push('');
      totalErrors++;
      continue;
    }

    if (res.status === 200) {
      report.push(`✅ **HTTP Status**: 200 OK`);
    } else {
      report.push(`❌ **HTTP Status**: ${res.status}`);
      totalErrors++;
    }

    const bodyLen = (res.body.length / 1024).toFixed(1);
    report.push(`📏 **Page size**: ${bodyLen} KB`);

    // Check for HTML issues
    const issues = checkHtmlIssues(res.body, route);
    if (issues.length > 0) {
      report.push('### ⚠️ Content Issues:');
      issues.forEach(i => report.push(`- ${i}`));
      totalErrors += issues.length;
    } else {
      report.push('✅ **No server errors or error text detected in HTML**');
    }

    // Extract and check images
    const imgs = extractImages(res.body, url);
    const publicImgs = [...imgs].filter(u => !u.includes('/_next/') && !u.includes('localhost:3000/_next'));

    if (publicImgs.length === 0) {
      report.push('ℹ️ **Images**: No static images in server-rendered HTML (likely client-side rendered with Next.js Image component — this is normal)');
    } else {
      report.push(`\n**Checking ${publicImgs.length} image(s):**`);
      for (const img of publicImgs) {
        const r = await checkAsset(img);
        if (r.status === 200 || r.status === 304) {
          report.push(`  ✅ ${img}`);
        } else {
          report.push(`  ❌ BROKEN [${r.status}]: ${img}`);
          totalBroken++;
        }
      }
    }

    report.push('');
  }

  // Check all local public assets
  report.push('---');
  report.push('## Public Logo Assets Check');
  const logos = ['tcs', 'wipro', 'infosys', 'reliance', 'tata', 'hcltech', 'techmahindra', 'adityabirla', 'india'];
  for (const logo of logos) {
    const r = await checkAsset(`${BASE}/logos/${logo}.svg`);
    if (r.status === 200) {
      report.push(`  ✅ /logos/${logo}.svg`);
    } else {
      report.push(`  ❌ BROKEN [${r.status}]: /logos/${logo}.svg`);
      totalBroken++;
    }
  }

  // Check favicon and other public assets
  report.push('');
  report.push('## Other Public Assets Check');
  const otherAssets = ['/favicon.ico'];
  for (const asset of otherAssets) {
    const r = await checkAsset(`${BASE}${asset}`);
    report.push(r.status === 200 ? `  ✅ ${asset}` : `  ⚠️ [${r.status}]: ${asset}`);
  }

  report.push('');
  report.push('---');
  report.push('## Summary');
  report.push(`- **Total pages checked**: ${ROUTES.length}`);
  report.push(`- **Total broken images**: ${totalBroken}`);
  report.push(`- **Total page errors**: ${totalErrors}`);

  if (totalBroken === 0 && totalErrors === 0) {
    report.push('\n🎉 **All clear! No errors or broken images detected.**');
  } else {
    report.push(`\n⚠️ **Issues found**: ${totalErrors} errors, ${totalBroken} broken images.`);
  }

  fs.writeFileSync('AUDIT_REPORT.md', report.join('\n'));
  console.log('\n✅ Audit complete. Report saved to AUDIT_REPORT.md');
}

run().catch(console.error);
