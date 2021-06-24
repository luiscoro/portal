import React, { useState, useEffect } from "react";

import MetaData from "../section/MetaData";
import Sidebar from "./Sidebar";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useDispatch, useSelector } from "react-redux";
import {
  createAuspiciante,
  clearErrors,
} from "../../actions/auspicianteActions";
import { CREATE_AUSPICIANTE_RESET } from "../../constants/auspicianteConstants";

var MySwal;

const CreateAuspiciante = ({ history }) => {
  const [auspiciante, setAuspiciante] = useState({
    nombre: "",
  });

  const { nombre } = auspiciante;

  const [logo, setLogo] = useState("");
  const [logoPreview, setLogoPreview] = useState("");

  MySwal = withReactContent(Swal);
  const dispatch = useDispatch();

  const { error, success } = useSelector((state) => state.createAuspiciante);

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
      history.push("/admin-auspiciantes");
      MySwal.fire({
        background: "#f5ede4",
        icon: "success",
        title: "El auspiciante ha sido creado con éxito",
        showConfirmButton: false,
        showCloseButton: false,
        timer: 2000,
      });
      dispatch({ type: CREATE_AUSPICIANTE_RESET });
    }
  }, [dispatch, error, success, history]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("nombre", nombre);
    formData.set("logo", logo);

    dispatch(createAuspiciante(formData));
  };

  const onChange = (e) => {
    if (e.target.name === "logo") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setLogoPreview(reader.result);
          setLogo(reader.result);
        }
      };

      if (e.target.files[0] !== undefined) {
        reader.readAsDataURL(e.target.files[0]);
      } else {
        setLogoPreview("");
        setLogo("");
      }
    } else {
      setAuspiciante({ ...auspiciante, [e.target.name]: e.target.value });
    }
  };

  return (
    <>
      {" "}
      <MetaData title={"Nuevo auspiciante"} />
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
                          <h3 className="title">Nuevo auspiciante</h3>
                          <form
                            className="login-form"
                            onSubmit={submitHandler}
                            encType="multipart/form-data"
                          >
                            <div className="frm-group">
                              <label>Nombre</label>
                              <input
                                name="nombre"
                                type="text"
                                placeholder="Ingresa el nombre"
                                value={nombre}
                                onChange={onChange}
                              />
                            </div>

                            <div className="frm-group">
                              <label>Logo</label>

                              <div className="custom-file">
                                <input
                                  name="logo"
                                  type="file"
                                  className="custom-file-input"
                                  accept="image/*"
                                  onChange={onChange}
                                  required
                                />
                                <label className="custom-file-label">
                                  Agregar logo
                                </label>
                              </div>

                              <img
                                src={logoPreview}
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

export default CreateAuspiciante;
