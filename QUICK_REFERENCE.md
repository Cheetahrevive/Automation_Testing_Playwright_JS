# Quick Reference Guide

## 🎯 Project Quick Navigation

### Start E2E Testing
```bash
cd e2e-tests
npm install
npm run test
```

### Start Workflow Setup
```bash
cd workflow-automation
cat WORKFLOW_SETUP.md
```

---

## 📁 Folder Structure at a Glance

```
PlayWright Automation/
├── e2e-tests/          ← Tests project
├── workflow-automation/← Workflows project
└── Documentation files
```

---

## 📊 Each Project Contains

### e2e-tests/
- `tests/` - Test files
- `utils/` - Page objects & helpers
- `playwright.config.js` - Test config
- `package.json` - Dependencies
- `README.md` - Guide

### workflow-automation/
- `.github/workflows/` - GitHub Actions
- `services/` - Health checks
- `WORKFLOW_SETUP.md` - Setup guide
- `README.md` - Documentation

---

## 🚀 Common Commands

**Run tests locally:**
```bash
cd e2e-tests && npm run test
```

**View test report:**
```bash
cd e2e-tests && npm run report
```

**Test in headed mode:**
```bash
cd e2e-tests && npm run test:headed
```

**Interactive test UI:**
```bash
cd e2e-tests && npm run test:ui
```

---

## 📚 Documentation

- **This file:** Quick reference
- **README.md** (root) - Project overview
- **FOLDER_ORGANIZATION.md** - Detailed folder guide
- **PROJECT_SEGREGATION_SUMMARY.md** - Segregation details
- **e2e-tests/README.md** - Testing guide
- **workflow-automation/README.md** - Workflow guide
- **workflow-automation/WORKFLOW_SETUP.md** - GitHub setup

---

## ✅ Organization Complete

Your workspace is now:
- ✅ Organized by project
- ✅ Easy to navigate in VS Code
- ✅ Ready for development
- ✅ Production-ready

---

**Status:** Organized & Ready
