import 'dotenv/config'

class LoginAccount {
   constructor(page) {
      this.url = process.env.APP_URL;
      this.page = page;
      this.loginBtn = '#loginButton > button';
      this.loginBody = '.login-panel';
      this.usernameField = '#usernameoilsearchdevpimshosting\\.com';
      this.passwordField = '#passwordoilsearchdevpimshosting\\.com';
      this.mainPageLogo = 'div[data-object-id="dsLogo"] > img'
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
         await this.page.waitForSelector(this.mainPageLogo);
         
         const hasLogo = await this.page.$eval(this.mainPageLogo, el => {
            return el.className.split(' ').includes('domain-pic');
         })

         return hasLogo
      } catch (err) {
         console.error(err);
      }
   }
}

export default function(page) {
   return new LoginAccount(page)
}