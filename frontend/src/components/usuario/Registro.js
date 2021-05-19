import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MetaData from "../section/MetaData";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { registro, clearErrors } from "../../actions/usuarioActions";

const Registro = ({ history }) => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const alert = useAlert();
  const dispatch = useDispatch();

  const { authenticatedUsuario, error, loading } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (authenticatedUsuario) {
      history.push("/");
      alert.success("La cuenta ha sido creada con éxito");
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, authenticatedUsuario, error, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(registro(nombre, email, password));
  };

  return (
    <>
      <MetaData title={"Registro"} />
      {/* inner-banner-section start */}
      <section
        className="inner-banner-section bg_img base-overlay"
        data-background="assets/images/bg/home-eight-banner.jpg"
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="inner-banner-content text-center">
                <h2 className="page-title">REGISTRO</h2>
                <ol className="breadcum d-flex justify-content-center">
                  <li>
                    <Link to="/" style={{ textDecoration: "none" }}>
                      Inicio
                    </Link>
                  </li>
                  <li>registro</li>
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
                  <h3 className="title">Crea una cuenta</h3>
                  <form className="login-form" onSubmit={submitHandler}>
                    <div className="frm-group">
                      <input
                        type="text"
                        name="nombre"
                        id="nombre"
                        value={nombre}
                        placeholder="Ingresa tu nombre"
                        onChange={(e) => setNombre(e.target.value)}
                      />
                    </div>
                    <div className="frm-group">
                      <input
                        type="text"
                        name="email"
                        id="email"
                        value={email}
                        placeholder="Ingresa tu correo electrónico"
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
                      <input
                        type="submit"
                        value="Registrarse"
                        disabled={loading ? true : false}
                      />
                    </div>
                  </form>
                  <p>
                    <Link to="/login" style={{ textDecoration: "none" }}>
                      ¿Ya tienes una cuenta?
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
  );
};

export default Registro;
