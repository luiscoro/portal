import React from "react";

const Portada = ({ informacion }) => {
  return (
    <section
      className="banner-section banner-stye-three bg_img base-overlay"
      style={{ backgroundImage: `url(${informacion.imagenPrincipal.url})` }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-5">
            <div className="banner-content">
              <span className="sub-title">{informacion.lemaPrincipal}</span>
              <h2 className="banner-title">{informacion.lemaSecundario}</h2>

              <div className="btn-area">
                <a
                  rel="noopener noreferrer"
                  className="video-btn"
                  href={informacion.videoPrincipal}
                  target="_blank"
                >
                  <i className="fa fa-play" />
                  <span className="text">{informacion.bannerVideo}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portada;
