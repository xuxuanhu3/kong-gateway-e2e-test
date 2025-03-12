import { Browser, chromium, Page, expect } from "@playwright/test";
import { execSync } from 'child_process';

  function checkDockerService(serviceName) {
    try {
        const output = execSync(`docker ps --format "{{.Names}}: {{.Status}}"`).toString();
        console.log(output);

        const serviceStatus = output
            .split('\n')
            .find(line => line.startsWith(serviceName));

        return serviceStatus && serviceStatus.includes('healthy');
    } catch (error) {
        console.error(`Error checking Docker service ${serviceName}:`, error);
        return false;
    }
  }


  export default async function globalSetup() {
    console.log('Starting Kong Gateway using docker-compose...');

    const browser: Browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({ locale: "en-US" });
  const page: Page = await context.newPage();
    
    // start Docker Compose
    execSync('docker-compose -f ./docker-compose.yml up -d', { stdio: 'inherit' });

    console.log('Waiting for Kong Gateway services to be ready...');

    // check service healthy
    const services = ['kong-ee-database', 'kong-cp'];
    let allHealthy = false;
    const maxRetries = 10;
    let retries = 0;

    while (!allHealthy && retries < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, 10000)); // 等待 5 秒
        allHealthy = services.every(service => checkDockerService(service));

        console.log(`Retrying... (${retries + 1}/${maxRetries})`);
        retries++;
    }

    if (!allHealthy) {
        throw new Error('Kong services failed to start or are not healthy.');
    }

    console.log('All services are healthy!');

    console.log('Testing Kong Gateway UI...');
    
    await page.goto('http://localhost:8002');
    await page.waitForTimeout(3000);
  
    await expect(page.locator('span.float-left.title', { hasText: 'Workspaces' })).toBeVisible()
  };

