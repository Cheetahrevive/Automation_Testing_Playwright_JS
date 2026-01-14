# PlayWright Automation - Project Root

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)
![Playwright](https://img.shields.io/badge/playwright-v1.45.0-brightgreen.svg)
![Tests](https://img.shields.io/badge/tests-18%20passing-success.svg)
![Projects](https://img.shields.io/badge/projects-2%20segregated-blue.svg)
![Status](https://img.shields.io/badge/status-production%20ready-success.svg)


This is the root workspace containing two independent, segregated projects:

## 📁 Project Structure

```
PlayWright Automation/
│
├── 🎯 e2e-tests/                 # E2E Testing Project
│   ├── tests/                    # Test specifications
│   ├── utils/                    # Utilities & page objects
│   ├── tests-examples/           # Example test templates
│   ├── playwright-report/        # HTML test reports
│   ├── test-results/             # Test results JSON
│   ├── playwright.config.js      # Playwright configuration
│   ├── package.json              # Test dependencies
│   ├── README.md                 # Setup & usage guide
│   └── .gitignore
│
├── 🎯 workflow-automation/       # Workflow Automation Project
│   ├── .github/
│   │   └── workflows/            # GitHub Actions workflows
│   │       └── daily-check.yml   # Daily health check workflow
│   ├── services/                 # Backend health checks
│   ├── WORKFLOW_SETUP.md         # Setup instructions
│   ├── README.md                 # Documentation
│   └── .gitignore
│
├── 📄 README.md                  # This file
├── 📄 PROJECT_SEGREGATION_SUMMARY.md
└── .env                          # Environment variables (not tracked)
```

## 🚀 Quick Start

### For E2E Testing (Developers)
```bash
cd e2e-tests
npm install
npm run test
```

### For Workflow Automation (DevOps)
```bash
cd workflow-automation
cat WORKFLOW_SETUP.md
```

## 📊 Project Overview

### Project 1: E2E Testing (`e2e-tests/`)
- **Purpose:** Test development and execution
- **Framework:** Playwright v1.45.0
- **Tests:** 18 comprehensive tests
- **Pass Rate:** 100%
- **Browsers:** Chromium, Firefox, WebKit
- **Local Execution:** Ready to run
- **Maintainer:** QA Team

### Project 2: Workflow Automation (`workflow-automation/`)
- **Purpose:** GitHub Actions CI/CD management
- **Trigger:** Daily at 13:00 UTC (8 AM EST)
- **Features:** Health checks, email alerts, artifacts
- **Setup:** Step-by-step in WORKFLOW_SETUP.md
- **Maintainer:** DevOps Team

## 🔗 Integration Flow

```
Developer writes tests → Git push → GitHub Actions triggered
     ↓
 Tests run in CI → Playwright reports → Email notifications
     ↓
  Success/Failure alerts → Team notified
```

## 🛠 Technology Stack

**E2E Testing Project:**
- Playwright (testing framework)
- Node.js 18
- Nodemailer (email alerts)
- Page Object Model pattern

**Workflow Automation Project:**
- GitHub Actions (CI/CD)
- Node.js 18
- PostgreSQL driver (optional)
- Cron scheduling

## 📚 Documentation

- **Root Level:** [README.md](README.md) (this file)
- **E2E Tests:** [e2e-tests/README.md](e2e-tests/README.md)
- **Workflows:** [workflow-automation/README.md](workflow-automation/README.md)
- **Setup Guide:** [workflow-automation/WORKFLOW_SETUP.md](workflow-automation/WORKFLOW_SETUP.md)
- **Segregation Info:** [PROJECT_SEGREGATION_SUMMARY.md](PROJECT_SEGREGATION_SUMMARY.md)

## ✨ Key Features

✅ Clear separation of testing and CI/CD concerns
✅ Independent development paths
✅ Production-ready configuration
✅ Comprehensive documentation
✅ 100% test pass rate
✅ Free to run (GitHub Actions free tier)

## 🎓 Recommended Reading Order

1. **First time?** Start with this README
2. **Want to test locally?** Go to `e2e-tests/README.md`
3. **Want to deploy workflows?** Go to `workflow-automation/WORKFLOW_SETUP.md`
4. **Need architecture details?** Read `PROJECT_SEGREGATION_SUMMARY.md`

## 📞 Support

For questions about each project, refer to their individual README.md files:
- E2E Tests: `e2e-tests/README.md`
- Workflows: `workflow-automation/README.md`

---

**Status:** ✅ Production Ready
**Last Updated:** January 13, 2026
**Version:** 2.0 (Segregated)
