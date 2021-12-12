import React, { useState, useEffect } from "react";
import MetaData from "../section/MetaData";
import Banner from "../section/Banner";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useDispatch, useSelector } from "react-redux";
import {
  updatePerfil,
  loadUsuario,
  clearErrors,
} from "../../actions/usuarioActions";
import { UPDATE_PERFIL_RESET } from "../../constants/usuarioConstants";

var MySwal;

const UpdatePerfil = ({ history }) => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [cedula, setCedula] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");

  MySwal = withReactContent(Swal);
  const dispatch = useDispatch();

  const { usuario } = useSelector((state) => state.auth);
  const { error, esActualizado, loading } = useSelector(
    (state) => state.usuario
  );

  useEffect(() => {
    if (usuario) {
      setNombre(usuario.nombre);
      setEmail(usuario.email);
      setCedula(usuario.cedula);
      setDireccion(usuario.direccion);
      setTelefono(usuario.telefono);
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
      MySwal.fire({
        background: "#f5ede4",
        icon: "success",
        title: "El perfil ha sido actualizado con éxito",
        timer: 5000,
        showConfirmButton: true,
        confirmButtonColor: "#3085d6",
        showCloseButton: false,
      });
      dispatch(loadUsuario());

      history.push("/perfil");

      dispatch({
        type: UPDATE_PERFIL_RESET,
      });
    }
  }, [dispatch, error, history, usuario, esActualizado]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("nombre", nombre);
    formData.set("email", email);
    formData.set("cedula", cedula);
    formData.set("direccion", direccion);
    formData.set("telefono", telefono);

    dispatch(updatePerfil(formData));
  };

  return (
    <>
      <MetaData title={"Actualizar Perfil"} />
      <Banner title={"Actualizar Perfil"} />
      <section className="login-section pt-120 pb-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="login-block text-center">
                <div className="login-block-inner">
                  <h3 className="title">Actualiza los datos de tu cuenta</h3>
                  <form className="login-form" onSubmit={submitHandler}>
                    <div className="frm-group">

                      <label>Nombre</label>
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

                      {cedula === "" ? (
                        <>
                          <label>Identificación:</label>
                          <input
                            type="text"
                            placeholder="Ingresa la cédula de identidad"
                            value={cedula}
                            onChange={(e) => setCedula(e.target.value)}

                          />
                        </>
                      ) : (
                        <>
                          <label>Identificación:</label>
                          <input
                            type="text"
                            placeholder="Ingresa la cédula de identidad"
                            value={cedula}
                            onChange={(e) => setCedula(e.target.value)}
                            disabled
                          />
                        </>
                      )}
                    </div>

                    <div className="frm-group">
                      <label>Dirección</label>
                      <input
                        type="text"
                        placeholder="Ingresa la dirección"
                        value={direccion}
                        onChange={(e) => setDireccion(e.target.value)}
                      />
                    </div>
                    <div className="frm-group">
                      <label>Teléfono</label>
                      <input
                        type="text"
                        placeholder="Ingresa el número de teléfono"
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value)}
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
    </>
  );
};

export default UpdatePerfil;
