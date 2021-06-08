import React, { useState, useEffect } from "react";
import MetaData from "../section/MetaData";
import Sidebar from "./Sidebar";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useDispatch, useSelector } from "react-redux";
import {
  getDirigenteDetails,
  updateDirigente,
  clearErrors,
} from "../../actions/dirigenteActions";
import { UPDATE_DIRIGENTE_RESET } from "../../constants/dirigenteConstants";

var MySwal;

const UpdateDirigente = ({ match, history }) => {
  const [nombre, setNombre] = useState("");
  const [cargo, setCargo] = useState("");
  const [foto, setFoto] = useState("");
  const [fotoPreview, setFotoPreview] = useState("");

  MySwal = withReactContent(Swal);
  const dispatch = useDispatch();

  const { error, dirigente } = useSelector((state) => state.dirigenteDetails);
  const { error: updateError, esActualizado } = useSelector(
    (state) => state.dirigente
  );

  const dirigenteId = match.params.id;

  useEffect(() => {
    console.log(dirigente && dirigente._id !== dirigenteId);
    if (dirigente && dirigente._id !== dirigenteId) {
      dispatch(getDirigenteDetails(dirigenteId));
    } else {
      setNombre(dirigente.nombre);
      setCargo(dirigente.cargo);
      setFotoPreview(dirigente.foto.url);
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
      history.push("/admin-dirigentes");
      dispatch({
        type: UPDATE_DIRIGENTE_RESET,
      });
    }
  }, [
    dispatch,
    error,
    history,
    esActualizado,
    updateError,
    dirigenteId,
    dirigente,
  ]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("nombre", nombre);
    formData.set("cargo", cargo);
    formData.append("foto", foto);

    dispatch(updateDirigente(dirigente._id, formData));
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
      <MetaData title={"Actualizar dirigente"} />
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
                          <h3 className="title">Actualizar dirigente</h3>

                          <form
                            className="login-form"
                            onSubmit={submitHandler}
                            encType="multipart/form-data"
                          >
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
                              <label>Cargo</label>
                              <input
                                type="text"
                                placeholder="Ingresa el cargo"
                                value={cargo}
                                onChange={(e) => setCargo(e.target.value)}
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
              {/* login-section end */}
            </>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateDirigente;
