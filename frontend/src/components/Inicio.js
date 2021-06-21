import React from "react";
import MetaData from "./section/MetaData";
import Portada from "./section/Portada";
import About from "./section/About";
import LastResultado from "./section/LastResultado";
import TopProductos from "./producto/TopProductos";
import TopNoticias from "./noticia/TopNoticias";
import Auspiciantes from "./auspiciante/Auspiciantes";

const Inicio = () => {
  return (
    <>
      <MetaData title={"Inicio"} />
      <Portada />
      <LastResultado />
      <About />
      <TopProductos />
      <TopNoticias />
      <Auspiciantes />
    </>
  );
};

export default Inicio;
