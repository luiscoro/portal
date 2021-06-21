import React, { useState, useEffect } from "react";
import MetaData from "../section/MetaData";
import Sidebar from "./Sidebar";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useDispatch, useSelector } from "react-redux";
import {
  updateCategoria,
  getCategoriaDetails,
  clearErrors,
} from "../../actions/categoriaActions";
import { UPDATE_CATEGORIA_RESET } from "../../constants/categoriaConstants";

var MySwal;

const UpdateCategoria = ({ history, match, location }) => {
  const [nombre, setNombre] = useState("");

  MySwal = withReactContent(Swal);
  const dispatch = useDispatch();

  const { error, categoria } = useSelector((state) => state.categoriaDetails);
  const { error: updateError, esActualizado } = useSelector(
    (state) => state.categoria
  );

  const categoriaId = match.params.id;

  useEffect(() => {
    console.log(categoria && categoria._id !== categoriaId);
    if (categoria && categoria._id !== categoriaId) {
      dispatch(getCategoriaDetails(categoriaId));
    } else {
      setNombre(categoria.nombre);
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
      history.push("/admin-categorias");

      dispatch({
        type: UPDATE_CATEGORIA_RESET,
      });
    }
  }, [
    dispatch,
    error,
    location,
    history,
    esActualizado,
    updateError,
    categoriaId,
    categoria,
  ]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("nombre", nombre);

    dispatch(updateCategoria(categoria._id, formData));
  };
  return (
    <>
      {" "}
      <MetaData title={"Actualizar categoría"} />
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
                          <h3 className="title">
                            Actualizar categoría de productos
                          </h3>

                          <form className="login-form" onSubmit={submitHandler}>
                            <div className="frm-group">
                              <label>Nombre:</label>
                              <input
                                type="text"
                                placeholder="Nombre de la categoría"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
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

export default UpdateCategoria;
