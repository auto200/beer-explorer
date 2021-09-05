import axios from "../axios";
import cheerio, { CheerioAPI, Element } from "cheerio";

const BASE_URL = "https://www.abcalkoholu.pl/co-zawiera-piwo/wartosci-odzywcze";

export const scrapeAbc = async () => {
  const { data: html } = await axios.get(BASE_URL);
  const $ = cheerio.load(html);

  const beers = $("._row.beer-grid")
    .children()
    .map((_, el) => {
      const originalUrl = `${BASE_URL}${$(el).find("a.no-link").attr("href")}`;
      const name = $(el).find(".title.h3").text().trim();
      const img = $(el).find(".image img.cover").attr("src")!;
      const nutritionalValues = getBeerNutritionalValues($, el);

      return {
        owner: "Kompania Piwowarska",
        originalUrl,
        name,
        img,
        nutritionalValues,
      };
    })
    .toArray();

  return beers;
};

const getBeerNutritionalValues = ($: CheerioAPI, el: Element) => {
  const nutritionalValues = {
    kj: "",
    kcal: "",
    fat: "",
    saturatedFat: "",
    carbs: "",
    sugar: "",
    protein: "",
    salt: "",
  };

  $(el)
    .find(".attributes .col-auto.value")
    .each((i, el) => {
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
