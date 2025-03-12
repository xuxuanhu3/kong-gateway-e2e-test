import { test, expect } from "@playwright/test";
import { gatewayEndpoint} from "./test-constants";

test('Test login', async ({ page }) => {
    console.log('Testing login...');    
        await page.goto(gatewayEndpoint);
        await page.waitForTimeout(3000);
      
        await expect(page.locator('span.float-left.title').filter({ hasText: 'Workspaces' }).first()).toBeVisible();
})
