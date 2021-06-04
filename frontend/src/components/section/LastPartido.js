import React, { useEffect } from "react";
import Loader from "../section/Loader";

import { useDispatch, useSelector } from "react-redux";

import { getPartidoTop, clearErrors } from "../../actions/partidoActions";

const LastPartido = () => {
  const dispatch = useDispatch();

  const { loading, error, partidos } = useSelector((state) => state.partidos);

  useEffect(() => {
    dispatch(getPartidoTop());
    if (error) {
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  return loading ? (
    <Loader />
  ) : (
    <div className="latest-match-result-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            {partidos.map((partido) => (
              <div className="latest-match-result-area" key={partido._id}>
                <div className="club-area d-flex flex-wrap align-items-center">
                  <div className="club-one d-flex flex-wrap justify-content-between align-items-center">
                    <div className="brand-area text-center">
                      <img src={partido.logoLocal.url} alt="" />
                      <h4 className="club-name text-uppercase">
                        {partido.nombreLocal}
                      </h4>
                    </div>
                    <div className="result">
                      <span>{partido.golesLocal}</span>
                    </div>
                  </div>
                  <span className="verses">vs</span>
                  <div className="club-two d-flex flex-wrap justify-content-between align-items-center">
                    <div className="brand-area text-center">
                      <img src={partido.logoVisitante.url} alt="" />
                      <h4 className="club-name text-uppercase">
                        {partido.nombreVisitante}
                      </h4>
                    </div>
                    <div className="result">
                      <span>{partido.golesVisitante}</span>
                    </div>
                  </div>
                </div>
                <div className="description text-center">
                  <span className="text-capitalize">Último resultado</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LastPartido;
