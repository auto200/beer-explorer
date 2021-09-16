import { SimpleGrid } from "@chakra-ui/react";
import type { NextPage } from "next";
import beersData from "../beers-data.json";
import { AnyBeer } from "../beerTypes";
import BeerGridItem from "../components/Home/BeerGridItem";

const Home: NextPage = () => {
  return (
    <SimpleGrid minChildWidth="260px" spacing="40px" m="20px">
      {(beersData as AnyBeer[]).map((beer) => (
        <BeerGridItem beer={beer} key={beer.name} />
      ))}
    </SimpleGrid>
  );
};

export default Home;
