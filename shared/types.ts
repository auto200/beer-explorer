type Owners =
  | "Van Pur"
  | "Grupa Żywiec"
  | "Carlsberg Polska"
  | "Kompania Piwowarska";

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
  owner: Owners;
  originalUrl: string;
  img: string;
  name: string;
}

export interface VanPurBeer extends BeerBase {
  owner: "Van Pur";
  description: string;
  alcoholByVolume: string;
  servingTemperature: string;
}

export interface GrupaZywiecBeer extends BeerBase {
  owner: "Grupa Żywiec";
  description: string;
  nutritionalValues: NutritionalValues;
}

export interface CarlsbergBeer extends BeerBase {
  owner: "Carlsberg Polska";
  description: string;
  type: string;
  alcoholByVolume: string;
  origin: string;
  ingredients: string;
  nutritionalValues: NutritionalValues;
}

export interface AbcalkoholuBeer extends BeerBase {
  owner: "Kompania Piwowarska";
  nutritionalValues: NutritionalValues;
}

export type AnyBeer =
  | AbcalkoholuBeer
  | CarlsbergBeer
  | GrupaZywiecBeer
  | VanPurBeer;
