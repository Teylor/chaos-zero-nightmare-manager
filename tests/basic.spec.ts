import { test, expect } from '@playwright/test';

test('homepage has correct title', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/Chaos Zero Nightmare Manager/);
});

test('basic UI elements are present', async ({ page }) => {
  await page.goto('/');

  // Check if the main heading is present
  await expect(page.locator('h1')).toBeVisible();

  // Check if the counter button is present and working
  const button = page.locator('button');
  await expect(button).toBeVisible();
  await expect(button).toHaveText('count is 0');

  // Test the counter functionality
  await button.click();
  await expect(button).toHaveText('count is 1');
});
