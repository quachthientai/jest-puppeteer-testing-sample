import 'dotenv/config'

class LoginAccount {
   constructor(page) {
      this.url = process.env.APP_URL
      this.page = page;
      this.loginBtn = '#loginButton > button',
      this.loginBody = '',
      this.usernameField = '#usernamehoustondevtestpimshosting\\.com',
      this.passwordField = '#passwordhoustondevtestpimshosting\\.com',
   }
}