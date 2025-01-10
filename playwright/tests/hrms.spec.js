const { test, expect } = require('@playwright/test');


//this testcase for negative value testing where i tested negative inputs
test('hrms login',async({page})=>{
    const usernName = page.locator("//input[contains(@class,'oxd-input')]").nth(0);
    const userPassword = page.locator("//input[contains(@class,'oxd-input')]").nth(1);

    //empty field validation check
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await usernName.fill('');
    await userPassword.fill('');
    await page.locator("//button[contains(@class,'oxd-button')]").click();
    await expect(page.locator("//span[contains(@class,'oxd-text')]").nth(0)).toBeVisible();
    await expect(page.locator("//span[contains(@class,'oxd-text')]").nth(1)).toBeVisible();
    await page.waitForTimeout(2000);

    //wrong input validation check
    await usernName.fill('admin');
    await userPassword.fill('admin');
    await page.locator("//button[contains(@class,'oxd-button')]").click();
    await page.waitForTimeout(1000);
    await expect(page.locator("//div[contains(@role,'alert')]")).toBeVisible();

});

//test case  used for positive input scenario and store the state for direct login
let webContext;
test.beforeAll(async ({ browser }) => {
    // Create a new browser context
    const context = await browser.newContext();
    const page = await context.newPage();
    
    // Login to the HRMS application
    const usernName = "Admin";
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page.locator("//input[contains(@class,'oxd-input')]").nth(0).fill(usernName);
    await page.locator("//input[contains(@class,'oxd-input')]").nth(1).fill("admin123");
    await page.locator("//button[contains(@class,'oxd-button')]").click();
    await page.waitForTimeout(1000);

    // Save browser context storage state for re-use
    await context.storageState({ path: 'state.json' });
    webContext = await browser.newContext({ storageState: 'state.json' });

});

// Define a test that uses the logged-in state
test.only('Verify dashboard is accessible after login', async () => {
    const page = await webContext.newPage();
    await page.waitForLoadState('load');
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
    
    // Validate that the dashboard is loaded successfully
    const dashboardHeader = page.locator('h6:has-text("Dashboard")');
    await expect(dashboardHeader).toBeVisible();
});
