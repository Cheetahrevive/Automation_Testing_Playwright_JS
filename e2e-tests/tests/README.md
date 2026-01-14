# Test Suite Documentation

This directory contains all test specifications for the E2E Testing Project.

## 📁 Test Files Overview

### 1. **api-testing.spec.js**
**Purpose**: Comprehensive API testing suite

**Test Coverage**:
- ✅ GET requests (fetch all posts, fetch single post)
- ✅ POST requests (create new post)
- ✅ PUT requests (update existing post)
- ✅ DELETE requests (remove post)
- ✅ Error handling (404 Not Found)
- ✅ Response header verification
- ✅ API performance/response time testing

**Run Command**:
```bash
npx playwright test api-testing.spec.js
```

---

### 2. **comprehensive-e2e.spec.js**
**Purpose**: End-to-end user journey testing

**Test Coverage**:
- ✅ Multi-step user workflows (add, complete, filter)
- ✅ Edit and update workflows
- ✅ User journey completion verification
- ✅ State management across operations

**Run Command**:
```bash
npx playwright test comprehensive-e2e.spec.js
```

---

### 3. **example.spec.js**
**Purpose**: Basic navigation and assertion patterns

**Test Coverage**:
- ✅ Page title and URL verification
- ✅ Navigation link testing
- ✅ Responsive design testing (multiple viewports)
- ✅ Search functionality verification

**Run Command**:
```bash
npx playwright test example.spec.js
```

---

### 4. **full-stack-health.spec.js**
**Purpose**: Full-stack application health monitoring

**Test Coverage**:
- ✅ UI/Frontend health checks
- ✅ API/Backend health checks
- ✅ Database connectivity verification
- ✅ End-to-end integration testing

**Run Command**:
```bash
npx playwright test full-stack-health.spec.js
```

---

### 5. **monitoring-setup.spec.js**
**Purpose**: Monitoring system configuration and health

**Test Coverage**:
- ✅ Monitoring setup verification
- ✅ Alert configuration testing
- ✅ Health check endpoints
- ✅ System status monitoring

**Run Command**:
```bash
npx playwright test monitoring-setup.spec.js
```

---

## 🚀 Running Tests

### Run All Tests
```bash
npm test
# or
npx playwright test
```

### Run Specific Test File
```bash
npx playwright test <filename>.spec.js
```

### Run Tests in Headed Mode
```bash
npx playwright test --headed
```

### Run Tests in Debug Mode
```bash
npx playwright test --debug
```

### Run Tests in Specific Browser
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Generate HTML Report
```bash
npx playwright test --reporter=html
npx playwright show-report
```

---

## 📊 Test Statistics

- **Total Test Files**: 5
- **Total Test Suites**: 10+
- **Total Test Cases**: 20+
- **Test Coverage**: UI, API, E2E, Health Monitoring
- **Browsers Tested**: Chromium, Firefox, WebKit

---

## 🛠 Best Practices

1. **Naming Convention**: Use descriptive test names that explain what is being tested
2. **Test Organization**: Group related tests using `test.describe()` blocks
3. **Assertions**: Use appropriate expect assertions for better error messages
4. **Page Objects**: Utilize page object pattern for reusable components
5. **Test Data**: Keep test data separate and manageable
6. **Cleanup**: Ensure proper cleanup after each test

---

## 📝 Adding New Tests

When adding new test files:

1. Follow the naming convention: `<feature>.spec.js`
2. Include proper documentation at the top of the file
3. Use async/await for all Playwright operations
4. Add proper error handling and assertions
5. Update this README with the new test information

---

## 🔍 Debugging Tips

- Use `--headed` flag to see the browser
- Use `--debug` flag to step through tests
- Use `page.pause()` to pause execution at specific points
- Check screenshots in `test-results/` folder for failed tests
- Review HTML reports for detailed test execution information

---

## 📚 Additional Resources

- [Playwright Documentation](https://playwright.dev/)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Playwright API Reference](https://playwright.dev/docs/api/class-playwright)
