import { Browser } from "puppeteer";

export const gotoPage = async (browser: Browser, url: string) => {
  const page = await browser.newPage();
  page.setDefaultTimeout(0);
  await page.goto(url, { timeout: 0, waitUntil: "domcontentloaded" });
  return page;
};
