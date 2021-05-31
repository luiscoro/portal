import React, { useState, useEffect } from "react";

import MetaData from "../section/MetaData";
import Sidebar from "./Sidebar";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useDispatch, useSelector } from "react-redux";
import {
  createInformacion,
  clearErrors,
} from "../../actions/informacionActions";
import { CREATE_INFORMACION_RESET } from "../../constants/informacionConstants";

var MySwal;

const CreateInformacion = ({ history }) => {
  const [informacion, setInformacion] = useState({
    lemaPrincipal: "",
    lemaSecundario: "",
    videoPrincipal: "",
    bannerVideo: "",
    emblemaAcerca: "",
    mision: "",
    vision: "",
  });

  const {
    lemaPrincipal,
    lemaSecundario,
    videoPrincipal,
    bannerVideo,
    emblemaAcerca,
    mision,
    vision,
  } = informacion;

  const [imagenPrincipal, setImagenPrincipal] = useState("");
  const [imagenPrincipalPreview, setImagenPrincipalPreview] = useState("");

  const [imagenAcerca, setImagenAcerca] = useState("");
  const [imagenAcercaPreview, setImagenAcercaPreview] = useState("");

  MySwal = withReactContent(Swal);
  const dispatch = useDispatch();

  const { error, success } = useSelector((state) => state.createInformacion);

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
      history.push("/admin-noticias");
      MySwal.fire({
        background: "#f5ede4",
        icon: "success",
        title: "La información ha sido creada con éxito",
        showConfirmButton: false,
        showCloseButton: false,
        timer: 2000,
      });
      dispatch({ type: CREATE_INFORMACION_RESET });
    }
  }, [dispatch, error, success, history]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("lemaPrincipal", lemaPrincipal);
    formData.set("lemaSecundario", lemaSecundario);
    formData.set("videoPrincipal", videoPrincipal);
    formData.set("bannerVideo", bannerVideo);
    formData.set("emblemaAcerca", emblemaAcerca);
    formData.set("mision", mision);
    formData.set("vision", vision);
    formData.set("imagenPrincipal", imagenPrincipal);
    formData.set("imagenAcerca", imagenAcerca);

    dispatch(createInformacion(formData));
  };

  const onChange = (e) => {
    if (e.target.name === "imagenPrincipal") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagenPrincipalPreview(reader.result);
          setImagenPrincipal(reader.result);
        }
      };

      if (e.target.files[0] !== undefined) {
        reader.readAsDataURL(e.target.files[0]);
      } else {
        setImagenPrincipalPreview("");
        setImagenPrincipal("");
      }
    } else {
      setInformacion({ ...informacion, [e.target.name]: e.target.value });
    }

    if (e.target.name === "imagenAcerca") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagenAcercaPreview(reader.result);
          setImagenAcerca(reader.result);
        }
      };

      if (e.target.files[0] !== undefined) {
        reader.readAsDataURL(e.target.files[0]);
      } else {
        setImagenAcercaPreview("");
        setImagenAcerca("");
      }
    } else {
      setInformacion({ ...informacion, [e.target.name]: e.target.value });
    }
  };

  return (
    <>
      {" "}
      <MetaData title={"Nueva información"} />
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
                          <h3 className="title">Nueva información del club</h3>
                          <form
                            className="login-form"
                            onSubmit={submitHandler}
                            encType="multipart/form-data"
                          >
                            <div className="frm-group">
                              <label>Imagen Principal</label>

                              <div className="custom-file">
                                <input
                                  name="imagenPrincipal"
                                  type="file"
                                  className="custom-file-input"
                                  accept="image/*"
                                  onChange={onChange}
                                  required
                                />
                                <label className="custom-file-label">
                                  Agregar imagen principal
                                </label>
                              </div>

                              <img
                                src={imagenPrincipalPreview}
                                alt=""
                                className="mt-3 mr-2"
                                width="55"
                                height="52"
                              />
                            </div>
                            <div className="frm-group">
                              <label>Lema principal</label>
                              <input
                                name="lemaPrincipal"
                                type="text"
                                placeholder="Ingresa el lema principal que aparecerá en la portada de la página de Inicio"
                                value={lemaPrincipal}
                                onChange={onChange}
                              />
                            </div>

                            <div className="frm-group">
                              <label>Lema secundario</label>
                              <input
                                name="lemaSecundario"
                                type="text"
                                placeholder="Ingresa el lema secundario que aparecerá en la portada de la página de Inicio"
                                value={lemaSecundario}
                                onChange={onChange}
                              />
                            </div>
                            <div className="frm-group">
                              <label>Video principal</label>
                              <input
                                name="videoPrincipal"
                                type="text"
                                placeholder="Ingresa el enlace embebido que aparecerá en la portada de la página de Inicio"
                                value={videoPrincipal}
                                onChange={onChange}
                              />
                            </div>
                            <div className="frm-group">
                              <label>Banner video</label>
                              <input
                                name="bannerVideo"
                                type="text"
                                placeholder="Ingresa el banner o título que representa al video en la portada de la página de Inicio"
                                value={bannerVideo}
                                onChange={onChange}
                              />
                            </div>

                            <div className="frm-group">
                              <label>Emblema acerca del club</label>
                              <input
                                name="emblemaAcerca"
                                type="text"
                                placeholder="Ingresa el emblema o frase que aparecerá en la sección acerca del club"
                                value={emblemaAcerca}
                                onChange={onChange}
                              />
                            </div>

                            <div className="frm-group">
                              <label>Imagen acerca del club</label>

                              <div className="custom-file">
                                <input
                                  name="imagenAcerca"
                                  type="file"
                                  className="custom-file-input"
                                  accept="image/*"
                                  onChange={onChange}
                                  required
                                />
                                <label className="custom-file-label">
                                  Agregar imagen acerca del club
                                </label>
                              </div>

                              <img
                                src={imagenAcercaPreview}
                                alt=""
                                className="mt-3 mr-2"
                                width="55"
                                height="52"
                              />
                            </div>
                            <div className="frm-group">
                              <label>Misión</label>
                              <input
                                name="mision"
                                type="text"
                                placeholder="Ingresa la misión del club"
                                value={mision}
                                onChange={onChange}
                              />
                            </div>
                            <div className="frm-group">
                              <label>Visión</label>
                              <input
                                name="vision"
                                type="text"
                                placeholder="Ingresa la visión del club"
                                value={vision}
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

export default CreateInformacion;
