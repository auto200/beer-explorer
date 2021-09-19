import { GrupaZywiecBeer } from "@shared/types";
import React from "react";
import {
  Description,
  NutritionalValuesTable,
  SpecificBeerInfoWrapper,
} from "./shared";

interface Props {
  beer: GrupaZywiecBeer;
}

const Zywiec: React.FC<Props> = ({ beer }) => {
  return (
    <SpecificBeerInfoWrapper>
      <Description>{beer.description}</Description>
      {beer.nutritionalValues && (
        <NutritionalValuesTable values={beer.nutritionalValues} />
      )}
    </SpecificBeerInfoWrapper>
  );
};

export default Zywiec;
