import express from "express";
import configureBrowser, { screenshot, pageContent } from "./pptr.js";
import { downloadPage } from "./web-scraper.js";

const router = express.Router();

router.get("/", async (req, res) => {
  res.send("data from server home route!");
});

router.get("/screenshot", async (req, res) => {
  try {
    const url = "https://www.youtube.com/";
    const page = await configureBrowser(url, {
      waitUntil: "networkidle0",
    });
    await screenshot(page, "youtube");
    res.send("screenshot done!");
  } catch (error) {
    console.log(error);
  }
});

router.get("/fetch", async (req, res) => {
  const { url } = req.query;
  const page = await configureBrowser(url, {
    waitUntil: "networkidle0",
  });
  // downloadPage(url);
  const content = await pageContent(page);
  // const reg = new RegExp("<script[dD]*?>[dD]*?</script>");
  // const newContent = content.replace("<script[dD]*?>[dD]*?</script>", "");
  res.send(content);
  try {
  } catch (error) {}

  //   res.send("data from server home route!", await req.params);
});

export default router;
