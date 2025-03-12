# Playwright E2E tests for Kong Gateway UI

## Introduction

Kong Gateway is a robust API management platform designed for comprehensive API lifecycle management. Ensuring the reliability and stability of its user interface through automated UI testing is crucial to maintaining functionality and user experience across different versions and updates.

Playwright, an open-source automation framework, offers an efficient and reliable solution for end-to-end (E2E) UI testing of Kong Gateway.

## Getting Started with Playwright

Before writing UI tests using Playwright, ensure that Node.js and npm are installed on your system.

### Install dependencies

```bash
npm install
```

## Running tests

### Executing Tests Locally

```bash
npx playwright test --ui # Run all tests with UI Mode
npx playwright test # Run all tests run in headless mode
npx playwright test --project=chromium --debug # Interactive debugger with browser window
npm run test:uitest # Tests run in headless mode using npm
```

### UI test case design

1. Create a Kong Gateway service and configure a route for it.
2. Add a new route for an existing service in main page.

### Test Report

After test execution, If any test fails, playwright will automatically generates an webpage report providing a comprehensive overview of test results, users can analyze the detailed report from it.


### CICD

To ensure ongoing quality assurance, Playwright tests should be integrated into the CI/CD pipeline.

1. *Continuous Integration*: Execute E2E tests automatically when new code is pushed to the main or master branch.

2. *On-Demand Execution*: Allow manual test execution based on specific requirements.


### Considerations or Enhancement

1. *Implement Authorization Tests*: include authentication and authorization tests in the global setup
    to run test on dev env.
2. *Optimize Test Execution*: Store browser state to reduce redundant operations and improve efficiency.
3. *Define Test Scope*: Categorize tests based on different environments and phases, such as sanity tests and full regression tests.
4. *Parallel Execution*: Configure tests to run concurrently to enhance efficiency if required.
5. *Expand Test Coverage*: Add additional test cases to validate new features and functionalities.
6. *Scheduled Test Execution*: Set up a dedicated pipeline to execute tests periodically.
7. *Automated Notifications*: Integrate with notification tools (e.g., Slack, email) to send test reports.
8. *Environment-Specific Testing*: Run E2E tests in a development environment by configuring environment variables instead of executing tests solely within Docker.
