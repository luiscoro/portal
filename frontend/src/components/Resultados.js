import React from "react";
import { Link } from "react-router-dom";
import MetaData from "./section/MetaData";
import LastResultados from "./partido/LastResultados";
import NextPartidos from "./partido/NextPartidos";

const Resultados = () => {
  return (
    <>
      <MetaData title={"Resultados"} />
      <section className="inner-banner-section bg_img base-overlay">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="inner-banner-content text-center">
                <h2 className="page-title">resultados</h2>
                <ol className="breadcum d-flex justify-content-center">
                  <li>
                    <Link to="/" style={{ textDecoration: "none" }}>
                      Inicio
                    </Link>
                  </li>
                  <li>resultados</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      <LastResultados />
      <NextPartidos />
    </>
  );
};

export default Resultados;
