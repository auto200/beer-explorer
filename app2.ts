import puppeteer from "puppeteer";
import { scrapCalsberg } from "./scrapers/calsberg/calsberg";
import fs from "fs/promises";
import { performance } from "perf_hooks";

const OUT_PATH = "./out";
const CALSBERG_OUT_PATH = `${OUT_PATH}/calsberg.json`;

(async () => {
  try {
    await createDirsIfNotExists(OUT_PATH);

    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
    });

    const calsbergScrapingStartTime = performance.now();
    const calsbergBeers = await scrapCalsberg(browser);
    console.log(
      `Calsberg scraping done. Operation took ${
        (performance.now() - calsbergScrapingStartTime) / 1000
      }sec`
    );

    await saveBeersData(CALSBERG_OUT_PATH, calsbergBeers);
  } catch (err) {
    console.log(err);
  }
})();

async function createDirsIfNotExists(path: string) {
  try {
    await fs.access(path);
  } catch {
    fs.mkdir(path, { recursive: true });
  }
}

async function saveBeersData(path: string, data: object) {
  await fs.writeFile(path, JSON.stringify(data, null, 2), {
    flag: "w",
  });
}
