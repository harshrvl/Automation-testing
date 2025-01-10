const { test, expect } = require('@playwright/test');
const exp = require('constants');
const { ADDRGETNETWORKPARAMS } = require('dns');


//Test case for negative inputs on log-in page
test('cacrm login', async ({ page }) => {
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

// Test case for positive log-in scenario and store state.json
let webContext;
// test.beforeAll(async ({ browser }) => {
//     // Create a new browser context
//     const context = await browser.newContext();
//     const page = await context.newPage();

//     // Login to the CACRM application
//     const userEmail = "harshraval@weybee.in";
//     await page.goto('https://cacrm.weybee.in/auth');
//     await page.locator("//input[contains(@type,'email')]").fill(userEmail);
//     await page.locator("//input[contains(@type,'password')]").fill("Test@321");
//     await page.locator("//button[contains(@type,'submit')]").click();


//     // Save browser context storage state for re-use
//     await context.storageState({ path: 'state.json' });
//     webContext = await browser.newContext({ storageState: 'state.json' });
//     console.log(await context.storageState());

// });

// Test case for the log-out functionality
test('Verify dashboard is accessible after login testing the logout', async () => {
    const page = await webContext.newPage();
    await page.goto('https://cacrm.weybee.in/home');
    await page.waitForLoadState('load');
    await page.waitForTimeout(3000);
    await page.locator("//div[contains(@class,'app-navbar-item ms-1 ms-lg-3')]").nth(1).click();
    await page.locator("//div[contains(@class,'menu-link px-5')]").click();
});


// Test case for the dashboard elements
test('verify the dashboard elements after login', async () => {
    const page = await webContext.newPage();
    await page.goto('https://cacrm.weybee.in/home');
    await page.waitForTimeout(3000);
    //await page.pause();
    //theme icon should be visible
    await page.waitForSelector("//div[contains(@class,'app-navbar-item ms-1 ms-lg-3')][1]", { state: 'visible' });
    await expect(page.locator("//a[contains(@class,'btn btn-icon btn-active-light-primary btn-custom')]")).toBeVisible();
    await page.locator("//div[contains(@class,'app-navbar-item ms-1 ms-lg-3')]").nth(0).click();
    await expect(page.locator("//a[contains(@class,'btn btn-icon btn-active-light-primary btn-custom')]")).toBeVisible();
    //Today's task functionality should be visible
    await expect(page.locator("//div[contains(@class,'col-12 col-lg-12 col-lg-6 col-md-5 col-xl-5 col-xxl-4 mb-8')]").nth(0)).toBeVisible();
    //activity should be visible
    await expect(page.locator("//div[contains(@class,'col-12 col-lg-12 col-lg-6 col-md-5 col-xl-5 col-xxl-4 mb-8')]").nth(1)).toBeVisible();
    //chat notifications should be visible 
    await expect(page.locator("//div[contains(@class,'col-12 col-lg-12 col-lg-6 col-md-5 col-xl-5 col-xxl-4 mb-8')]").nth(2)).toBeVisible();
    //Verify the task detail header section
    await expect(page.locator("//div[contains(@class,'d-flex overflow-auto h-55px tabs-container')]")).toHaveText('AssignedCheckingFollowup');
    //Verify sthe task Detail section
    await expect(page.locator("//div[contains(@class,'table-responsive horizontal-scroll')]").nth(0)).toBeVisible();

});

//verify that deactivated firm not able to make transaction
test('book deactivation', async () => {
    const page = await webContext.newPage();
    await page.goto('https://cacrm.weybee.in/home');
    await page.waitForTimeout(3000);
    await page.locator("//div[contains(@class,'menu-item')]").nth(10).click();
    await page.locator("//button[contains(@class,'btn btn-icon btn-bg-light btn-sm p-2 btn-active-light-danger')]").nth(1).click();
    await expect(page.locator("//div[contains(@class,'Toastify__toast-body')]")).toHaveText('Firm status updated');

    await page.locator("//span[contains(@class,'menu-title fw-semibold text-muted fs-6')]").click();
    await page.pause();

    await page.getByText('Select Firm').click();
    await expect(page.locator("//li[contains(@class,'dropdown-item d-flex gap-2 position-relative cursor-pointer')]").nth(6)).toBeHidden();

})


//Add Edit user Scenario with positive input
test('Add/Edit user', async () => {
    const page = await webContext.newPage();
    await page.goto('https://cacrm.weybee.in/home');

    await page.waitForTimeout(3000);
    await page.locator("//div[contains(@class,'menu-item')]").nth(9).click();
    await page.locator("//button[contains(@class,'btn btn-icon btn-bg-light btn-sm btn-active-light-primary')]").nth(3).click();
    //First name
    await page.locator("//input[contains(@id,'firstName')]").fill('naman');
    await page.locator("//input[contains(@id,'lastName')]").fill('p');
    //Phone Number
    await page.locator("//input[contains(@id,'phoneNumber')]").fill('1234567890');

    //Registration Date
    await page.locator("//input[contains(@placeholder,'Registration Date')]").click();
    await page.locator("//select[contains(@class,'py-1 px-2 rounded-1')]").nth(0).selectOption('2024');
    await page.locator("//select[contains(@class,'py-1 px-2 rounded-1')]").nth(1).selectOption('September');
    await page.locator("//div[contains(@class,'react-datepicker__day react-datepicker__day--004')]").nth(0).click();

    //Joining date
    await page.locator("//input[contains(@placeholder,'Joining Date')]").click();
    await page.locator("//select[contains(@class,'py-1 px-2 rounded-1')]").nth(0).selectOption('2024');
    await page.locator("//select[contains(@class,'py-1 px-2 rounded-1')]").nth(1).selectOption('October');
    await page.locator("//div[contains(@class,'react-datepicker__day react-datepicker__day--010')]").click();

    //User Role
    await page.locator("//input[contains(@name,'role')]").nth(1).click();
    //Reporting Authority
    await page.locator("//button[contains(@id,'dropdownMenuClickableInside')]").nth(0).click();
    await page.locator("//li[contains(@data-id,'7d1de153-69e5-4746-938b-c08d92819635')]").click();

    //Account Details
    await page.locator("//input[contains(@id,'accountNumber')]").fill('123456789012345678');
    await page.locator("//input[contains(@id,'bankName')]").fill('HDFC Bank')
    await page.locator("//input[contains(@id,'ifscCode')]").fill('ABCD0123456');
    await page.locator("//input[contains(@id,'branchName')]").fill('Ring Road');
    await page.locator("//button[contains(@id,'dropdownMenuClickableInside')]").nth(1).click();
    await page.locator("//li[contains(@data-id,'saving')]").click();
    //cancel Button
    await page.locator("//button[contains(@class,'btn btn-light btn-active-light-primary')]").click();

});

//Add Edit User with negative scenario
test('Add/Edit user - Negative Scenario', async () => {
    const page = await webContext.newPage();
    await page.goto('https://cacrm.weybee.in/home');

    await page.waitForTimeout(3000);
    await page.locator("//div[contains(@class,'menu-item')]").nth(9).click();
    await page.locator("//button[contains(@class,'btn btn-icon btn-bg-light btn-sm btn-active-light-primary')]").nth(3).click();

    // Fill invalid first name
    await page.locator("//input[contains(@id,'firstName')]").fill('');

    // Fill invalid last name
    await page.locator("//input[contains(@id,'lastName')]").fill('');

    // Fill invalid phone number
    await page.locator("//input[contains(@id,'phoneNumber')]").fill('12345678901');

    // Enter invalid account number
    await page.locator("//input[contains(@id,'accountNumber')]").fill('-123');

    const firstNameError = await page.locator("//div[contains(@class,'errorMsg')]").nth(0).innerText();
    expect(firstNameError).toContain('First name is required');
    const lastNameError = await page.locator("//div[contains(@class,'errorMsg')]").nth(1).innerText();
    expect(lastNameError).toContain('Last name is required');
    const phoneNumberError = await page.locator("//div[contains(@class,'errorMsg')]").nth(2).innerText();
    expect(phoneNumberError).toContain('Phone number is not valid');
    //currently displaying error in this field because ACC field allow '-' symbol.
    const accountNumberError = await page.locator("//div[contains(@class,'errorMsg')]").nth(3).innerText();
    expect(accountNumberError).toContain('Account number is required');

    // Attempt to submit with invalid inputs
    await page.locator("//button[contains(@class,'btn btn-primary')]").nth(0).click();


    console.log('Negative scenario executed and validated successfully!');
});

test('Payment Functionality', async ({ browser }) => {


    const context = await browser.newContext();
    const page = await context.newPage();
    await page.setViewportSize({ width: 1920, height: 1080 });
    // Login to the CACRM application
    const userEmail = "harshraval@weybee.in";
    await page.goto('https://cacrm.weybee.in/auth');
    await page.locator("//input[contains(@type,'email')]").fill(userEmail);
    await page.locator("//input[contains(@type,'password')]").fill("Test@321");
    await page.locator("//button[contains(@type,'submit')]").click();

    await page.waitForTimeout(5000);
    //await page.pause();
    await page.locator("//span[contains(@class,'menu-title') and .='Users']").click();
    await page.locator("//button[contains(@class,'btn btn-icon btn-bg-light btn-sm btn-active-light-primary')]").nth(1).click();

    const paymentAccess = await page.locator("//input[contains(@id,'paymentAccess')]").isChecked();

    if (!paymentAccess) {
        console.log('checkbox is not checked, clicking the checkbox..')
        await paymentAccess.click();
    }
    else {
        console.log('checkbox is alredy checked trying to submit.')
    }
    await page.locator('text=Submit').click();

    await page.locator("//span[contains(@class,'menu-title') and .='Tasks']").nth(0).click();
    await page.waitForTimeout(3000);

    // Payment Pending status cell
    var statusCell = page.locator("//tbody//tr[.//span[contains(@class,'badge bill-status-2')]]//input");

    await page.waitForTimeout(3000);

    const rowCount = await statusCell.count();
    console.log(`Number of rows in the table: ${rowCount}`);


    for (let i = 0; i < rowCount; i++) {
        await statusCell.nth(i).click();


        const button1 = page.locator("//button[contains(@class,'btn btn-linkedin btn-sm w-125px janvi-btn')]").nth(0);
        const button2 = page.locator("//button[contains(@class,'btn btn-linkedin btn-sm w-125px janvi-btn')]").nth(1);

        await expect(button1).toBeVisible();
        await expect(button2).toBeVisible();

    }
    console.log("Both buttons are visible.");
    await page.locator("//span[contains(@class,'menu-title') and .='Proforma Invoices']").toBeVisible();
    await page.locator("//span[contains(@class,'menu-title') and .='Reimbursements']").toBeVisible();
    await page.locator("//span[contains(@class,'menu-title') and .='Invoices']").toBeVisible();
    await page.locator("//span[contains(@class,'menu-title') and .='Add Transaction']").toBeVisible();

    console.log("all the elements are visible");

});

test.only('Negative Scenario - No Payment Access', async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.setViewportSize({ width: 1920, height: 1080 });

    // Login to the CACRM application
    const userEmail = "testuser@gmail.com"; // Replace with a user who doesn't have payment access
    await page.goto('https://cacrm.weybee.in/auth');
    await page.locator("//input[contains(@type,'email')]").fill(userEmail);
    await page.locator("//input[contains(@type,'password')]").fill("Test@1234");
    await page.locator("//button[contains(@type,'submit')]").click();

    await page.waitForTimeout(5000);

    // Navigate to the Tasks page
    await page.locator("//span[contains(@class,'menu-title') and .='Tasks']").nth(0).click();
    await page.waitForTimeout(3000);

    // Check that the payment checkboxes are not present
    await expect(page.locator("//tbody//tr[.//span[contains(@class,'badge bill-status-2')]]//input")).not.toBeVisible();
   

    // Verify payment-related buttons are hidden
    const button1 = page.locator("//button[contains(@class,'btn btn-linkedin btn-sm w-125px janvi-btn')]").nth(0);
    const button2 = page.locator("//button[contains(@class,'btn btn-linkedin btn-sm w-125px janvi-btn')]").nth(1);

    await expect(button1).not.toBeVisible();
    await expect(button2).not.toBeVisible();
    console.log("Payment-related buttons are hidden as expected.");

    // Verify the absence of payment-related menu items
    const proformaInvoices = page.locator("//span[contains(@class,'menu-title') and .='Proforma Invoices']");
    const reimbursements = page.locator("//span[contains(@class,'menu-title') and .='Reimbursements']");
    const invoices = page.locator("//span[contains(@class,'menu-title') and .='Invoices']");
    const addTransaction = page.locator("//span[contains(@class,'menu-title') and .='Add Transaction']");

    await expect(proformaInvoices).not.toBeVisible();
    await expect(reimbursements).not.toBeVisible();
    await expect(invoices).not.toBeVisible();
    await expect(addTransaction).not.toBeVisible();
    console.log("Negative scenario test passed successfully.");
});
