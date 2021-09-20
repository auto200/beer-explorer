import { SimpleGrid } from "@chakra-ui/react";
import beersData from "@shared/beers-data.json";
import { AnyBeer } from "@shared/types";
import React from "react";
import BeerGridItem from "./BeerGridItem";

const BeersGrid = () => {
  return (
    <SimpleGrid minChildWidth="260px" spacing="40px" m="20px">
      {(beersData as AnyBeer[]).map((beer) => (
        <BeerGridItem beer={beer} key={beer.name} />
      ))}
    </SimpleGrid>
  );
};

export default BeersGrid;
