import React, { useState, useEffect } from "react";
import { MDBDataTable } from "mdbreact";
import MetaData from "../section/MetaData";
import Sidebar from "./Sidebar";
import Loader from "../section/Loader";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductoRevisiones,
  deleteRevision,
  clearErrors,
} from "../../actions/productoActions";
import { getAdminProductos } from "../../actions/productoActions";
import { DELETE_REVISION_RESET } from "../../constants/productoConstants";

var MySwal;

const ReviewsProducto = () => {
  const [productoId, setProductoId] = useState("");

  MySwal = withReactContent(Swal);
  const dispatch = useDispatch();
  const dispatch1 = useDispatch();

  const { error, revisiones } = useSelector(
    (state) => state.productoRevisiones
  );
  const { esEliminado, error: deleteError } = useSelector(
    (state) => state.revision
  );
  const { loading, productos } = useSelector((state) => state.productos);

  useEffect(() => {
    dispatch1(getAdminProductos());
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

    if (deleteError) {
      MySwal.fire({
        background: "#f5ede4",
        toast: true,
        showCloseButton: true,
        icon: "warning",
        iconColor: "orange",
        title: deleteError,
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

    if (productoId !== "") {
      dispatch(getProductoRevisiones(productoId));
    }

    if (esEliminado) {
      dispatch({ type: DELETE_REVISION_RESET });
    }
  }, [dispatch, dispatch1, error, productoId, esEliminado, deleteError]);

  const deleteRevisionHandler = (id) => {
    dispatch(deleteRevision(id, productoId));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(getProductoRevisiones(productoId));
  };

  const setRevisiones = () => {
    const data = {
      columns: [
        {
          label: "ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Calificación",
          field: "calificacion",
          sort: "asc",
        },
        {
          label: "Comentario",
          field: "comentario",
          sort: "asc",
        },
        {
          label: "Usuario",
          field: "usuario",
          sort: "asc",
        },
        {
          label: "Acciones",
          field: "acciones",
        },
      ],
      rows: [],
    };

    revisiones.forEach((revision) => {
      data.rows.push({
        id: revision._id,
        calificacion: revision.calificacion,
        comentario: revision.comentario,
        usuario: revision.nombre,

        acciones: (
          <button
            className="btn btn-danger py-1 px-2 ml-2"
            title="Eliminar"
            onClick={() => {
              MySwal.fire({
                background: "#f5ede4",
                title: "¿Está seguro de eliminar la valoración del producto?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si",
                cancelButtonText: "Cancelar",
              }).then((result) => {
                if (result.isConfirmed) {
                  deleteRevisionHandler(revision._id);
                  MySwal.fire({
                    background: "#f5ede4",
                    icon: "success",
                    title: "La valoración ha sido eliminada con éxito",
                    showConfirmButton: true,
                    confirmButtonColor: "#3085d6",
                    showCloseButton: false,
                    timer: 3000,
                  });
                }
              });
            }}
          >
            <i className="fa fa-trash"></i>
          </button>
        ),
      });
    });

    return data;
  };
  return (
    <>
      <MetaData title={"Valoraciones producto"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="dashboard">
          <div className="col-12 col-md-10">
            <>
              <h3 className="my-4">Valoraciones de productos</h3>
              <div className="row justify-content-center mt-5">
                <div className="col-5">
                  <form onSubmit={submitHandler}>
                    <div className="frm-group">
                      {loading ? (
                        <Loader />
                      ) : (
                        <select
                          value={productoId}
                          onChange={(e) => setProductoId(e.target.value)}
                        >
                          <option value={""}>Seleccione el producto</option>
                          {productos.map((producto) => (
                            <option key={producto._id} value={producto._id}>
                              {producto.nombre}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>
                  </form>
                </div>
              </div>

              {revisiones && revisiones.length > 0 ? (
                <MDBDataTable
                  data={setRevisiones()}
                  className="px-3"
                  bordered
                  striped
                  searchLabel="Buscar"
                  entriesLabel="Mostrando registros"
                  paginationLabel={["Anterior", "Siguiente"]}
                  infoLabel={["", "-", "de", "registros"]}
                />
              ) : (
                <p className="mt-5 text-center">
                  No se encontraron valoraciones.
                </p>
              )}
            </>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewsProducto;
