import { AbcalkoholuBeer } from "@shared/types";
import React from "react";
import { NutritionalValuesTable, SpecificBeerInfoWrapper } from "./shared";

interface Props {
  beer: AbcalkoholuBeer;
}

const Abcalkoholu: React.FC<Props> = ({ beer }) => {
  return (
    <SpecificBeerInfoWrapper>
      {beer.nutritionalValues && (
        <NutritionalValuesTable values={beer.nutritionalValues} />
      )}
    </SpecificBeerInfoWrapper>
  );
};

export default Abcalkoholu;
