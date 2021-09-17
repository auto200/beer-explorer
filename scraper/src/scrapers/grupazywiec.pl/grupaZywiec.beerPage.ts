import cheerio, { CheerioAPI, Element } from "cheerio";
import { GrupaZywiecBeer, NutritionalValues } from "@shared/types";
import axios from "../axiosInstance";

export const getGrupaZywiecBeersInfoFromCollectionUrl = async (
  url: string
): Promise<GrupaZywiecBeer[]> => {
  const { data: html } = await axios.get(url);
  const $ = cheerio.load(html);

  const beers = $(".l-content-padding.clearfix.gallery.disabled")
    .first()
    .children()
    .map((_, el) => {
      const img = $(el).find(".lightbox__content__right img").attr("src")!;
      const name = $(el).find(".text h1").text();
      const description = $(el)
        .find(".text")
        .text()
        .replace(/\s\s+/g, " ")
        .trim();
      const nutritionalValues = getNutritionalValues($, el);

      return {
        owner: "Grupa Żywiec" as const,
        originalUrl: url,
        img,
        name,
        description,
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

  const [kj, kcal] = $(el)
    .find(".component.singleComponent .component__value")
    .text()
    .split("/")
    .map((str) => str.trim());
  nutritionalValues.kj = kj;
  nutritionalValues.kcal = kcal;

  $(el)
    .find(".nutri-table__row__col")
    .each((i, el) => {
      const key = Object.keys(nutritionalValues)[
        i + 2
      ] as keyof typeof nutritionalValues;

      nutritionalValues[key] = $(el).children().last().text();
    });

  return nutritionalValues;
};
