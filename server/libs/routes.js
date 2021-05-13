import express from "express";
import configureBrowserPage, {
  screenshot,
  pageContent,
  fetchSelectorSingleData,
  fetchSelectorAllData,
  closeBrowser,
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

router.get("/fetch/selectors/first", async (req, res) => {
  try {
    const { selectors, url } = req.query;
    const content = await fetchSelectorSingleData(
      config.browserPage,
      selectors
    );
    // closeBrowser();
    res.send(content);
  } catch (error) {}
});

router.get("/fetch/selectors/all", async (req, res) => {
  try {
    const { selectors, url, resultNeeded } = req.query;
    const content = await fetchSelectorAllData(
      config.browserPage,
      selectors,
      resultNeeded
    );
    // closeBrowser();
    res.send(content);
  } catch (error) {}
});

// router.get("/fetch/selectors/all", async (req, res) => {
//   try {
//     const { selectors, url } = req.query;
//     const content = await fetchSelectorAllData(config.browserPage, selectors);
//     // closeBrowser();
//     res.send(content);
//   } catch (error) {}
// });

export default router;
