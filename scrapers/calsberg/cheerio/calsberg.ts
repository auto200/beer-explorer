import {
  CALSBERG_BASE_URL,
  CALSBERG_BEER_COLLECTION_URL,
  CALSBERG_SCRAPING_CHUNK_SIZE,
} from "../constants";
import axios from "./axios";
import cheerio from "cheerio";
import { scrapCalsbergBeerInfoFromURL } from "./beerPage";

export const scrapeCalsberg = async () => {
  const beerCollectionPageURLS = await getBeerCollectionPageURLS();
  const beerSpecificPageURLS = await Promise.all(
    beerCollectionPageURLS.map(
      async (url) => await getBeerSpecificPageURLSFromBeerCollectionURL(url)
    )
  ).then((result) => result.flat());
  let progress = 0;
  const calsbergBeers = await Promise.all(
    beerSpecificPageURLS.map(async (url) => {
      const info = await scrapCalsbergBeerInfoFromURL(url);
      console.log(
        `Scraping beers - progress:${++progress}/${beerSpecificPageURLS.length}`
      );
      return info;
    })
  );
  return calsbergBeers;
};

const getBeerCollectionPageURLS = async () => {
  const { data: page } = await axios.get(CALSBERG_BEER_COLLECTION_URL);
  const $ = cheerio.load(page);

  const numberOfResults = parseInt(
    $(".brands-list__result-count__heading").text()
  );
  const numberOfPages = Math.ceil(
    numberOfResults / CALSBERG_SCRAPING_CHUNK_SIZE
  );

  return new Array(numberOfPages)
    .fill(null)
    .map((_, i) => `${CALSBERG_BEER_COLLECTION_URL}/?p=${i + 1}`);
};

const getBeerSpecificPageURLSFromBeerCollectionURL = async (
  collectionUrl: string
) => {
  const { data: page } = await axios.get(collectionUrl);
  const $ = cheerio.load(page);

  const beerSpecificURLS: string[] = [];

  $(".brands-list__result-image__holder a").each((_, el) => {
    beerSpecificURLS.push(`${CALSBERG_BASE_URL}${el.attribs.href}`);
  });

  return beerSpecificURLS;
};
