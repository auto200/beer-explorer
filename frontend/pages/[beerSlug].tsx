import { ArrowBackIcon } from "@chakra-ui/icons";
import { Heading, Img, Link as ChLink, VStack } from "@chakra-ui/react";
import Abcalkoholu from "@components/BeerPage/Abcalkoholu";
import Carlsberg from "@components/BeerPage/Carlsberg";
import VanPur from "@components/BeerPage/VanPur";
import Zywiec from "@components/BeerPage/Zywiec";
import ExternalLink from "@components/shared/ExternalLink";
import beersData from "@shared/beers-data.json";
import { AnyBeer } from "@shared/types";
import {
  isAbcalkoholuBeer,
  isCarlsbergBeer,
  isGrupaZywiecBeer,
  isVanPurBeer,
} from "@utils";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import NextLink from "next/link";
import React from "react";

interface Props {
  beer: AnyBeer;
}

const BeerPage: NextPage<Props> = ({ beer }) => {
  return (
    <>
      <NextLink href="/">
        <ChLink pos="absolute" top={3} left={3}>
          <ArrowBackIcon fontSize="35px" />
        </ChLink>
      </NextLink>
      <VStack px={2} pb={0}>
        <VStack mx={3} maxW="768px" w="full" minH="100vh">
          <Img src={beer.img} alt={beer.name} h="250px" mt={5} />
          <Heading textAlign="center">{beer.name}</Heading>
          <ExternalLink href={beer.owner.website} mt="0 !important">
            Producent - {beer.owner.name}
          </ExternalLink>
          {isCarlsbergBeer(beer) && <Carlsberg beer={beer} />}
          {isGrupaZywiecBeer(beer) && <Zywiec beer={beer} />}
          {isAbcalkoholuBeer(beer) && <Abcalkoholu beer={beer} />}
          {isVanPurBeer(beer) && <VanPur beer={beer} />}
          <ExternalLink href={beer.originalUrl} mt="auto !important">
            Originalna Strona Produktu
          </ExternalLink>
        </VStack>
      </VStack>
    </>
  );
};

export default BeerPage;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: (beersData as AnyBeer[]).map(({ slug }) => ({
      params: { beerSlug: slug },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const beerSlug = params?.beerSlug;

  if (typeof beerSlug !== "string") throw new Error();

  const beer = (beersData as AnyBeer[]).find(({ slug }) => slug === beerSlug);

  return {
    props: { beer },
  };
};
