import { ArrowBackIcon } from "@chakra-ui/icons";
import { Heading, Img, Text, VStack } from "@chakra-ui/react";
import beersData from "@shared/beers-data.json";
import { AnyBeer } from "@shared/types";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Link from "next/link";

interface Props {
  beer: AnyBeer;
}

const BeerPage: NextPage<Props> = ({ beer }) => {
  return (
    <>
      <Link href="/">
        <a>
          <ArrowBackIcon fontSize="35px" ml={3} mt={3} />
        </a>
      </Link>
      <VStack>
        <Img src={beer.img} alt={beer.name} h="250px" />
        <Heading>{beer.name}</Heading>
        <Text>Producent - {beer.owner.name}</Text>
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
