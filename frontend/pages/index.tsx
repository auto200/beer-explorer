import Footer from "@components/Home/Footer";
import Header from "@components/Home/Header";
import beersData from "@shared/beers-data.json";
import { OWNERS_DATA } from "@shared/constants";
import { AnyBeer } from "@shared/types";
import { BrandFilterId } from "@utils/types";
import type { NextPage } from "next";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import BeersGrid from "@components/Home/BeersGrid";

const Home: NextPage = () => {
  const [filterBrandId, setFilterBrandId] = useState<BrandFilterId>("ALL");
  const [filterBeerName, setFilterBeerName] = useState("");

  const [filtredBeers, setFiltredBeers] = useState<AnyBeer[]>(
    beersData as AnyBeer[]
  );

  useEffect(() => {
    if (filterBrandId === "ALL") {
      setFiltredBeers(beersData as AnyBeer[]);
      return;
    }

    setFiltredBeers(
      (beersData as AnyBeer[]).filter(
        ({ owner }) => owner.name === OWNERS_DATA[filterBrandId].name
      )
    );
  }, [filterBrandId]);

  useEffect(() => {
    if (!filterBeerName) {
      setFiltredBeers(beersData as AnyBeer[]);
      return;
    }

    setFiltredBeers(
      (beersData as AnyBeer[]).filter(({ name }) =>
        name.toLocaleLowerCase().includes(filterBeerName.toLocaleLowerCase())
      )
    );
  }, [filterBeerName]);

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
      <BeersGrid beers={filtredBeers} />
      <Footer />
    </>
  );
};

export default Home;
