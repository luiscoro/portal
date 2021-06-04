import React, { useState, useEffect } from "react";
import MetaData from "../section/MetaData";
import Sidebar from "./Sidebar";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useDispatch, useSelector } from "react-redux";
import {
  getPartidoDetails,
  updatePartido,
  clearErrors,
} from "../../actions/partidoActions";
import { UPDATE_PARTIDO_RESET } from "../../constants/partidoConstants";

var MySwal;

const UpdatePartido = ({ match, history }) => {
  const [nombreLocal, setNombreLocal] = useState("");
  const [golesLocal, setGolesLocal] = useState("");
  const [nombreVisitante, setNombreVisitante] = useState("");
  const [golesVisitante, setGolesVisitante] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [estadio, setEstadio] = useState("");
  const [logoLocal, setLogoLocal] = useState("");
  const [logoLocalPreview, setLogoLocalPreview] = useState("");

  const [logoVisitante, setLogoVisitante] = useState("");
  const [logoVisitantePreview, setLogoVisitantePreview] = useState("");
  MySwal = withReactContent(Swal);
  const dispatch = useDispatch();

  const { error, partido } = useSelector((state) => state.partidoDetails);
  const { error: updateError, esActualizado } = useSelector(
    (state) => state.partido
  );

  const partidoId = match.params.id;

  useEffect(() => {
    console.log(partido && partido._id !== partidoId);
    if (partido && partido._id !== partidoId) {
      dispatch(getPartidoDetails(partidoId));
    } else {
      setNombreLocal(partido.nombreLocal);
      setGolesLocal(partido.golesLocal);
      setNombreVisitante(partido.nombreVisitante);
      setGolesVisitante(partido.golesVisitante);
      setFecha(partido.fecha);
      setHora(partido.hora);
      setEstadio(partido.estadio);
      setLogoLocalPreview(partido.logoLocal.url);
      setLogoVisitantePreview(partido.logoVisitante.url);
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
      dispatch({
        type: UPDATE_PARTIDO_RESET,
      });
    }
  }, [
    dispatch,
    error,
    history,
    esActualizado,
    updateError,
    partidoId,
    partido,
  ]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("nombreLocal", nombreLocal);
    formData.set("golesLocal", golesLocal);
    formData.set("nombreVisitante", nombreVisitante);
    formData.set("golesVisitante", golesVisitante);
    formData.set("fecha", fecha);
    formData.set("hora", hora);
    formData.set("estadio", estadio);

    formData.append("logoLocal", logoLocal);
    formData.append("logoVisitante", logoVisitante);

    dispatch(updatePartido(partido._id, formData));
  };

  const onChange = (e) => {
    if (e.target.name === "logoLocal") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setLogoLocalPreview(reader.result);
          setLogoLocal(reader.result);
        }
      };

      if (e.target.files[0] !== undefined) {
        reader.readAsDataURL(e.target.files[0]);
      }
    }

    if (e.target.name === "logoVisitante") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setLogoVisitantePreview(reader.result);
          setLogoVisitante(reader.result);
        }
      };

      if (e.target.files[0] !== undefined) {
        reader.readAsDataURL(e.target.files[0]);
      }
    }
  };

  return (
    <>
      {" "}
      <MetaData title={"Actualizar partido"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="dashboard">
          <div className="col-12 col-md-10">
            <>
              {" "}
              {/* login-section start */}
              <section className="login-section pt-120 pb-120">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="login-block text-center">
                        <div className="login-block-inner">
                          <h3 className="title">Actualizar partido</h3>

                          <form
                            className="login-form"
                            onSubmit={submitHandler}
                            encType="multipart/form-data"
                          >
                            <div className="frm-group">
                              <label>Equipo local</label>
                              <input
                                name="nombreLocal"
                                type="text"
                                placeholder="Ingrese el nombre del equipo local"
                                value={nombreLocal}
                                onChange={(e) => setNombreLocal(e.target.value)}
                              />
                            </div>
                            <div className="frm-group">
                              <label>Logo del equipo local</label>

                              <div className="custom-file">
                                <input
                                  name="logoLocal"
                                  type="file"
                                  className="custom-file-input"
                                  accept="image/*"
                                  onChange={onChange}
                                />
                                <label className="custom-file-label">
                                  Cambiar logo del equipo local
                                </label>
                              </div>

                              <img
                                src={logoLocalPreview}
                                alt=""
                                className="mt-3 mr-2"
                                width="55"
                                height="52"
                              />
                            </div>

                            <div className="frm-group">
                              <label>Goles del equipo local</label>
                              <input
                                name="golesLocal"
                                type="number"
                                min="0"
                                placeholder="Ingresa la cantidad de goles del equipo local"
                                value={golesLocal}
                                onChange={(e) => setGolesLocal(e.target.value)}
                              />
                            </div>

                            <div className="frm-group">
                              <label>Equipo Visitante</label>
                              <input
                                name="nombreVisitante"
                                type="text"
                                placeholder="Ingresa el nombre del equipo visitante"
                                value={nombreVisitante}
                                onChange={(e) =>
                                  setNombreVisitante(e.target.value)
                                }
                              />
                            </div>

                            <div className="frm-group">
                              <label>Logo del equipo visitante</label>

                              <div className="custom-file">
                                <input
                                  name="logoVisitante"
                                  type="file"
                                  className="custom-file-input"
                                  accept="image/*"
                                  onChange={onChange}
                                />
                                <label className="custom-file-label">
                                  Agregar logo del equipo visitante
                                </label>
                              </div>

                              <img
                                src={logoVisitantePreview}
                                alt=""
                                className="mt-3 mr-2"
                                width="55"
                                height="52"
                              />
                            </div>

                            <div className="frm-group">
                              <label>Goles del equipo visitante</label>
                              <input
                                name="golesVisitante"
                                type="number"
                                min="0"
                                placeholder="Ingresa la cantidad de goles del equipo visitante"
                                value={golesVisitante}
                                onChange={(e) =>
                                  setGolesVisitante(e.target.value)
                                }
                              />
                            </div>

                            <div className="frm-group">
                              <label>Fecha</label>
                              <input
                                name="fecha"
                                type="date"
                                placeholder="Ingresa la fecha del partido"
                                value={fecha}
                                onChange={(e) => setFecha(e.target.value)}
                              />
                            </div>

                            <div className="frm-group">
                              <label>Hora</label>
                              <input
                                name="hora"
                                type="time"
                                placeholder="Ingresa la hora del partido"
                                value={hora}
                                onChange={(e) => setHora(e.target.value)}
                              />
                            </div>
                            <div className="frm-group">
                              <label>Estadio</label>
                              <input
                                name="estadio"
                                type="text"
                                placeholder="Ingresa el nombre del estadio"
                                value={estadio}
                                onChange={(e) => setEstadio(e.target.value)}
                              />
                            </div>
                            <div className="frm-group">
                              <input
                                type="submit"
                                value="Actualizar"
                                onClick={() => {
                                  MySwal.fire({
                                    background: "#f5ede4",
                                    title:
                                      "¿Está seguro de actualizar el partido?",
                                    icon: "warning",
                                    showCancelButton: true,
                                    confirmButtonColor: "#3085d6",
                                    cancelButtonColor: "#d33",
                                    confirmButtonText: "Si",
                                    cancelButtonText: "Cancelar",
                                  }).then((result) => {
                                    if (result.isConfirmed) {
                                      localStorage.setItem("actualizado", "1");
                                      window.location = "/admin-partidos";
                                    }
                                  });
                                }}
                              />
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
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdatePartido;
