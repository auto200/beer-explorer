import { Browser } from "puppeteer";
import { scrapCalsbergBeerInfoFromURL } from "./beerPage";
import { chunk } from "lodash";
import {
  CALSBERG_BASE_URL,
  CALSBERG_SCRAPING_CHUNK_SIZE,
  CALSBERG_BEER_COLLECTION_URL,
  CALSBERG_BEERS_PER_COLLECTION,
} from "./constants";
import { gotoPage } from "./utils";

export const scrapCalsberg = async (browser: Browser) => {
  // not sure if it is necessary
  await verifyAge(browser);

  const beerCollectionPageURLS = await getBeerCollectionPageURLS(browser);
  const beerSpecificPageURLS = await Promise.all(
    beerCollectionPageURLS.map(
      async (url) =>
        await getBeerSpecificPageURLSFromBeerCollectionURL(browser, url)
    )
  ).then((result) => result.flat());

  const chunkedBeerURLS = chunk(
    beerSpecificPageURLS,
    CALSBERG_SCRAPING_CHUNK_SIZE
  );

  //TODO: strongly type beer object
  let beers: any = [];
  let chunkCounter = 0;

  console.log("Scraping started");
  for (const urls of chunkedBeerURLS) {
    const calsbergBeers = await Promise.all(
      urls.map(async (url) => await scrapCalsbergBeerInfoFromURL(browser, url))
    );
    beers = [...beers, ...calsbergBeers];
    console.log(
      `Calsberg scraping in progress - ${++chunkCounter}/${
        chunkedBeerURLS.length
      }`
    );
  }

  return beers;
};

const verifyAge = async (browser: Browser) => {
  const page = await gotoPage(browser, CALSBERG_BASE_URL);
  await page.keyboard.type("99");
  return await page.close();
};

const getBeerCollectionPageURLS = async (browser: Browser) => {
  const page = await gotoPage(browser, CALSBERG_BEER_COLLECTION_URL);

  const numberOfPages = await page
    .evaluate(() => {
      const resultsSelector = ".brands-list__result-count__heading";
      return parseInt(
        (document.querySelector(resultsSelector) as HTMLElement).innerText
      );
    })
    .then((results) => Math.ceil(results / CALSBERG_BEERS_PER_COLLECTION));

  await page.close();

  return new Array(numberOfPages)
    .fill(null)
    .map((_, i) => `${CALSBERG_BEER_COLLECTION_URL}/?p=${i + 1}`);
};

const getBeerSpecificPageURLSFromBeerCollectionURL = async (
  browser: Browser,
  collectionUrl: string
) => {
  const page = await gotoPage(browser, collectionUrl);
  const beerSpecificURLS = (await page
    .evaluate(() => {
      const beersContainerSelector =
        ".brands-list__result-records div div .row > div";
      const beers = [
        ...document.querySelectorAll(beersContainerSelector),
      ] as HTMLElement[];
      return beers.map((el) => el.querySelector("a")?.href);
    })
    .then((urls) => urls.filter(Boolean))) as string[];
  await page.close();
  return beerSpecificURLS;
};
