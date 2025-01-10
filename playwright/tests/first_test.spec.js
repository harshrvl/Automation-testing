const { test, expect } = require('@playwright/test');
const { request } = require('http');
const { text } = require('stream/consumers');



// test('new browser', async({browser,page}) => {
//    const context = await browser.newContext();
//    //const page =  await context.newPage();
//    await page.goto('https://google.com');
//    await expect(page).toHaveTitle('Google');
// })

test.only('Login', async ({ page }) => {
    //const timeout = 300000
    
    //it will block any network call using abort method
    page.route('**/*.{jpg}',route=>  route.abort());

    const usernName = page.locator('#username');
    const password = page.locator('#password');
    const signin = page.locator("//input[@class='btn btn-info btn-md']");
    const allcontent = page.locator(".card-body a");

    //print the all network request and response with status using below method
    page.on('request',request=> console.log(request.url()));
    page.on('response',response=> console.log(response.url(),response.status()));

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    
    await usernName.type("rahulshettyacademy");

    await password.type("learnin");

    await signin.click();

    // console.log(await page.locator("//[style*='display: block']").textContent());

    // await expect(page.locator("//[style*='display: block']")).toContainText("Incorrect");

    await password.fill("");
    await password.fill("learning");

    await Promise.all(
        [
            page.waitForNavigation(),
            signin.click(),

        ]
    );


    //  console.log(await allcontent.nth(0).textContent());
    //  console.log(await allcontent.nth(1).textContent());
    await page.pause();
    const allTitle = await allcontent.allTextContents();

    console.log(allTitle);


})



test("UI testing", async ({ page }) => {

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const usernName = page.locator('#username');
    const password = page.locator('#password');
    const selectdropdown = page.locator('select.form-control')
    const checkbox = page.locator('#terms');
    const blinktext = page.locator('.blinkingText');


    await page.locator('.radiotextsty').nth(1).click();
    await page.locator('#okayBtn').click();
    await selectdropdown.selectOption('Consultant');
    console.log(await page.locator('.radiotextsty').nth(1).isChecked());
    await expect(page.locator('.radiotextsty').nth(1)).toBeChecked();
    await checkbox.click();
    await expect(checkbox).toBeChecked();
    await checkbox.uncheck();
    expect(await checkbox.isChecked()).toBeFalsy();
    await expect(blinktext).toHaveAttribute('class', 'blinkingText');


    await page.waitForTimeout(5000);

    //await page.pause();
})


test("new tab", async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    const usernName = page.locator('#username');
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const blinktext = page.locator('.blinkingText');

    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        blinktext.click(),

    ])
    const text = await newPage.locator('.red').textContent();
    console.log(text);

    const extractpath = text.split('@')[1].split(' ')[0];
    console.log(extractpath);
    await newPage.close();


    await usernName.type(extractpath);

    await page.waitForTimeout(3000);
})


//this test case is for product add to cart only
test('practice', async ({ page }) => {




    await page.goto('https://www.google.com');

    await page.waitForSelector('//textarea[@title="Search"]');
    await page.locator('//textarea[@title="Search"]').fill('rahulshettyacademy client');

    await page.locator('//textarea[@title="Search"]').press('Enter')

    // Wait for search results to load
    await page.waitForSelector('h3');  // Waiting for search result headings (like "h3" elements)

    // Optionally, click on the first search result link (XPath for the first result link)
    await page.click('(//h3)[1]');  // XPath to click the first result (usually a heading)

    // Wait for the page to load after clicking the link
    await page.waitForLoadState('load');

    const email = page.locator("//*[@id='userEmail']");
    const password = page.locator("//*[@id='userPassword']");
    const login = page.locator('#login');
    //const elements = page.locator('.card-body b');

    await email.type("testuser77@gmail.com");
    await password.type("Test@1234");

    await login.click();

    await page.waitForLoadState('load');
    //const allTitle = await elements.allTextContents();

    // const products = page.locator("//div[contains(@class,\"col-lg-4 col-md-6 col-sm-10 offset-md-0 offset-sm-1 mb-3 ng-star-inserted\")]");

    // // Wait for products to be available (optional)
    // await page.waitForTimeout(1000);

    // // Select the second product from the products collection
    // const secondProduct = products.nth(1); // n-th is a method that selects by index

    // // Find the "Add To Cart" button within the second product and click it
    // await secondProduct.locator("button:has-text('Add To Cart')").click();


    //console.log(allTitle);
    //console.log(await elements.nth(0).textContent());

    // console.log(await elements.allTextContents());
    //const productName = 'ZARA COAT 3';
    const products = page.locator("//div[contains(@class,\"col-lg-4 col-md-6 col-sm-10 offset-md-0 offset-sm-1 mb-3 ng-star-inserted\")]");
    const x = products.locator("//button[contains(.,\"Add To Cart\")]");
    for (let i = 0; i < 1; i++) {
        if (x) {
            await x.nth(i).click();
            // break;
        }
    }

    await page.waitForTimeout(5000);

})


//this test case is to verify that selected product added to cart and placed order successfully via fill up the information and visit the order confirm page  in webUI mode.
//full end to end test
test('add cart', async ({ page }) => {
    
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('https://rahulshettyacademy.com/client');

  
    const productName = 'ZARA COAT 3';
    const email = "testuser77@gmail.com";
    const products = page.locator("//div[contains(@class,\"card-body\")]");
    const loginPage = new Loginpage(page);
    await page.waitForLoadState('load');
    await page.locator('#userEmail').fill(email);
    await page.locator('#userPassword').fill("Test@1234");
    await page.locator('#login').click();
    await page.waitForTimeout(1000);
    const titles = await page.locator("//div[contains(@class,\"card-body\")]//b").allTextContents();
    console.log(titles);
    const count  = await products.count();
    console.log(count);
    
    for(let i=0; i<count; i++){
        if (await products.nth(i).locator("//b").textContent() === productName){
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }
    await page.locator("//button[contains(@routerlink,\"/dashboard/cart\")]").click();
    await page.locator("//li[contains(@class,\"items\")]").waitFor();
    const bool = await page.locator("//h3[contains(text(),\"ZARA COAT 3\")]").isVisible();
    expect(bool).toBeTruthy();
    await page.locator("//button[contains(text(),\"Checkout\")]").click();
    const expiryday = page.locator("(//select[contains(@class,\"input ddl\")])[1]");
    const expirymonth = page.locator("(//select[contains(@class,\"input ddl\")])[2]");
    //const country = page.locator("//input[contains(@placeholder,\"Select Country\")]");

    await expiryday.selectOption('02');
    await expirymonth.selectOption('17'); 
    await page.locator("(//input[contains(@class,\"input txt\")])[2]").fill('111');
    await page.locator("(//input[contains(@class,\"input txt\")])[3]").fill('testuser');
    await page.locator("//input[contains(@placeholder,\"Select Country\")]").type("Ind", {delay: 200});
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
   const optionsCount = await dropdown.locator("button").count();
    for(let i=0; i<optionsCount; i++){
        const text = await  dropdown.locator("button").nth(i).textContent();
        if(text === " India"){
            await dropdown.locator("button").nth(i).click();
            break;

        }
    }
    await expect(page.locator("(//input[contains(@class,\"input txt\")])[5]")).toHaveValue(email);  
    await page.locator("//a[contains(@class,\"btnn \")]").click();
    const confirmation = await expect(page.locator("//h1[contains(@class,\"hero-primary\")]")).toHaveText(" Thankyou for the order. ");
    console.log(confirmation);

    const orderid = await page.locator("//label[contains(@class,'ng-star-inserted')]").textContent();
    const orderiduse = orderid ;
    console.log(orderiduse);

    await page.locator("//label[contains(@routerlink,\"/dashboard/myorders\")]").click();

    await page.waitForSelector("//tr[contains(@class,'ng-star-inserted')]");

  // Locate table rows
   const orderTable = page.locator("//tbody//tr");


  // Get row count
   const ordercount = await orderTable.count();
   console.log(ordercount);
    // Opens a browser window for inspection

    for(let i=0; i<ordercount; i++){
        
        if(orderiduse.includes(await orderTable.nth(i).locator("//th").textContent())){
            await orderTable.nth(i).locator("//button").first().click();
            break;

        }
    }
     expect(orderiduse.includes(await page.locator("//div[contains(@class,'col-text')]").textContent())).toBeTruthy();



    // await country.type("India", {delay: 200});
    // await page.locator("(//span[contains(text(),\"India\")])[2]").click();
    //await page.waitForTimeout(5000);

})