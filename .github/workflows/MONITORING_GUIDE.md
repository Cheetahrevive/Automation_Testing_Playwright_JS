// .github/workflows/MONITORING_GUIDE.md
# 🚨 Professional Automated Monitoring Suite - Architecture Guide

## Overview
This is a production-grade automated health monitoring system that runs every morning at 8 AM EST (1 PM UTC) to verify your application's integrity.

## Component Interaction Flow

```
8:00 AM EST
    ↓
GitHub Actions (daily-check.yml)
    ↓
├─ Checkout Code
├─ Setup Node.js 18
├─ Install Dependencies
├─ Install Playwright Browsers
    ↓
Run Tests (full-stack-health.spec.js)
    ├─ UI Health Checks (Page Objects)
    ├─ API Health Checks (Backend Services)
    ├─ Database Checks (BackendChecks.js)
    ↓
Failure Detection
    ├─ Capture Screenshots
    ├─ Capture Video/Traces
    ↓
Notifier.js (Nodemailer)
    ├─ Format Email with HTML
    ├─ Attach Screenshots
    ├─ Embed Images in Body
    ↓
Email Alert Sent to Admin
    ↓
Upload Test Reports to Artifacts
```

## Component Breakdown

### 1. **GitHub Actions** (`daily-check.yml`)
- **Role**: "Alarm Clock" - Triggers automated runs on schedule
- **Features**:
  - Daily schedule at 13:00 UTC (8 AM EST)
  - Manual trigger support via `workflow_dispatch`
  - Environment variable injection for email credentials
  - Artifact retention for 7 days

### 2. **Playwright Configuration** (`playwright.config.js`)
- **Role**: Global testing settings and execution parameters
- **Features**:
  - Headless toggle via `HEADED=true` env var
  - Screenshots only on failure
  - Video retention on failure
  - Trace capture for debugging
  - Multi-browser support (Chromium, Firefox, WebKit)
  - CI/CD optimizations (retries, workers)

### 3. **Page Objects** (`utils/pageObjects/`)
- **Role**: Reusable UI element definitions
- **Features**:
  - Separation of concerns (selectors vs actions)
  - Easy maintenance and updates
  - Example: LoginPage class for login flow
  - Customizable per your application

### 4. **Backend Services** (`.github/workflows/services/BackendChecks.js`)
- **Role**: Direct API and Database health verification
- **Features**:
  - Database connection checks
  - API endpoint validation
  - Timeout handling (5 second timeout)
  - Connection pooling support
  - Environment variable integration

### 5. **Notifier Utility** (`utils/Notifier.js`)
- **Role**: Email alert system with formatting
- **Features**:
  - Gmail SMTP integration
  - HTML formatted emails
  - Screenshot attachment support
  - Inline image embedding (CID references)
  - Error handling and retry logic

### 6. **Health Check Test** (`tests/full-stack-health.spec.js`)
- **Role**: Comprehensive application monitoring
- **Features**:
  - Page load verification
  - UI element visibility checks
  - API health endpoint validation
  - Database connectivity checks
  - Automatic alert on failure
  - Screenshot + video capture

## Running Locally

### Regular Test Run (Headless)
```bash
npm run test
```

### Debug Mode (Browser Visible)
```bash
HEADED=true npm run test
```

### Health Check Only
```bash
npx playwright test tests/full-stack-health.spec.js
```

## Environment Setup

### Required Environment Variables
```bash
# .env file (local only - never commit)
EMAIL_PASS=your_gmail_app_password
```

### GitHub Secrets (for CI/CD)
```
EMAIL_USER    → your-email@gmail.com
EMAIL_PASS    → your_gmail_app_password
```

## Key Features

✅ **Professional Architecture**
- Separation of concerns (POM, Services, Notifiers)
- Reusable components
- Configuration-driven testing

✅ **Comprehensive Monitoring**
- UI/API/Database checks in one suite
- Multi-browser support
- Video/trace capture on failure

✅ **Smart Alerting**
- Beautiful HTML emails
- Inline failure screenshots
- Detailed error messages
- Timestamp included

✅ **CI/CD Optimized**
- Artifact retention (7 days)
- Configurable retries
- Parallel execution support
- Manual trigger capability

## Customization Checklist

- [ ] Update `full-stack-health.spec.js` with your actual app URL
- [ ] Customize health checks based on your services
- [ ] Create Page Objects for your UI elements
- [ ] Configure `BackendChecks.js` for your database
- [ ] Update email recipients in `Notifier.js`
- [ ] Add GitHub secrets (EMAIL_USER, EMAIL_PASS)
- [ ] Test manually before first scheduled run

## Troubleshooting

### Email Not Sending
- Verify Gmail app password (not regular password)
- Check GitHub secrets are set correctly
- Verify email address whitelist in Gmail

### Tests Not Running
- Check Node.js version (18+ required)
- Run `npm ci` to install dependencies
- Check test file paths are correct

### False Negatives
- Adjust timeout values in Playwright config
- Verify selectors match your current UI
- Check API endpoints are accessible

## Next Steps

1. **Customize Page Objects**: Add selectors for your key UI elements
2. **Extend Health Checks**: Add more validation scenarios
3. **Set Up Notifications**: Configure additional alert channels (Slack, PagerDuty)
4. **Monitor Reports**: Review generated test reports regularly
5. **Optimize Performance**: Add performance threshold checks

---

**Last Updated**: January 13, 2026
**Status**: Production Ready ✅
