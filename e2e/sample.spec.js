const { test, expect } = require('@playwright/test');

test.describe('Sample Playwright Test', () => {
  test('should navigate to Playwright website and verify title', async ({ page }) => {
    // Navigate to the Playwright website
    await page.goto('https://playwright.dev/');

    // Verify the page title contains "Playwright"
    await expect(page).toHaveTitle(/Playwright/);

    // Take a screenshot for verification
    await page.screenshot({ path: 'screenshot.png' });
  });

  test('should find and interact with the Get Started link', async ({ page }) => {
    // Navigate to the Playwright website
    await page.goto('https://playwright.dev/');

    // Find the "Get started" link and click it
    await page.getByRole('link', { name: 'Get started' }).click();

    // Verify navigation to the installation page
    await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
  });

  test('should verify page has expected content', async ({ page }) => {
    // Navigate to the Playwright website
    await page.goto('https://playwright.dev/');

    // Verify key elements are present
    const heading = page.getByRole('heading', { level: 1 });
    await expect(heading).toBeVisible();

    // Verify the page has expected text
    const text = await page.getByText('Playwright enables reliable end-to-end testing');
    await expect(text).toBeVisible();
  });
});
