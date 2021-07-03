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
  getAdminNoticias,
  deleteNoticia,
  clearErrors,
} from "../../actions/noticiaActions";
import { DELETE_NOTICIA_RESET } from "../../constants/noticiaConstants";

var MySwal;
var bandera;

const ListNoticias = ({ history }) => {
  MySwal = withReactContent(Swal);
  bandera = parseInt(localStorage.getItem("actualizado"));
  const dispatch = useDispatch();
  const { loading, error, noticias } = useSelector((state) => state.noticias);
  const { error: deleteError, esEliminado } = useSelector(
    (state) => state.noticia
  );

  useEffect(() => {
    dispatch(getAdminNoticias());

    if (bandera === 1) {
      localStorage.setItem("actualizado", 0);
      MySwal.fire({
        background: "#f5ede4",
        icon: "success",
        title: "La noticia ha sido actualizada con éxito",
        timer: 3000,
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
      history.push("/admin-noticias");
      dispatch({ type: DELETE_NOTICIA_RESET });
    }
  }, [dispatch, error, deleteError, esEliminado, history]);

  const setNoticias = () => {
    const data = {
      columns: [
        {
          label: "Título",
          field: "titulo",
          sort: "asc",
        },
        {
          label: "Descripción",
          field: "descripcion",
          sort: "asc",
        },

        {
          label: "Imagen",
          field: "imagen",
        },

        {
          label: "Acciones",
          field: "acciones",
        },
      ],
      rows: [],
    };

    noticias.forEach((noticia) => {
      data.rows.push({
        titulo: noticia.titulo,
        descripcion: noticia.descripcion,
        imagen: (
          <img
            alt=""
            src={noticia.imagen && noticia.imagen.url}
            width="55"
            height="52"
          />
        ),
        acciones: (
          <>
            <Link
              to={`/admin-noticia/${noticia._id}`}
              className="btn btn-primary py-1 px-1"
            >
              <i className="fa fa-pencil"></i>
            </Link>
            <button
              className="btn btn-danger py-1 px-1 ml-2"
              onClick={() => {
                MySwal.fire({
                  background: "#f5ede4",
                  title: "¿Está seguro de eliminar la noticia?",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Si",
                  cancelButtonText: "Cancelar",
                }).then((result) => {
                  if (result.isConfirmed) {
                    deleteNoticiaHandler(noticia._id);
                    MySwal.fire({
                      background: "#f5ede4",
                      icon: "success",
                      title: "La noticia ha sido eliminada con éxito",
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

  const deleteNoticiaHandler = (id) => {
    dispatch(deleteNoticia(id));
  };
  return (
    <>
      <MetaData title={"Listar noticias"} />
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
                  to={`/admin-noticia`}
                  className="btn btn-primary btn-radius"
                >
                  Crear nueva
                </Link>
                <h3 className="my-4">Listado de noticias</h3>

                <MDBDataTable
                  data={setNoticias()}
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

export default ListNoticias;
