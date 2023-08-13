const puppeteer = require("puppeteer");

let browser = null;
let page = null;
let userName = '#usernamehoustondevtestpimshosting\\.com'
let password = '#passwordhoustondevtestpimshosting\\.com'

beforeAll(async () => {
  // await longProcess();
  browser = await puppeteer.launch({
    headless: false,
    slowMo: 70,
  });
  page = await browser.newPage();

  await page.goto(process.env.URL);

  await page.waitForSelector('#usernamehoustondevtestpimshosting\\.com')
  await page.type('#usernamehoustondevtestpimshosting\\.com', 'asdasdasd');
  

  
  
})

function longProcess() {
  return new Promise((resolve) => {
    setTimeout(resolve, 6000)
  })
}

afterAll(async () => {
  await browser.close()
}, 6000)

describe('testing demo', () => {

  let requestLinkBtn = '#acRequestLink';
  
  test('page should have button', async() => {
    // await page.waitForSelector('#usernamehoustondevtestpimshosting\\.com')
    // await page.type('#usernamehoustondevtestpimshosting\\.com', 'asdasdasd');
    let pageHeader = await page.$("#acRequestLink");
    let pageHeaderValue = await pageHeader.evaluate((el) => el.textContent);
    
    expect(pageHeaderValue).toContain("Request Access");
  })
  //   let pageHeaderValue = await pageHeader.evaluate((el) => el.textContent);
})