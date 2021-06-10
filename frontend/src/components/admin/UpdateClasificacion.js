import React, { useState, useEffect } from "react";
import MetaData from "../section/MetaData";
import Sidebar from "./Sidebar";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useDispatch, useSelector } from "react-redux";
import {
  updateClasificacion,
  getClasificacionDetails,
  clearErrors,
} from "../../actions/clasificacionActions";
import { UPDATE_CLASIFICACION_RESET } from "../../constants/clasificacionConstants";

var MySwal;

const UpdateClasificacion = ({ history, match, location }) => {
  const [equipo, setEquipo] = useState("");
  const [puntos, setPuntos] = useState("");
  const [golDiferencia, setGolDiferencia] = useState("");

  MySwal = withReactContent(Swal);
  const dispatch = useDispatch();

  const { error, clasificacion } = useSelector(
    (state) => state.clasificacionDetails
  );
  const { error: updateError, esActualizado } = useSelector(
    (state) => state.clasificacion
  );

  const clasificacionId = match.params.id;

  useEffect(() => {
    console.log(clasificacion && clasificacion._id !== clasificacionId);
    if (clasificacion && clasificacion._id !== clasificacionId) {
      dispatch(getClasificacionDetails(clasificacionId));
    } else {
      setEquipo(clasificacion.equipo);
      setPuntos(clasificacion.puntos);
      setGolDiferencia(clasificacion.golDiferencia);
    }

    if (error) {
      MySwal.fire({
        background: "#f5ede4",
        toast: true,
        showCloseButton: true,
        icon: "warning",
        iconColor: "orange",
        title: error,
        position: "bottom",
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseover", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });
      dispatch(clearErrors());
    }

    if (updateError) {
      MySwal.fire({
        background: "#f5ede4",
        toast: true,
        showCloseButton: true,
        icon: "error",
        iconColor: "red",
        title: updateError,
        position: "bottom",
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseover", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });
      dispatch(clearErrors());
    }

    if (esActualizado) {
      localStorage.setItem("actualizado", "1");
      history.push("/admin-clasificaciones");

      dispatch({
        type: UPDATE_CLASIFICACION_RESET,
      });
    }
  }, [
    dispatch,
    error,
    location,
    history,
    esActualizado,
    updateError,
    clasificacionId,
    clasificacion,
  ]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("equipo", equipo);
    formData.set("puntos", puntos);
    formData.set("golDiferencia", golDiferencia);

    dispatch(updateClasificacion(clasificacion._id, formData));
  };
  return (
    <>
      {" "}
      <MetaData title={"Actualizar clasificación"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="dashboard">
          <div className="col-12 col-md-10">
            <>
              {" "}
              {/* login-section start */}
              <section className="login-section pt-120 pb-120">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="login-block text-center">
                        <div className="login-block-inner">
                          <h3 className="title">Actualizar clasificación</h3>

                          <form className="login-form" onSubmit={submitHandler}>
                            <div className="frm-group">
                              <label>Equipo</label>
                              <input
                                type="text"
                                placeholder="Ingresa el nombre del equipo"
                                value={equipo}
                                onChange={(e) => setEquipo(e.target.value)}
                              />
                            </div>
                            <div className="frm-group">
                              <label>Puntos</label>
                              <input
                                type="text"
                                placeholder="Ingresa los puntos del equipo"
                                value={puntos}
                                onChange={(e) => setPuntos(e.target.value)}
                              />
                            </div>
                            <div className="frm-group">
                              <label>Gol de diferencia</label>
                              <input
                                type="text"
                                placeholder="Ingresa el gol de diferencia del equipo"
                                value={golDiferencia}
                                onChange={(e) =>
                                  setGolDiferencia(e.target.value)
                                }
                              />
                            </div>
                            <div className="frm-group">
                              <input type="submit" value="Actualizar" />
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              {/* login-section end */}
            </>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateClasificacion;
