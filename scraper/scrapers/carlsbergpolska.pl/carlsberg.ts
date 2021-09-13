import {
  CARLSBERG_BASE_URL,
  CARLSBERG_BEERS_PER_COLLECTION,
  CARLSBERG_BEER_COLLECTION_URL,
} from "./carlsberg.constants";
import axios from "../axios";
import cheerio from "cheerio";
import { getCarlsbergBeerInfoFromURL } from "./carlsberg.beerPage";
import { CarlsbergBeer } from "../../types";

export const scrapeCarlsberg = async (): Promise<CarlsbergBeer[]> => {
  const beerCollectionPageURLS = await getBeerCollectionPageURLS();
  const beerSpecificPageURLS = await Promise.all(
    beerCollectionPageURLS.map((url) =>
      getBeerSpecificPageURLSFromBeerCollectionURL(url)
    )
  ).then((result) => result.flat());

  let progress = 0;
  const calsbergBeers = await Promise.all(
    beerSpecificPageURLS.map(async (url) => {
      const info = await getCarlsbergBeerInfoFromURL(url);
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
  const { data: html } = await axios.get(CARLSBERG_BEER_COLLECTION_URL);
  const $ = cheerio.load(html);

  const numberOfResults = parseInt(
    $(".brands-list__result-count__heading").text()
  );
  const numberOfPages = Math.ceil(
    numberOfResults / CARLSBERG_BEERS_PER_COLLECTION
  );

  return new Array(numberOfPages)
    .fill(null)
    .map((_, i) => `${CARLSBERG_BEER_COLLECTION_URL}/?p=${i + 1}`);
};

const getBeerSpecificPageURLSFromBeerCollectionURL = async (
  collectionUrl: string
) => {
  const { data: html } = await axios.get(collectionUrl);
  const $ = cheerio.load(html);

  const beerSpecificURLS = $(".brands-list__result-image__holder a")
    .map((_, el) => `${CARLSBERG_BASE_URL}${$(el).attr("href")}`)
    .toArray();

  return beerSpecificURLS;
};
