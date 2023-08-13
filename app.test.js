import puppeteer from 'puppeteer';
import 'dotenv/config';

let browser = null;
let page = null;
const usernameSelector = '#usernamehoustondevtestpimshosting\\.com'
const passwordSelector = '#passwordhoustondevtestpimshosting\\.com'
const loginBtnSelector = '#loginButton > button'
const menuBtnSelector = '#afToolbarMenu > a'

beforeAll(async () => {
  await delay(5000);

  browser = await puppeteer.launch({
    headless: false,
    slowMo: 20,
    devtools: true,
    defaultViewport: false
  });

  page = await browser.newPage();

  await page.goto(process.env.APP_URL, {waitUntil: 'domcontentloaded'});

  await page.waitForSelector(usernameSelector)
  await page.type(usernameSelector, `${process.env.USER}@omega365.com`);

  await page.waitForSelector(passwordSelector);
  await page.type(passwordSelector, process.env.PASSWORD);
  
  await page.waitForSelector(loginBtnSelector)
  await page.click(loginBtnSelector);

  await page.waitForSelector(menuBtnSelector)
  await page.click(menuBtnSelector)
  
})

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

afterAll(async () => {
  await browser.close()
})


describe('Page menu', () => {
  
  test('should show menu', async() => {

    let menu = await page.$("#mega-menu")

    let menuClass = await menu.evaluate((el) => {
      return el.className.split(' ').includes('show')
    })

    expect(menuClass).toBeTruthy();
  })
})

describe('Punch Item app', () => {
  
  let punchItemBtnSelector = 'div[data-value="Punch Items"]'

  test('should have punch item button', async() => {

    let btn = await page.$(punchItemBtnSelector);
    
    let btnVal = await btn.evaluate((el) => {
      return el.textContent
    })

    expect(btnVal).toContain('Punch Items')
  })

  test('should navigate to punch items app', async () => {

    const linkUrl = await page.$eval(`${punchItemBtnSelector} > a`, el => {
      return el.getAttribute('href')
    })

    await page.click(punchItemBtnSelector)
    
    expect(linkUrl).toContain('/cms-punchitems?Domain=GlobalTemplate')
  })

  
})
