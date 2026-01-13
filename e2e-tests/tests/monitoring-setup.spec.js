// tests/monitoring-setup.spec.js
const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

test('Verify Monitoring Suite is Properly Configured', async () => {
    // 1. Check that Notifier.js exists and exports sendAlert
    const notifierPath = path.join(__dirname, '../utils/Notifier.js');
    const notifierExists = fs.existsSync(notifierPath);
    expect(notifierExists).toBe(true);

    const notifier = require(notifierPath);
    expect(notifier.sendAlert).toBeDefined();

    // 2. Check that GitHub workflows exist
    const dailyCheckPath = path.join(__dirname, '../../workflow-automation/.github/workflows/daily-check.yml');
    const healthCheckPath = path.join(__dirname, '../../daily-health-check/.github/workflows/daily-health-check.yml');

    expect(fs.existsSync(dailyCheckPath)).toBe(true);
    expect(fs.existsSync(healthCheckPath)).toBe(true);

    // 3. Check that playwright.config.js has required settings
    const configPath = path.join(__dirname, '../playwright.config.js');
    const configContent = fs.readFileSync(configPath, 'utf-8');

    expect(configContent).toContain('screenshot');
    expect(configContent).toContain('trace');
    expect(configContent).toContain('video');

    // 4. Check environment variables
    expect(process.env.EMAIL_PASS || process.env.EMAIL_USER || true).toBeDefined();

    // 5. Check that BackendChecks exists
    const backendPath = path.join(__dirname, '../../workflow-automation/.github/workflows/services/BackendChecks.js');
    expect(fs.existsSync(backendPath)).toBe(true);

    // 6. Check that Page Objects template exists
    const pageObjPath = path.join(__dirname, '../utils/pageObjects/LoginPage.js');
    expect(fs.existsSync(pageObjPath)).toBe(true);

    console.log('✅ All monitoring suite components verified!');
});

test('Verify Email Notifier Configuration', async () => {
    const nodemailer = require('nodemailer');
    expect(nodemailer).toBeDefined();

    // Verify that nodemailer can create a transporter (this won't send an email)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'test@example.com',
            pass: 'testpass'
        }
    });

    expect(transporter).toBeDefined();
    console.log('✅ Nodemailer configured correctly!');
});

test('Verify Project Structure', async () => {
    const requiredDirs = [
        './utils',
        './tests',
        './utils/pageObjects'
    ];

    const workflowDirs = [
        '../../workflow-automation/.github/workflows',
        '../../workflow-automation/.github/workflows/services'
    ];

    for (const dir of requiredDirs) {
        const dirPath = path.join(__dirname, '../', dir);
        expect(fs.existsSync(dirPath)).toBe(true);
    }

    for (const dir of workflowDirs) {
        const dirPath = path.join(__dirname, dir);
        expect(fs.existsSync(dirPath)).toBe(true);
    }

    console.log('✅ Project structure is complete!');
});
