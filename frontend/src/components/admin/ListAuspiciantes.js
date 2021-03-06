import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import MetaData from "../section/MetaData";
import Loader from "../section/Loader";
import Sidebar from "./Sidebar";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useDispatch, useSelector } from "react-redux";
import {
  getAdminAuspiciantes,
  deleteAuspiciante,
  clearErrors,
} from "../../actions/auspicianteActions";
import { DELETE_AUSPICIANTE_RESET } from "../../constants/auspicianteConstants";

var MySwal;
var bandera;

const ListAuspiciantes = ({ history }) => {
  MySwal = withReactContent(Swal);
  bandera = parseInt(localStorage.getItem("actualizado"));
  const dispatch = useDispatch();
  const { loading, error, auspiciantes } = useSelector(
    (state) => state.auspiciantes
  );
  const { error: deleteError, esEliminado } = useSelector(
    (state) => state.auspiciante
  );

  useEffect(() => {
    dispatch(getAdminAuspiciantes());

    if (bandera === 1) {
      localStorage.setItem("actualizado", 0);
      MySwal.fire({
        background: "#f5ede4",
        icon: "success",
        title: "El auspiciante ha sido actualizado con éxito",
        timer: 5000,
        showConfirmButton: true,
        confirmButtonColor: "#3085d6",
        showCloseButton: false,
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        } else {
          window.location.reload();
        }
      });
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

    if (deleteError) {
      MySwal.fire({
        background: "#f5ede4",
        toast: true,
        showCloseButton: true,
        icon: "error",
        iconColor: "red",
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

    if (esEliminado) {
      history.push("/admin-auspiciantes");
      dispatch({ type: DELETE_AUSPICIANTE_RESET });
    }
  }, [dispatch, error, deleteError, esEliminado, history]);

  const setAuspiciantes = () => {
    const data = {
      columns: [
        {
          label: "Nombre",
          field: "nombre",
          sort: "asc",
        },

        {
          label: "Logo",
          field: "logo",
        },

        {
          label: "Acciones",
          field: "acciones",
        },
      ],
      rows: [],
    };

    auspiciantes.forEach((auspiciante) => {
      data.rows.push({
        nombre: auspiciante.nombre,
        logo: (
          <img
            alt=""
            src={auspiciante.logo && auspiciante.logo.url}
            width="55"
            height="52"
          />
        ),
        acciones: (
          <>
            <Link
              to={`/admin-auspiciante/${auspiciante._id}`}
              className="btn btn-primary py-1 px-2" title="Editar"
            >
              <i className="fa fa-pencil"></i>
            </Link>
            <button
              className="btn btn-danger py-1 px-2 ml-2" title="Eliminar"
              onClick={() => {
                MySwal.fire({
                  background: "#f5ede4",
                  title: "¿Está seguro de eliminar el auspiciante?",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Si",
                  cancelButtonText: "Cancelar",
                }).then((result) => {
                  if (result.isConfirmed) {
                    deleteAuspicianteHandler(auspiciante._id);
                    MySwal.fire({
                      background: "#f5ede4",
                      icon: "success",
                      title: "El auspiciante ha sido eliminado con éxito",
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
          </>
        ),
      });
    });

    return data;
  };

  const deleteAuspicianteHandler = (id) => {
    dispatch(deleteAuspiciante(id));
  };
  return (
    <>
      <MetaData title={"Listar auspiciantes"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="dashboard">
          {loading ? (
            <Loader />
          ) : (
            <div className="col-12 col-md-10">
              <>
                <br />
                <Link
                  to={`/admin-auspiciante`}
                  className="btn btn-primary btn-radius"
                >
                  Crear nuevo
                </Link>
                <h3 className="my-4">Listado de auspiciantes</h3>

                <MDBDataTable
                  data={setAuspiciantes()}
                  className="px-3"
                  bordered
                  striped
                  searchLabel="Buscar"
                  entriesLabel="Mostrando registros"
                  paginationLabel={["Anterior", "Siguiente"]}
                  infoLabel={["", "-", "de", "registros"]}
                  noRecordsFoundLabel="No se encontró ningún registro"
                />
              </>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ListAuspiciantes;
