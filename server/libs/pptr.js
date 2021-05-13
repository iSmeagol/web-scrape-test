import path from "path";
const __dirname = path.resolve();
const commonPath = `${__dirname}/files`;
import puppeteer from "puppeteer";
import { writeFile } from "./utils.js";
// import $ from "cheerio";

let browser = null;

const configureBrowserPage = async (setUrl, options = {}) => {
  browser = await puppeteer.launch({
    // headless: false, //? true as default to not open browser NOTE: if set to false - createpdf will return error "PrintToPDF is not implemented"
    executablePath:
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", //? use chrome instead of chromium default on my mac

    ignoreHTTPSErrors: true,
  });
  const page = await browser.newPage();
  await page.setJavaScriptEnabled(false);
  await page.setUserAgent(
    "5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36"
  ); //! setting  useragent to chrome get past the basic test. #issue for default user agent 403 forbidden using puppeteer,
  page.on("response", async (response) => {
    // console.log("response", response);
    // don't await anything on this line
    // console.log("resource type", response.request().resourceType());
    // if (response.request().resourceType() === "stylesheet") {
    //   //resolve(JSON.stringify(await response.text())); // await and resolve here
    //   // console.log("css", await response.text());
    // }
  });

  await page.goto(setUrl, {
    waitUntil: "networkidle2",
  });
  return page;
};

export const closeBrowser = async () => {
  if (browser) await browser.close();
};

//* screenshot Page
export const screenshot = async (page, filename) => {
  try {
    await page.screenshot({
      path: `${commonPath}/${filename}-screenshot.png`,
    });
    console.log("screenshot captured");
  } catch (error) {
    console.log(error);
  }
};

//* screenshot Page
export const pageContent = async (page) => {
  const content = 1;
  try {
    if (content) {
      const content = await page.content();
      console.log("get page content");
      // writeFile("content.html", content);

      // console.log("html", content);
      return content;
    } else {
      //second
      const bodyHandle = await page.$("body");
      const html = await page.evaluate((body) => body.innerHTML, bodyHandle);
      // await page.addStyleTag({ url: "http://example.com/style.css" });
      await bodyHandle.dispose();
      return html;
      //second

      // //third
      // console.log("css", await page.$("link"));
      // const htmlHandle = await page.$("html");
      // const html = await page.evaluate((body) => {
      //   return body.innerHTML;
      // }, htmlHandle);
      // await htmlHandle.dispose();
      // return html;
      // //third
    }
  } catch (error) {
    console.log(error);
  }
};

//* fetch single element
export const fetchSelectorSingleData = async (page, selectors) => {
  try {
    //working
    const elementText = await page.$eval(selectors, (element) => {
      return element.innerText;
    });
    return elementText;
  } catch (error) {}
};

//* fetch by
export const fetchSelectorAllData = async (page, selectors) => {
  try {
    // const contents = await page.$$eval(selector, (data) =>
    //   data.map((d) => {
    //     console.log("d", d.innerHTML);
    //     d.innerText;
    //   })
    // );
    console.log("start fetching selector data");

    // const first = await page.$eval(selectors, (options) => options.innerText);
    // console.log("first", first);

    // const checkRes = [];
    // const checkResHandle = await page.$$(selectors);
    // for (const content of checkResHandle) {
    //   // const name = await content.$("div.appname");
    //   // const gameName = await page.evaluate((name) => name.innerText, name);
    //   // console.log("Game Name: ", gameName);
    //   console.log("content", content);
    // }
    // console.log("checkRes", checkRes);

    // const bodyHandle = await page.$("body");
    // const html = await page.evaluate((body) => body.innerHTML, bodyHandle);
    // await bodyHandle.dispose();
    // return html;

    //working
    const firstArray = await page.$$eval(selectors, (options) => {
      return options.map((o) => {
        return o.innerText;
        // return o.textContent;
      });
    });
    // console.log("firstArray", firstArray);

    // const result = [];
    // const contents = await page.$$eval(selectors, (options) => {
    //   options.map((option) => {
    //     result.push(option.innerHTML);
    //     return option.innerText;
    //   });
    //   console.log("result2", result);
    // });
    // console.log("Contents2", contents);

    // const contents3 = await page.evaluate(() => {
    //   const objs = document.querySelectorAll(selectors);
    //   const result = [];
    //   objs.forEach((element) => {
    //     // element.click(); //wait to open to navigate
    //     console.log(element.innerText);
    //     result.push(element);
    //   });
    //   console.log("result", result);
    //   console.log("result 3", result);
    //   return result;
    // });
    // console.log("Content 3s", contents3);
    // return result;
    return firstArray;
  } catch (error) {}
};
export default configureBrowserPage;
