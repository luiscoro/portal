import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Loader from "../section/Loader";
import MetaData from "../section/MetaData";
import Banner from "../section/Banner";
import { useDispatch, useSelector } from "react-redux";
import { login, clearErrors } from "../../actions/usuarioActions";

var MySwal;
var redirigir;

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  MySwal = withReactContent(Swal);
  redirigir = parseInt(localStorage.getItem("redirigir"));
  const dispatch = useDispatch();


  const { authenticatedUsuario, error, loading } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (authenticatedUsuario) {
      if (redirigir === 0) {
        history.push("/");

      } else {
        window.location = "/envio";
      }
    }

    if (error) {
      if (error !== "La sesión ha expirado") {
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
      }
      dispatch(clearErrors());
    }
  }, [dispatch, error, authenticatedUsuario, history]);

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
          <Banner title={"Iniciar sesión"} />
          <section className="login-section pt-120 pb-120">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="login-block text-center">
                    <div className="login-block-inner">
                      <h3 className="title">Accede a tu cuenta</h3>
                      <form
                        className="login-form"
                        onSubmit={submitHandler}
                        autoComplete="off"
                      >
                        <div className="frm-group">
                          <input
                            type="text"
                            name="email"
                            placeholder="Correo electrónico"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                        <div className="frm-group">
                          <input
                            type="password"
                            name="password"
                            placeholder="Contraseña"
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
        </>
      )}
    </>
  );
};

export default Login;
