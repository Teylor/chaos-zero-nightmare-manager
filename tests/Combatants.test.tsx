import { test, expect } from '@playwright/test';

/* TODO */
test.describe('Combatants Page', () => {
  test.beforeEach(async ({ page }) => {
    // Assuming there's a login function to authenticate the user
    await page.goto('/combatants');
  });

  test('combatants page has correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/Combatants/);
  });

  test.describe('Combatants CRUD Operations', () => {
    test('should not to show any cobatant', async ({ page }) => {
      const combatantsPanel = page.locator('[test-id="combatants-panel"]');
      expect(await combatantsPanel.locator('div').count()).toBe(0);
    });
    test('should add a new combatant', async ({ page }) => {
      await page.click('button[aria-label="Add new combatant"]');

      await page.click('button[aria-label="Select Combatant"]');
      await page
        .locator('#root > main > div > section > div > div > div > button')
        .first()
        .click();
      await page.fill('input[aria-label="Combatant level"]', '50');
      await page.fill('input[aria-label="Combatant ego"]', '5');

      await page.click('button[aria-label="Save combatant"]');
      await page.waitForTimeout(100); // Wait for the list to refresh

      const combatantsPanel = page.locator('[test-id="combatants-panel"]');
      expect(await combatantsPanel.locator('div').count()).toBe(1);
      expect(
        await combatantsPanel
          .locator('div > button.w-full > p:nth-child(3)')
          .textContent()
      ).toBe('Level: 50');
      expect(
        await combatantsPanel
          .locator('div > button.w-full > p:nth-child(4)')
          .textContent()
      ).toBe('Ego: 5');
    });
  });
});
