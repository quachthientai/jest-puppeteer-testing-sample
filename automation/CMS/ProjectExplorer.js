import 'dotenv/config'

class ProjectExplorerApp {
   constructor(page) {
      this.page = page
      this.projectExplorerBtnSelector = 'div[data-value="Project Explorer"] > a'
      this.pageTitleSelector = '#articleTitle > a.nav-link > span.article-title'
   }

   async navigateToApp() {
      try {
         await this.page.waitForSelector(this.projectExplorerBtnSelector)
   
         const url = await this.page.$eval(this.projectExplorerBtnSelector, el => {
            return el.href
         })
         
         await this.page.click(this.projectExplorerBtnSelector)
         await this.page.waitForSelector(this.pageTitleSelector)

         const title = await this.page.$eval(this.pageTitleSelector, el => {
            return el.textContent
         })

         return title

      } catch(err) {
         console.error(err)
      }
   }
   
}

export default function(page) {
   return new ProjectExplorerApp(page);
}