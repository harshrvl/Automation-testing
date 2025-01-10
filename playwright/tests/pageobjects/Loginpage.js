class Loginpage{

    constructor(){
        this.signInbutton = page.locator('#login');
        this.userName = page.locator('#userPassword');
        this.password = page.locator('#userPassword');
    }

    async validLogin(){
       await this.userName.fill(email);
       await this.password.fill("Test@1234");
       await this.signInbutton.click();
    }
}