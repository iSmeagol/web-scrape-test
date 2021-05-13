import express from "express";
import configureBrowserPage, {
  screenshot,
  pageContent,
  fetchSelectorData,
} from "./pptr.js";
import config from "../config/index.js";

const router = express.Router();

router.get("/", async (req, res) => {
  res.send("data from server home route!");
});

router.get("/screenshot", async (req, res) => {
  try {
    // const url = "https://www.youtube.com/";
    const { url } = req.query;
    const page = await configureBrowserPage(url);

    const filename = page.title();
    await screenshot(page);
    res.send("screenshot done!", filename);
  } catch (error) {
    console.log(error);
  }
});

router.get("/fetch", async (req, res) => {
  try {
    const { url } = req.query;
    const page = await configureBrowserPage(url);
    config.browserPage = page;
    const content = await pageContent(page);
    // const reg = new RegExp("<script[dD]*?>[dD]*?</script>");
    // const newContent = content.replace("<script[dD]*?>[dD]*?</script>", "");
    res.send(content);
  } catch (error) {}

  //   res.send("data from server home route!", await req.params);
});

router.get("/fetch/selector", async (req, res) => {
  try {
    const { selectors, url } = req.query;
    // console.log("selectors", selectors);
    // const page = await configureBrowser(url, {
    //   waitUntil: "networkidle0",
    // });
    //separated by comma for selector  .class1, .class2
    // const content = await fetchSelectorData(page, ".dealPriceText");
    const content = await fetchSelectorData(config.browserPage, selectors);
    res.send(content);
  } catch (error) {}
});

export default router;
