import axios from "../axios";
import cheerio, { CheerioAPI, Element } from "cheerio";

const BASE_URL = "https://www.grupazywiec.pl/marki";

export const scrapeGrupazywiec = async () => {
  const { data: html } = await axios.get(BASE_URL);
  const $ = cheerio.load(html);
  const collectionURLS = getBrandCollectionURLS($);

  const beers = await Promise.all(
    collectionURLS.map(async (url) => getBeerInfosFromCollectionUrl(url))
  ).then((beers) => beers.flat());

  return beers;
};

const getBrandCollectionURLS = ($: CheerioAPI) => {
  const brandCollectionURLS = $(".l-content-padding.l-content-margin.clearfix")
    .children()
    .map((i, el) => {
      if (i === 0) return;
      return $(el).find(".post--brand").children().first().attr("href");
    })
    .toArray();

  return brandCollectionURLS;
};

const getBeerInfosFromCollectionUrl = async (url: string) => {
  const { data: html } = await axios.get(url);
  const $ = cheerio.load(html);

  const beers = $(".l-content-padding.clearfix.gallery.disabled")
    .first()
    .children()
    .map((_, el) => {
      const img = $(el).find(".lightbox__content__right img").attr("src");
      const name = $(el).find(".text h1").text();
      const description = $(el)
        .find(".text")
        .text()
        .replace(/\s\s+/g, " ")
        .trim();
      const nutritionalValues = getNutritionalValues($, el);

      return { originalUrl: url, img, name, description, nutritionalValues };
    })
    .toArray();

  return beers;
};

const getNutritionalValues = ($: CheerioAPI, el: Element) => {
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
