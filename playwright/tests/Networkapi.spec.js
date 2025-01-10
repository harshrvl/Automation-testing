

//this script usefull for bypass the api call of order and insert the dummy response
const { test, expect, request } = require('@playwright/test');
const { ApiUtils } = require('./utils/ApiUtils');

const fakePayloadOrders = {
    data: [],
    message: "No Orders",
}

const loginPayload = { userEmail: "testuser77@gmail.com", userPassword: "Test@1234" };
const orderPayload = { orders: [{ country: "India", productOrderedId: "6581ca399fd99c85e8ee7f45" }] }

let response;
test.beforeAll(async () => {

    const apiContext = await request.newContext();
    const apiUtils = new ApiUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderPayload);

 
});


test('add cart', async ({ page }) => {

    // const apiUtils = new ApiUtils(apiContext,loginPayload);
    // const orderId = createOrder(orderPayload);
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);

    // await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto("https://rahulshettyacademy.com/client/");

    await page.route(
        "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/673db837ae2afd4c0bc68bd3",
        async (route) => {
            // Intercepting response - API response -> Playwright fake response -> Browser response
            route.fulfill({


                body: JSON.stringify(fakePayloadOrders), // Convert the body to a JSON string
            });
        }
    );


    await page.locator("(//li//button)[2]").click();
    await page.waitForTimeout(2000);

    console.log(await page.locator(".mt-4").textContent());

    await page.pause();

})