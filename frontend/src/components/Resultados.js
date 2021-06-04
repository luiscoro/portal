import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import MetaData from "./section/MetaData";
import Loader from "./section/Loader";

const Resultados = () => {
  return (
    <>
      <MetaData title={"Resultados"} />
      {/* inner-banner-section start */}
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
      {/* inner-banner-section end */}
    </>
  );
};

export default Resultados;
