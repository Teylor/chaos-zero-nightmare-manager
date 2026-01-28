import { test, expect } from '@playwright/test';

test('combatants page has correct title', async ({ page }) => {
  await page.goto('/combatants');

  await expect(page).toHaveTitle(/Combatants/);
});
