import 'dotenv/config'

class ProjectExplorerApp {
   constructor(page) {
      this.page = page
      this.paramDomainNameSelector = '#paramDomainName'
      this.projectExplorerBtnSelector = 'div[data-value="Project Explorer"]'
      this.pageTitleSelector = '#articleTitle > a.nav-link > span.article-title'
      
      //Tree structure constant
      this.treeControlContainerSelector = '#treeControl > ul.jstree-container-ul'
      this.treeControlListBtnSelector = 'input#lkpStructures'
      this.treeControlListSelector = '.af-lookup > div > .af-lookup-items-wrap2 > .list-group'
      
      //Total stats constant
      this.totalsChecklistsCharts = '#mChecklistsCharts'
      this.totalsChecklistsTab = '#tabChecklists'
      this.totalsChecklistsFrame = '#frameChecklists'
      this.totalsChecklistsGrid = '#checklist-grid'

      this.totalsPunchItemsCharts = '#mPunchesCharts'
      this.totalsPunchItemsTab = '#tabPunchItems'

      this.totalsCertsCharts = '#mCertsCharts'

      this.totalsStatusTab = '#tabStatus'
      
   }

   async navigateToApp() {
      try {
         await this.page.waitForSelector(this.projectExplorerBtnSelector)
         await this.page.waitForSelector(this.paramDomainNameSelector)

         await Promise.all([
            this.page.$eval(this.paramDomainNameSelector, el => {
               return el.getAttribute('data-domain-name')
            }),
            this.page.$eval(`${this.projectExplorerBtnSelector} > a`, el => {
               return el.href;
            })
         ]).then(result => {
            if(result[1] && result[1] === `${process.env.APP_DOMAIN}/cms-project-explorer?Domain=${result[0]}`){
               this.page.click(`${this.projectExplorerBtnSelector} > a`)
            }
         })
         
         await this.page.waitForNavigation();
         await this.page.waitForSelector(this.pageTitleSelector)
         const title = await this.page.$eval(this.pageTitleSelector, el => {
            return el.textContent
         })

         return title
      } catch(err) {
         console.error(err)
      }
   }
   
   /**
    * Check if tree control has structure
    * @param {number} structure quantity 
    * @returns {Boolean}
    */
   async hasTreeStructure(structureQuantity) {
      let validation = [];
      let isValid = null;
      try {
         await this.page.waitForSelector(this.treeControlListBtnSelector);
         
         for(let i = 0; i < structureQuantity; i++) {
            await this.page.click(this.treeControlListBtnSelector);
            await this.page.waitForSelector(this.treeControlListSelector)

            const elIndex = `${this.treeControlListSelector} > button[data-list-index="${i}"]`
            const elIndexTitle = await this.page.$eval(elIndex, el => {
               return el.childNodes[1].textContent
            })

            await this.page.click(elIndex)
            await this.page.waitForSelector(this.treeControlContainerSelector)
            
            const hasTreeNodes = await this.page.$eval(this.treeControlContainerSelector, el => {
               if(el.hasChildNodes()) return true
               return false
            })
         
            const btnVal = await this.page.$eval(this.treeControlListBtnSelector, el => {
               return el.value.slice(5);
            })
            const matchTreeTitle = btnVal == elIndexTitle ? true : false

            validation.push({hasTreeNodes: hasTreeNodes, hasTitle: matchTreeTitle});
         }
         
         validation.forEach(obj => {
            return isValid = (!obj.hasTitle || !obj.hasTreeNodes) ? false : true
         })
         return isValid;

      } catch(err) {
         console.error(err);
      }
   }

   async hasTotalsStatsCharts(structureQuantity) {
      try {
         let hasCharts = [];
         await this.page.waitForSelector(this.treeControlListBtnSelector)

         for(let i = 0; i < structureQuantity; i++) {
            await this.page.click(this.treeControlListBtnSelector);
            await this.page.waitForSelector(this.treeControlListSelector)

            const elIndex = `${this.treeControlListSelector} > button[data-list-index="${i}"]`

            await this.page.click(elIndex)

            const chartsNums = await this.page.$$eval([this.totalsChecklistsCharts, this.totalsCertsCharts, this.totalsPunchItemsCharts].join(','), charts => {
               return charts.length
            })
            
            chartsNums == 3 ? hasCharts.push(true) : hasCharts.push(false)
            
         }
         
         return hasCharts.indexOf(false) != -1 ? false : true 
      }catch(err) {
         console.error(err);
      }
   }

   async hasChecklistGrid(structureQuantity) {
      await this.page.waitForSelector(this.treeControlListBtnSelector)

         for(let i = 0; i < structureQuantity; i++) {
            await this.page.click(this.treeControlListBtnSelector);
            await this.page.waitForSelector(this.treeControlListSelector)

            const elIndex = `${this.treeControlListSelector} > button[data-list-index="${i}"]`

            await this.page.click(elIndex)
         }
   }

   async hasPunchItemsGrid(structureQuantity) {

   }
}

export default function(page) {
   return new ProjectExplorerApp(page);
}