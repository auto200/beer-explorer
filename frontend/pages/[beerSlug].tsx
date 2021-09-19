import { ArrowBackIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { Heading, Img, Text, Link as ChLink, VStack } from "@chakra-ui/react";
import beersData from "@shared/beers-data.json";
import { AnyBeer } from "@shared/types";
import Carlsberg from "frontend/components/BeerPage/BeerTypes/Carlsberg";
import ExternalLink from "@components/shared/ExternalLink";
import { isCarlsbergBeer } from "frontend/utils/utils";
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
        <ChLink pos="absolute" top="0" left="12px">
          <ArrowBackIcon fontSize="35px" />
        </ChLink>
      </NextLink>
      <VStack p={2}>
        <VStack m={3} maxW="768px" w="full">
          <Img src={beer.img} alt={beer.name} h="250px" mt={5} />
          <Heading textAlign="center">{beer.name}</Heading>
          <ExternalLink href={beer.owner.website} mt="0 !important">
            Producent - {beer.owner.name}
          </ExternalLink>
          {isCarlsbergBeer(beer) && <Carlsberg beer={beer} />}
          <ExternalLink href={beer.originalUrl} mt="25px !important">
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
