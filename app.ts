import { scrapeCalsberg, scrapeAbc } from "./scrapers";
import fs from "fs/promises";
import { performance } from "perf_hooks";

const OUT_PATH = "./out";
const CALSBERG_OUT_PATH = `${OUT_PATH}/calsberg.json`;
const ABC_OUT_PATH = `${OUT_PATH}/abc.json`;

(async () => {
  try {
    await createDirsIfNotExists(OUT_PATH);
    await Promise.all([handleCalsberg(), handleAbc()]);
  } catch (err) {
    console.log(err);
  }
})();

async function handleCalsberg() {
  const calsbergScrapingStartTime = performance.now();
  const calsbergBeers = await scrapeCalsberg();
  console.log(
    `Calsberg scraping done. Operation took ${
      (performance.now() - calsbergScrapingStartTime) / 1000
    }sec`
  );

  await saveBeersData(CALSBERG_OUT_PATH, calsbergBeers);
}

async function handleAbc() {
  const abcScrapingStartTime = performance.now();
  const abcBeers = await scrapeAbc();
  console.log(
    `Abc scraping done. Operation took ${
      (performance.now() - abcScrapingStartTime) / 1000
    }sec`
  );

  await saveBeersData(ABC_OUT_PATH, abcBeers);
}

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
