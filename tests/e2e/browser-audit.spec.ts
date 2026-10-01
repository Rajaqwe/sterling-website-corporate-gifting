import { test, expect, Page } from "@playwright/test";

const PUBLIC_ROUTES = [
  "/", "/about", "/corporate-gifts", "/gift-collections", "/personalised-gifts",
  "/bulk-orders", "/custom-branding", "/employee-gifting", "/event-gifts",
  "/gift-finder", "/project-gallery", "/reviews", "/procurement-support",
  "/request-a-quote", "/request-a-sample", "/cart", "/checkout", "/contact",
  "/faq", "/careers", "/sustainability", "/values", "/shipping-delivery",
  "/privacy-policy", "/terms-and-conditions", "/refund-policy", "/login",
  "/register", "/forgot-password", "/reset-password", "/products/plp-001"
];

const CORE_ROUTES = [
  "/", "/corporate-gifts", "/gift-collections", "/personalised-gifts",
  "/bulk-orders", "/custom-branding", "/employee-gifting", "/event-gifts",
  "/gift-finder", "/request-a-quote", "/products/plp-001", "/cart"
];

async function stabilize(page: Page) {
  await page.waitForLoadState("domcontentloaded");
  await page.evaluate(async () => {
    if (document.fonts?.ready) await document.fonts.ready;
    window.scrollTo(0, document.documentElement.scrollHeight);
    await new Promise((r) => setTimeout(r, 150));
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(400);
}

async function health(page: Page) {
  return page.evaluate(() => {
    const vw = window.innerWidth;
    const doc = document.documentElement;
    const fixedClipped = Array.from(document.querySelectorAll<HTMLElement>("body *"))
      .filter((el) => getComputedStyle(el).position === "fixed")
      .map((el) => ({ el, r: el.getBoundingClientRect() }))
      .filter(({ r }) => r.left < -2 || r.right > vw + 2)
      .slice(0, 5)
      .map(({ el }) => (el.textContent || el.tagName).trim().slice(0, 80));
    const brokenImages = Array.from(document.images)
      .filter((img) => img.complete && img.naturalWidth === 0)
      .map((img) => img.alt || img.currentSrc || img.src)
      .slice(0, 8);
    return {
      overflow: doc.scrollWidth > vw + 4,
      scrollWidth: doc.scrollWidth,
      viewport: vw,
      textLength: (document.body.innerText || "").trim().length,
      brokenImages,
      fixedClipped,
    };
  });
}

function slug(route: string) {
  return route === "/" ? "home" : route.slice(1).replaceAll("/", "__").replace(/[^a-zA-Z0-9_-]/g, "-");
}

test.describe("Sterling browser audit", () => {
  test("all public routes render in light and dark desktop modes", async ({ page }) => {
    const failures: string[] = [];
    for (const theme of ["light", "dark"]) {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.addInitScript((t) => localStorage.setItem("theme", t), theme);
      for (const route of PUBLIC_ROUTES) {
        const consoleErrors: string[] = [];
        const onConsole = (m: any) => m.type() === "error" && consoleErrors.push(m.text());
        const onPageError = (e: Error) => consoleErrors.push(e.message);
        page.on("console", onConsole);
        page.on("pageerror", onPageError);
        try {
          const response = await page.goto(route, { waitUntil: "domcontentloaded", timeout: 45000 });
          await stabilize(page);
          const status = response?.status() ?? 0;
          const h = await health(page);
          if (status >= 400) failures.push("[" + theme + "] " + route + ": HTTP " + status);
          if (h.overflow) failures.push("[" + theme + "] " + route + ": horizontal overflow");
          if (h.textLength < 20) failures.push("[" + theme + "] " + route + ": almost no rendered text");
          if (h.brokenImages.length) failures.push("[" + theme + "] " + route + ": broken images " + h.brokenImages.join(" | "));
          if (h.fixedClipped.length) failures.push("[" + theme + "] " + route + ": clipped fixed UI " + h.fixedClipped.join(" | "));
          for (const e of consoleErrors) {
            if (!/favicon|googletagmanager|google-analytics|clarity/i.test(e)) {
              failures.push("[" + theme + "] " + route + ": browser error: " + e);
            }
          }
        } catch (e) {
          failures.push("[" + theme + "] " + route + ": " + (e instanceof Error ? e.message : String(e)));
        } finally {
          page.removeListener("console", onConsole);
          page.removeListener("pageerror", onPageError);
        }
      }
    }
    expect(failures, failures.join("\n")).toEqual([]);
  });

  test("core routes are captured at desktop/mobile and light/dark", async ({ page }, testInfo) => {
    for (const theme of ["light", "dark"]) {
      for (const viewport of [
        { name: "desktop", width: 1440, height: 900 },
        { name: "mobile", width: 390, height: 844 }
      ]) {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        await page.addInitScript((t) => localStorage.setItem("theme", t), theme);
        for (const route of CORE_ROUTES) {
          await page.goto(route, { waitUntil: "domcontentloaded", timeout: 45000 });
          await stabilize(page);
          await page.screenshot({
            path: testInfo.outputPath("screenshots", theme, viewport.name, slug(route) + ".png"),
            fullPage: true
          });
        }
      }
    }
  });

  test("critical storefront interactions work", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/corporate-gifts", { waitUntil: "domcontentloaded", timeout: 45000 });
    await stabilize(page);
    const search = page.getByPlaceholder("Search corporate gifts...");
    await expect(search).toBeVisible();
    await search.fill("Notebook");
    await search.press("Enter");
    await expect(page).toHaveURL(/q=Notebook/);

    await page.goto("/products/plp-001", { waitUntil: "domcontentloaded", timeout: 45000 });
    await stabilize(page);
    await expect(page.getByRole("link", { name: /Get custom quote/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /WhatsApp/i })).toBeVisible();

    await page.goto("/gift-finder", { waitUntil: "domcontentloaded", timeout: 45000 });
    await stabilize(page);
    await expect(page.locator("h1").first()).toBeVisible();
  });
});
