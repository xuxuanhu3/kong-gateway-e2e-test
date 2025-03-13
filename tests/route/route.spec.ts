import { test, expect } from '@playwright/test';
import { testServiceName, testRouteName, testRoutePath } from "../test-constants";
import { getServices } from "./help";

test.describe.serial('Kong Gateway route Test', () => {
  test('Test Route page', async ({ page }) => {
    console.log('Testing Kong Gateway route page...');
      
    await page.goto('http://localhost:8002/manager/routes');
    await page.waitForTimeout(3000);
  
    await expect(page.getByTestId('kong-ui-app-layout-main').getByText('Routes')).toBeVisible();
  });
  
  test.skip('Test route create', async ({ page, request }) => {
    const services = await getServices(request)
    if (services.length > 0) {
      await page.getByText("Gateway Services").click();
      await expect(page.getByText("Configure a New Route")).toBeVisible()
      await page.getByTestId("New Route").click();
      // verify General Information
      await expect(page.getByText("General Information")).toBeVisible();
      // fill route name
      await page.getByPlaceholder("enter a unique name").fill(testRouteName);
      // fill selected service
      await page.getByPlaceholder("Select a service").fill(testServiceName);
      // fill route path
      await page.getByPlaceholder("Enter a path").fill(testRoutePath);
      // submit
      await page.getByRole("button", { name: "Save" }).click();
      // redirect to route details page
      await expect(page.getByText(testRouteName)).toBeVisible(); 
    }  
  });
})

