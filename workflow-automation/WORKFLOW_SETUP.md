# Workflow Setup Guide

Complete guide for setting up the GitHub Actions workflow automation.

## Prerequisites

- GitHub repository (public or private)
- Gmail account with app password enabled
- Access to repository Settings

## Step-by-Step Setup

### 1. Enable 2FA and App Password in Gmail

1. Go to [myaccount.google.com](https://myaccount.google.com)
2. Click "Security" in left menu
3. Enable "2-Step Verification" if not enabled
4. Create "App Password" for Gmail
5. Copy the 16-character app password
6. Store securely (you'll need this later)

### 2. Copy Workflow Files to Your Repository

```bash
# Clone your repository
git clone https://github.com/your-org/your-repo.git
cd your-repo

# Copy workflow files
mkdir -p .github/workflows services

# Copy daily-check.yml
cp path/to/workflow-automation/.github/workflows/daily-check.yml .github/workflows/

# Copy backend services
cp path/to/workflow-automation/services/BackendChecks.js services/
```

### 3. Add GitHub Secrets

**Navigate to:**
```
GitHub Repo → Settings → Secrets and variables → Actions
```

**Click "New repository secret" and add:**

#### Secret 1: EMAIL_USER
```
Name: EMAIL_USER
Value: your-email@gmail.com
```

#### Secret 2: EMAIL_PASS
```
Name: EMAIL_PASS
Value: xxxx xxxx xxxx xxxx  (16-char app password)
```

#### Secret 3: DATABASE_URL (Optional)
```
Name: DATABASE_URL
Value: postgresql://user:pass@host:port/db
```

### 4. Enable Workflows

**Navigate to:**
```
GitHub Repo → Actions tab
```

1. Look for "Daily Health Check" workflow
2. Click "Enable workflow" if disabled
3. Verify all workflows show as "Active"

### 5. Manual Test Run

**Test the workflow:**

1. Go to Actions tab
2. Click "Daily Health Check"
3. Click "Run workflow" button
4. Select branch (main) and click "Run workflow"
5. Wait for execution to complete
6. Check email inbox for alert (check spam too)

**Expected results:**
- Workflow shows "Success" ✅
- Green checkmarks on all steps
- Email arrives within 1-2 minutes
- Email contains screenshot

### 6. Verify Test Reports

After workflow completes:

1. Click workflow run
2. Scroll to "Artifacts" section
3. Download "playwright-report"
4. Extract and open `index.html` in browser
5. Review test results and screenshots

## Configuration

### Customize Health Check URL

Edit `.github/workflows/daily-check.yml`:

```yaml
- name: Run health check tests
  run: npx playwright test tests/full-stack-health.spec.js
```

Then update `tests/full-stack-health.spec.js`:

```javascript
// Change this URL
await page.goto('https://playwright.dev/');

// To your actual application
await page.goto('https://your-app.com/');
```

### Change Execution Schedule

Edit `.github/workflows/daily-check.yml`:

```yaml
on:
  schedule:
    - cron: '0 13 * * *'  # Change this line
```

**Common cron patterns:**
```yaml
'0 8 * * *'     # 8 AM UTC
'0 13 * * *'    # 1 PM UTC (8 AM EST)
'0 0 * * 1'     # Monday midnight
'*/30 * * * *'  # Every 30 minutes
```

### Adjust Email Recipients

Edit `utils/Notifier.js`:

```javascript
const mailOptions = {
    from: '"Health Check Bot" <your-email@gmail.com>',
    to: "admin@yourcompany.com",  // Change this
    subject: `🚨 ALERT: ${subject}`,
    ...
};
```

## Troubleshooting

### Workflow not appearing in Actions

**Solution:**
1. Ensure `.github/workflows/daily-check.yml` exists
2. Verify YAML syntax is correct
3. Push changes to repository
4. Wait 5 minutes for GitHub to detect
5. Refresh Actions page

### Workflow triggers but fails

**Check logs:**
1. Click workflow run
2. Click failing step
3. Expand logs to see errors

**Common issues:**
- Playwright browsers not installed: Run `npx playwright install --with-deps`
- Selectors changed: Update selectors in test
- Timeout: Increase timeout in `playwright.config.js`

### Email not arriving

**Verify secrets:**
```bash
# In GitHub: Settings → Secrets
- EMAIL_USER: Check email address
- EMAIL_PASS: Verify it's Gmail app password (not regular password)
```

**Check spam folder:**
- Gmail may filter automation emails
- Add bot email to contacts

**Verify Notifier.js:**
- Check email address is correct
- Verify SMTP settings match Gmail requirements

**Test locally:**
```bash
# In e2e-tests folder
EMAIL_USER="your@gmail.com" EMAIL_PASS="xxxx xxxx xxxx xxxx" npm run test:health
```

### Timeout issues

**Increase timeout:**

Edit `playwright.config.js`:
```javascript
module.exports = defineConfig({
  timeout: 60000,  // 60 seconds per test
  ...
});
```

### Artifact not uploading

**Check:**
1. Verify `playwright-report/` directory is created
2. Check file permissions
3. Ensure retention days is set
4. Review GitHub Actions logs

## Advanced Configuration

### Multiple Email Recipients

Edit `utils/Notifier.js`:

```javascript
const mailOptions = {
    to: "admin1@company.com, admin2@company.com",
    cc: "cto@company.com",
    bcc: "audit@company.com",
    ...
};
```

### Custom Alert Conditions

Edit `tests/full-stack-health.spec.js`:

```javascript
// Add more checks
if (failures.length > 0) {
    // Send alert only if critical failures
    const criticalIssues = failures.filter(f => 
        f.includes('CRITICAL') || f.includes('ERROR')
    );
    
    if (criticalIssues.length > 0) {
        await sendAlert(...);
    }
}
```

### Slack Integration

Add step to `daily-check.yml`:

```yaml
- name: Notify Slack
  uses: slackapi/slack-github-action@v1
  if: failure()
  with:
    webhook-url: ${{ secrets.SLACK_WEBHOOK }}
```

### PagerDuty Integration

Add to `utils/Notifier.js`:

```javascript
async function alertPagerDuty(subject, message) {
    const response = await fetch('https://events.pagerduty.com/v2/enqueue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            routing_key: process.env.PAGERDUTY_KEY,
            event_action: 'trigger',
            payload: { summary: subject, source: 'Health Check Bot' }
        })
    });
    return response.json();
}
```

## Security Best Practices

✅ **Do:**
- Use app passwords, not regular Gmail password
- Enable 2FA on Gmail account
- Rotate passwords regularly
- Review Actions logs monthly
- Limit secret access
- Keep dependencies updated

❌ **Don't:**
- Commit `.env` files
- Share secrets in logs
- Use personal email for alerts
- Enable broad workflow permissions
- Ignore security warnings

## Monitoring

### Weekly Review

1. Check Actions tab for failures
2. Review email alerts sent
3. Verify no false positives
4. Check artifact storage
5. Monitor execution times

### Monthly Maintenance

1. Update Playwright version
2. Review and update selectors
3. Check for deprecated APIs
4. Update health check logic
5. Review cost (if using GitHub Actions Pro)

## Cost Estimation

**GitHub Actions pricing:**
- Free tier: 2,000 minutes/month
- Daily run: ~5 minutes = ~150 min/month
- **Cost:** FREE (within limits)

**Email costs:**
- Gmail SMTP: FREE

**Total cost:** FREE ✅

## Next Steps

1. ✅ Set up Gmail app password
2. ✅ Add GitHub secrets
3. ✅ Copy workflow files
4. ✅ Enable workflows
5. ✅ Test manually
6. ✅ Customize for your app
7. ✅ Monitor execution

## Support

For issues:
1. Check GitHub Actions logs
2. Verify all secrets are set
3. Review YAML syntax
4. Check email is 2FA enabled
5. Look for typos in URLs/selectors

---

**Last Updated:** January 13, 2026
