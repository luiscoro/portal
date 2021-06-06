import React from "react";
import MetaData from "./section/MetaData";
import Banner from "./section/Banner";
import About from "./section/About";
import LastResultado from "./section/LastResultado";
import TopProductos from "./producto/TopProductos";
import TopNoticias from "./noticia/TopNoticias";
import Auspiciantes from "./auspiciante/Auspiciantes";

const Inicio = () => {
  return (
    <>
      <MetaData title={"Inicio"} />

      <Banner />

      <LastResultado />

      <About />
      <TopProductos />
      <TopNoticias />
      <Auspiciantes />
    </>
  );
};

export default Inicio;
