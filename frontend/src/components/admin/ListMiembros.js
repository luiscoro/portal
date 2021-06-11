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
  getAdminMiembros,
  deleteMiembro,
  clearErrors,
} from "../../actions/miembroActions";
import { DELETE_MIEMBRO_RESET } from "../../constants/miembroConstants";

var MySwal;
var bandera;

const ListMiembros = ({ history }) => {
  MySwal = withReactContent(Swal);
  bandera = parseInt(localStorage.getItem("actualizado"));
  const dispatch = useDispatch();
  const { loading, error, miembros } = useSelector((state) => state.miembros);
  const { error: deleteError, esEliminado } = useSelector(
    (state) => state.miembro
  );

  useEffect(() => {
    dispatch(getAdminMiembros());

    if (bandera === 1) {
      localStorage.setItem("actualizado", 0);
      MySwal.fire({
        background: "#f5ede4",
        icon: "success",
        title: "El miembro ha sido actualizado con éxito",
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
      history.push("/admin-miembros");
      dispatch({ type: DELETE_MIEMBRO_RESET });
    }
  }, [dispatch, error, deleteError, esEliminado, history]);

  const setMiembros = () => {
    const data = {
      columns: [
        {
          label: "Tipo",
          field: "tipo",
          sort: "asc",
        },
        {
          label: "Nombre",
          field: "nombre",
          sort: "asc",
        },
        {
          label: "Nacionalidad",
          field: "nacionalidad",
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

    miembros.forEach((miembro) => {
      data.rows.push({
        tipo: miembro.tipo,
        nombre: miembro.nombre,
        nacionalidad: miembro.nacionalidad,
        foto: (
          <img
            alt=""
            src={miembro.foto && miembro.foto.url}
            width="55"
            height="52"
          />
        ),
        acciones: (
          <>
            <Link
              to={`/admin-miembro/${miembro._id}`}
              className="btn btn-primary py-1 px-2"
            >
              <i className="fa fa-pencil"></i>
            </Link>
            <button
              className="btn btn-danger py-1 px-2 ml-2"
              onClick={() => {
                MySwal.fire({
                  background: "#f5ede4",
                  title: "¿Está seguro de eliminar al miembro?",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Si",
                  cancelButtonText: "Cancelar",
                }).then((result) => {
                  if (result.isConfirmed) {
                    deleteMiembroHandler(miembro._id);
                    MySwal.fire({
                      background: "#f5ede4",
                      icon: "success",
                      title: "El miembro ha sido eliminada con éxito",
                      showConfirmButton: false,
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

  const deleteMiembroHandler = (id) => {
    dispatch(deleteMiembro(id));
  };
  return (
    <>
      <MetaData title={"Listar miembros"} />
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
                <h3 className="my-4">Listado de miembros</h3>

                <MDBDataTable
                  data={setMiembros()}
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

export default ListMiembros;