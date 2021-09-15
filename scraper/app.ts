import fs from "fs/promises";
import { performance } from "perf_hooks";
import {
  scrapeCarlsberg,
  scrapeAbcalkoholu,
  scrapeGrupaZywiec,
  scrapeVanPur,
} from "./scrapers";
import {
  AbcalkoholuBeer,
  CarlsbergBeer,
  GrupaZywiecBeer,
  VanPurBeer,
} from "./types";

const BASE_OUT_PATH = "./out";
const COMBINED_OUT_PATH = `${BASE_OUT_PATH}/combined.json`;

type ArrayOfAnyBeer =
  | CarlsbergBeer[]
  | AbcalkoholuBeer[]
  | GrupaZywiecBeer[]
  | VanPurBeer[];

interface Job {
  name: string;
  outPath: string;
  handler: () => Promise<ArrayOfAnyBeer>;
}

const jobs: Job[] = [
  {
    name: "Calsberg",
    outPath: `${BASE_OUT_PATH}/carlsbergpolska.json`,
    handler: scrapeCarlsberg,
  },
  {
    name: "Abcalkoholu",
    outPath: `${BASE_OUT_PATH}/abcalkoholu.json`,
    handler: scrapeAbcalkoholu,
  },
  {
    name: "Grupazywiec",
    outPath: `${BASE_OUT_PATH}/grupazywiec.json`,
    handler: scrapeGrupaZywiec,
  },
  {
    name: "Van Pur",
    outPath: `${BASE_OUT_PATH}/vanpur.json`,
    handler: scrapeVanPur,
  },
];

(async () => {
  try {
    await createDirsIfNotExists(BASE_OUT_PATH);
    await Promise.all(jobs.map(async (job) => handleJob(job)));
    await combineOutputIntoOneFile();
  } catch (err) {
    console.log(err);
  }
})();

const handleJob = async (job: Job) => {
  const startTime = performance.now();
  const beers = await job.handler();
  const delta = performance.now() - startTime;
  console.log(
    `${job.name} scraping done. Operation took ${(delta / 1000).toFixed(2)}sec`
  );

  await saveToFile(job.outPath, beers);
};

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
  const outArrays: ArrayOfAnyBeer[] = jobs.map(({ outPath }) =>
    require(outPath)
  );
  const combined = Object.values(outArrays)
    .flat()
    //sort for consistant order, that way you can easly see what changed
    .sort((a, b) => a.owner.localeCompare(b.owner));
  await saveToFile(COMBINED_OUT_PATH, combined);
}
