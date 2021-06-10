import React, { useEffect } from "react";
import Loader from "../section/Loader";

import { useDispatch, useSelector } from "react-redux";

import {
  getAdminClasificaciones,
  clearErrors,
} from "../../actions/clasificacionActions";

const Clasificacion = () => {
  const dispatch = useDispatch();
  let pos = 1;

  const { loading, error, clasificaciones } = useSelector(
    (state) => state.clasificaciones
  );

  useEffect(() => {
    dispatch(getAdminClasificaciones());
    if (error) {
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  return loading ? (
    <Loader />
  ) : (
    <div className="col-lg-4">
      <h4 className="title">Tabla de posiciones</h4>
      <br></br>
      <div className="team-cart-table-area mb-30">
        <table className="team-cart-table bg_img base-overlay" data-background>
          <thead>
            <tr>
              <th>equipo</th>
              <th>puntos</th>
              <th>gd</th>
            </tr>
          </thead>
          <tbody>
            {clasificaciones.map((clasificacion) => (
              <tr key={clasificacion._id}>
                <td>
                  <span>{pos++}</span>
                  {clasificacion.equipo}
                </td>
                <td>{clasificacion.puntos}</td>
                <td>{clasificacion.golDiferencia}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Clasificacion;
