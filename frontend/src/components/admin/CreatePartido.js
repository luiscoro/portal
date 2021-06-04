import React, { useState, useEffect } from "react";

import MetaData from "../section/MetaData";
import Sidebar from "./Sidebar";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useDispatch, useSelector } from "react-redux";
import { createPartido, clearErrors } from "../../actions/partidoActions";
import { CREATE_PARTIDO_RESET } from "../../constants/partidoConstants";

var MySwal;

const CreatePartido = ({ history }) => {
  const [partido, setPartido] = useState({
    nombreLocal: "",
    golesLocal: "",
    nombreVisitante: "",
    golesVisitante: "",
    fecha: "",
    hora: "",
    estadio: "",
  });

  const {
    nombreLocal,
    golesLocal,
    nombreVisitante,
    golesVisitante,
    fecha,
    hora,
    estadio,
  } = partido;

  const [logoLocal, setLogoLocal] = useState("");
  const [logoLocalPreview, setLogoLocalPreview] = useState("");

  const [logoVisitante, setLogoVisitante] = useState("");
  const [logoVisitantePreview, setLogoVisitantePreview] = useState("");

  MySwal = withReactContent(Swal);
  const dispatch = useDispatch();

  const { error, success } = useSelector((state) => state.createPartido);

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
      history.push("/admin-partidos");
      MySwal.fire({
        background: "#f5ede4",
        icon: "success",
        title: "El partido ha sido creado con éxito",
        showConfirmButton: false,
        showCloseButton: false,
        timer: 2000,
      });
      dispatch({ type: CREATE_PARTIDO_RESET });
    }
  }, [dispatch, error, success, history]);

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
    formData.set("logoLocal", logoLocal);
    formData.set("logoVisitante", logoVisitante);

    dispatch(createPartido(formData));
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
      } else {
        setLogoLocalPreview("");
        setLogoLocal("");
      }
    } else {
      setPartido({ ...partido, [e.target.name]: e.target.value });
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
      } else {
        setLogoVisitantePreview("");
        setLogoVisitante("");
      }
    } else {
      setPartido({ ...partido, [e.target.name]: e.target.value });
    }
  };

  return (
    <>
      {" "}
      <MetaData title={"Nuevo partido"} />
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
                          <h3 className="title">Nuevo partido</h3>
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
                                onChange={onChange}
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
                                  required
                                />
                                <label className="custom-file-label">
                                  Agregar logo del equipo local
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
                                onChange={onChange}
                              />
                            </div>

                            <div className="frm-group">
                              <label>Equipo Visitante</label>
                              <input
                                name="nombreVisitante"
                                type="text"
                                placeholder="Ingresa el nombre del equipo visitante"
                                value={nombreVisitante}
                                onChange={onChange}
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
                                  required
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
                                onChange={onChange}
                              />
                            </div>

                            <div className="frm-group">
                              <label>Fecha</label>
                              <input
                                name="fecha"
                                type="date"
                                placeholder="Ingresa la fecha del partido"
                                value={fecha}
                                onChange={onChange}
                              />
                            </div>

                            <div className="frm-group">
                              <label>Hora</label>
                              <input
                                name="hora"
                                type="time"
                                placeholder="Ingresa la hora del partido"
                                value={hora}
                                onChange={onChange}
                              />
                            </div>
                            <div className="frm-group">
                              <label>Estadio</label>
                              <input
                                name="estadio"
                                type="text"
                                placeholder="Ingresa el nombre del estadio"
                                value={estadio}
                                onChange={onChange}
                              />
                            </div>

                            <div className="frm-group">
                              <input type="submit" value="Crear" />
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

export default CreatePartido;
