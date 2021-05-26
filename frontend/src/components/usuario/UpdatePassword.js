import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import MetaData from "../section/MetaData";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword, clearErrors } from "../../actions/usuarioActions";
import { UPDATE_PASSWORD_RESET } from "../../constants/usuarioConstants";

const UpdatePassword = ({ history }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");

  const alert = useAlert();
  const dispatch = useDispatch();

  const { error, esActualizado, loading } = useSelector(
    (state) => state.usuario
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (esActualizado) {
      alert.success("La contraseña ha sido actualizada con éxito");

      history.push("/perfil");

      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, alert, error, history, esActualizado]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("oldPassword", oldPassword);
    formData.set("password", password);

    dispatch(updatePassword(formData));
  };
  return (
    <>
      <MetaData title={"Actualizar contraseña"} />

      {/* inner-banner-section start */}
      <section
        className="inner-banner-section bg_img base-overlay"
        data-background="assets/images/bg/home-eight-banner.jpg"
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="inner-banner-content text-center">
                <h2 className="page-title">Actualizar contraseña</h2>
                <ol className="breadcum d-flex justify-content-center">
                  <li>
                    <Link to="/" style={{ textDecoration: "none" }}>
                      Inicio
                    </Link>
                  </li>
                  <li>actualizar contraseña</li>
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
                  <h3 className="title">Cambia tu contraseña</h3>
                  <form className="login-form" onSubmit={submitHandler}>
                    <div className="frm-group">
                      <input
                        type="password"
                        name="pass"
                        id="pass"
                        value={oldPassword}
                        placeholder="Ingresa tu contraseña actual"
                        onChange={(e) => setOldPassword(e.target.value)}
                      />
                    </div>
                    <div className="frm-group">
                      <input
                        type="password"
                        name="pass"
                        id="pass"
                        value={password}
                        placeholder="Ingresa tu nueva contraseña"
                        onChange={(e) => setPassword(e.target.value)}
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

export default UpdatePassword;
