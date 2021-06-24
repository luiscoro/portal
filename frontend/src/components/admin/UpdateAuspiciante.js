import React, { useState, useEffect } from "react";
import MetaData from "../section/MetaData";
import Sidebar from "./Sidebar";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useDispatch, useSelector } from "react-redux";
import {
  getAuspicianteDetails,
  updateAuspiciante,
  clearErrors,
} from "../../actions/auspicianteActions";
import { UPDATE_AUSPICIANTE_RESET } from "../../constants/auspicianteConstants";

var MySwal;

const UpdateAuspiciante = ({ match, history }) => {
  const [nombre, setNombre] = useState("");
  const [logo, setLogo] = useState("");
  const [logoPreview, setLogoPreview] = useState("");

  MySwal = withReactContent(Swal);
  const dispatch = useDispatch();

  const { error, auspiciante } = useSelector(
    (state) => state.auspicianteDetails
  );
  const { error: updateError, esActualizado } = useSelector(
    (state) => state.auspiciante
  );

  const auspicianteId = match.params.id;

  useEffect(() => {
    console.log(auspiciante && auspiciante._id !== auspicianteId);
    if (auspiciante && auspiciante._id !== auspicianteId) {
      dispatch(getAuspicianteDetails(auspicianteId));
    } else {
      setNombre(auspiciante.nombre);
      setLogoPreview(auspiciante.logo.url);
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
      history.push("/admin-auspiciantes");
      dispatch({
        type: UPDATE_AUSPICIANTE_RESET,
      });
    }
  }, [
    dispatch,
    error,
    history,
    esActualizado,
    updateError,
    auspicianteId,
    auspiciante,
  ]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("nombre", nombre);
    formData.append("logo", logo);

    dispatch(updateAuspiciante(auspiciante._id, formData));
  };

  const onChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setLogoPreview(reader.result);
        setLogo(reader.result);
      }
    };

    if (e.target.files[0] !== undefined) {
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <>
      {" "}
      <MetaData title={"Actualizar auspiciante"} />
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
                          <h3 className="title">Actualizar auspiciante</h3>

                          <form
                            className="login-form"
                            onSubmit={submitHandler}
                            encType="multipart/form-data"
                          >
                            <div className="frm-group">
                              <label>Nombre</label>
                              <input
                                type="text"
                                placeholder="Ingresa el nombre "
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                              />
                            </div>

                            <div className="frm-group">
                              <label>Logo</label>

                              <div className="custom-file">
                                <input
                                  type="file"
                                  className="custom-file-input"
                                  accept="image/*"
                                  onChange={onChange}
                                />
                                <label className="custom-file-label">
                                  Cambiar logo
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

export default UpdateAuspiciante;
