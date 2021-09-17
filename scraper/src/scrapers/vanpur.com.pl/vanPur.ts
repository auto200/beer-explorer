import cheerio from "cheerio";
import { VanPurBeer } from "@shared/types";
import axios from "../axiosInstance";
import { getVanPurBeerInfoFromURL } from "./vanPur.beerPage";
import {
  VAN_PUR_BASE_URL,
  VAN_PUR_BEER_COLLECTION_URL,
} from "./vanPur.constants";

export const scrapeVanPur = async (): Promise<VanPurBeer[]> => {
  const collectionURLS = await getBeerCollectionURLS();
  const beerSpecificURLS = await Promise.all(
    collectionURLS.map((url) => getBeerSpecificURLSFromCollectionURL(url))
  ).then((beers) => beers.flat());
  const beers = await Promise.all(
    beerSpecificURLS.map((url) => getVanPurBeerInfoFromURL(url))
  );

  return beers;
};

const getBeerCollectionURLS = async () => {
  const { data: html } = await axios.get(VAN_PUR_BEER_COLLECTION_URL);
  const $ = cheerio.load(html);
  const urls = $("ul.product_list")
    .children()
    .map((_, el) => `${VAN_PUR_BASE_URL}/${$(el).find("a").attr("href")}`)
    .toArray();

  return urls;
};

const getBeerSpecificURLSFromCollectionURL = async (url: string) => {
  const { data: html } = await axios.get(url);
  const $ = cheerio.load(html);

  //in case when there is only one beer in collection, the collection url becomes beer url
  const availableVariants =
    $(".content h2.title.text_center").text().trim() === "Dostępne warianty";
  if (!availableVariants) return [url];

  const beerURLS = $(".frame ul")
    .children()
    .map((_, el) => `${VAN_PUR_BASE_URL}/${$(el).find("a").attr("href")}`)
    .toArray();

  return beerURLS;
};
