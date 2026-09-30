import { chromium } from '@playwright/test';
import fs from 'node:fs/promises';
import path from 'node:path';

const BASE = process.env.BASE_URL || 'http://127.0.0.1:3000';
const OUT = process.env.AUDIT_OUT || 'artifacts/visual-audit';

const routes = [
  '/', '/about', '/bulk-orders', '/careers', '/cart', '/checkout', '/contact',
  '/corporate-gifts', '/custom-branding', '/employee-gifting', '/event-gifts',
  '/faq', '/gift-collections', '/personalised-gifts', '/privacy-policy',
  '/refund-policy', '/request-a-quote', '/shipping-delivery', '/sustainability',
  '/terms-and-conditions', '/values', '/login', '/register', '/forgot-password',
  '/reset-password', '/auth/confirm',
  '/dashboard', '/dashboard/company', '/dashboard/orders', '/dashboard/quotes',
  '/dashboard/settings',
  '/admin', '/admin/analytics', '/admin/attributes', '/admin/audit',
  '/admin/branding', '/admin/categories', '/admin/companies',
  '/admin/customers', '/admin/exports', '/admin/inventory', '/admin/notifications',
  '/admin/orders', '/admin/payments', '/admin/products', '/admin/quotes',
  '/admin/reviews', '/admin/settings', '/admin/staff', '/admin/system'
];

const dynamicRouteTemplates = [
  '/products/[slug]',
  '/admin/companies/[id]',
  '/admin/customers/[id]',
  '/admin/orders/[id]',
  '/admin/products/[id]',
  '/admin/products/[id]/pricing',
  '/admin/products/[id]/reviews',
  '/admin/products/[id]/variants',
  '/admin/products/new',
  '/admin/quotes/[id]',
  '/dashboard/orders/[id]'
];

const sleep = ms => new Promise(r => setTimeout(r, ms));
const safeName = s => s.replace(/^\/$/, 'home').replace(/[^a-zA-Z0-9_-]+/g, '_').replace(/^_+|_+$/g, '') || 'home';

function parseRgb(s) {
  const m = s.match(/rgba?\(([^)]+)\)/i);
  if (!m) return null;
  const v = m[1].split(',').map(x => parseFloat(x.trim()));
  return { r:v[0], g:v[1], b:v[2], a:Number.isFinite(v[3]) ? v[3] : 1 };
}
function lum(c) {
  const f = x => {
    x /= 255;
    return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
  };
  return 0.2126*f(c.r)+0.7152*f(c.g)+0.0722*f(c.b);
}
function contrast(a,b) {
  const l1=lum(a), l2=lum(b);
  return (Math.max(l1,l2)+0.05)/(Math.min(l1,l2)+0.05);
}

async function main() {
  await fs.mkdir(OUT, { recursive:true });
  const browser = await chromium.launch({ headless:true });
  const report = {
    base: BASE,
    startedAt: new Date().toISOString(),
    viewports: [{name:'desktop',width:1440,height:1000},{name:'mobile',width:390,height:844}],
    modes:['light','dark'],
    routes: [],
    discoveredDynamic: [],
    unverifiedTemplates: dynamicRouteTemplates,
  };

  const discoverContext = await browser.newContext({ viewport:{width:1440,height:1000}, colorScheme:'light' });
  const discoverPage = await discoverContext.newPage();
  try {
    await discoverPage.goto(BASE, {waitUntil:'domcontentloaded', timeout:30000});
    await discoverPage.waitForTimeout(1500);
    const hrefs = await discoverPage.locator('a[href]').evaluateAll(as => as.map(a => a.getAttribute('href')).filter(Boolean));
    const sameOrigin = hrefs.map(h => {
      try {
        const u = new URL(h, BASE);
        return u.origin === new URL(BASE).origin ? u.pathname : null;
      } catch { return null; }
    }).filter(Boolean);
    const dynamic = [...new Set(sameOrigin.filter(p => /^\/products\/[^/]+$/.test(p)))];
    report.discoveredDynamic = dynamic;
    for (const p of dynamic) if (!routes.includes(p)) routes.push(p);
  } catch {}
  await discoverContext.close();

  for (const route of routes) {
    for (const vp of report.viewports) {
      for (const mode of report.modes) {
        const context = await browser.newContext({
          viewport:{width:vp.width,height:vp.height},
          colorScheme:mode,
          deviceScaleFactor:1,
        });
        await context.addInitScript(({mode}) => {
          try { localStorage.setItem('theme', mode); } catch {}
        }, {mode});
        const page = await context.newPage();
        const consoleErrors = [];
        const pageErrors = [];
        const failedRequests = [];
        page.on('console', m => { if (m.type() === 'error') consoleErrors.push(m.text()); });
        page.on('pageerror', e => pageErrors.push(String(e)));
        page.on('requestfailed', r => {
          const f = r.failure();
          failedRequests.push({url:r.url(), error:f?.errorText || 'requestfailed'});
        });

        const result = {
          route, viewport:vp.name, mode,
          finalUrl:null, status:null, ok:true,
          loginRedirect:false,
          metrics:{}, brokenImages:[], overflowed:[], clipped:[], invisibleControls:[], contrastRisks:[],
          consoleErrors, pageErrors, failedRequests,
          screenshot:null
        };

        try {
          const response = await page.goto(new URL(route, BASE).toString(), {waitUntil:'domcontentloaded', timeout:30000});
          result.status = response?.status() ?? null;
          result.finalUrl = page.url();
          await page.waitForLoadState('networkidle', {timeout:2000}).catch(()=>{});
          await sleep(150);
          result.loginRedirect = /\/login(?:\?|$)/.test(new URL(page.url()).pathname) &&
            (route.startsWith('/admin') || route.startsWith('/dashboard'));
          result.metrics = await page.evaluate(() => {
            const body = document.body;
            const doc = document.documentElement;
            const visible = el => {
              const s = getComputedStyle(el), r = el.getBoundingClientRect();
              return s.visibility !== 'hidden' && s.display !== 'none' && Number(s.opacity) > 0 && r.width > 0 && r.height > 0;
            };
            const all = [...document.querySelectorAll('*')];
            const textCount = [...document.querySelectorAll('p,h1,h2,h3,h4,h5,h6,button,a,label,span')].filter(el => visible(el) && el.textContent?.trim()).length;
            const heading = document.querySelector('h1')?.textContent?.trim() || '';
            return {
              width: window.innerWidth, height: window.innerHeight,
              scrollWidth: doc.scrollWidth, scrollHeight: doc.scrollHeight,
              overflowX: doc.scrollWidth > window.innerWidth + 2,
              title: document.title, heading, textCount,
              hasDarkClass: document.documentElement.classList.contains('dark'),
              darkBg: getComputedStyle(body).backgroundColor,
              elements: all.length
            };
          });

          result.brokenImages = await page.evaluate(() => [...document.images].filter(img => img.complete && img.naturalWidth === 0).map(img => img.currentSrc || img.src));
          result.overflowed = await page.evaluate(() => {
            const vw = window.innerWidth;
            const bad=[];
            const isVisible = el => {
              const s=getComputedStyle(el), r=el.getBoundingClientRect();
              return s.display!=='none' && s.visibility!=='hidden' && Number(s.opacity)>0 && r.width>1 && r.height>1;
            };
            for (const el of document.querySelectorAll('body *')) {
              if (!isVisible(el)) continue;
              const r=el.getBoundingClientRect();
              if (r.width > vw + 20 && !['svg','img','video'].includes(el.tagName.toLowerCase())) bad.push({tag:el.tagName, text:(el.textContent||'').trim().slice(0,80), width:Math.round(r.width)});
              else if (r.right > vw + 12 || r.left < -12) {
                const pos=getComputedStyle(el).position;
                if (pos!=='fixed' && pos!=='sticky') bad.push({tag:el.tagName,text:(el.textContent||'').trim().slice(0,80),left:Math.round(r.left),right:Math.round(r.right)});
              }
              if (bad.length >= 20) break;
            }
            return bad;
          });
          result.clipped = await page.evaluate(() => {
            const bad=[];
            const isVisible=el=>{const s=getComputedStyle(el),r=el.getBoundingClientRect();return s.display!=='none'&&s.visibility!=='hidden'&&r.width>1&&r.height>1};
            for (const el of document.querySelectorAll('body *')) {
              if(!isVisible(el)) continue;
              const r=el.getBoundingClientRect();
              if (el.scrollHeight > el.clientHeight + 6 && r.height > 20 && r.height < 600) {
                const s=getComputedStyle(el);
                if (s.overflow==='hidden' || s.overflowY==='hidden') bad.push({tag:el.tagName,text:(el.textContent||'').trim().slice(0,80),client:el.clientHeight,scroll:el.scrollHeight});
              }
              if (bad.length >= 20) break;
            }
            return bad;
          });
          result.invisibleControls = await page.evaluate(() => [...document.querySelectorAll('a,button,input,select,textarea')].filter(el => {
            const s=getComputedStyle(el),r=el.getBoundingClientRect();
            return s.display!=='none' && s.visibility!=='hidden' && (el.getAttribute('aria-hidden')!=='true') && (r.width < 2 || r.height < 2);
          }).slice(0,30).map(el => ({tag:el.tagName,text:(el.textContent||'').trim().slice(0,60),name:el.getAttribute('aria-label')||el.getAttribute('name')||''})));
          result.contrastRisks = await page.evaluate(() => {
            const parse = s => {const m=s.match(/rgba?\(([^)]+)\)/i); if(!m)return null; const v=m[1].split(',').map(x=>parseFloat(x.trim())); return {r:v[0],g:v[1],b:v[2],a:Number.isFinite(v[3])?v[3]:1};};
            const lum = c => {const f=x=>{x/=255; return x<=.03928?x/12.92:Math.pow((x+.055)/1.055,2.4)};return .2126*f(c.r)+.7152*f(c.g)+.0722*f(c.b)};
            const cr=(a,b)=>{const x=lum(a),y=lum(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05)};
            const visible=el=>{const s=getComputedStyle(el),r=el.getBoundingClientRect();return s.display!=='none'&&s.visibility!=='hidden'&&Number(s.opacity)>0&&r.width>0&&r.height>0};
            const out=[];
            for(const el of document.querySelectorAll('h1,h2,h3,h4,h5,h6,p,a,button,label,input,select,textarea')) {
              if(!visible(el) || !(el.textContent?.trim() || ['INPUT','TEXTAREA'].includes(el.tagName))) continue;
              let bg=null, cur=el;
              for(let i=0;i<5 && cur;i++,cur=cur.parentElement){
                const c=parse(getComputedStyle(cur).backgroundColor);
                if(c && c.a>.85){bg=c;break}
              }
              const fg=parse(getComputedStyle(el).color);
              if(fg && bg){
                const c=cr(fg,bg);
                const fs=parseFloat(getComputedStyle(el).fontSize)||16;
                const threshold=fs>=18?3:4.5;
                if(c < Math.min(threshold, 3.0)) out.push({tag:el.tagName,text:(el.textContent||el.getAttribute('placeholder')||'').trim().slice(0,70),contrast:Number(c.toFixed(2)),fontSize:fs});
              }
              if(out.length>=30) break;
            }
            return out;
          });

          const shotDir = path.join(OUT, safeName(route));
          await fs.mkdir(shotDir,{recursive:true});
          const shot = path.join(shotDir, vp.name + '-' + mode + '.jpg');
          await page.screenshot({path:shot, fullPage:true, type:'jpeg', quality:60});
          result.screenshot = shot;
        } catch (e) {
          result.ok = false;
          result.error = String(e);
          result.finalUrl = page.url();
        }

        const hasHardFailure =
          !result.loginRedirect &&
          (result.status === null || result.status >= 500 || result.brokenImages.length > 0 ||
           result.metrics.overflowX || result.consoleErrors.length > 0 || result.pageErrors.length > 0 ||
           result.contrastRisks.length > 0);
        result.ok = result.ok && !hasHardFailure;

        report.routes.push(result);
        await context.close();
      }
    }
  }

  const counts = {
    checks:report.routes.length,
    passed:report.routes.filter(x=>x.ok).length,
    failed:report.routes.filter(x=>!x.ok).length,
    screenshots:report.routes.filter(x=>x.screenshot).length,
    brokenImages:report.routes.reduce((n,x)=>n+x.brokenImages.length,0),
    overflowCases:report.routes.reduce((n,x)=>n+x.overflowed.length+(x.metrics.overflowX?1:0),0),
    clippedCases:report.routes.reduce((n,x)=>n+x.clipped.length,0),
    invisibleControls:report.routes.reduce((n,x)=>n+x.invisibleControls.length,0),
    contrastRisks:report.routes.reduce((n,x)=>n+x.contrastRisks.length,0),
    consoleErrors:report.routes.reduce((n,x)=>n+x.consoleErrors.length,0),
    pageErrors:report.routes.reduce((n,x)=>n+x.pageErrors.length,0),
  };
  report.counts = counts;
  await fs.writeFile(path.join(OUT,'report.json'), JSON.stringify(report,null,2));
  const lines = [
    '# Sterling Full Light/Dark Visual Audit',
    '',
    `Base: ${BASE}`,
    `Checks: ${counts.checks} (${counts.passed} pass / ${counts.failed} fail)`,
    `Screenshots: ${counts.screenshots}`,
    '',
    '## Failures',
    ...report.routes.filter(x=>!x.ok).map(x=>`- ${x.route} — ${x.viewport} — ${x.mode}: status=${x.status}; overflow=${x.metrics.overflowX}; brokenImages=${x.brokenImages.length}; console=${x.consoleErrors.length}; pageErrors=${x.pageErrors.length}; contrast=${x.contrastRisks.length}; invisibleControls=${x.invisibleControls.length}${x.error?' — '+x.error:''}`),
    '',
    '## Protected route coverage',
    'Admin/dashboard pages are intentionally verified for their expected unauthenticated login redirect in this run.',
    '',
    '## Dynamic route templates',
    ...dynamicRouteTemplates.map(x=>`- ${x}`),
    ...(report.discoveredDynamic.length ? ['','## Discovered product pages',...report.discoveredDynamic.map(x=>`- ${x}`)] : []),
  ];
  await fs.writeFile(path.join(OUT,'report.md'), lines.join('\n'));
  console.log(JSON.stringify({counts, discoveredDynamic:report.discoveredDynamic, failed:report.routes.filter(x=>!x.ok).map(x=>({route:x.route,viewport:x.viewport,mode:x.mode,status:x.status,finalUrl:x.finalUrl,overflow:x.metrics.overflowX,broken:x.brokenImages,contrast:x.contrastRisks.length,console:x.consoleErrors.slice(0,3),pageErrors:x.pageErrors.slice(0,3),error:x.error}))},null,2));

  await browser.close();
  process.exit(counts.failed > 0 ? 1 : 0);
}
main().catch(async e=>{console.error(e);process.exit(2)});
