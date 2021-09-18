import cheerio, { CheerioAPI, Element } from "cheerio";
import { AbcalkoholuBeer, NutritionalValues } from "@shared/types";
import axios from "../axiosInstance";
import { ABC_ALKOHOLU_BEER_COLLECTION_URL } from "./abcalkoholu.constants";
import { OWNERS_DATA } from "@shared/constants";
import { beerNameToSlug } from "scraper/src/utils";

export const scrapeAbcalkoholu = async (): Promise<AbcalkoholuBeer[]> => {
  const { data: html } = await axios.get(ABC_ALKOHOLU_BEER_COLLECTION_URL);
  const $ = cheerio.load(html);

  const beers = $("._row.beer-grid")
    .children()
    .map((_, el) => {
      const originalUrl = `${ABC_ALKOHOLU_BEER_COLLECTION_URL}${$(el)
        .find("a.no-link")
        .attr("href")}`;
      const name = $(el).find(".title.h3").text().trim();
      const img = $(el).find(".image img.cover").attr("src")!;
      const nutritionalValues = getNutritionalValues($, el);

      return {
        owner: OWNERS_DATA.KOMPANIA_PIWOWARSKA,
        slug: beerNameToSlug(name),
        originalUrl,
        name,
        img,
        nutritionalValues,
      };
    })
    .toArray();

  return beers;
};

const getNutritionalValues = (
  $: CheerioAPI,
  el: Element
): NutritionalValues => {
  const nutritionalValues = {
    kj: "",
    kcal: "",
    fat: "",
    saturatedFat: "",
    carbs: "",
    sugars: "",
    protein: "",
    salt: "",
  };

  $(el)
    .find(".attributes .col-auto.value")
    .each((i, el) => {
      //first row contains information about both kj and kcal
      if (i === 0) {
        const [kj, kcal] = $(el)
          .text()
          .split(String.fromCharCode(160))
          .map((str) => str.trim());
        nutritionalValues.kj = kj;
        nutritionalValues.kcal = kcal;
        return;
      }

      const key = Object.keys(nutritionalValues)[
        i + 1
      ] as keyof typeof nutritionalValues;

      nutritionalValues[key] = $(el).text();
    });

  return nutritionalValues;
};
