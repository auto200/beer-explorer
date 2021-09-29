import { Flex, Heading, SimpleGrid, VStack, Img } from "@chakra-ui/react";
import { AnyBeer } from "@shared/types";
import React, { useMemo } from "react";
import BeerGridItem from "./BeerGridItem";
import { GridComponents, VirtuosoGrid } from "react-virtuoso";

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
          <Img src="/beer-not-found.png" width={100} height={250} alt="" />
          <Heading>Brak wyników</Heading>
        </VStack>
      </Flex>
    );
  }

  const components = useMemo(() => {
    return {
      List: React.forwardRef<HTMLDivElement>(({ children, ...props }, ref) => {
        return (
          <SimpleGrid minChildWidth="320px" mt="20px" ref={ref} {...props}>
            {children}
          </SimpleGrid>
        );
      }),
    };
  }, []);

  return (
    <VirtuosoGrid
      useWindowScroll
      totalCount={beers.length}
      overscan={200}
      components={components as GridComponents}
      itemContent={(index) => {
        if (index !== -1) {
          return <BeerGridItem beer={beers[index]} />;
        }
      }}
    />
  );
};

export default BeersGrid;
