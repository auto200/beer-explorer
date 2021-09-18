import { BASE_OUT_PATH, COMBINED_DATA_OUT_PATH } from "./CONSTANTS";
import { handleJob, jobs } from "./jobs";
import { AnyBeer } from "@shared/types";

import {
  createDirsIfNotExists,
  readJSONFromFile,
  parseToJSONAndSaveToFile,
} from "./utils";

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
  const outArrays: AnyBeer[][] = await Promise.all(
    jobs.map(async ({ outPath }) => readJSONFromFile(outPath))
  );

  const combined = Object.values(outArrays)
    .flat()
    //sort for consistant order, that way you can easly see what changed
    .sort((a, b) => a.owner.name.localeCompare(b.owner.name));

  //name is used as an id, so better be sure for it to be unique
  const beerNames = combined.map(({ name }) => name);
  if (beerNames.length !== new Set(beerNames).size) {
    const duplicates = beerNames.filter(
      (name, i) => beerNames.indexOf(name) !== i
    );
    console.error("There are duplicated beer names:", duplicates);
  }

  await parseToJSONAndSaveToFile(COMBINED_DATA_OUT_PATH, combined);
}
