import React from "react";
import MetaData from "./section/MetaData";
import Banner from "./section/Banner";
import Directiva from "./club/Directiva";
import Jugadores from "./club/Jugadores";
import CuerpoTecnico from "./club/CuerpoTecnico";

const Club = () => {
  return (
    <>
      <MetaData title={"Nuestro club"} />
      <Banner title={"Nuestro club"} />
      <Directiva />
      <div className="section-header text-center">
        <h2 className="section-title text-uppercase">
          <b>Nuestra</b> plantilla
        </h2>
      </div>
      <Jugadores />
      <CuerpoTecnico />
    </>
  );
};

export default Club;
