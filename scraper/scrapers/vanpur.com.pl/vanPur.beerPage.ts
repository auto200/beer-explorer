import axios from "../axios";
import cheerio from "cheerio";
import { VAN_PUR_BASE_URL } from "./vanPur.constants";
import { VanPurBeer } from "../../types";

export const getVanPurBeerInfoFromURL = async (
  url: string
): Promise<VanPurBeer> => {
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
