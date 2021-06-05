import React, { useEffect } from "react";
import Loader from "../section/Loader";

import { useDispatch, useSelector } from "react-redux";

import { getPartidosLast, clearErrors } from "../../actions/partidoActions";

const LastResultados = () => {
  const dispatch = useDispatch();

  const { loading, error, resultados } = useSelector(
    (state) => state.resultados
  );

  useEffect(() => {
    dispatch(getPartidosLast());
    if (error) {
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  return loading ? (
    <Loader />
  ) : (
    <section className="match-report-section pt-120 pb-120">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="all-match-table  mb-50">
              <div className="all-match-table-header">
                <h4 className="title">Últimos resultados</h4>
              </div>
              <div className="all-match-table-body">
                <ul className="all-match-list">
                  {resultados.map((partido) => (
                    <li className="single-match" key={partido._id}>
                      <div className="single-team">
                        <div className="team-details">
                          <img src={partido.logoLocal.url} alt="" />
                          <h4 className="team-name">{partido.nombreLocal}</h4>
                        </div>
                        <div className="team-point greater-point">
                          <span>{partido.golesLocal}</span>
                        </div>
                      </div>
                      <span className="vs-text">-</span>
                      <div className="single-team">
                        <div className="team-details">
                          <img src={partido.logoVisitante.url} alt="" />
                          <h4 className="team-name">
                            {partido.nombreVisitante}
                          </h4>
                        </div>
                        <div className="team-point lower-point">
                          <span>{partido.golesVisitante}</span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LastResultados;
