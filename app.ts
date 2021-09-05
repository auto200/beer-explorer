import fs from "fs/promises";
import { performance } from "perf_hooks";
import { Beer } from "./types";
import {
  scrapeCarlsberg,
  scrapeAbcalkoholu,
  scrapeGrupaZywiec,
  scrapeVanPur,
} from "./scrapers";

const OUT_PATH = "./out";
const CARLSBERG_OUT_PATH = `${OUT_PATH}/carlsbergpolska.json`;
const ABC_OUT_PATH = `${OUT_PATH}/abcalkoholu.json`;
const GRUPAZYWIEC_OUT_PATH = `${OUT_PATH}/grupazywiec.json`;
const VAN_PUR_OUT_PATH = `${OUT_PATH}/vanpur.json`;

(async () => {
  try {
    await createDirsIfNotExists(OUT_PATH);
    await Promise.all([
      handleCarlsberg(),
      handleAbcalkoholu(),
      handleGrupazywiec(),
      handleVanPur(),
    ]);
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

  await saveBeersData(CARLSBERG_OUT_PATH, carlsbergBeers);
}

async function handleAbcalkoholu() {
  const scrapingStartTime = performance.now();
  const abcalkoholuBeers = await scrapeAbcalkoholu();
  console.log(
    `Abcalkoholu scraping done. Operation took ${
      (performance.now() - scrapingStartTime) / 1000
    }sec`
  );

  await saveBeersData(ABC_OUT_PATH, abcalkoholuBeers);
}

async function handleGrupazywiec() {
  const scrapingStartTime = performance.now();
  const grupaZywiecBeers = await scrapeGrupaZywiec();
  console.log(
    `Grupazywiec scraping done. Operation took ${
      (performance.now() - scrapingStartTime) / 1000
    }sec`
  );

  await saveBeersData(GRUPAZYWIEC_OUT_PATH, grupaZywiecBeers);
}

async function handleVanPur() {
  const scrapingStartTime = performance.now();
  const vanPurBeers = await scrapeVanPur();
  console.log(
    `Van Pur scraping done. Operation took ${
      (performance.now() - scrapingStartTime) / 1000
    }sec`
  );

  await saveBeersData(VAN_PUR_OUT_PATH, vanPurBeers);
}

async function createDirsIfNotExists(path: string) {
  try {
    await fs.access(path);
  } catch {
    fs.mkdir(path, { recursive: true });
  }
}

async function saveBeersData(path: string, beersData: Beer[]) {
  await fs.writeFile(path, JSON.stringify(beersData, null, 2), {
    flag: "w",
  });
}
