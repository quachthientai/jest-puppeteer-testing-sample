import puppeteer from "puppeteer";
import Login from "./automation/Login";
import Menu from "./automation/MainMenu";
import ProjectExplorer from "./automation/CMS/ProjectExplorer";

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

let browser = null;
let page = null;
let login = null;
let menu = null;
let projectExplorer = null;

beforeAll(async() => { 
  
  browser = await puppeteer.launch({
    headless: false,
    slowMo: 20,
    devtools: true,
    defaultViewport: false
  })
  page = await browser.newPage();

  login = Login(page)
  menu = Menu(page)
  projectExplorer = ProjectExplorer(page)
})

describe('Webpage Login', () => {
  test('Should able to login', async () => {
    const welcome = await login.access(`${process.env.USER}@omega365.com`, process.env.PASSWORD);
    expect(welcome).toBeTruthy();
  })
})

describe('Main Menu', () => {
  test('Should able to show main menu', async () => {
    const isShow = await menu.showMenu()
    expect(isShow).toBeTruthy();
  })
})

describe('Project Explorer', () => {

  test('Should able to navigate to app', async() => {
    const title = await projectExplorer.navigateToApp();
    expect(title).toContain('Project Explorer');
  })

  test('Should able to show tree structure on each structure', async() => {
    const hasTreeStructure = await projectExplorer.hasTreeStructure(2)
    expect(hasTreeStructure).toBeTruthy();
  })

  test('Should able to show charts on each structure', async() => {
    const hasChart = await projectExplorer.hasTotalsStatsCharts(2)
    expect(hasChart).toBeTruthy();
  })

  
  
})


  
