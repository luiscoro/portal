import React, { useState, useEffect } from "react";
import MetaData from "../section/MetaData";
import Banner from "../section/Banner";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword, clearErrors } from "../../actions/usuarioActions";

var MySwal;

const NewPassword = ({ history, match }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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

  const { error, success } = useSelector((state) => state.forgotPassword);

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

    if (success) {
      MySwal.fire({
        background: "#f5ede4",
        icon: "success",
        title: "La contraseña ha sido cambiada con éxito",
        timer: 5000,
        showConfirmButton: true,
        confirmButtonColor: "#3085d6",
        showCloseButton: false,
      });
      history.push("/login");
    }
  }, [dispatch, error, success, history]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("password", password);
    formData.set("confirmPassword", confirmPassword);

    dispatch(resetPassword(match.params.token, formData));
  };
  return (
    <>
      <MetaData title={"Restablecer contraseña"} />

      <Banner title={"Restablecer contraseña"} />

      <section className="login-section pt-120 pb-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="login-block text-center">
                <div className="login-block-inner">
                  <h3 className="title">Crea una nueva contraseña</h3>
                  <form className="login-form" onSubmit={submitHandler}>
                    <div className="frm-group">
                      <label>Nueva contraseña</label>
                      <input
                        type={passwordShown ? "text" : "password"}
                        name="pass"
                        id="pass"
                        placeholder="Ingresa la contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <i className="fa fa-eye" onClick={togglePasswordVisiblity} style={{
                        position: "absolute", top: "38%",
                        right: "20%", color: "#0047a5", cursor: "pointer"
                      }} />
                    </div>
                    <label>Confirmar nueva contraseña</label>
                    <div className="frm-group">
                      <input
                        type={passwordShown1 ? "text" : "password"}
                        name="pass"
                        id="pass"
                        placeholder="Ingresa la contraseña nuevamente"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                      <i className="fa fa-eye" onClick={togglePasswordVisiblity1} style={{
                        position: "absolute", top: "62%",
                        right: "20%", color: "#0047a5", cursor: "pointer"
                      }} />
                    </div>
                    <div className="frm-group">
                      <input type="submit" value="Actualizar contraseña" />
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

export default NewPassword;
