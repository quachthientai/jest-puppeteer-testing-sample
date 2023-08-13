import puppeteer from "puppeteer";
import 'dotenv/config';

export default async function boot(option = {}) {
   const promises = [];
   let page = null;
   let browser = null;

   const {
      goToTargetApp = true,
      headless = false,
      devtools = true,
      defaultViewPort = false,
      slowMo = 70
   } = option

   browser = await puppeteer.launch({
      headless,
      devtools,
      defaultViewport,
      slowMo,
   })

   page = await browser.newPage();

   promises.push(page.waitForNavigation());
   promises.push(page.goto(process.env.URL))

   Promise.all(promises.map((promise, i) =>
      promise.catch(err => {
         err.index = i;
         throw err;
      })
   )).then(results => {
      console.log("everything worked fine, I got ", results);
   }, err => {
      console.error("promise No "+err.index+" failed with ", err);
   });

   return { page }
}
