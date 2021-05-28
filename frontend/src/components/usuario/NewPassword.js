import React, { useState, useEffect } from "react";
import MetaData from "../section/MetaData";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword, clearErrors } from "../../actions/usuarioActions";

const NewPassword = ({ history, match }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const MySwal = withReactContent(Swal);
  const dispatch = useDispatch();

  const { error, success } = useSelector((state) => state.forgotPassword);

  useEffect(() => {
    if (error) {
      //alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      // alert.success("La contraseña ha sido actualizada con éxito.");
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
      <MetaData title={"Nueva contraseña"} />

      {/* inner-banner-section start */}
      <section
        className="inner-banner-section bg_img base-overlay"
        data-background="assets/images/bg/home-eight-banner.jpg"
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="inner-banner-content text-center">
                <h2 className="page-title">Restablecer contraseña</h2>
                <ol className="breadcum d-flex justify-content-center">
                  <li>
                    <a href="home-one.html">inicio</a>
                  </li>
                  <li>Restablecer contraseña</li>
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
                  <h3 className="title">Crea una nueva contraseña</h3>
                  <form className="login-form" onSubmit={submitHandler}>
                    <div className="frm-group">
                      <input
                        type="password"
                        name="pass"
                        id="pass"
                        placeholder="Ingresa la contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="frm-group">
                      <input
                        type="password"
                        name="pass"
                        id="pass"
                        placeholder="Confirma tu contraseña"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
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
      {/* login-section end */}
    </>
  );
};

export default NewPassword;
