import React, { useEffect } from "react";
import Loader from "../section/Loader";
import { useDispatch, useSelector } from "react-redux";

import {
  getAdminDirigentes,
  clearErrors,
} from "../../actions/dirigenteActions";

const Directiva = () => {
  const dispatch = useDispatch();

  const { loading, error, dirigentes } = useSelector(
    (state) => state.dirigentes
  );

  useEffect(() => {
    dispatch(getAdminDirigentes());
    if (error) {
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  return loading ? (
    <Loader />
  ) : (
    <section className="team-section pt-120 pb-120">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="section-header text-center">
              <h2 className="section-title text-uppercase">
                <b>Nuestra</b> dirigencia
              </h2>
            </div>
          </div>
        </div>
        <div className="row mb-none-30">
          {dirigentes.map((dirigente) => (
            <div className="col-lg-3 col-md-4 col-sm-6" key={dirigente._id}>
              <div className="team-item">
                <div className="team-thumb">
                  <div className="team-thumb-inner">
                    <img src={dirigente.foto && dirigente.foto.url} alt="" />
                  </div>
                </div>
                <div className="team-content">
                  <h4 className="name">{dirigente.nombre}</h4>

                  <span className="designation">{dirigente.cargo}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Directiva;
