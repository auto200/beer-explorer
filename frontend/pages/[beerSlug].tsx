import { ArrowBackIcon } from "@chakra-ui/icons";
import { Heading, Img, Link as ChLink, VStack } from "@chakra-ui/react";
import { Abcalkoholu, Carlsberg, VanPur, Zywiec } from "@components/BeerPage";
import ExternalLink from "@components/shared/ExternalLink";
import beersData from "@shared/beers-data.json";
import { AnyBeer } from "@shared/types";
import {
  isAbcalkoholuBeer,
  isCarlsbergBeer,
  isGrupaZywiecBeer,
  isVanPurBeer,
  limitCarlsbergBeerImgSrcHeight,
} from "@utils/utils";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import NextLink from "next/link";
import React from "react";

const IMAGE_HEIGHT = 250;

interface Props {
  beer: AnyBeer;
}
const BeerPage: NextPage<Props> = ({ beer }) => {
  const imgSrc = isCarlsbergBeer(beer)
    ? limitCarlsbergBeerImgSrcHeight(beer.img, IMAGE_HEIGHT)
    : beer.img;
  return (
    <>
      <Head>
        <title>{beer.name}</title>
        <meta property="og:title" content={beer.name} key="title" />
        <meta property="og:image" content={beer.img} />
        <meta property="og:description" content="Słodycz piwa cie omija" />
      </Head>
      <NextLink href="/">
        <ChLink pos="absolute" top={3} left={3}>
          <ArrowBackIcon fontSize="35px" />
        </ChLink>
      </NextLink>
      <VStack px={2} pb={0}>
        <VStack mx={3} maxW="768px" w="full" minH="100vh">
          <Img src={imgSrc} alt={beer.name} h={IMAGE_HEIGHT} mt={5} />
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
