const { test, expect,request } = require('@playwright/test');
const loginPayload = {email: "harshraval@weybee.in", password: "Test@321"};

let token;
test.beforeAll(async ()=>{     
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post("https://caapi.weybee.in/Auth/Login",
        {
        data : loginPayload,
        headers: {
            'Content-Type': 'application/json',
            
        }
    }); 

    expect(loginResponse.ok()).toBeTruthy();
    const loginResponseJson = await loginResponse.json();
    token = await loginResponseJson.data.records.Token;
    console.log("Token:", token);   
});

test.only('login functioanlity',async ({ page }) => {

        page.addInitScript(value =>  {
            window.localStorage.setItem('token',value);

        }, token );

        // await page.evaluate(() => {
        //     return window.localStorage.getItem('token'); // Use the same key as in the script
        // });
        // console.log('Retrieved Token:', token);

        await page.goto("https://cacrm.weybee.in/home");

  
    await page.waitForTimeout(5000);

});