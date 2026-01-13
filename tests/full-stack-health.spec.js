// tests/full-stack-health.spec.js
const { test, expect } = require('@playwright/test');
const { sendAlert } = require('../utils/Notifier');

test('Morning System Health Audit', async ({ page }, testInfo) => {
    let failures = [];

    try {
        // Navigate to your application (using Playwright docs as sample test site)
        await page.goto('https://playwright.dev/');

        // Example health checks - customize based on your app
        // 1. Check if page loads
        await expect(page).toHaveTitle(/Playwright/);

        // 2. Check if critical elements are visible
        const getStartedLink = page.getByRole('link', { name: 'Get started' });
        if (!await getStartedLink.isVisible()) {
            failures.push('❌ Get started link is not visible');
        }

        // 3. Check API health endpoint
        const response = await page.request.get('https://playwright.dev/');
        if (response.status() !== 200) {
            failures.push(`❌ Website health check failed with status ${response.status()}`);
        }

        // 4. Check if main heading is visible
        const mainHeading = page.getByRole('heading', { level: 1 });
        if (!await mainHeading.isVisible()) {
            failures.push('❌ Main heading is not visible');
        }

        // If any failures were detected, send alert only on final retry
        if (failures.length > 0) {
            const screenshotPath = testInfo.outputPath('failure.png');
            await page.screenshot({ path: screenshotPath });

            // Only send email on final retry to avoid duplicate alerts
            // testInfo.retry is 0-indexed, retries is the max number of retries
            if (testInfo.retry === testInfo.project.retries) {
                await sendAlert(
                    'CRITICAL: Application Health Check Failed',
                    `Health check failed after ${testInfo.retry + 1} attempt(s) at ${new Date().toISOString()}\n\nIssues:\n${failures.join('\n')}`,
                    screenshotPath
                );
            }

            throw new Error('Health check failed: ' + failures.length + ' issue(s) detected.');
        }

    } catch (error) {
        // If an unexpected error occurs, capture it and send alert only on final retry
        const screenshotPath = testInfo.outputPath('error.png');
        await page.screenshot({ path: screenshotPath });

        // Only send email on final retry to avoid duplicate alerts
        if (testInfo.retry === testInfo.project.retries) {
            await sendAlert(
                'CRITICAL: Application Health Check Error',
                `Unexpected error during health check after ${testInfo.retry + 1} attempt(s):\n${error.message}`,
                screenshotPath
            );
        }

        throw error;
    }
});
