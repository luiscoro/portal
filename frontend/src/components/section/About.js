import React from "react";

const About = ({ informacion }) => {
  return (
    <section className="about-section pt-120 pb-120">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="section-header text-center">
              <h2 className="section-title text-uppercase">
                <b>quienes</b> somos
              </h2>
            </div>
          </div>
        </div>
        <div className="row justify-content-between">
          <div className="col-lg-5">
            <div className="about-image">
              <img
                src={informacion.imagenAcerca.url}
                alt=""
                data-paroller-factor="0.05"
                data-paroller-type="foreground"
                data-paroller-direction="vertical"
              />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="about-content">
              <blockquote>{informacion.emblemaAcerca}</blockquote>
              <div className="row mb-none-30">
                <div className="col-sm-6">
                  <div className="text-item mt-0 mb-30">
                    <h3 className="title text-uppercase">Nuestra misión</h3>
                    <p>{informacion.mision}</p>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="text-item mt-0 mb-30">
                    <h3 className="title text-uppercase">Nuestra visión</h3>
                    <p>{informacion.vision}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
