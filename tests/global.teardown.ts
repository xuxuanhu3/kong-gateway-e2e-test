import { test as teardown } from '@playwright/test';
import { execSync } from 'child_process';

export default async function globalTeardown() {
    console.log('Stopping Kong Gateway...');
    
    execSync('docker-compose down', { stdio: 'inherit' });
    
    console.log('Kong Gateway has been stopped.');
};
