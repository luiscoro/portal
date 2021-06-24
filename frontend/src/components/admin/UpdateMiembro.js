import React, { useState, useEffect } from "react";
import MetaData from "../section/MetaData";
import Sidebar from "./Sidebar";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Loader from "../section/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  getMiembroDetails,
  updateMiembro,
  clearErrors,
} from "../../actions/miembroActions";
import { getAdminPosiciones } from "../../actions/posicionActions";
import { UPDATE_MIEMBRO_RESET } from "../../constants/miembroConstants";

var MySwal;
var ageCalculator = require("age-calculator");
let { AgeFromDateString } = ageCalculator;

const UpdateMiembro = ({ match, history }) => {
  const [posicion, setPosicion] = useState("");
  const [tipo, setTipo] = useState("");
  const [nombre, setNombre] = useState("");
  const [numeroCamiseta, setNumeroCamiseta] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");

  const [nacionalidad, setNacionalidad] = useState("");
  const [foto, setFoto] = useState("");
  const [fotoPreview, setFotoPreview] = useState("");

  MySwal = withReactContent(Swal);
  const dispatch = useDispatch();
  const dispatch1 = useDispatch();

  const { error, miembro } = useSelector((state) => state.miembroDetails);
  const { error: updateError, esActualizado } = useSelector(
    (state) => state.miembro
  );
  const { loading, posiciones } = useSelector((state) => state.posiciones);

  const miembroId = match.params.id;

  useEffect(() => {
    dispatch1(getAdminPosiciones());
    console.log(miembro && miembro._id !== miembroId);
    if (miembro && miembro._id !== miembroId) {
      dispatch(getMiembroDetails(miembroId));
    } else {
      setPosicion(miembro.posicion);
      setTipo(miembro.tipo);
      setNombre(miembro.nombre);
      setNumeroCamiseta(miembro.numeroCamiseta);
      setFechaNacimiento(miembro.fechaNacimiento);
      setNacionalidad(miembro.nacionalidad);
      setFotoPreview(miembro.foto.url);
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

    if (updateError) {
      MySwal.fire({
        background: "#f5ede4",
        toast: true,
        showCloseButton: true,
        icon: "error",
        iconColor: "red",
        title: updateError,
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
      localStorage.setItem("actualizado", "1");
      history.push("/admin-miembros");
      dispatch({
        type: UPDATE_MIEMBRO_RESET,
      });
    }
  }, [
    dispatch,
    error,
    history,
    esActualizado,
    updateError,
    miembroId,
    miembro,
    dispatch1,
  ]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("posicion", posicion);
    formData.set("tipo", tipo);
    formData.set("nombre", nombre);
    formData.set("numeroCamiseta", numeroCamiseta);
    formData.set("fechaNacimiento", fechaNacimiento);
    formData.set("nacionalidad", nacionalidad);
    formData.append("foto", foto);

    dispatch(updateMiembro(miembro._id, formData));
  };

  const onChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setFotoPreview(reader.result);
        setFoto(reader.result);
      }
    };

    if (e.target.files[0] !== undefined) {
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <>
      {" "}
      <MetaData title={"Actualizar miembro"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="dashboard">
          <div className="col-12 col-md-10">
            <>
              <section className="login-section pt-120 pb-120">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="login-block text-center">
                        <div className="login-block-inner">
                          <h3 className="title">Actualizar miembro</h3>

                          <form
                            className="login-form"
                            onSubmit={submitHandler}
                            encType="multipart/form-data"
                          >
                            <div className="frm-group">
                              <label>Tipo</label>
                              <select
                                value={tipo}
                                onChange={(e) => setTipo(e.target.value)}
                              >
                                <option>Seleccione el tipo de miembro</option>
                                <option>Jugador</option>
                                <option>Cuerpo técnico</option>
                                <option>Cuerpo médico</option>
                              </select>
                            </div>
                            <div className="frm-group">
                              <label>Posición</label>
                              {loading ? (
                                <Loader />
                              ) : (
                                <select
                                  value={posicion}
                                  onChange={(e) => setPosicion(e.target.value)}
                                >
                                  <option>
                                    Seleccione la posición del miembro
                                  </option>
                                  {posiciones.map((posicion) => (
                                    <option
                                      key={posicion._id}
                                      value={posicion._id}
                                    >
                                      {posicion.nombre}
                                    </option>
                                  ))}
                                </select>
                              )}
                            </div>
                            <div className="frm-group">
                              <label>Nombre</label>
                              <input
                                type="text"
                                placeholder="Ingresa el nombre"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                              />
                            </div>
                            <div className="frm-group">
                              <label>Número de camiseta</label>
                              <input
                                type="number"
                                placeholder="Ingresa el número de camiseta"
                                value={numeroCamiseta}
                                min="1"
                                onChange={(e) =>
                                  setNumeroCamiseta(e.target.value)
                                }
                              />
                            </div>
                            <div className="frm-group">
                              <label>Edad</label>
                              <input
                                disabled={true}
                                type="text"
                                value={
                                  new AgeFromDateString(
                                    fechaNacimiento.substring(0, 10)
                                  ).age
                                }
                                onChange={(e) =>
                                  setFechaNacimiento(e.target.value)
                                }
                              />
                            </div>
                            <div className="frm-group">
                              <label>Nacionalidad</label>
                              <input
                                type="text"
                                placeholder="Ingresa la nacionalidad"
                                value={nacionalidad}
                                onChange={(e) =>
                                  setNacionalidad(e.target.value)
                                }
                              />
                            </div>
                            <div className="frm-group">
                              <label>Foto</label>

                              <div className="custom-file">
                                <input
                                  type="file"
                                  className="custom-file-input"
                                  accept="image/*"
                                  onChange={onChange}
                                />
                                <label className="custom-file-label">
                                  Cambiar foto
                                </label>
                              </div>

                              <img
                                src={fotoPreview}
                                alt=""
                                className="mt-3 mr-2"
                                width="55"
                                height="52"
                              />
                            </div>

                            <div className="frm-group">
                              <input type="submit" value="Actualizar" />
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateMiembro;
