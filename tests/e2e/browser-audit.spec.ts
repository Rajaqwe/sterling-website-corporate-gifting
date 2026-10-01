import { test, expect, Page } from "@playwright/test";

const PUBLIC_ROUTES = [
  "/", "/about", "/corporate-gifts", "/gift-collections", "/personalised-gifts",
  "/bulk-orders", "/custom-branding", "/employee-gifting", "/event-gifts",
  "/gift-finder", "/project-gallery", "/reviews", "/procurement-support",
  "/request-a-quote", "/request-a-sample", "/cart", "/contact",
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
  await page.waitForLoadState("domcontentloaded", { timeout: 15000 });
  // Some protected routes can redirect immediately after DOMContentLoaded.
  // Give navigation a chance to settle before evaluating the document.
  try {
    await page.waitForLoadState("load", { timeout: 5000 });
  } catch {
    // Continue with the best available document state.
  }
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      await page.evaluate(async () => {
        if (document.fonts?.ready) await document.fonts.ready;
        window.scrollTo(0, document.documentElement.scrollHeight);
        await new Promise((r) => setTimeout(r, 150));
        window.scrollTo(0, 0);
      });
      break;
    } catch (error) {
      if (!(error instanceof Error) || !/Execution context was destroyed|navigation/i.test(error.message) || attempt === 2) {
        throw error;
      }
      await page.waitForLoadState("domcontentloaded", { timeout: 5000 }).catch(() => undefined);
    }
  }
  await page.waitForTimeout(250);
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
  test("all public routes render in light and dark desktop modes", async ({ browser }) => {
    const failures: string[] = [];
    for (const theme of ["light", "dark"]) {
      for (const route of PUBLIC_ROUTES) {
        const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
        await page.addInitScript((t) => localStorage.setItem("theme", t), theme);
        const consoleErrors: string[] = [];
        const networkErrors: string[] = [];
        const onConsole = (m: any) => m.type() === "error" && consoleErrors.push(m.text());
        const onPageError = (e: Error) => consoleErrors.push(e.message);
        const onResponse = (response: any) => {
          if (response.status() >= 400 && response.status() !== 404) {
            networkErrors.push(response.status() + " " + response.url());
          }
        };
        page.on("console", onConsole);
        page.on("pageerror", onPageError);
        page.on("response", onResponse);
        try {
          const response = await page.goto(route, { waitUntil: "domcontentloaded", timeout: 15000 });
          await stabilize(page);
          const status = response?.status() ?? 0;
          const h = await health(page);
          const routeFailures: string[] = [];
          if (status >= 400) routeFailures.push("HTTP " + status + " (final URL: " + page.url() + ")");
          if (h.overflow) routeFailures.push("horizontal overflow (scrollWidth=" + h.scrollWidth + ", viewport=" + h.viewport + ")");
          if (h.textLength < 20) routeFailures.push("almost no rendered text (length=" + h.textLength + ")");
          if (h.brokenImages.length) routeFailures.push("broken images: " + h.brokenImages.join(" | "));
          if (h.fixedClipped.length) routeFailures.push("clipped fixed UI: " + h.fixedClipped.join(" | "));
          for (const e of consoleErrors) {
            if (!/favicon|googletagmanager|google-analytics|clarity/i.test(e)) routeFailures.push("browser error: " + e);
          }
          for (const e of Array.from(new Set(networkErrors))) {
            if (!/favicon|googletagmanager|google-analytics|clarity/i.test(e)) routeFailures.push("network error: " + e);
          }
          if (routeFailures.length) {
            const prefix = "[" + theme + "] " + route + ": ";
            for (const failure of routeFailures) {
              const message = prefix + failure;
              failures.push(message);
              console.error("BROWSER_AUDIT_FAILURE " + message);
            }
          } else {
            console.log("BROWSER_AUDIT_OK [" + theme + "] " + route);
          }
        } catch (e) {
          const message = "[" + theme + "] " + route + ": " + (e instanceof Error ? e.message : String(e));
          failures.push(message);
          console.error("BROWSER_AUDIT_FAILURE " + message);
        } finally {
          page.removeListener("console", onConsole);
          page.removeListener("pageerror", onPageError);
          page.removeListener("response", onResponse);
          await page.close();
        }
      }
    }
    console.log("BROWSER_AUDIT_SUMMARY failures=" + failures.length);
    expect(failures, failures.join("\n")).toEqual([]);
  });

  test("protected checkout redirects safely when unauthenticated", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/checkout", { waitUntil: "domcontentloaded", timeout: 15000 });
    await stabilize(page);
    expect(page.url()).not.toMatch(/\/checkout(?:\?|$)/);
    expect((await page.locator("body").innerText()).trim().length).toBeGreaterThan(20);
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
          await page.goto(route, { waitUntil: "domcontentloaded", timeout: 15000 });
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
    await page.goto("/corporate-gifts", { waitUntil: "domcontentloaded", timeout: 15000 });
    await stabilize(page);
    const search = page.getByPlaceholder("Search corporate gifts...");
    await expect(search).toBeVisible();
    await search.fill("Notebook");
    await search.press("Enter");
    await expect(page).toHaveURL(/\/corporate-gifts\?[^#]*q=Notebook/, { timeout: 10000 });

    await page.goto("/products/plp-001", { waitUntil: "domcontentloaded", timeout: 15000 });
    await stabilize(page);
    await expect(page.getByRole("link", { name: /Get custom quote/i })).toBeVisible();
    await expect(page.getByRole("link", { name: "WhatsApp", exact: true })).toBeVisible();

    await page.goto("/gift-finder", { waitUntil: "domcontentloaded", timeout: 15000 });
    await stabilize(page);
    await expect(page.locator("h1").first()).toBeVisible();
  });
});
