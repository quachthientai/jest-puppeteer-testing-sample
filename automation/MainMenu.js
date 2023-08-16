import 'dotenv/config'

class MainMenu {
   constructor(page) {
      this.page = page
      this.menuBtnSelector = '#afToolbarMenu > a'
      this.menuSelector = '#mega-menu'
      this.menuAppSelector = 'div.af-mega-menu-apps'
   }

   async showMenu() {
      try {
         //Wait for dom load menu content
         await this.page.hover(this.menuBtnSelector)
         await this.page.waitForSelector(this.menuAppSelector)

         //Click to menu button
         await this.page.click(this.menuBtnSelector)
         
         //Wait for dom load menu
         await this.page.waitForSelector(this.menuSelector);
         
         const show = await this.page.$eval(this.menuSelector, el => {
            return el.className.split(' ').includes('show')
         })

         return show
      } catch(err) {
         console.error(err);
      }
   } 
}

export default function(page) {
   return new MainMenu(page)
}