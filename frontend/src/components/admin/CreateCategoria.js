import React, { useState, useEffect } from "react";

import MetaData from "../section/MetaData";
import Sidebar from "./Sidebar";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useDispatch, useSelector } from "react-redux";
import { createCategoria, clearErrors } from "../../actions/categoriaActions";
import { CREATE_CATEGORIA_RESET } from "../../constants/categoriaConstants";

var MySwal;

const CreateCategoria = ({ history }) => {
  const [nombre, setNombre] = useState("");

  MySwal = withReactContent(Swal);
  const dispatch = useDispatch();

  const { error, success } = useSelector((state) => state.createCategoria);

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
      history.push("/admin-categorias");
      MySwal.fire({
        background: "#f5ede4",
        icon: "success",
        title: "La categoría ha sido creada con éxito",
        showConfirmButton: true,
        confirmButtonColor: "#3085d6",
        showCloseButton: false,
        timer: 2000,
      });
      dispatch({ type: CREATE_CATEGORIA_RESET });
    }
  }, [dispatch, error, success, history]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(createCategoria(nombre));
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
                          <h3 className="title">
                            Nueva categoría de productos
                          </h3>
                          <form className="login-form" onSubmit={submitHandler}>
                            <div className="frm-group">
                              <label>Nombre:</label>
                              <input
                                name="nombre"
                                type="text"
                                placeholder="Nombre de la categoría"
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

export default CreateCategoria;
