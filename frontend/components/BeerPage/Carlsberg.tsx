import { Heading, Text, VStack } from "@chakra-ui/react";
import { CarlsbergBeer } from "@shared/types";
import React from "react";
import {
  Description,
  LabelValuePair,
  NutritionalValuesTable,
  SpecificBeerInfoWrapper,
} from "./shared";

interface Props {
  beer: CarlsbergBeer;
}

const Carlsberg: React.FC<Props> = ({ beer }) => {
  return (
    <SpecificBeerInfoWrapper>
      {beer.alcoholByVolume !== "0%" && (
        <LabelValuePair
          label="Zawartość alkoholu:"
          value={beer.alcoholByVolume}
        />
      )}
      {beer.type && <LabelValuePair label="Typ:" value={beer.type} />}
      <Description>{beer.description}</Description>
      {beer.ingredients && (
        <VStack>
          <Text>Składniki: </Text>
          <Heading fontSize="xl" textAlign="center" marginTop="0 !important">
            {beer.ingredients.replace("Składniki: ", "")}
          </Heading>
        </VStack>
      )}
      {beer.nutritionalValues && (
        <NutritionalValuesTable values={beer.nutritionalValues} />
      )}
      {beer.origin && (
        <LabelValuePair label="Pochodzenie: " value={beer.origin} />
      )}
    </SpecificBeerInfoWrapper>
  );
};

export default Carlsberg;
