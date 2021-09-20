import Footer from "@components/Home/Footer";
import Header from "@components/Home/Header";
import { SimpleGrid } from "@chakra-ui/react";
import BeerGridItem from "@components/Home/BeerGridItem";
import beersData from "@shared/beers-data.json";
import { OWNERS_DATA } from "@shared/constants";
import { AnyBeer } from "@shared/types";
import { BrandFilterId } from "@utils/types";
import type { NextPage } from "next";
import Head from "next/head";
import React, { useEffect, useState, useMemo } from "react";
import { GridComponents, VirtuosoGrid } from "react-virtuoso";

const Home: NextPage = () => {
  const [filterBrandId, setFilterBrandId] = useState<BrandFilterId>("ALL");
  const [filterBeerName, setFilterBeerName] = useState("");

  const [filtredBeers, setFiltredBeers] = useState<AnyBeer[]>(
    beersData as AnyBeer[]
  );

  useEffect(() => {
    const filtredByBrandBeers =
      filterBrandId === "ALL"
        ? (beersData as AnyBeer[])
        : (beersData as AnyBeer[]).filter(
            ({ owner }) => owner.name === OWNERS_DATA[filterBrandId].name
          );
    const filtredByBrandAndNameBeers = !filterBeerName
      ? filtredByBrandBeers
      : filtredByBrandBeers.filter(({ name }) =>
          name.toLocaleLowerCase().includes(filterBeerName.toLocaleLowerCase())
        );

    setFiltredBeers(filtredByBrandAndNameBeers);
  }, [filterBrandId, filterBeerName]);

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
    <>
      <Head>
        <title>Lista Najpopularniejszych Piw w Polsce</title>
      </Head>
      <Header
        filterBrandId={filterBrandId}
        setFilterBrandId={setFilterBrandId}
        setFilterBeerName={setFilterBeerName}
      />
      <VirtuosoGrid
        useWindowScroll
        totalCount={filtredBeers.length}
        overscan={200}
        components={components as GridComponents}
        itemContent={(index) => (
          <BeerGridItem beer={filtredBeers[index] as AnyBeer} />
        )}
      />
      <Footer />
    </>
  );
};

export default Home;
