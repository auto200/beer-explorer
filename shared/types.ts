import { OWNERS_DATA } from "./constants";

export type NutritionalValues = {
  kj: string;
  kcal: string;
  fat: string;
  saturatedFat: string;
  carbs: string;
  sugars: string;
  protein: string;
  salt: string;
};

interface BeerBase {
  owner: { name: string; website: string };
  originalUrl: string;
  img: string;
  name: string;
  slug: string;
}

export interface VanPurBeer extends BeerBase {
  owner: typeof OWNERS_DATA.VAN_PUR;
  description: string;
  alcoholByVolume: string;
  servingTemperature: string;
}

export interface GrupaZywiecBeer extends BeerBase {
  owner: typeof OWNERS_DATA.GRUPA_ZYWIEC;
  description: string;
  nutritionalValues: NutritionalValues;
}

export interface CarlsbergBeer extends BeerBase {
  owner: typeof OWNERS_DATA.CARLSBERG_POLSKA;
  description: string;
  type: string;
  alcoholByVolume: string;
  origin: string;
  ingredients: string;
  nutritionalValues: NutritionalValues;
}

export interface AbcalkoholuBeer extends BeerBase {
  owner: typeof OWNERS_DATA.KOMPANIA_PIWOWARSKA;
  nutritionalValues: NutritionalValues;
}

export type AnyBeer =
  | AbcalkoholuBeer
  | CarlsbergBeer
  | GrupaZywiecBeer
  | VanPurBeer;
