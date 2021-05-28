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

const UpdateUsuario = ({ history, match, location }) => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [rol, setRol] = useState("");

  const MySwal = withReactContent(Swal);
  const dispatch = useDispatch();

  const { error, esActualizado } = useSelector((state) => state.usuario);
  const { usuario } = useSelector((state) => state.usuarioDetails);

  const usuarioId = match.params.id;

  useEffect(() => {
    console.log(usuario && usuario._id !== usuarioId);
    if (usuario && usuario._id !== usuarioId) {
      dispatch(getUsuarioDetails(usuarioId));
    } else {
      setNombre(usuario.nombre);
      setEmail(usuario.email);
      setRol(usuario.rol);
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

    if (esActualizado) {
      localStorage.setItem("actualizado", "1");
      history.push("/admin-usuarios");

      dispatch({
        type: UPDATE_USUARIO_RESET,
      });
    }
  }, [dispatch, error, location, history, esActualizado, usuarioId, usuario]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("nombre", nombre);
    formData.set("email", email);
    formData.set("rol", rol);

    MySwal.fire({
      background: "#f5ede4",
      title: "¿Está seguro de actualizar los datos del usuario?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        MySwal.fire({
          background: "#f5ede4",
          title: "Los datos del usuario han sido actualizados con éxito",
          showConfirmButton: false,
          showCloseButton: false,
        });
        dispatch(updateUsuario(usuario._id, formData));
      }
    });
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
              {" "}
              {/* login-section start */}
              <section className="login-section pt-120 pb-120">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="login-block text-center">
                        <div className="login-block-inner">
                          <h3 className="title">Actualizar usuario</h3>

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
                              <label>Email</label>
                              <input
                                type="text"
                                placeholder="Ingresa el correo electrónico"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                              />
                            </div>

                            <div className="frm-group">
                              <label>Rol</label>
                              <select
                                value={rol}
                                onChange={(e) => setRol(e.target.value)}
                              >
                                <option value="registrado">registrado</option>
                                <option value="admin">admin</option>
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
              {/* login-section end */}
            </>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateUsuario;
