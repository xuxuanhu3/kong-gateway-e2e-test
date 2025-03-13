import { test, expect } from '@playwright/test';
import { testServiceName, testRouteName, testRoutePath, upstreamURL } from "../test-constants";

test.describe.serial('Kong Gateway Service Test', () => {
  test('Test Service page', async ({ page }) => {
    console.log('Testing Kong Gateway Services page...');
      
    await page.goto('http://localhost:8002/manager/services');
    // await page.waitForTimeout(3000);
  
    await expect(page.getByTestId('kong-ui-app-layout-main').getByText('Gateway Services')).toBeVisible();
  });
  
  test.skip('Test service create', async ({ page }) => {  
    await page.getByText("Gateway Services").click();
    await expect(page.getByText("Configure a New Gateway Service")).toBeVisible()
    await page.getByTestId("New Gateway Service").click();
    // verify General Information
    await expect(page.getByText("General Information")).toBeVisible();
    // fill service name
    await page.getByPlaceholder("enter a unique name").fill(testServiceName);
    // fill upstream url
    await page.getByPlaceholder("Enter a URL").fill(upstreamURL);
    // save settings and call API to create
    const responsePromise = page.waitForResponse(
      response => response.url().includes('/services') && response.request().method() === 'POST'
    );
    //submit
    await page.getByRole("button", { name: "Save" }).click();
    // verify response
    const response = await responsePromise;
    expect(response.status()).toBe(201);
    // redirect to service details page
    await expect(page.getByText(testServiceName)).toBeVisible();
  });

  test.skip('Test add route for a service', async ({ page }) => {  
    await page.getByRole("button", { name: "Add a Route" }).click();
    // fill route name
    await page.getByPlaceholder("enter a unique name").fill(testRouteName);
    // fill route path
    await page.getByPlaceholder("Enter a path").fill(testRoutePath);
    // submit
    await page.getByRole("button", { name: "Save" }).click();
    // redirect to route details page
    await expect(page.getByText(testRouteName)).toBeVisible(); 
  });

})

