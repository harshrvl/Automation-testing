
const { test, expect } = require('@playwright/test');

let webContext;
test.beforeAll(async({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();  
    const email = "testuser77@gmail.com";
    await page.goto('https://rahulshettyacademy.com/client');
    await page.locator('#userEmail').fill(email);
    await page.locator('#userPassword').fill("Test@1234");
    await page.locator('#login').click();
    await page.waitForTimeout(1000);
    //await page.waitForLoadState('load');
    //it will collect sites json data on browser level that can be used multiple times
    await context.storageState({path :'state.json'});
    webContext = await browser.newContext({storageState: 'state.json'});
})

test('add cart', async () => {
    
    
   
   
    const productName = 'ZARA COAT 3';
    const page = await webContext.newPage();
    await page.goto('https://rahulshettyacademy.com/client');
    const products = page.locator("//div[contains(@class,\"card-body\")]");
    
    const email = "testuser77@gmail.com";
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



test('testcase 2',async()=>{
    const page = await webContext.newPage();
    //const products = page.locator("//div[contains(@class,\"card-body\")]");
    await page.goto('https://rahulshettyacademy.com/client');
    await page.waitForTimeout(1000);
    const titles = await page.locator("//div[contains(@class,\"card-body\")]//b").allTextContents(); 
    
    console.log(titles);
})