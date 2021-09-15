export type VanPurBeer = {
  owner: "Van Pur";
  originalUrl: string;
  img: string;
  name: string;
  description: string;
  alcoholByVolume: string;
  servingTemperature: string;
};

export type GrupaZywiecBeer = {
  owner: "Grupa Żywiec";
  originalUrl: string;
  img: string;
  name: string;
  description: string;
  nutritionalValues: NutritionalValues;
};

export type CarlsbergBeer = {
  owner: "Carlsberg Polska";
  originalUrl: string;
  img: string;
  name: string;
  description: string;
  type: string;
  alcoholByVolume: string;
  origin: string;
  ingredients: string;
  nutritionalValues: NutritionalValues;
};

export type AbcalkoholuBeer = {
  owner: "Kompania Piwowarska";
  originalUrl: string;
  img: string;
  name: string;
  nutritionalValues: NutritionalValues;
};

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

export type AnyBeer =
  | AbcalkoholuBeer
  | CarlsbergBeer
  | GrupaZywiecBeer
  | VanPurBeer;
