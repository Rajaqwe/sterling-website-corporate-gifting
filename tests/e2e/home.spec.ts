import { test, expect } from '@playwright/test';

test('homepage has correct title and renders hero section', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Sterling/);
  await expect(page.locator('h1').first()).toBeVisible();
});

test('corporate catalog search and desktop filters are available', async ({ page }) => {
  await page.goto('/corporate-gifts');
  await expect(page.locator('h1', { hasText: 'Find a gift that fits the brief.' })).toBeVisible();

  const searchInput = page.getByPlaceholder('Search corporate gifts...');
  await expect(searchInput).toBeVisible();
  await expect(page.getByTestId('filter-sidebar')).toBeVisible();

  await searchInput.fill('Notebook');
  await searchInput.press('Enter');

  await expect(page).toHaveURL(/.*q=Notebook/);
});
