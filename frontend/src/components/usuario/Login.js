import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Loader from "../section/Loader";
import MetaData from "../section/MetaData";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { login, clearErrors } from "../../actions/usuarioActions";

const Login = ({ history, location }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const alert = useAlert();
  const dispatch = useDispatch();

  const { authenticatedUsuario, error, loading } = useSelector(
    (state) => state.auth
  );

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (authenticatedUsuario) {
      history.push(redirect);
      window.location.reload();
    }

    if (error) {
      alert.success(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error, authenticatedUsuario, redirect, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={"Login"} />
          {/* inner-banner-section start */}
          <section
            className="inner-banner-section bg_img base-overlay"
            data-background="assets/images/bg/home-eight-banner.jpg"
          >
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-8">
                  <div className="inner-banner-content text-center">
                    <h2 className="page-title">iniciar sesión</h2>
                    <ol className="breadcum d-flex justify-content-center">
                      <li>
                        <Link to="/" style={{ textDecoration: "none" }}>
                          Inicio
                        </Link>
                      </li>
                      <li>iniciar sesión</li>
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
                      <h3 className="title">Accede a tu cuenta</h3>
                      <form className="login-form" onSubmit={submitHandler}>
                        <div className="frm-group">
                          <input
                            type="text"
                            name="email"
                            id="email"
                            placeholder="Ingresa tu correo electrónico"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                        <div className="frm-group">
                          <input
                            type="password"
                            name="pass"
                            id="pass"
                            placeholder="Ingresa tu contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                        <div className="frm-group">
                          <input type="submit" value="Iniciar sesión" />
                        </div>
                      </form>
                      <p>
                        <Link to="/registro" style={{ textDecoration: "none" }}>
                          ¿No tienes una cuenta?
                        </Link>
                        <Link
                          to="/password/olvido"
                          style={{ textDecoration: "none" }}
                        >
                          ¿Olvidaste tu contraseña?
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* login-section end */}
        </>
      )}
    </>
  );
};

export default Login;
