# E2E Testing Project

Professional-grade end-to-end testing suite using Playwright.

## 📁 Project Structure

```
e2e-tests/
├── tests/                    # Test files
│   ├── full-stack-health.spec.js    # Health check tests
│   ├── monitoring-setup.spec.js     # Setup verification
│   └── example.spec.js              # Example tests
├── utils/                    # Utility modules
│   ├── Notifier.js          # Email alert system
│   ├── emailService.js      # Email configuration
│   └── pageObjects/         # Page Object Models
│       └── LoginPage.js     # Example Page Object
├── playwright.config.js     # Playwright configuration
├── .env                     # Environment variables (local)
├── .gitignore              # Git ignore rules
└── package.json            # Project dependencies
```

## 🚀 Quick Start

### Installation

```bash
cd e2e-tests
npm install
npx playwright install --with-deps
```

### Running Tests

**All tests:**
```bash
npm run test
```

**Health check only:**
```bash
npm run test:health
```

**Headed mode (visible browser):**
```bash
npm run test:headed
```

**Specific browser:**
```bash
npm run test:chromium    # Chromium only
npm run test:firefox     # Firefox only
npm run test:webkit      # Safari/WebKit only
```

**Debug mode:**
```bash
npm run test:debug
```

**UI mode:**
```bash
npm run test:ui
```

## 📊 Test Coverage

### Health Check Tests
- Page navigation validation
- Title content verification
- UI element visibility
- HTTP status checking
- Email alert configuration

### Setup Verification Tests
- Component integrity checks
- File structure validation
- Dependency verification
- Configuration validation

## 🔧 Configuration

### Environment Variables (.env)

```bash
EMAIL_PASS=your_gmail_app_password
```

### Playwright Config

Key settings in `playwright.config.js`:
- **testDir:** `./tests` - Location of test files
- **screenshot:** `only-on-failure` - Screenshots on failures only
- **video:** `retain-on-failure` - Videos captured on failure
- **trace:** `retain-on-failure` - Trace files for debugging
- **retries:** 0 locally, 2 in CI - Automatic retry on failure
- **headless:** Toggle via `HEADED=true` environment variable

## 🎯 Page Objects Pattern

Example usage in tests:

```javascript
const LoginPage = require('../utils/pageObjects/LoginPage');

test('Login flow', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateTo();
    await loginPage.login('email@example.com', 'password');
    const error = await loginPage.getErrorMessage();
});
```

## 📈 Reports

After running tests, view the HTML report:

```bash
npm run report
```

Reports include:
- Test execution timeline
- Pass/fail status
- Screenshots and videos
- Trace files for debugging

## 🧪 Test Structure

All tests follow this pattern:

```javascript
const { test, expect } = require('@playwright/test');

test('Test description', async ({ page }, testInfo) => {
    // Arrange
    await page.goto('https://example.com');
    
    // Act
    await page.click('button');
    
    // Assert
    await expect(page).toHaveTitle(/Title/);
});
```

## 🛠️ Customization

### Adding New Tests

1. Create file in `tests/` folder with `.spec.js` suffix
2. Import necessary modules
3. Write test cases
4. Run `npm test` to execute

### Creating Page Objects

1. Create class in `utils/pageObjects/`
2. Define selectors as getters
3. Define actions as methods
4. Import and use in tests

Example:

```javascript
class MyPage {
    constructor(page) {
        this.page = page;
    }
    
    get searchInput() {
        return this.page.getByPlaceholder('Search');
    }
    
    async search(term) {
        await this.searchInput.fill(term);
        await this.page.getByRole('button', { name: 'Search' }).click();
    }
}

module.exports = MyPage;
```

## 📋 Best Practices

✅ Use Page Objects for UI elements  
✅ Keep tests independent and isolated  
✅ Use meaningful test names  
✅ Follow AAA pattern (Arrange, Act, Assert)  
✅ Leverage Playwright's auto-waiting  
✅ Use selectors that won't change frequently  
✅ Add proper error handling  
✅ Document complex test logic  

## 🐛 Troubleshooting

### Tests not running
- Run `npm install` to install dependencies
- Run `npx playwright install --with-deps` for browsers

### Timeouts
- Increase timeout in `playwright.config.js`
- Check if selectors exist in the page

### Flaky tests
- Use proper wait conditions
- Avoid hard waits (setTimeout)
- Use Playwright's built-in waits

## 📚 Resources

- [Playwright Documentation](https://playwright.dev)
- [Playwright API Reference](https://playwright.dev/docs/api/class-playwright)
- [Best Practices](https://playwright.dev/docs/best-practices)

## 📝 License

MIT

---

**Last Updated:** January 13, 2026  
**Version:** 1.0.0
