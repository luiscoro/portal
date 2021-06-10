import React, { useState, useEffect } from "react";

import MetaData from "../section/MetaData";
import Sidebar from "./Sidebar";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useDispatch, useSelector } from "react-redux";
import {
  createClasificacion,
  clearErrors,
} from "../../actions/clasificacionActions";
import { CREATE_CLASIFICACION_RESET } from "../../constants/clasificacionConstants";

var MySwal;

const CreateClasificacion = ({ history }) => {
  const [equipo, setEquipo] = useState("");
  const [puntos, setPuntos] = useState("");
  const [golDiferencia, setGolDiferencia] = useState("");

  MySwal = withReactContent(Swal);
  const dispatch = useDispatch();

  const { error, success } = useSelector((state) => state.createClasificacion);

  useEffect(() => {
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

    if (success) {
      history.push("/admin-clasificaciones");
      MySwal.fire({
        background: "#f5ede4",
        icon: "success",
        title: "La clasificación ha sido creada con éxito",
        showConfirmButton: false,
        showCloseButton: false,
        timer: 2000,
      });
      dispatch({ type: CREATE_CLASIFICACION_RESET });
    }
  }, [dispatch, error, success, history]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(createClasificacion(equipo, puntos, golDiferencia));
  };

  return (
    <>
      {" "}
      <MetaData title={"Nueva clasificación"} />
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
                          <h3 className="title">Nueva clasificación</h3>
                          <form className="login-form" onSubmit={submitHandler}>
                            <div className="frm-group">
                              <label>Equipo</label>
                              <input
                                name="equipo"
                                type="text"
                                placeholder="Ingresa el nombre del equipo"
                                value={equipo}
                                onChange={(e) => setEquipo(e.target.value)}
                              />
                            </div>
                            <div className="frm-group">
                              <label>Puntos</label>
                              <input
                                name="puntos"
                                type="number"
                                placeholder="Ingresa los puntos del equipo"
                                min="0"
                                value={puntos}
                                onChange={(e) => setPuntos(e.target.value)}
                              />
                            </div>
                            <div className="frm-group">
                              <label>Gol de diferencia</label>
                              <input
                                name="golDiferencia"
                                type="number"
                                placeholder="Ingresa el gol de diferencia del equipo"
                                value={golDiferencia}
                                onChange={(e) =>
                                  setGolDiferencia(e.target.value)
                                }
                              />
                            </div>
                            <div className="frm-group">
                              <input type="submit" value="Crear" />
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

export default CreateClasificacion;
