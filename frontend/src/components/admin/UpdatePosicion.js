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
              {" "}
              {/* login-section start */}
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
                                onChange={(e) => setNombre(e.target.value)}
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

export default UpdatePosicion;
