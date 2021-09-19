import {
  AbcalkoholuBeer,
  AnyBeer,
  CarlsbergBeer,
  GrupaZywiecBeer,
  VanPurBeer,
} from "@shared/types";

export const isCarlsbergBeer = (beer: AnyBeer): beer is CarlsbergBeer => {
  return beer.owner.name === "Carlsberg Polska";
};

export const isAbcalkoholuBeer = (beer: AnyBeer): beer is AbcalkoholuBeer => {
  return beer.owner.name === "Kompania Piwowarska";
};

export const isGrupaZywiecBeer = (beer: AnyBeer): beer is GrupaZywiecBeer => {
  return beer.owner.name === "Grupa Żywiec";
};

export const isVanPurBeer = (beer: AnyBeer): beer is VanPurBeer => {
  return beer.owner.name === "Van Pur";
};
