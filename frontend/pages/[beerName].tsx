import { Box, Heading, Img, Text } from "@chakra-ui/react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import beersData from "../beers-data.json";
import { AnyBeer } from "../beerTypes";

interface Props {
  beer: AnyBeer;
}

const BeerPage: NextPage<Props> = ({ beer }) => {
  return (
    <Box>
      <Img src={beer.img} alt={beer.name} h="450px" />
      <Heading>{beer.name}</Heading>
      <Text>Producent - {beer.owner}</Text>
    </Box>
  );
};

export default BeerPage;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: (beersData as AnyBeer[]).map(({ name }) => ({
      params: { beerName: encodeURL(name) },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const beerName = params?.beerName;

  if (typeof beerName !== "string") throw new Error();

  const beer = (beersData as AnyBeer[]).find(
    ({ name }) => name === decodeURL(beerName)
  );

  return {
    props: { beer },
  };
};

const encodeURL = (path: string) => path.replaceAll(" ", "-");
const decodeURL = (path: string) => path.replaceAll("-", " ");
