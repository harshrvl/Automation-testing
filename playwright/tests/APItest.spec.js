const { test, expect,request } = require('@playwright/test');
const {ApiUtils} = require('./utils/ApiUtils');


const loginPayload = {userEmail: "testuser77@gmail.com", userPassword: "Test@1234"};
const orderPayload = {orders:[{country:"India",productOrderedId:"6581ca399fd99c85e8ee7f45"}]}

let response;
test.beforeAll(async ()=>{
   
    const apiContext = await request.newContext();
    const apiUtils = new ApiUtils(apiContext,loginPayload);
    response = await apiUtils.createOrder(orderPayload);

   
});









test('add cart', async ({ page }) => {

    // const apiUtils = new ApiUtils(apiContext,loginPayload);
    // const orderId = createOrder(orderPayload);
     await page.addInitScript(value =>{
        window.localStorage.setItem('token',value);
    }, response.token);
   
    // await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto("https://rahulshettyacademy.com/client/");


    
   await page.locator("(//li//button)[2]").click();

    await page.waitForSelector("//tr[contains(@class,'ng-star-inserted')]");

  //Locate table rows
   const orderTable = page.locator("//tbody//tr");


  // Get row count
   const ordercount = await orderTable.count();
   console.log(ordercount);
    // Opens a browser window for inspection

    for(let i=0; i<ordercount; i++){
        
        if(response.orderId.includes(await orderTable.nth(i).locator("//th").textContent())){
            await orderTable.nth(i).locator("//button").first().click();
            break;

        }
    }
     expect(response.orderId.includes(await page.locator("//div[contains(@class,'col-text')]").textContent())).toBeTruthy();



 
    await page.waitForTimeout(5000);

})