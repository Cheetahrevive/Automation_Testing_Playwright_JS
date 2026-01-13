# Folder Organization Guide

## 📁 Clean Project Structure

Your workspace is now organized into **2 independent projects** with clear separation:

```
PlayWright Automation/
│
├── 📂 e2e-tests/                    ← E2E TESTING PROJECT
│   ├── 📂 tests/                    # Test specifications
│   │   ├── example.spec.js
│   │   ├── full-stack-health.spec.js
│   │   └── monitoring-setup.spec.js
│   │
│   ├── 📂 utils/                    # Utilities & helpers
│   │   ├── 📂 pageObjects/          # Page Object Models
│   │   │   ├── AppHealthPage.js
│   │   │   └── LoginPage.js
│   │   ├── Notifier.js              # Email notification system
│   │   └── emailService.js          # Email configuration
│   │
│   ├── 📂 tests-examples/           # Example test templates
│   ├── 📂 playwright-report/        # HTML test reports (auto-generated)
│   ├── 📂 test-results/             # Test results in JSON (auto-generated)
│   ├── playwright.config.js         # Playwright test configuration
│   ├── package.json                 # Test dependencies & scripts
│   ├── README.md                    # E2E Testing guide
│   └── .gitignore                   # Git ignore for e2e-tests
│
├── 📂 workflow-automation/          ← WORKFLOW AUTOMATION PROJECT
│   ├── 📂 .github/
│   │   └── 📂 workflows/            # GitHub Actions workflows
│   │       └── daily-check.yml      # Daily health check workflow
│   │
│   ├── 📂 services/                 # Backend health checks (optional)
│   │
│   ├── WORKFLOW_SETUP.md            # Step-by-step GitHub setup guide
│   ├── README.md                    # Workflow automation guide
│   └── .gitignore                   # Git ignore for workflows
│
├── 📄 README.md                     # Root documentation (you are here)
├── 📄 PROJECT_SEGREGATION_SUMMARY.md # Segregation benefits & details
├── 📄 .env                          # Environment variables (not tracked)
└── 📄 .gitignore                    # Root git ignore

```

## 🎯 Project 1: E2E Testing (`e2e-tests/`)

### Purpose
Local test development and execution for quality assurance

### Key Directories
| Directory | Purpose | Auto-Generated? |
|-----------|---------|-----------------|
| `tests/` | Test specifications | ❌ Manual |
| `utils/` | Helper utilities & page objects | ❌ Manual |
| `playwright-report/` | HTML test reports | ✅ Yes (from test runs) |
| `test-results/` | JSON test results | ✅ Yes (from test runs) |
| `tests-examples/` | Example test templates | ❌ Manual |

### Key Files
| File | Purpose |
|------|---------|
| `playwright.config.js` | Test runner configuration (headless, retries, browsers) |
| `package.json` | npm dependencies & test scripts |
| `README.md` | Complete testing guide with all commands |
| `.gitignore` | Exclude test artifacts from git |

### Commands
```bash
cd e2e-tests
npm install                 # Install dependencies
npm run test               # Run all tests
npm run test:headed        # Run with visible browser
npm run test:ui            # Interactive UI mode
npm run report             # View HTML report
```

---

## 🎯 Project 2: Workflow Automation (`workflow-automation/`)

### Purpose
GitHub Actions CI/CD management for automated daily health checks

### Key Directories
| Directory | Purpose |
|-----------|---------|
| `.github/workflows/` | GitHub Actions workflow definitions |
| `services/` | Backend health check utilities |

### Key Files
| File | Purpose |
|------|---------|
| `.github/workflows/daily-check.yml` | Main daily health check workflow |
| `WORKFLOW_SETUP.md` | Step-by-step GitHub Actions setup |
| `README.md` | Workflow automation documentation |
| `.gitignore` | Exclude config from git |

### Workflow Features
- **Trigger:** Daily at 13:00 UTC (8 AM EST)
- **Action:** Run health checks automatically
- **Alert:** Email notification on failures
- **Artifacts:** Save reports for 7 days

### Setup Steps
```bash
cd workflow-automation
cat WORKFLOW_SETUP.md
# Follow steps to:
# 1. Enable GitHub 2FA & create app password
# 2. Add GitHub Secrets (EMAIL_USER, EMAIL_PASS)
# 3. Enable workflows in GitHub Actions tab
# 4. Test manually
```

---

## 📊 Organization Benefits

### ✅ Clear Separation of Concerns
- **E2E Tests:** QA team focus
- **Workflows:** DevOps team focus
- **Root:** Overall documentation

### ✅ Independent Development
- Modify tests without affecting workflows
- Update workflows without breaking tests
- Deploy each project independently

### ✅ Better Code Organization
- Each project has its own configuration
- Dependencies are isolated
- No cross-project coupling

### ✅ Easier Maintenance
- Clear file locations
- Less clutter at root
- Logical grouping of related files

### ✅ Scalability
- Easy to add new tests
- Simple to extend workflows
- Room for multiple teams

---

## 🔄 File Flow Diagram

```
Developer
    ↓
cd e2e-tests → Write/Edit tests
    ↓
npm run test → Local testing
    ↓
git add . && git commit → Commit changes
    ↓
git push → Push to GitHub
    ↓
GitHub Actions triggered
    ↓
cd workflow-automation → .github/workflows/daily-check.yml runs
    ↓
Tests execute via Playwright
    ↓
Email notification sent
    ↓
Reports saved as artifacts
```

---

## 🛠 Maintenance Tasks

### Regular Tasks
| Task | Location | Frequency |
|------|----------|-----------|
| Add new tests | `e2e-tests/tests/` | As needed |
| Update selectors | `e2e-tests/utils/pageObjects/` | When UI changes |
| View test reports | `e2e-tests/playwright-report/` | After test runs |
| Check logs | GitHub Actions tab | Daily |

### Configuration Updates
| Item | Location | When |
|------|----------|------|
| Playwright config | `e2e-tests/playwright.config.js` | Browser/timeout changes |
| Workflow schedule | `workflow-automation/.github/workflows/daily-check.yml` | Change run time |
| Email recipients | `e2e-tests/utils/Notifier.js` | Change notification target |
| GitHub Secrets | GitHub Repo Settings | Credential rotation |

---

## 🚀 Next Steps

### 1️⃣ First Time Setup
```bash
# For testing
cd e2e-tests && cat README.md

# For workflows
cd workflow-automation && cat WORKFLOW_SETUP.md
```

### 2️⃣ Run Tests Locally
```bash
cd e2e-tests
npm install
npm run test
```

### 3️⃣ Deploy to GitHub Actions
```bash
cd workflow-automation
# Follow WORKFLOW_SETUP.md steps
```

### 4️⃣ Monitor & Maintain
- Check test results after each commit
- Review GitHub Actions logs
- Update selectors when UI changes
- Keep dependencies updated

---

## 📝 Notes

- **Don't** create new files at root level unless they're documentation
- **Do** keep tests in `e2e-tests/tests/`
- **Do** keep workflows in `workflow-automation/.github/workflows/`
- **Do** use `.gitignore` to exclude artifacts
- **Do** read project-specific READMEs for detailed guides

---

**Status:** ✅ Organized & Ready
**Last Updated:** January 13, 2026
