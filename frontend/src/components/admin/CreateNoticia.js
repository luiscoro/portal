import React, { useState, useEffect } from "react";

import MetaData from "../section/MetaData";
import Sidebar from "./Sidebar";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useDispatch, useSelector } from "react-redux";
import { createNoticia, clearErrors } from "../../actions/noticiaActions";
import { CREATE_NOTICIA_RESET } from "../../constants/noticiaConstants";

var MySwal;

const CreateNoticia = ({ history }) => {
  const [noticia, setNoticia] = useState({
    titulo: "",
    descripcion: "",
  });

  const { titulo, descripcion } = noticia;

  const [imagen, setImagen] = useState("");
  const [imagenPreview, setImagenPreview] = useState("");

  MySwal = withReactContent(Swal);
  const dispatch = useDispatch();

  const { error, success } = useSelector((state) => state.createNoticia);

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
        title: "La noticia ha sido creada con éxito",
        timer: 3000,
        showConfirmButton: true,
        confirmButtonColor: "#3085d6",
        showCloseButton: false,
      });
      dispatch({ type: CREATE_NOTICIA_RESET });
    }
  }, [dispatch, error, success, history]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("titulo", titulo);
    formData.set("descripcion", descripcion);
    formData.set("imagen", imagen);

    dispatch(createNoticia(formData));
  };

  const onChange = (e) => {
    if (e.target.name === "imagen") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagenPreview(reader.result);
          setImagen(reader.result);
        }
      };

      if (e.target.files[0] !== undefined) {
        reader.readAsDataURL(e.target.files[0]);
      } else {
        setImagenPreview("");
        setImagen("");
      }
    } else {
      setNoticia({ ...noticia, [e.target.name]: e.target.value });
    }
  };

  return (
    <>
      {" "}
      <MetaData title={"Nueva noticia"} />
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
                          <h3 className="title">Nueva noticia</h3>
                          <form
                            className="login-form"
                            onSubmit={submitHandler}
                            encType="multipart/form-data"
                          >
                            <div className="frm-group">
                              <label>Título:</label>
                              <input
                                name="titulo"
                                type="text"
                                placeholder="Título de la noticia"
                                value={titulo}
                                onChange={onChange}
                              />
                            </div>
                            <div className="frm-group">
                              <label>Descripción:</label>
                              <textarea
                                name="descripcion"
                                placeholder="Descripción de la noticia..."
                                value={descripcion}
                                rows={2}
                                onChange={onChange}
                              ></textarea>
                            </div>

                            <div className="frm-group">
                              <label>Imagen:</label>

                              <div className="custom-file">
                                <input
                                  name="imagen"
                                  type="file"
                                  className="custom-file-input"
                                  accept="image/*"
                                  onChange={onChange}
                                />
                                <label className="custom-file-label">
                                  Agregar imagen
                                </label>
                              </div>

                              <img
                                src={imagenPreview}
                                alt=""
                                className="mt-3 mr-2"
                                width="55"
                                height="52"
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
            </>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateNoticia;
