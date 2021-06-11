import React from "react";
import { Link } from "react-router-dom";
import MetaData from "./section/MetaData";
import Directiva from "./club/Directiva";
import Jugadores from "./club/Jugadores";
import CuerpoTecnico from "./club/CuerpoTecnico";

const Club = () => {
  return (
    <>
      <MetaData title={"Club"} />
      <section className="inner-banner-section bg_img base-overlay">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="inner-banner-content text-center">
                <h2 className="page-title">Nuestro club</h2>
                <ol className="breadcum d-flex justify-content-center">
                  <li>
                    <Link to="/" style={{ textDecoration: "none" }}>
                      Inicio
                    </Link>
                  </li>
                  <li>Nuestro club</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>
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
