import { SimpleGrid } from "@chakra-ui/react";
import { AnyBeer } from "@shared/types";
import React, { useMemo } from "react";
import { GridComponents, VirtuosoGrid } from "react-virtuoso";
import BeerGridItem from "./BeerGridItem";

interface Props {
  beers: AnyBeer[];
}
const BeersGrid: React.FC<Props> = ({ beers }) => {
  const components = useMemo(() => {
    return {
      // eslint-disable-next-line react/display-name
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
