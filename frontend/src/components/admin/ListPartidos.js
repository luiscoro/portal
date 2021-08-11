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
  getAdminPartidos,
  deletePartido,
  clearErrors,
} from "../../actions/partidoActions";
import { DELETE_PARTIDO_RESET } from "../../constants/partidoConstants";

var MySwal;
var bandera;

const ListPartidos = ({ history }) => {
  MySwal = withReactContent(Swal);
  bandera = parseInt(localStorage.getItem("actualizado"));
  const dispatch = useDispatch();
  const { loading, error, partidos } = useSelector((state) => state.partidos);
  const { error: deleteError, esEliminado } = useSelector(
    (state) => state.partido
  );

  useEffect(() => {
    dispatch(getAdminPartidos());

    if (bandera === 1) {
      localStorage.setItem("actualizado", 0);
      MySwal.fire({
        background: "#f5ede4",
        icon: "success",
        title: "El partido ha sido actualizado con éxito",
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

    if (esEliminado) {
      history.push("/admin-partidos");
      dispatch({ type: DELETE_PARTIDO_RESET });
    }
  }, [dispatch, error, deleteError, esEliminado, history]);

  const setPartidos = () => {
    const data = {
      columns: [
        {
          label: "Equipo local",
          field: "nombreLocal",
          sort: "asc",
        },
        {
          label: "Goles local",
          field: "golesLocal",
          sort: "asc",
        },
        {
          label: "Goles visitante",
          field: "golesVisitante",
          sort: "asc",
        },
        {
          label: "Equipo visitante",
          field: "nombreVisitante",
          sort: "asc",
        },
        {
          label: "Fecha",
          field: "fecha",
          sort: "asc",
        },
        {
          label: "Hora",
          field: "hora",
          sort: "asc",
        },
        {
          label: "Estadio",
          field: "estadio",
          sort: "asc",
        },
        {
          label: "Acciones",
          field: "acciones",
        },
      ],
      rows: [],
    };

    partidos.forEach((partido) => {
      data.rows.push({
        nombreLocal: partido.nombreLocal,
        golesLocal: partido.golesLocal,
        golesVisitante: partido.golesVisitante,
        nombreVisitante: partido.nombreVisitante,
        fecha: partido.fecha,
        hora: partido.hora,
        estadio: partido.estadio,

        acciones: (
          <>
            <Link
              to={`/admin-partido/${partido._id}`}
              className="btn btn-primary py-1 px-2"
            >
              <i className="fa fa-pencil"></i>
            </Link>
            <button
              className="btn btn-danger py-1 px-2 ml-2"
              onClick={() => {
                MySwal.fire({
                  background: "#f5ede4",
                  title: "¿Está seguro de eliminar el partido?",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Si",
                  cancelButtonText: "Cancelar",
                }).then((result) => {
                  if (result.isConfirmed) {
                    deletePartidoHandler(partido._id);
                    MySwal.fire({
                      background: "#f5ede4",
                      icon: "success",
                      title: "El partido ha sido eliminado con éxito",
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

  const deletePartidoHandler = (id) => {
    dispatch(deletePartido(id));
  };

  return (
    <>
      <MetaData title={"Listar partidos"} />
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
                  to={`/admin-partido`}
                  className="btn btn-primary btn-radius"
                >
                  Crear nuevo
                </Link>
                <h3 className="my-4">Listado de partidos</h3>
                <MDBDataTable
                  data={setPartidos()}
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

export default ListPartidos;
