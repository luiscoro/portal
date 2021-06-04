import React, { useEffect } from "react";
import Loader from "../section/Loader";
import { useDispatch, useSelector } from "react-redux";

import {
  getAdminInformacion,
  clearErrors,
} from "../../actions/informacionActions";

const About = () => {
  const dispatch = useDispatch();

  const { loading, error, informacion } = useSelector(
    (state) => state.informacion
  );

  useEffect(() => {
    dispatch(getAdminInformacion());
    if (error) {
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  return loading ? (
    <Loader />
  ) : (
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
        {informacion.map((info) => (
          <div className="row justify-content-between" key={info._id}>
            <div className="col-lg-5">
              <div className="product-item">
                <img src={info.imagenAcerca.url} alt="" />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="about-content">
                <blockquote>{info.emblemaAcerca}</blockquote>
                <div className="row mb-none-30">
                  <div className="col-sm-6">
                    <div className="text-item mt-0 mb-30">
                      <h3 className="title text-uppercase">Nuestra misión</h3>
                      <p>{info.mision}</p>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="text-item mt-0 mb-30">
                      <h3 className="title text-uppercase">Nuestra visión</h3>
                      <p>{info.vision}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default About;
