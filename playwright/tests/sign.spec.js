const {test, expect} = require('@playwright/test');
const exp = require('constants');
const { stat } = require('fs');

function generateRandomUser() {
  const randomString = Math.random().toString(36).substring(2, 8); // Random string for uniqueness
  const randomNumber = Math.floor(Math.random() * 1000); // Random number for variety
  return {
      fname: `User_${randomString}`,
      lname: `User_${randomString}`,
      email: `user_${randomString}${randomNumber}@example.com`,
      
  };
}

//test script for the positive scenario
test('sign up', async({page})=>{

    await page.goto('https://demoqa.com/automation-practice-form');
    for(let i=0; i<10; i++){
      const user = generateRandomUser();
    const firstName = page.locator('#firstName');
    const lastName = page.locator('#lastName');
    const userEmail = page.locator('#userEmail');
    const Male = page.locator("//label[normalize-space()='Male']");
    const Female = page.locator("//label[normalize-space()='Female']");
    const mobile = page.locator('#userNumber');
    const dob = page.locator('#dateOfBirthInput');
    const subjectInput = page.locator('#subjectsInput');
    const checkbox = page.locator("//label[normalize-space()='Sports']");
    const checkbox3 = page.locator("//label[normalize-space()='Reading']");
    const address = page.locator('#currentAddress');
    const state = page.locator("//input[@id='react-select-3-input']");
    const city = page.locator('#react-select-4-input');
    const submit = page.locator('#submit');

    await firstName.fill(user.fname);
    await lastName.fill(user.lname);
    const fvalue = await firstName.inputValue();
    const lvalue = await lastName.inputValue();

 
    expect(fvalue).not.toBe('');
    expect (lvalue).not.toBe('');

    await userEmail.fill(user.email);
    await Male.click();
    await Female.click();
    expect (await Male.isChecked()).toBeFalsy();
    
    await mobile.fill('1234567890');
    const mobileValue = await mobile.inputValue();

    expect (mobileValue.length).toBe(10);

    await dob.fill('23-Nov-2023');
    await dob.press('Enter');
    const dobvalue = await dob.inputValue();
    expect (dobvalue).not.toBe('');

    // const date = await dob.locator('#dateOfBirthInput').textContent();
    // console.log(date);

    //await subject.fill('com');
    //await subject.selectOption('Computer Science');
        

      await subjectInput.type('Math');
      await subjectInput.press('Enter');
      await subjectInput.type('Computer Science');
      await subjectInput.press('Enter');



  // Wait for the dropdown options to appear
   //const options = page.locator('#subjectsInput').press('Enter');

  // Select the option by its text (you can use different criteria, like the option text or value)
  //const option = options.locator('div[role="option"]:has-text("Maths")');  // Change "Maths" to the desired option text
  
  // Click on the desired option to select it
  //await option.click();

    await checkbox.click();
    await expect(checkbox).toBeChecked();
    await checkbox.uncheck();
    await checkbox3.click();

    // Select the file input element and upload a file
  const fileInput = page.locator('input[type="file"]');
  await fileInput.setInputFiles('C:\\Users\\user\\Pictures\\Desktop Backgrounds\\Image 1.jpg'); // Replace with the actual file path


    await address.fill("dgklfjgkldfjgkldfjgkljklfsddlsjfkldsjfjdslkjflkdsjfksfkdfkdsfjslkfjksjfklsdfjslkj");

    const addressvalue = await address.inputValue();

    expect (addressvalue.length).toBeLessThan(150);
    //await state.click();
    await state.fill('Haryana');
    await state.press('Enter');
    await city.fill('Karnal');
    await city.press('Enter');

    await submit.click();

    // await state.fill('Rajasthan');
    // await state.press('Enter');

    //const citydropdwon = await city.textContent();
    
    //expect(citydropdwon).toBe('Select City').isChecked();

  
    //await state.selectOption('Rajasthan');


    //await page.waitForTimeout(3000);
      await page.locator("#closeLargeModal").click();

    }


})