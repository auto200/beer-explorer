import cheerio, { CheerioAPI } from "cheerio";
import { GrupaZywiecBeer } from "../../types";
import axios from "../axiosInstance";
import { getGrupaZywiecBeersInfoFromCollectionUrl } from "./grupaZywiec.beerPage";
import { GRUPA_ZYWIEC_BEER_COLLECTION_URL } from "./grupaZywiec.constants";

export const scrapeGrupaZywiec = async (): Promise<GrupaZywiecBeer[]> => {
  const { data: html } = await axios.get(GRUPA_ZYWIEC_BEER_COLLECTION_URL);
  const $ = cheerio.load(html);
  const collectionURLS = getBrandCollectionURLS($);

  const beers = await Promise.all(
    collectionURLS.map(async (url) =>
      getGrupaZywiecBeersInfoFromCollectionUrl(url)
    )
  ).then((beers) => beers.flat());

  return beers;
};

const getBrandCollectionURLS = ($: CheerioAPI) => {
  const brandCollectionURLS = $(".l-content-padding.l-content-margin.clearfix")
    .children()
    .map((i, el) => {
      //theres an empty element for some reason
      if (i === 0) return;

      return $(el).find(".post--brand").children().first().attr("href");
    })
    .toArray();

  return brandCollectionURLS;
};
