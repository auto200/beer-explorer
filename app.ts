import { scrapeCalsberg, scrapeAbc, scrapeGrupazywiec } from "./scrapers";
import fs from "fs/promises";
import { performance } from "perf_hooks";

const OUT_PATH = "./out";
const CALSBERG_OUT_PATH = `${OUT_PATH}/calsberg.json`;
const ABC_OUT_PATH = `${OUT_PATH}/abc.json`;
const GRUPAZYWIEC_OUT_PATH = `${OUT_PATH}/grupazywiec.json`;

(async () => {
  try {
    await createDirsIfNotExists(OUT_PATH);
    await Promise.all([handleCalsberg(), handleAbc(), handleGrupazywiec()]);
  } catch (err) {
    console.log(err);
  }
})();

async function handleCalsberg() {
  const scrapingStartTime = performance.now();
  const calsbergBeers = await scrapeCalsberg();
  console.log(
    `Calsberg scraping done. Operation took ${
      (performance.now() - scrapingStartTime) / 1000
    }sec`
  );

  await saveBeersData(CALSBERG_OUT_PATH, calsbergBeers);
}

async function handleAbc() {
  const scrapingStartTime = performance.now();
  const abcBeers = await scrapeAbc();
  console.log(
    `Abc scraping done. Operation took ${
      (performance.now() - scrapingStartTime) / 1000
    }sec`
  );

  await saveBeersData(ABC_OUT_PATH, abcBeers);
}

async function handleGrupazywiec() {
  const scrapingStartTime = performance.now();
  const grupazywiecBeers = await scrapeGrupazywiec();
  console.log(
    `Grupazywiec scraping done. Operation took ${
      (performance.now() - scrapingStartTime) / 1000
    }sec`
  );

  await saveBeersData(GRUPAZYWIEC_OUT_PATH, grupazywiecBeers);
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
