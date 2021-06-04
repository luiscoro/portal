import React, { useEffect } from "react";
import Loader from "../section/Loader";
import { useDispatch, useSelector } from "react-redux";

import {
  getAdminInformacion,
  clearErrors,
} from "../../actions/informacionActions";

const Portada = () => {
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
    <>
      {informacion.map((info) => (
        <section
          className="banner-section banner-stye-three bg_img base-overlay"
          key={info._id}
          style={{
            backgroundImage: `url(${info.imagenPrincipal.url})`,
          }}
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-5">
                <div className="banner-content">
                  <span className="sub-title">{info.lemaPrincipal}</span>
                  <h2 className="banner-title">{info.lemaSecundario}</h2>

                  <div className="btn-area">
                    <a
                      rel="noopener noreferrer"
                      className="video-btn"
                      href={info.videoPrincipal}
                      target="_blank"
                    >
                      <i className="fa fa-play" />
                      <span className="text">{info.bannerVideo}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}
    </>
  );
};

export default Portada;
