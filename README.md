# Playwright E2E tests for Kong Gateway UI

## Introduction

Kong gateway is a powerful API platform for API lifecycle management.
Writing UI tests for Kong gateway is crucial to ensure its functionality and user experience remain intact across different versions and updates.
[Playwright](https://playwright.dev/docs/intro), an open-source automation library, provides an effective way to automate UI tests for Kong gateway.

## Getting Started with Playwright

Before writing UI tests with Playwright, ensure you have Node.js and npm installed on your machine. You can install Playwright using npm.

### Install dependencies

```bash
npm install
```

## Running tests

### Manually Run tests on local

```bash
npx playwright test --ui # Run all tests with UI Mode
npx playwright test # Run all tests run in headless mode
npx playwright test --project=chromium --debug # Interactive debugger with browser window
npm run test:uitest # Tests run in headless mode using npm
```

### UI test case design

1. create Kong Gatewway Service and add a route for this service
2. Create a new route in main meanu for the existing service

### Test Report


### CICD

1. Continueously to run E2E tests when has new code change on main or master branch.
2. Manually run test per indivulely requirement


### Considerations or Enhancement

1. Add more cases based on feature and functionalities
2. Setup a separate pipeline to run on schedule.
3. Send test report to notifications tools, like slack, etc.
