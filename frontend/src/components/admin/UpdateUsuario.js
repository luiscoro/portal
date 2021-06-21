import React, { useState, useEffect } from "react";
import MetaData from "../section/MetaData";
import Sidebar from "./Sidebar";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useDispatch, useSelector } from "react-redux";
import {
  updateUsuario,
  getUsuarioDetails,
  clearErrors,
} from "../../actions/usuarioActions";
import { UPDATE_USUARIO_RESET } from "../../constants/usuarioConstants";

var MySwal;

const UpdateUsuario = ({ history, match, location }) => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [rol, setRol] = useState("");
  const [estado, setEstado] = useState("");

  MySwal = withReactContent(Swal);
  const dispatch = useDispatch();

  const { error, usuario } = useSelector((state) => state.usuarioDetails);
  const { error: updateError, esActualizado } = useSelector(
    (state) => state.usuario
  );

  const usuarioId = match.params.id;

  useEffect(() => {
    console.log(usuario && usuario._id !== usuarioId);
    if (usuario && usuario._id !== usuarioId) {
      dispatch(getUsuarioDetails(usuarioId));
    } else {
      setNombre(usuario.nombre);
      setEmail(usuario.email);
      setRol(usuario.rol);
      setEstado(usuario.estado);
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
      history.push("/admin-usuarios");

      dispatch({
        type: UPDATE_USUARIO_RESET,
      });
    }
  }, [
    dispatch,
    error,
    location,
    history,
    esActualizado,
    updateError,
    usuarioId,
    usuario,
  ]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("nombre", nombre);
    formData.set("email", email);
    formData.set("rol", rol);
    formData.set("estado", estado);
    dispatch(updateUsuario(usuario._id, formData));
  };
  return (
    <>
      {" "}
      <MetaData title={"Actualizar usuario"} />
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
                          <h3 className="title">Actualizar usuario</h3>

                          <form className="login-form" onSubmit={submitHandler}>
                            <div className="frm-group">
                              <label>Nombre:</label>
                              <input
                                type="text"
                                placeholder="Nombre"
                                value={nombre}
                                disabled="true"
                                onChange={(e) => setNombre(e.target.value)}
                              />
                            </div>
                            <div className="frm-group">
                              <label>Correo electrónico:</label>
                              <input
                                type="text"
                                placeholder="Correo electrónico"
                                value={email}
                                disabled="true"
                                onChange={(e) => setEmail(e.target.value)}
                              />
                            </div>

                            <div className="frm-group">
                              <label>Rol:</label>
                              <select
                                value={rol}
                                onChange={(e) => setRol(e.target.value)}
                              >
                                <option value="aficionado">aficionado</option>
                                <option value="administrador">
                                  administrador
                                </option>
                              </select>
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

export default UpdateUsuario;
