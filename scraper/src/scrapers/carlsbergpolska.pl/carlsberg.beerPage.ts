import cheerio, { CheerioAPI } from "cheerio";
import { CarlsbergBeer, NutritionalValues } from "@shared/types";
import axios from "../axiosInstance";
import { CARLSBERG_BASE_URL } from "./carlsberg.constants";
import { OWNERS_DATA } from "@shared/sharedConstants";
import { beerNameToSlug } from "scraper/src/utils";

export const getCarlsbergBeerInfoFromURL = async (
  url: string
): Promise<CarlsbergBeer> => {
  const { data: html } = await axios.get(url);
  const $ = cheerio.load(html);

  const infos = getBeerInfo($);
  const nutritionalValues = await getNutritionalValues($);
  const img = getBeerImg($);

  return { originalUrl: url, img, ...infos, nutritionalValues };
};

const getBeerInfo = ($: CheerioAPI) => {
  const name = $(`.module--product__info h2`).text().trim();
  const description = $(`.module--product__info p`)
    .text()
    .replaceAll(":", ": ")
    .trim();
  const type = $("#BeerType").next().text().trim();
  const alcoholByVolume = $("#ABV").next().text().trim();
  const origin = $("#Origin").next().text().trim();
  const ingredients = $(".module--product-ingredients__description")
    .text()
    .trim();

  return {
    owner: OWNERS_DATA.CARLSBERG_POLSKA,
    slug: beerNameToSlug(name),
    name,
    description,
    type,
    alcoholByVolume,
    origin,
    ingredients,
  };
};

const getNutritionalValues = ($: CheerioAPI): NutritionalValues => {
  const getNextELementSiblingText = (selector: string) =>
    $(selector).next().text().trim();

  const nutritionalValues = {
    kj: getNextELementSiblingText("#kJ"),
    kcal: getNextELementSiblingText("#kcal"),
    carbs: getNextELementSiblingText("#Carbohydrates"),
    sugars: getNextELementSiblingText("#Sugars"),
    protein: getNextELementSiblingText("#Protein"),
    fat: getNextELementSiblingText("#Fat"),
    saturatedFat: getNextELementSiblingText("#SaturatedFat"),
    salt: getNextELementSiblingText("#Salt"),
  };

  return nutritionalValues;
};

const getBeerImg = ($: CheerioAPI) => {
  const srcset = $(".module--product__image-container.align--center img").attr(
    "srcset"
  )!;
  //get first url from srcset and trim query params;
  return `${CARLSBERG_BASE_URL}${srcset.split(" ")[0]}`.split("?")[0];
};
