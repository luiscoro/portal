import React from "react";
import { Link } from "react-router-dom";

const Banner = ({ title }) => {
  return (
    <section className="inner-banner-section bg_img base-overlay">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="inner-banner-content text-center">
              <h2 className="page-title">{title}</h2>
              <ol className="breadcum d-flex justify-content-center">
                <li>
                  <Link to="/" style={{ textDecoration: "none" }}>
                    Inicio
                  </Link>
                </li>
                <li>{title}</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
