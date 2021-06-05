import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import MetaData from "../section/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { registro, clearErrors } from "../../actions/usuarioActions";

var MySwal;

const Registro = ({ history }) => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  MySwal = withReactContent(Swal);
  const dispatch = useDispatch();

  const { authenticatedUsuario, error, loading } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (authenticatedUsuario) {
      history.push("/");
      MySwal.fire({
        background: "#f5ede4",
        toast: true,
        showCloseButton: true,
        icon: "success",
        iconColor: "green",
        title: "Su cuenta ha sido creada con éxito",
        position: "bottom",
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseover", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });
    }

    if (error) {
      if (error !== "Usuario sin token") {
        MySwal.fire({
          background: "#f5ede4",
          toast: true,
          showCloseButton: true,
          icon: "warning",
          iconColor: "orange",
          title: error,
          animation: false,
          position: "bottom",
          showConfirmButton: false,
          timer: 5000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });
      }
      dispatch(clearErrors());
    }
  }, [dispatch, authenticatedUsuario, error, history]);

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
        data-background=""
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
