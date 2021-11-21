import React, { useState, useEffect } from "react";
import MetaData from "../section/MetaData";
import Sidebar from "./Sidebar";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useDispatch, useSelector } from "react-redux";
import {
  updatePosicion,
  getPosicionDetails,
  clearErrors,
} from "../../actions/posicionActions";
import { UPDATE_POSICION_RESET } from "../../constants/posicionConstants";

var MySwal;

const UpdatePosicion = ({ history, match, location }) => {
  const [nombre, setNombre] = useState("");
  const [estado, setEstado] = useState("");

  MySwal = withReactContent(Swal);
  const dispatch = useDispatch();

  const { error, posicion } = useSelector((state) => state.posicionDetails);
  const { error: updateError, esActualizado } = useSelector(
    (state) => state.posicion
  );

  const posicionId = match.params.id;

  useEffect(() => {
    console.log(posicion && posicion._id !== posicionId);
    if (posicion && posicion._id !== posicionId) {
      dispatch(getPosicionDetails(posicionId));
    } else {
      setNombre(posicion.nombre);
      setEstado(posicion.estado);
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
      history.push("/admin-posiciones");

      dispatch({
        type: UPDATE_POSICION_RESET,
      });
    }
  }, [
    dispatch,
    error,
    location,
    history,
    esActualizado,
    updateError,
    posicionId,
    posicion,
  ]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("nombre", nombre);
    formData.set("estado", estado);

    dispatch(updatePosicion(posicion._id, formData));
  };
  return (
    <>
      {" "}
      <MetaData title={"Actualizar posición"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="dashboard">
          <div className="col-12 col-md-10">
            <>
              <section className="login-section pt-120 pb-120">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="login-block text-center">
                        <div className="login-block-inner">
                          <h3 className="title">Actualizar posición</h3>

                          <form className="login-form" onSubmit={submitHandler}>
                            <div className="frm-group">
                              <label>Nombre</label>
                              <input
                                type="text"
                                placeholder="Ingresa el nombre"
                                value={nombre}
                                disabled
                                onChange={(e) => setNombre(e.target.value)}
                              />
                            </div>
                            <div className="frm-group">
                              <label>Estado:</label>
                              <select
                                value={estado}
                                onChange={(e) => setEstado(e.target.value)}
                              >
                                <option value="activo">activo</option>
                                <option value="inactivo">inactivo</option>
                              </select>
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
            </>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdatePosicion;
