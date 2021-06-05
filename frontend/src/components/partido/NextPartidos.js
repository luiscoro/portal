import React, { useEffect } from "react";
import Loader from "../section/Loader";

import { useDispatch, useSelector } from "react-redux";

import { getPartidosNext, clearErrors } from "../../actions/partidoActions";

const NextPartidos = () => {
  const dispatch = useDispatch();

  const { loading, error, partidos } = useSelector((state) => state.partidos);

  useEffect(() => {
    dispatch(getPartidosNext());
    if (error) {
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  return loading ? (
    <Loader />
  ) : (
    <div className="team-chart-section pt-120 pb-120">
      <div className="container">
        <div className="row mb-none-30">
          <div className="col-lg-4">
            <h4 className="title">Tabla de posiciones</h4>
            <br></br>
            <div className="team-cart-table-area mb-30">
              <table
                className="team-cart-table bg_img base-overlay"
                data-background
              >
                <thead>
                  <tr>
                    <th>equipo</th>
                    <th>puntos</th>
                    <th>gd</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <span>01</span>Liver Pool
                    </td>
                    <td>03</td>
                    <td>01</td>
                  </tr>
                  <tr>
                    <td>
                      <span>01</span>Dhaka Pro
                    </td>
                    <td>02</td>
                    <td>00</td>
                  </tr>
                  <tr>
                    <td>
                      <span>01</span>Finica LC
                    </td>
                    <td>03</td>
                    <td>01</td>
                  </tr>
                  <tr>
                    <td>
                      <span>01</span>Ace Milan
                    </td>
                    <td>03</td>
                    <td>01</td>
                  </tr>
                  <tr>
                    <td>
                      <span>01</span>Wokapiya
                    </td>
                    <td>03</td>
                    <td>01</td>
                  </tr>
                  <tr>
                    <td>
                      <span>01</span>Anchya
                    </td>
                    <td>01</td>
                    <td>01</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-lg-8">
            <h4 className="title">Próximos partidos</h4>
            <br></br>
            <div className="team-cart-table-area mb-30">
              <table
                className="team-cart-table bg_img base-overlay text-left"
                data-background
              >
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Partido</th>
                    <th>Hora</th>
                    <th>Estadio</th>
                  </tr>
                </thead>

                <tbody>
                  {partidos.map((partido) => (
                    <tr key={partido._id}>
                      <td>{partido.fecha}</td>
                      <td>
                        {partido.nombreLocal} vs {partido.nombreVisitante}
                      </td>
                      <td>{partido.hora}</td>
                      <td>{partido.estadio}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NextPartidos;
