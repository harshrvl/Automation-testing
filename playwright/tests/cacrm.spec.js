const { test, expect } = require('@playwright/test');


//this testcase for negative value testing where i tested negative inputs
test('cacrm login',async({page})=>{
    const userEmail = page.locator("//input[contains(@type,'email')]");
    const userPassword = page.locator("//input[contains(@type,'password')]");

    //empty field validation check

    await page.goto('https://cacrm.weybee.in/auth');
    await page.waitForLoadState('load');
    await userEmail.fill('');
    await userPassword.fill('');
    await userEmail.click();
    //await page.locator("//button[contains(@type,'submit')]").click();
    await expect(page.locator("//span[contains(@role,'alert')]").nth(0)).toBeVisible();
    await expect(page.locator("//span[contains(@role,'alert')]").nth(1)).toBeVisible();
    await page.waitForTimeout(2000);

    //wrong input validation check
    await userEmail.fill('admin');
    await userPassword.fill('Admin');
    await userEmail.click();
    await expect(page.locator("//span[contains(@role,'alert')]").nth(0)).toBeVisible();
    await expect(page.locator("//span[contains(@role,'alert')]").nth(1)).toBeVisible();

    await page.waitForTimeout(2000);
    await userEmail.fill('admin@gmail.com');
    await userPassword.fill('Admin@123');
    await page.locator("//button[contains(@type,'submit')]").click();
    await page.waitForTimeout(1000);
    await expect(page.locator("//div[contains(@class,'alert-text')]")).toBeVisible();

});

// test case  used for positive input scenario and store the state for direct login
let webContext;
test.beforeAll(async ({ browser }) => {
    // Create a new browser context
    const context = await browser.newContext();
    const page = await context.newPage();
    
    // Login to the HRMS application
    const userEmail = "harshraval@weybee.in";
    await page.goto('https://cacrm.weybee.in/auth');
    await page.locator("//input[contains(@type,'email')]").fill(userEmail);
    await page.locator("//input[contains(@type,'password')]").fill("Test@321");
    await page.locator("//button[contains(@type,'submit')]").click();
    await page.waitForTimeout(1000);

    // Save browser context storage state for re-use
    await context.storageState({ path: 'state.json' });
    webContext = await browser.newContext({ storageState: 'state.json' });
    //console.log(await context.storageState());

});

// Define a test that uses the logged-in state
test.only('Verify dashboard is accessible after login testing the logout', async () => {
    const page = await webContext.newPage();
    await page.waitForLoadState('load');
    await page.goto('https://cacrm.weybee.in/home');
    await page.waitForTimeout(3000);
    await page.locator("//div[contains(@class,'app-navbar-item ms-1 ms-lg-3')]").nth(1).click();
    await page.locator("//div[contains(@class,'menu-link px-5')]").click();
    

});
