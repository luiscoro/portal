import React, { useState, useEffect } from "react";
import MetaData from "../section/MetaData";
import Banner from "../section/Banner";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword, clearErrors } from "../../actions/usuarioActions";
import { UPDATE_PASSWORD_RESET } from "../../constants/usuarioConstants";

var MySwal;

const UpdatePassword = ({ history }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const [passwordShown1, setPasswordShown1] = useState(false);
  const togglePasswordVisiblity1 = () => {
    setPasswordShown1(passwordShown1 ? false : true);
  };

  MySwal = withReactContent(Swal);
  const dispatch = useDispatch();

  const { error, esActualizado, loading } = useSelector(
    (state) => state.usuario
  );

  useEffect(() => {
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
      MySwal.fire({
        background: "#f5ede4",
        icon: "success",
        title: "La contraseña ha sido actualizada con éxito",
        timer: 5000,
        showConfirmButton: true,
        confirmButtonColor: "#3085d6",
        showCloseButton: false,
      });
      history.push("/perfil");

      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, error, history, esActualizado]);

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
      <Banner title={"Cambiar contraseña"} />
      <section className="login-section pt-120 pb-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="login-block text-center">
                <div className="login-block-inner">
                  <h3 className="title">Actualiza tu contraseña</h3>
                  <form className="login-form" onSubmit={submitHandler}>
                    <div className="frm-group">
                      <label>Contraseña actual</label>
                      <input
                        type={passwordShown ? "text" : "password"}
                        name="password"
                        value={oldPassword}
                        placeholder="Ingresa la contraseña actual"
                        onChange={(e) => setOldPassword(e.target.value)}
                      />
                      <i className="fa fa-eye" onClick={togglePasswordVisiblity} style={{
                        position: "absolute", top: "38%",
                        right: "20%", color: "#0047a5", cursor: "pointer"
                      }} />
                    </div>
                    <div className="frm-group">
                      <label>Contraseña nueva</label>
                      <input
                        type={passwordShown1 ? "text" : "password"}
                        name="password"
                        value={password}
                        placeholder="Ingresa la contraseña nueva"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <i className="fa fa-eye" onClick={togglePasswordVisiblity1} style={{
                        position: "absolute", top: "62%",
                        right: "20%", color: "#0047a5", cursor: "pointer"
                      }} />
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
    </>
  );
};

export default UpdatePassword;
