import 'dotenv/config'

class OpenMenu {
   constructor(page) {
      this.page = page
      this.menuBtnSelector = '#afToolbarMenu > a'
      this.menuSelector = '#mega-menu'
   }

   async showMenu() {
      try {
         await this.page.click(this.menuBtnSelector)
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
   return new OpenMenu(page)
}