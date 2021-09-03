import axios from "./axios";
import cheerio, { CheerioAPI } from "cheerio";
import { CALSBERG_BASE_URL } from "../constants";

export const scrapCalsbergBeerInfoFromURL = async (url: string) => {
  const { data: page } = await axios.get(url);
  const $ = cheerio.load(page);

  const infos = await getCalsbergBeerInfos($);
  const nutritionalValues = await getCalsbergBeerNutritionalValues($);
  const img = await getCalsbergBeerImg($);

  return { img, ...infos, nutritionalValues };
};

const getCalsbergBeerInfos = async ($: CheerioAPI) => {
  const productInfoSelector = ".module--product__info";

  const name = $(`${productInfoSelector} h2`).text();
  const description = $(`${productInfoSelector} p`).text();

  const [type, alcoholByVolume, origin] = $(
    `${productInfoSelector} .product-meta.cf dd`
  ).map(function () {
    return $(this).text();
  });

  return { name, type, alcoholByVolume, origin, description };
};

const getCalsbergBeerNutritionalValues = async ($: CheerioAPI) => {
  const getNextELementSiblingText = (selector: string): string | undefined =>
    $(selector).next().text();

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

const getCalsbergBeerImg = async ($: CheerioAPI) => {
  const srcset = $(".module--product__image-container.align--center img").attr(
    "srcset"
  )!;
  //get first url from srcset and trim query params;
  return `${CALSBERG_BASE_URL}${srcset.split(" ")[0]}`.split("?")[0];
};
