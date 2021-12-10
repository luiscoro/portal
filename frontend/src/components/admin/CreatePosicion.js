import React, { useState, useEffect } from "react";
import MetaData from "../section/MetaData";
import Sidebar from "./Sidebar";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Loader from "../section/Loader";
import { useDispatch, useSelector } from "react-redux";
import { createPosicion, clearErrors } from "../../actions/posicionActions";
import { CREATE_POSICION_RESET } from "../../constants/posicionConstants";
import { getAdminTipoMiembros } from "../../actions/tipoMiembroActions";

var MySwal;

const CreatePosicion = ({ history }) => {
  const [nombre, setNombre] = useState("");
  const [tipo, setTipo] = useState("");

  MySwal = withReactContent(Swal);
  const dispatch = useDispatch();

  const { error, success } = useSelector((state) => state.createPosicion);
  const { loading, tipoMiembros } = useSelector((state) => state.tipoMiembros);

  useEffect(() => {
    dispatch(getAdminTipoMiembros());
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
      history.push("/admin-posiciones");
      MySwal.fire({
        background: "#f5ede4",
        icon: "success",
        title: "La posición ha sido creada con éxito",
        showConfirmButton: false,
        showCloseButton: false,
        timer: 2000,
      });
      dispatch({ type: CREATE_POSICION_RESET });
    }
  }, [dispatch, error, success, history]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(createPosicion(nombre, tipo));
  };

  return (
    <>
      {" "}
      <MetaData title={"Nueva posición"} />
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
                          <h3 className="title">Nueva posición</h3>
                          <form className="login-form" onSubmit={submitHandler}>
                            <div className="frm-group">
                              <label>Tipo</label>
                              {loading ? (
                                <Loader />
                              ) : (
                                <select
                                  name="tipo"
                                  value={tipo}
                                  onChange={(e) => setTipo(e.target.value)}
                                >
                                  <option value={""}>
                                    Seleccione el tipo al cuál pertenece la posición
                                  </option>
                                  {tipoMiembros.map((tipo) => (
                                    <option
                                      key={tipo._id}
                                      value={tipo._id}
                                    >
                                      {tipo.nombre}
                                    </option>
                                  ))}
                                </select>
                              )}
                            </div>
                            <div className="frm-group">
                              <label>Nombre</label>
                              <input
                                name="nombre"
                                type="text"
                                placeholder="Ingrese el nombre"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
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

export default CreatePosicion;
