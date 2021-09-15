import fs from "fs/promises";
import { performance } from "perf_hooks";
import {
  scrapeCarlsberg,
  scrapeAbcalkoholu,
  scrapeGrupaZywiec,
  scrapeVanPur,
} from "./scrapers";

const OUT_BASE = "./out";
const CARLSBERG_OUT_PATH = `${OUT_BASE}/carlsbergpolska.json`;
const ABC_OUT_PATH = `${OUT_BASE}/abcalkoholu.json`;
const GRUPAZYWIEC_OUT_PATH = `${OUT_BASE}/grupazywiec.json`;
const VAN_PUR_OUT_PATH = `${OUT_BASE}/vanpur.json`;
const COMBINED_OUT_PATH = `${OUT_BASE}/combined.json`;

(async () => {
  try {
    await createDirsIfNotExists(OUT_BASE);
    await Promise.all([
      handleCarlsberg(),
      handleAbcalkoholu(),
      handleGrupazywiec(),
      handleVanPur(),
    ]);
    await combineOutputIntoOneFile();
  } catch (err) {
    console.log(err);
  }
})();

async function handleCarlsberg() {
  const scrapingStartTime = performance.now();
  const carlsbergBeers = await scrapeCarlsberg();
  console.log(
    `Carlsberg scraping done. Operation took ${
      (performance.now() - scrapingStartTime) / 1000
    }sec`
  );

  await saveToFile(CARLSBERG_OUT_PATH, carlsbergBeers);
}

async function handleAbcalkoholu() {
  const scrapingStartTime = performance.now();
  const abcalkoholuBeers = await scrapeAbcalkoholu();
  console.log(
    `Abcalkoholu scraping done. Operation took ${
      (performance.now() - scrapingStartTime) / 1000
    }sec`
  );

  await saveToFile(ABC_OUT_PATH, abcalkoholuBeers);
}

async function handleGrupazywiec() {
  const scrapingStartTime = performance.now();
  const grupaZywiecBeers = await scrapeGrupaZywiec();
  console.log(
    `Grupazywiec scraping done. Operation took ${
      (performance.now() - scrapingStartTime) / 1000
    }sec`
  );

  await saveToFile(GRUPAZYWIEC_OUT_PATH, grupaZywiecBeers);
}

async function handleVanPur() {
  const scrapingStartTime = performance.now();
  const vanPurBeers = await scrapeVanPur();
  console.log(
    `Van Pur scraping done. Operation took ${
      (performance.now() - scrapingStartTime) / 1000
    }sec`
  );

  await saveToFile(VAN_PUR_OUT_PATH, vanPurBeers);
}

async function createDirsIfNotExists(path: string) {
  try {
    await fs.access(path);
  } catch {
    fs.mkdir(path, { recursive: true });
  }
}

async function saveToFile(path: string, data: any) {
  await fs.writeFile(path, JSON.stringify(data, null, 2));
}

async function combineOutputIntoOneFile() {
  const abcalkoholu = require(ABC_OUT_PATH);
  const carlsberg = require(CARLSBERG_OUT_PATH);
  const grupazywiec = require(GRUPAZYWIEC_OUT_PATH);
  const vanpur = require(VAN_PUR_OUT_PATH);
  const combined = Object.values({
    abcalkoholu,
    carlsberg,
    grupazywiec,
    vanpur,
  }).flat();
  await saveToFile(COMBINED_OUT_PATH, combined);
}
