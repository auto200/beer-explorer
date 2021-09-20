import { Flex, Heading, SimpleGrid, VStack } from "@chakra-ui/react";
import { AnyBeer } from "@shared/types";
import Image from "next/image";
import React from "react";
import BeerGridItem from "./BeerGridItem";

interface Props {
  beers: AnyBeer[];
}

const BeersGrid: React.FC<Props> = ({ beers }) => {
  if (beers.length === 0) {
    return (
      <Flex
        minH="calc(100vh - 100px)"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
      >
        <VStack>
          <Image src="/beer-not-found.png" width={100} height={250} />
          <Heading>Brak wyników</Heading>
        </VStack>
      </Flex>
    );
  }

  return (
    <SimpleGrid minChildWidth="260px" spacing="40px" m="20px">
      {beers.map((beer) => (
        <BeerGridItem beer={beer} key={beer.name} />
      ))}
    </SimpleGrid>
  );
};

export default BeersGrid;
