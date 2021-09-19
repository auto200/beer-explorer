import { VanPurBeer } from "@shared/types";
import React from "react";
import { Description, LabelValuePair, SpecificBeerInfoWrapper } from "./shared";

interface Props {
  beer: VanPurBeer;
}

const VanPur: React.FC<Props> = ({ beer }) => {
  return (
    <SpecificBeerInfoWrapper>
      {beer.alcoholByVolume !== "0,0%" && (
        <LabelValuePair
          label="Zawartość alkoholu:"
          value={beer.alcoholByVolume}
        />
      )}
      <Description>{beer.description}</Description>
      <LabelValuePair
        label="Temperatura podania:"
        value={beer.servingTemperature}
      />
    </SpecificBeerInfoWrapper>
  );
};

export default VanPur;
