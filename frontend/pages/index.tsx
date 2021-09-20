import BeersGrid from "@components/Home/BeersGrid";
import Footer from "@components/Home/Footer";
import type { NextPage } from "next";
import Head from "next/head";
import React from "react";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Lista Najpopularniejszych Piw w Polsce</title>
      </Head>
      <BeersGrid />
      <Footer />
    </>
  );
};

export default Home;
