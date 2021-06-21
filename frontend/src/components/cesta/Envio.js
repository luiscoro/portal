import React, { useState, useEffect } from "react";

import MetaData from "../section/MetaData";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Verificacion from "./Verificacion";
import { useDispatch, useSelector } from "react-redux";

import {
  updateInfoEnvio,
  loadUsuario,
  clearErrors,
} from "../../actions/usuarioActions";
import { UPDATE_INFO_ENVIO_RESET } from "../../constants/usuarioConstants";

var MySwal;

const Envio = ({ history }) => {
  const [cedula, setCedula] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [codigoPostal, setCodigoPostal] = useState("");

  MySwal = withReactContent(Swal);
  const dispatch = useDispatch();

  const { usuario } = useSelector((state) => state.auth);
  const { error, esActualizado, loading } = useSelector(
    (state) => state.usuario
  );
  useEffect(() => {
    if (usuario) {
      setCedula(usuario.cedula);
      setDireccion(usuario.direccion);
      setTelefono(usuario.telefono);
      setCiudad(usuario.ciudad);
      setCodigoPostal(usuario.codigoPostal);
    }

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
      dispatch(loadUsuario());

      history.push("/confirmar");

      dispatch({
        type: UPDATE_INFO_ENVIO_RESET,
      });
    }
  }, [dispatch, error, history, usuario, esActualizado]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("cedula", cedula);
    formData.set("direccion", direccion);
    formData.set("telefono", telefono);
    formData.set("ciudad", ciudad);
    formData.set("codigoPostal", codigoPostal);

    dispatch(updateInfoEnvio(formData));
  };
  return (
    <>
      {" "}
      <MetaData title={"Información envio"} />
      <Verificacion envio />
      <section className="login-section pt-120 pb-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="login-block text-center">
                <div className="login-block-inner">
                  <h3 className="title">
                    Información para el envío del pedido
                  </h3>
                  <form className="login-form" onSubmit={submitHandler}>
                    <div className="form-group">
                      <label>Cédula de identidad</label>
                      <input
                        type="text"
                        placeholder="Ingresa la cédula de identidad"
                        value={cedula}
                        onChange={(e) => setCedula(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Dirección</label>
                      <input
                        type="text"
                        placeholder="Ingresa la dirección de entrega"
                        value={direccion}
                        onChange={(e) => setDireccion(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Dirección</label>
                      <input
                        type="text"
                        placeholder="Ingresa la dirección de entrega"
                        value={direccion}
                        onChange={(e) => setDireccion(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Teléfono</label>
                      <input
                        type="text"
                        placeholder="Ingresa el número telefónico"
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Ciudad</label>
                      <input
                        type="text"
                        placeholder="Ingresa la ciudad"
                        value={ciudad}
                        onChange={(e) => setCiudad(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Código Postal</label>
                      <input
                        type="text"
                        placeholder="Ingresa el código postal de tu localidad"
                        value={ciudad}
                        onChange={(e) => setCiudad(e.target.value)}
                      />
                    </div>
                    <div className="frm-group">
                      <input
                        type="submit"
                        value="Continuar"
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

export default Envio;
