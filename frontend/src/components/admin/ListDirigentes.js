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
  getAdminDirigentes,
  deleteDirigente,
  clearErrors,
} from "../../actions/dirigenteActions";
import { DELETE_DIRIGENTE_RESET } from "../../constants/dirigenteConstants";

var MySwal;
var bandera;

const ListDirigentes = ({ history }) => {
  MySwal = withReactContent(Swal);
  bandera = parseInt(localStorage.getItem("actualizado"));
  const dispatch = useDispatch();
  const { loading, error, dirigentes } = useSelector(
    (state) => state.dirigentes
  );
  const { error: deleteError, esEliminado } = useSelector(
    (state) => state.dirigente
  );

  useEffect(() => {
    dispatch(getAdminDirigentes());

    if (bandera === 1) {
      localStorage.setItem("actualizado", 0);
      MySwal.fire({
        background: "#f5ede4",
        icon: "success",
        title: "El dirigente ha sido actualizado con éxito",
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
      history.push("/admin-dirigentes");
      dispatch({ type: DELETE_DIRIGENTE_RESET });
    }
  }, [dispatch, error, deleteError, esEliminado, history]);

  const setDirigentes = () => {
    const data = {
      columns: [
        {
          label: "Nombre",
          field: "nombre",
          sort: "asc",
        },
        {
          label: "Cargo",
          field: "cargo",
          sort: "asc",
        },

        {
          label: "Foto",
          field: "foto",
        },

        {
          label: "Acciones",
          field: "acciones",
        },
      ],
      rows: [],
    };

    dirigentes.forEach((dirigente) => {
      data.rows.push({
        nombre: dirigente.nombre,
        cargo: dirigente.cargo,
        foto: (
          <img
            alt=""
            src={dirigente.foto && dirigente.foto.url}
            width="55"
            height="52"
          />
        ),
        acciones: (
          <>
            <Link
              to={`/admin-dirigente/${dirigente._id}`}
              className="btn btn-primary py-1 px-2"
            >
              <i className="fa fa-pencil"></i>
            </Link>
            <button
              className="btn btn-danger py-1 px-2 ml-2"
              onClick={() => {
                MySwal.fire({
                  background: "#f5ede4",
                  title: "¿Está seguro de eliminar al dirigente?",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Si",
                  cancelButtonText: "Cancelar",
                }).then((result) => {
                  if (result.isConfirmed) {
                    deleteDirigenteHandler(dirigente._id);
                    MySwal.fire({
                      background: "#f5ede4",
                      icon: "success",
                      title: "El dirigente ha sido eliminado con éxito",
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

  const deleteDirigenteHandler = (id) => {
    dispatch(deleteDirigente(id));
  };
  return (
    <>
      <MetaData title={"Listar dirigentes"} />
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
                  to={`/admin-dirigente`}
                  className="btn btn-primary btn-radius"
                >
                  Crear nuevo
                </Link>
                <h3 className="my-4">Listado de dirigentes</h3>

                <MDBDataTable
                  data={setDirigentes()}
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

export default ListDirigentes;
