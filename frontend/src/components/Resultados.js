import React from "react";
import MetaData from "./section/MetaData";
import Banner from "./section/Banner";
import LastResultados from "./partido/LastResultados";
import NextPartidos from "./partido/NextPartidos";

const Resultados = () => {
  return (
    <>
      <MetaData title={"Resultados"} />
      <Banner title={"Resultados"} />
      <LastResultados />
      <NextPartidos />
    </>
  );
};

export default Resultados;
