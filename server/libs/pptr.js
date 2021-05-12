import path from "path";
const __dirname = path.resolve();
const commonPath = `${__dirname}/files`;
import puppeteer from "puppeteer";
import { writeFile } from "./utils.js";
// import $ from "cheerio";

let browser = null;

const configureBrowser = async (setUrl, options = {}) => {
  browser = await puppeteer.launch({
    // headless: false, //? true as default to not open browser NOTE: if set to false - createpdf will return error "PrintToPDF is not implemented"
  });
  const page = await browser.newPage();

  page.on("response", async (response) => {
    // don't await anything on this line
    // console.log("resource type", response.request().resourceType());
    if (response.request().resourceType() === "stylesheet") {
      //resolve(JSON.stringify(await response.text())); // await and resolve here
      console.log("css", await response.text());
    }
  });

  await page.goto(setUrl, options);
  return page;
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
      writeFile("content.html", content);

      return content;
    } else {
      // //second
      // const bodyHandle = await page.$("body");
      // const html = await page.evaluate((body) => body.innerHTML, bodyHandle);
      // // await page.addStyleTag({ url: "http://example.com/style.css" });
      // await bodyHandle.dispose();
      // return html;
      // //second

      //third
      const htmlHandle = await page.$("html");
      const html = await page.evaluate((body) => {
        // document.styleSheets.forEach((styles) => {
        //   console.log(styles);
        // });
        return body.innerHTML;
      }, htmlHandle);
      // await page.addStyleTag({ url: "http://example.com/style.css" });
      await htmlHandle.dispose();
      return html;
      //third
    }
  } catch (error) {
    console.log(error);
  }
};

export default configureBrowser;
