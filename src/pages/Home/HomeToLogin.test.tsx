import { Browser, Page, chromium } from 'playwright';

describe('End-to-end test', () => {
    let browser: Browser;
    let page: Page;

    beforeAll(async () => {
        browser = await chromium.launch(); // { headless: false } to see the browser in action
    });

    afterAll(async () => {
        await browser.close();
    });

    beforeEach(async () => {
        page = await browser.newPage();
        await page.goto('http://localhost:3000'); // Assuming your app runs on localhost:3000
    });

    afterEach(async () => {
        await page.close();
    });

    it('should login a user', async () => {
        // Click the button which leads to login
        await page.click('text=Commencer mon blog');

        // Wait until the login page is loaded
        await page.waitForSelector('text=Connexion');

        // Fill in the email and password fields
        await page.fill('input[placeholder="Votre email"]', 'test@mail.com');
        await page.fill('input[placeholder="Votre mot de passe"]', 'test1234');

        // Click the login button
        await page.click('text=Me connecter');

        // Wait for redirection or any other expected behavior after successful login
        await page.waitForNavigation();

        // Verify you're in the expected page after login. This can vary depending on your implementation.
        expect(page.url()).toBe('http://localhost:3000/'); // Adjust the expected URL accordingly.
    });
});
