const {test, expect} = require('@playwright/test');

test('validation',async({page})=>{
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');

    //these are the methods to handle to go back and forward pages
    // await page.goto('https://google.com');
    // await page.goBack();
    // await page.goForward();


    //to handle the hidden elements
    await expect(page.locator("//input[contains(@name,'show-hide')]")).toBeVisible();
    await page.locator('#hide-textbox').click();
    await expect(page.locator("//input[contains(@name,'show-hide')]")).toBeHidden();

    //to handle the java based dialogs which are not tracable
    //await page.pause();
    await page.locator('#confirmbtn').click();
    page.on('dialog',dialog=>dialog.accept());

    //to handle the mouse hover
    await page.locator('#mousehover').hover();
    await page.locator("//a[contains(text(),'Top')]").click();

    //to handle the child page from parent page
    const framelocator = page.frameLocator('#courses-iframe');
    //await framelocator.locator("(//li//a[contains(@href,'lifetime-access')])[1]").click();

    //this xpath we user visible where it locates only visible option
    await framelocator.locator("li a[href*='lifetime-access']:visible").click();

    const text = await framelocator.locator("//div//div//h2[contains(@style,'25px')]").textContent();
    console.log(text);
    const extracttext = text.split(' ')[1].split('Happy')[0];
    console.log(extracttext);


})