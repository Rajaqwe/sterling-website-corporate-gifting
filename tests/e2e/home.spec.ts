import { test, expect } from '@playwright/test';

test('homepage has correct title and renders hero section', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Sterling/);
  await expect(page.locator('h1').first()).toBeVisible();
});

test('corporate catalog filters work', async ({ page }) => {
  await page.goto('/corporate-gifts');
  await expect(page.locator('h1', { hasText: 'Corporate Catalog' })).toBeVisible();
  
  // Fill the search input
  const searchInput = page.getByPlaceholder('Search corporate gifts...');
  await searchInput.fill('Notebook');
  await searchInput.press('Enter');
  
  // Verify URL updated
  await expect(page).toHaveURL(/.*q=Notebook/);
});
