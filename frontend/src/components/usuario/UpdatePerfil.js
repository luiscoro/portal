import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import MetaData from "../section/MetaData";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";

import {
  updatePerfil,
  loadUsuario,
  clearErrors,
} from "../../actions/usuarioActions";
import { UPDATE_PERFIL_RESET } from "../../constants/usuarioConstants";

const UpdatePerfil = ({ history }) => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");

  const alert = useAlert();
  const dispatch = useDispatch();

  const { usuario } = useSelector((state) => state.auth);
  const { error, esActualizado, loading } = useSelector(
    (state) => state.usuario
  );

  useEffect(() => {
    if (usuario) {
      setNombre(usuario.nombre);
      setEmail(usuario.email);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (esActualizado) {
      alert.success("Los datos han sido actualizados con éxito");
      dispatch(loadUsuario());

      history.push("/perfil");

      dispatch({
        type: UPDATE_PERFIL_RESET,
      });
    }
  }, [dispatch, alert, error, history, usuario, esActualizado]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("nombre", nombre);
    formData.set("email", email);

    dispatch(updatePerfil(formData));
  };

  return (
    <>
      <MetaData title={"Actualizar Perfil"} />
      {/* inner-banner-section start */}
      <section
        className="inner-banner-section bg_img base-overlay"
        data-background="assets/images/bg/home-eight-banner.jpg"
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="inner-banner-content text-center">
                <h2 className="page-title">Actualizar perfil</h2>
                <ol className="breadcum d-flex justify-content-center">
                  <li>
                    <Link to="/" style={{ textDecoration: "none" }}>
                      Inicio
                    </Link>
                  </li>
                  <li>actualizar perfil</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* inner-banner-section end */}
      {/* login-section start */}
      <section className="login-section pt-120 pb-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="login-block text-center">
                <div className="login-block-inner">
                  <h3 className="title">Actualiza los datos de tu cuenta</h3>
                  <form className="login-form" onSubmit={submitHandler}>
                    <div className="frm-group">
                      <input
                        type="text"
                        name="nombre"
                        id="nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                      />
                    </div>
                    <div className="frm-group">
                      <input
                        type="text"
                        name="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="frm-group">
                      <input
                        type="submit"
                        value="Actualizar"
                        disabled={loading ? true : false}
                      />
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
  );
};

export default UpdatePerfil;
