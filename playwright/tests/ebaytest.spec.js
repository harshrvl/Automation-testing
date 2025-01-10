const {test,expect} = require('@playwright/test');
const axios = require('axios');





//this testcase for negative value testing where i tested negative inputs
test('hrms login',async({page})=>{
    const usernName = page.locator("//input[contains(@name,'user_name')]");
    const userPassword = page.locator("//input[contains(@id,'password')]").nth(2);
    const email = page.locator("//input[contains(@id,'email')]").nth(0);
    const confirmEmail = page.locator("//input[contains(@id,'email')]").nth(1);
    const selectCountry = page.locator("//uL[contains(@class,'country')]");
    const phoneNumber = page.locator("//input[contains(@type,'tel')]");
    const termsCon = page.locator("//input[contains(@input-size,'large')]");

    //empty field validation check
    await page.goto('https://developer.ebay.com/signin?tab=register');
    // await usernName.fill('');
    // await userPassword.fill('');
    // await email.fill('');
    // await confirmEmail.fill('');
    // await phoneNumber.fill('');
    // await termsCon.click();

    // await page.locator("//button[contains(@class,'join')]").click();
    

    // await expect(page.locator("//div[contains(@id,'username-error')]")).toBeVisible();
    // await expect(page.locator("//i[contains(@class,'negative-text')]").nth(0)).toBeVisible();
    // await expect(page.locator("//div[contains(@id,'email-error')]").nth(0)).toBeVisible();
    // await expect(page.locator("//div[contains(@id,'number-error')]")).toBeVisible();
    // await expect(page.locator("//div[contains(@class,'status-message')]").nth(1)).toBeVisible();
    // await page.waitForTimeout(2000);

    

  // Define the username to input
  const username = 'TestUser';

  // Repeat the username until the total length is 50 characters
  let repeatedUsername = '';
  while (repeatedUsername.length < 55) {
    repeatedUsername += username;
  }

  // Type the username into the input field
  await usernName.type(repeatedUsername);
  
  await expect(page.locator("//div[contains(@id,'username-error')]")).toBeVisible();
  
  await userPassword.type('abc');
  await page.locator("//input[contains(@id,'show-password')]").nth(1).click();
  await expect(page.locator('.checkbox__checked').nth(1)).toBeVisible();
  await expect(page.locator("//i[contains(@class,'negative-text')]").nth(0)).toBeVisible();
  await email.type('abc');
  await expect(page.locator("//div[contains(@id,'email-error')]").nth(0)).toBeVisible();
  await phoneNumber.type('abc', {delay: 200});
  await expect(page.locator("//div[contains(@id,'phone-error')]")).toBeVisible();

  await page.locator("//button[contains(@class,'join')]").click();
  

  await page.pause();

    // //wrong input validation check
    // await usernName.fill('admin');
    // await userPassword.fill('admin');
    // await page.locator("//button[contains(@class,'oxd-button')]").click();
    // await page.waitForTimeout(1000);
    // await expect(page.locator("//div[contains(@role,'alert')]")).toBeVisible();


        // Capture the captcha element (if it's an image-based captcha)
        await page.locator('#anchor-state').nth(2).click();
        const captchaImage = await page.locator('.no-selection').nth(2).screenshot();

        // Send the image to 2Captcha API
        const apiKey = 'YOUR_2CAPTCHA_API_KEY';
        const response = await axios.post('https://2captcha.com/in.php', {
            key: apiKey,
            method: 'base64',
            body: captchaImage.toString('base64'),
            json: 1,
        });
    
        // Wait for the solution
        const captchaId = response.data.request;
        let solution;
        while (!solution) {
            const result = await axios.get(`https://2captcha.com/res.php?key=${apiKey}&action=get&id=${captchaId}&json=1`);
            if (result.data.status === 1) {
                solution = result.data.request;
            } else {
                await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait 5 seconds before retrying
            }
        }
    
        console.log('Captcha solution:', solution);
    
        // Use the solution in your form
        await page.fill('captcha-input-selector', solution);

});