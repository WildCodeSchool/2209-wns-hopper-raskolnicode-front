import { Browser, BrowserContext, Page, chromium, expect, test } from '@playwright/test';

test.describe('Connexion test', () => {
    let browser: Browser;
    let context: BrowserContext;
    let page: Page;

    test.beforeAll(async () => {
        browser = await chromium.launch();
        context = await browser.newContext();
        page = await context.newPage();
        
        await page.goto('http://localhost:3000');
    });
    
    test.afterAll(async () => {
        await page.close();
        await context.close();
        await browser.close();
    });
    
    test('should login a user', async () => {
        await page.waitForSelector('text=Connexion');
        await page.click('text=Connexion');
        
        expect(page.url()).toBe('http://localhost:3000/login');

        await page.fill('input[placeholder="Votre email"]', 'test@mail.com');
        await page.fill('input[placeholder="Votre mot de passe"]', 'test1234');

        await page.click('text=Me connecter');

        await page.waitForNavigation();

        expect(page.url()).toBe('http://localhost:3000/'); 
        const deconnexionButton = await page.waitForSelector('text=Déconnexion');
        expect(deconnexionButton).toBeTruthy(); 
    });
});
