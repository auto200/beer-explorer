import axios from "../axios";
import cheerio from "cheerio";

const VAN_PUR_BASE_URL = "https://vanpur.com.pl";
const VAN_PUR_BEER_COLLECTION_URL = `${VAN_PUR_BASE_URL}/pl/nasze-marki.html`;

export const scrapeVanPur = async () => {
  const collectionURLS = await getBeerCollectionURLS();
  const beerSpecificURLS = await Promise.all(
    collectionURLS.map((url) => getBeerSpecificURLSFromCollectionURL(url))
  ).then((beers) => beers.flat());
  const beers = await Promise.all(
    beerSpecificURLS.map((url) => getBeerInfoFrmBeerSpecificURL(url))
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

const getBeerInfoFrmBeerSpecificURL = async (url: string) => {
  const { data: html } = await axios.get(url);
  const $ = cheerio.load(html);

  const name = $("h1.title").text();
  const img = `${VAN_PUR_BASE_URL}/${$(".col.photo img").attr("src")}`;
  const description =
    $("div.col .dynamic_content.mt_40").text() ||
    $(".row.c2x1.mt_20").children().first().text();
  const alcoholByVolume = $("table.border.fs_16 tr")
    .children()
    .first()
    .find("b.dark")
    .text();
  const servingTemperature = $("table.border.fs_16 tr")
    .children()
    .last()
    .find("b.dark")
    .text();

  return {
    owner: "Van Pur",
    originalUrl: url,
    img,
    name,
    description,
    alcoholByVolume,
    servingTemperature,
  };
};
