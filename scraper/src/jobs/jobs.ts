import { performance } from "perf_hooks";
import { BASE_OUT_PATH } from "../CONSTANTS";
import {
  scrapeAbcalkoholu,
  scrapeCarlsberg,
  scrapeGrupaZywiec,
  scrapeVanPur,
} from "../scrapers";
import { AnyBeer } from "@shared/types";
import { parseToJSONAndSaveToFile } from "../utils";

interface Job {
  name: string;
  outPath: string;
  handler: () => Promise<AnyBeer[]>;
}

export const jobs: Job[] = [
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

export const handleJob = async (job: Job) => {
  const startTime = performance.now();
  const beers = await job.handler();
  const delta = performance.now() - startTime;
  console.log(
    `${job.name} scraping done. Operation took ${(delta / 1000).toFixed(2)}sec`
  );

  await parseToJSONAndSaveToFile(job.outPath, beers);
};
