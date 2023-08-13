import 'dotenv/config'

class PunchItemApp {
   constructor(page) {
      this.page = page
      this.punchItemBtnSelector = 'div[data-value="Punch Items"]'
   }
}