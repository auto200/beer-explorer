import { BASE_OUT_PATH, COMBINED_DATA_OUT_PATH } from "./CONSTANTS";
import { handleJob, jobs } from "./jobs";
import { AnyBeer } from "./types";
import { createDirsIfNotExists, saveToFile } from "./utils";

(async () => {
  try {
    await createDirsIfNotExists(BASE_OUT_PATH);
    await Promise.all(jobs.map(async (job) => handleJob(job)));
    await combineOutputIntoOneFile();
  } catch (err) {
    console.log(err);
  }
})();

async function combineOutputIntoOneFile() {
  const outArrays: AnyBeer[][] = jobs.map(({ outPath }) => require(outPath));
  const combined = Object.values(outArrays)
    .flat()
    //sort for consistant order, that way you can easly see what changed
    .sort((a, b) => a.owner.localeCompare(b.owner));
  await saveToFile(COMBINED_DATA_OUT_PATH, combined);
}
