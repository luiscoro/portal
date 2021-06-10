import React, { useEffect } from "react";
import Loader from "../section/Loader";

import { useDispatch, useSelector } from "react-redux";
import Clasificacion from "../clasificacion/Clasificacion";
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
          <Clasificacion />
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
