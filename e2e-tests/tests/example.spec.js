// @ts-check
import { test, expect } from '@playwright/test';

/**
 * Basic Example Tests
 * These tests demonstrate fundamental Playwright testing patterns
 */

test.describe('Basic Navigation and Assertion Tests', () => {

  test('has title and can navigate to page', async ({ page }) => {
    // Navigate to the Playwright homepage
    await page.goto('https://playwright.dev/');

    // Verify the page title contains expected text
    await expect(page).toHaveTitle(/Playwright/);
    
    // Verify page URL is correct
    await expect(page).toHaveURL('https://playwright.dev/');
  });

  test('get started link navigates correctly', async ({ page }) => {
    await page.goto('https://playwright.dev/');

    // Click the get started link
    await page.getByRole('link', { name: 'Get started' }).click();

    // Verify navigation to Installation page
    await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
    
    // Verify URL changed
    await expect(page).toHaveURL(/.*intro/);
  });

  test('verify page responsiveness', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    
    // Test on different viewport sizes
    await page.setViewportSize({ width: 1920, height: 1080 });
    await expect(page.getByRole('heading')).toBeVisible();
    
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.getByRole('heading')).toBeVisible();
  });

  test('search functionality exists', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    
    // Verify search button is visible
    const searchButton = page.getByRole('button', { name: /search/i }).first();
    await expect(searchButton).toBeVisible();
  });
});
