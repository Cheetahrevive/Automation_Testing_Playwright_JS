# Workflow Automation Project

GitHub Actions workflows and automation infrastructure for continuous health monitoring.

## 📁 Project Structure

```
workflow-automation/
├── .github/
│   └── workflows/
│       ├── daily-check.yml              # Daily health check workflow
│       ├── daily-health-check.yml       # Alternative health check
│       └── MONITORING_GUIDE.md          # Architecture guide
├── services/
│   └── BackendChecks.js                 # Database/API health checks
├── scripts/
│   └── setup-secrets.sh                 # GitHub secrets setup guide
├── docs/
│   ├── WORKFLOW_SETUP.md               # Setup instructions
│   ├── ARCHITECTURE.md                 # System architecture
│   └── TROUBLESHOOTING.md              # Common issues
├── .gitignore
└── README.md
```

## 🚀 Quick Start

### 1. GitHub Repository Setup

This project requires an existing GitHub repository. Set it up with:

```bash
git clone https://github.com/your-org/your-repo.git
cd your-repo
```

### 2. Copy Workflow Files

Copy the workflow files from this project to your repository:

```bash
cp -r .github/workflows/ your-repo/.github/
cp -r services/ your-repo/
```

### 3. Add GitHub Secrets

Go to: `https://github.com/your-org/your-repo/settings/secrets/actions`

Add these secrets:
- **EMAIL_USER** → your-email@gmail.com
- **EMAIL_PASS** → Gmail app password
- **DATABASE_URL** → Database connection string (optional)

### 4. Enable Workflows

Navigate to: `https://github.com/your-org/your-repo/actions`

- Enable "Daily Health Check" workflow
- Verify workflows are active

### 5. Test Manually

Click "Run workflow" to trigger manually and verify:
- ✅ Workflow executes successfully
- ✅ Tests pass
- ✅ Email arrives with results

## 📊 Workflow Components

### daily-check.yml

**Trigger:** Daily at 13:00 UTC (8 AM EST)  
**Duration:** ~5-10 minutes  
**Features:**
- Checkout code
- Setup Node.js 18
- Install dependencies
- Install Playwright browsers
- Run health check tests
- Upload artifacts (7-day retention)

**Steps:**
```yaml
- Checkout repository
- Setup Node.js 18
- Install npm dependencies
- Install Playwright browsers
- Run: npx playwright test tests/full-stack-health.spec.js
- Upload: playwright-report/
```

### Email Alerts

Automatically triggered on test failure:

**Features:**
- HTML formatted emails
- Inline failure screenshots
- Detailed error messages
- Retry attempt tracking
- Only sends on final retry (no spam)

**Email template includes:**
```
Subject: 🚨 CRITICAL: Application Health Check Failed

Body:
- Health check failed after X attempt(s)
- Issue list with timestamps
- Failure screenshot embedded
- Link to GitHub Actions run
```

## 🔧 Configuration

### Environment Variables

Required secrets in GitHub:

| Secret | Example | Description |
|--------|---------|-------------|
| EMAIL_USER | user@gmail.com | Gmail account |
| EMAIL_PASS | app-password-123 | Gmail app password |
| DATABASE_URL | postgresql://... | Database connection (optional) |

### Cron Schedule

Default: `0 13 * * *` (13:00 UTC daily)

To change:
1. Edit `daily-check.yml`
2. Modify the cron line
3. Commit and push

**Common cron patterns:**
```yaml
'0 8 * * *'     # 8 AM UTC daily
'0 13 * * *'    # 1 PM UTC daily (8 AM EST)
'0 0 * * 1'     # Every Monday at midnight
'*/30 * * * *'  # Every 30 minutes
```

## 📝 Backend Services

### BackendChecks.js

Provides direct health checks for backend services:

```javascript
const checks = new BackendChecks();

// Database health check
const isDbHealthy = await checks.checkDatabase();

// API health check
const isApiHealthy = await checks.checkAPI('https://api.example.com/health');

// Combined check
const allHealthy = await checks.runAllChecks();
```

**Features:**
- Database connection validation
- API endpoint verification
- Timeout handling (5 seconds)
- Connection pooling support
- Error logging and recovery

## 🎯 Monitoring Strategy

### Daily Execution Flow

```
8:00 AM EST
    ↓
GitHub Actions triggers workflow
    ↓
Node.js 18 environment setup
    ↓
Playwright browsers installed
    ↓
Health check tests execute
    ├─ UI checks (page load, elements)
    ├─ API checks (status codes)
    └─ Database checks (connectivity)
    ↓
Tests pass? → Success (no alert)
Tests fail? → Capture screenshot
    ↓
Email alert sent to admin
    ├─ HTML formatted message
    ├─ Failure screenshot embedded
    └─ GitHub Actions link
    ↓
Test reports uploaded
    └─ 7-day retention
```

### Alert Logic

**Smart retry mechanism:**
- Local: 0 retries (fail fast for development)
- CI: 2 retries (handle transient failures)
- Email: Only on final retry (prevent duplicate alerts)

## 🔐 Security Considerations

### Secrets Management

✅ Never commit `.env` files  
✅ Use GitHub Secrets for credentials  
✅ Rotate app passwords regularly  
✅ Limit GitHub token permissions  
✅ Review workflow logs carefully  

### Workflow Security

✅ Use specific action versions (pin commits)  
✅ Limit job permissions in workflows  
✅ Restrict branch access for sensitive workflows  
✅ Enable branch protection rules  
✅ Monitor workflow execution logs  

## 📊 Artifacts and Reports

### Retention Policy

- HTML reports: 7 days
- Videos: 7 days (if enabled)
- Screenshots: 7 days (if enabled)
- Logs: 7 days

Access artifacts:
1. Go to GitHub Actions run
2. Click workflow run
3. Download artifacts section

## 🚨 Troubleshooting

### Workflow not triggering

**Check:**
- Workflow file syntax (valid YAML)
- Cron schedule expression
- Branch selection in workflow
- Workflows enabled in repo settings

### Tests failing

**Check:**
- Application is accessible
- URLs are correct
- Selectors haven't changed
- Network connectivity
- API endpoints responding

### Email not arriving

**Check:**
- EMAIL_USER secret set correctly
- EMAIL_PASS is Gmail app password (not regular password)
- Email recipient address correct
- Gmail account allows less secure apps
- Check spam/junk folders

### Workflow timeout

**Solutions:**
- Increase timeout in workflow
- Optimize test execution
- Reduce parallel workers
- Break into smaller jobs

## 📚 Documentation

See included documentation:

- **WORKFLOW_SETUP.md** - Complete setup guide
- **ARCHITECTURE.md** - System design details
- **TROUBLESHOOTING.md** - Common issues & solutions
- **MONITORING_GUIDE.md** - Integration guide (from e2e-tests)

## 🔄 Integration with E2E Tests

This project works alongside the E2E testing project:

```
┌─────────────────┐
│   E2E Tests     │  (e2e-tests/)
│   Project       │  - Tests
│                 │  - Utils
│                 │  - Config
└────────┬────────┘
         │
    References
         │
┌────────▼──────────────┐
│ Workflow Automation   │  (workflow-automation/)
│ Project               │  - Triggers E2E tests
│                       │  - Sends alerts
│                       │  - Manages artifacts
└───────────────────────┘
```

## 📈 Metrics & Monitoring

Track workflow metrics in GitHub Actions:

- Execution time
- Pass/fail rate
- Email delivery
- Artifact retention
- Cost analysis

## 🎓 Next Steps

1. ✅ Copy workflow files to your repository
2. ✅ Set GitHub Secrets
3. ✅ Enable workflows
4. ✅ Test manually
5. ✅ Monitor daily execution
6. ✅ Customize for your application
7. ✅ Set up additional alerts (Slack, PagerDuty)

## 📞 Support

For issues or questions:
1. Check TROUBLESHOOTING.md
2. Review GitHub Actions logs
3. Verify all secrets are set
4. Check workflow syntax

## 📝 License

MIT

---

**Last Updated:** January 13, 2026  
**Version:** 1.0.0  
**Status:** Production Ready ✅
