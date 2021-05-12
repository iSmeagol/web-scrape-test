import scrape from "website-scraper";

export const downloadPage = async (url) => {
  const options = {
    urls: [url],
    directory: "../files/",
  };

  // with async/await
  const result = await scrape(options);
  return result;
};
