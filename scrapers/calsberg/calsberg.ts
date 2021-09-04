import {
  CALSBERG_BASE_URL,
  CALSBERG_BEERS_PER_COLLECTION,
  CALSBERG_BEER_COLLECTION_URL,
} from "./constants";
import axios from "../axios";
import cheerio from "cheerio";
import { scrapeCalsbergBeerInfoFromURL } from "./beerPage";

export const scrapeCalsberg = async () => {
  const beerCollectionPageURLS = await getBeerCollectionPageURLS();
  const beerSpecificPageURLS = await Promise.all(
    beerCollectionPageURLS.map((url) =>
      getBeerSpecificPageURLSFromBeerCollectionURL(url)
    )
  ).then((result) => result.flat());

  let progress = 0;
  const calsbergBeers = await Promise.all(
    beerSpecificPageURLS.map(async (url) => {
      const info = await scrapeCalsbergBeerInfoFromURL(url);
      console.log(
        `Scraping calsberg beer - progress: ${++progress}/${
          beerSpecificPageURLS.length
        }`
      );
      return info;
    })
  );
  return calsbergBeers;
};

const getBeerCollectionPageURLS = async () => {
  const { data: html } = await axios.get(CALSBERG_BEER_COLLECTION_URL);
  const $ = cheerio.load(html);

  const numberOfResults = parseInt(
    $(".brands-list__result-count__heading").text()
  );
  const numberOfPages = Math.ceil(
    numberOfResults / CALSBERG_BEERS_PER_COLLECTION
  );

  return new Array(numberOfPages)
    .fill(null)
    .map((_, i) => `${CALSBERG_BEER_COLLECTION_URL}/?p=${i + 1}`);
};

const getBeerSpecificPageURLSFromBeerCollectionURL = async (
  collectionUrl: string
) => {
  const { data: html } = await axios.get(collectionUrl);
  const $ = cheerio.load(html);

  const beerSpecificURLS: string[] = [];

  $(".brands-list__result-image__holder a").each((_, el) => {
    beerSpecificURLS.push(`${CALSBERG_BASE_URL}${$(el).attr("href")}`);
  });

  return beerSpecificURLS;
};
