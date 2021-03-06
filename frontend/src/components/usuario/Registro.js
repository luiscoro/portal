import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import MetaData from "../section/MetaData";
import Banner from "../section/Banner";
import { useDispatch, useSelector } from "react-redux";
import { registro, clearErrors } from "../../actions/usuarioActions";

var MySwal;

const Registro = ({ history }) => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  MySwal = withReactContent(Swal);
  const dispatch = useDispatch();

  const { authenticatedUsuario, error, loading } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (authenticatedUsuario) {
      MySwal.fire({
        background: "#f5ede4",
        icon: "success",
        title: "La cuenta ha sido creada con éxito",
        timer: 5000,
        showConfirmButton: true,
        confirmButtonColor: "#3085d6",
        showCloseButton: false,
      });
      history.push("/perfil");
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
      <Banner title={"Registro"} />
      <section className="login-section pt-120 pb-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="login-block text-center">
                <div className="login-block-inner">
                  <h3 className="title">Crea una cuenta</h3>
                  <form
                    className="login-form"
                    onSubmit={submitHandler}
                    autocomplete="off"
                  >
                    <div className="frm-group">
                      < label>Nombre</label>
                      <input
                        type="text"
                        name="nombre"
                        value={nombre}
                        placeholder="Ingresa el nombre"
                        onChange={(e) => setNombre(e.target.value)}
                      />
                    </div>
                    <div className="frm-group">
                      <label>Correo electrónico</label>
                      <input
                        type="text"
                        name="email"
                        value={email}
                        placeholder="Ingresa el correo electrónico"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="frm-group">
                      <label>Contraseña</label>
                      <input
                        type={passwordShown ? "text" : "password"}
                        name="password"
                        placeholder="Ingresa la contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <i className="fa fa-eye" onClick={togglePasswordVisiblity} style={{
                        position: "absolute", top: "65%",
                        right: "20%", color: "#0047a5", cursor: "pointer"
                      }} />
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
    </>
  );
};

export default Registro;
