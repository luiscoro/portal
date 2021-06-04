import React from "react";
import MetaData from "./section/MetaData";
import Banner from "./section/Banner";
import About from "./section/About";
import LastPartido from "./section/LastPartido";
import ProductosTop from "./producto/ProductosTop";
import NoticiasTop from "./noticia/NoticiasTop";
import Auspiciantes from "./auspiciante/Auspiciantes";

const Home = () => {
  return (
    <>
      <MetaData title={"Inicio"} />

      <Banner />

      <LastPartido />

      <About />
      <ProductosTop />
      <NoticiasTop />
      <Auspiciantes />
    </>
  );
};

export default Home;
