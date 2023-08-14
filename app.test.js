// describe('Punch Item app', () => {
  
//   let punchItemBtnSelector = 'div[data-value="Punch Items"]'

//   test('should have punch item button', async() => {

//     let btn = await page.$(punchItemBtnSelector);
    
//     let btnVal = await btn.evaluate((el) => {
//       return el.textContent
//     })

//     expect(btnVal).toContain('Punch Items')
//   })

//   test('should navigate to punch items app', async () => {

//     const linkUrl = await page.$eval(`${punchItemBtnSelector} > a`, el => {
//       return el.getAttribute('href')
//     })

//     await page.click(punchItemBtnSelector)
    
//     expect(linkUrl).toContain('/cms-punchitems?Domain=GlobalTemplate')
//   })

  
// })

import puppeteer from "puppeteer";
import LoginAccount from "./automation/loginAccount";
import OpenMenu from "./automation/openMenu";
import ProjectExplorer from "./automation/CMS/ProjectExplorer";

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

let browser = null;
let page = null;
let loginAccount = null;

beforeAll(async() => { 
  await delay(3000);
  browser = await puppeteer.launch({
    headless: false,
    slowMo: 20,
    devtools: true,
    defaultViewport: false
  })

  page = await browser.newPage();
  loginAccount = LoginAccount(page)
})

describe('Webpage access', () => {
  test('should able to login', async () => {

    const welcome = await loginAccount.login(`${process.env.USER}@omega365.com`, process.env.PASSWORD);

    expect(welcome).toBeTruthy();
  })

  
})

describe('test', () => {
  test('should able to show main menu', async () => {
    let menuBtn = OpenMenu(page)

    const menu = await menuBtn.showMenu()
    
    expect(menu).toBeTruthy();
  })
})

describe('test project explorer', () => {
  test('should able to navigate to app', async() => {
    let projectExplorer = ProjectExplorer(page)
    const title = await projectExplorer.navigateToApp();
    expect(title).toContain('Project Explorer');
  })
})


  
