import 'dotenv/config'

class LoginAccount {
   constructor(page) {
      this.url = process.env.APP_URL;
      this.page = page;
      this.loginBtn = '#loginButton > button';
      this.loginBody = '.login-panel';
      this.usernameField = '#usernamehoustondevtestpimshosting\\.com';
      this.passwordField = '#passwordhoustondevtestpimshosting\\.com';
      this.welcomeBody = '#idForWelcome'
   }

   async login(username, password) {
      try {
         //Go to login page and wait for login body
         await this.page.goto(this.url);
         await this.page.waitForSelector(this.loginBody);

         //Type the login credentials into input fields
         await this.page.type(this.usernameField, username)
         await this.page.type(this.passwordField, password)
      
         //Login button click
         await this.page.click(this.loginBtn);
         await this.page.waitForSelector(this.welcomeBody);
         
         const welcome = await this.page.$eval(this.welcomeBody, el => {
            return el.textContent
         })

         return welcome
      } catch (err) {
         console.error(err);
      }
   }
}

export default function(page) {
   return new LoginAccount(page)
}