import { Browser, Page } from "puppeteer";
import { CALSBERG_BASE_URL } from "./constants";
import { gotoPage } from "./utils";

export const scrapCalsbergBeerInfoFromURL = async (
  browser: Browser,
  pageUrl: string
) => {
  const page = await gotoPage(browser, pageUrl);

  const infos = await getCalsbergBeerInfos(page);
  const nutritionalValues = await getCalsbergBeerNutritionalValues(page);
  const img = await getCalsbergBeerImg(page);

  await page.close();

  return { img, ...infos, nutritionalValues };
};

const getCalsbergBeerInfos = async (page: Page) => {
  return await page.evaluate(() => {
    const productInfoSelector = ".module--product__info";

    const name = (
      document.querySelector(`${productInfoSelector} h2`) as HTMLElement
    ).innerText;

    const beerDetailsSelector = `${productInfoSelector} .product-meta.cf`;

    const [type, alcoholByVolume, origin] = (
      [
        ...document.querySelectorAll(`${beerDetailsSelector} dd`),
      ] as HTMLElement[]
    ).map((el) => el.innerText);

    const description = (
      document.querySelector(`${productInfoSelector} p`) as HTMLElement
    ).innerText;

    return { name, type, alcoholByVolume, origin, description };
  });
};

const getCalsbergBeerNutritionalValues = async (page: Page) => {
  return await page.evaluate(() => {
    const getNextELementSiblingText = (selector: string): string | undefined =>
      (document.querySelector(selector)?.nextElementSibling as HTMLElement)
        ?.innerText;

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
  });
};

const getCalsbergBeerImg = async (page: Page) => {
  return await page.evaluate(async (CALSBERG_BASE_URL) => {
    const imgSelector = ".module--product__image-container.align--center img";
    const imgEl = document.querySelector(imgSelector) as HTMLImageElement;
    //get first url from srcset and trim query params;
    return `${CALSBERG_BASE_URL}${imgEl.srcset.split(" ")[0]}`.split("?")[0];
  }, CALSBERG_BASE_URL);
};
