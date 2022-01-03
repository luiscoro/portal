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
  getAdminClasificaciones,
  deleteClasificacion,
  clearErrors,
} from "../../actions/clasificacionActions";
import { DELETE_CLASIFICACION_RESET } from "../../constants/clasificacionConstants";
import jsPDF from "jspdf";
import "jspdf-autotable";

var MySwal;
var bandera;
const ListClasificaciones = ({ history }) => {
  MySwal = withReactContent(Swal);
  bandera = parseInt(localStorage.getItem("actualizado"));

  const dispatch = useDispatch();
  const { loading, error, clasificaciones } = useSelector(
    (state) => state.clasificaciones
  );
  const { error: deleteError, esEliminado } = useSelector(
    (state) => state.clasificacion
  );

  useEffect(() => {
    dispatch(getAdminClasificaciones());

    if (bandera === 1) {
      localStorage.setItem("actualizado", 0);
      MySwal.fire({
        background: "#f5ede4",
        icon: "success",
        title: "La clasificación ha sido actualizada con éxito",
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
      history.push("/admin-clasificaciones");
      dispatch({ type: DELETE_CLASIFICACION_RESET });
    }
  }, [dispatch, error, deleteError, esEliminado, history]);

  const setClasificaciones = () => {
    let cont = 1;
    const data = {
      columns: [
        {
          label: "Posición",
          field: "pos",
          sort: "asc",
        },
        {
          label: "Equipo",
          field: "equipo",
          sort: "asc",
        },
        {
          label: "Puntos",
          field: "puntos",
          sort: "asc",
        },
        {
          label: "Gol de diferencia",
          field: "golDiferencia",
          sort: "asc",
        },
        {
          label: "Acciones",
          field: "acciones",
        },
      ],
      rows: [],
    };

    clasificaciones.forEach((clasificacion) => {
      data.rows.push({
        pos: cont++,
        equipo: clasificacion.equipo &&
          String(clasificacion.equipo).includes("3 de Julio") ? (
          <p style={{ color: "blue" }}>{clasificacion.equipo}</p>
        ) : (
          clasificacion.equipo
        ),
        puntos: clasificacion.puntos,
        golDiferencia: clasificacion.golDiferencia,
        acciones: (
          <>
            <Link
              to={`/admin-clasificacion/${clasificacion._id}`}
              className="btn btn-primary py-1 px-2"
              title="Editar"
            >
              <i className="fa fa-pencil"></i>
            </Link>
            <button
              className="btn btn-danger py-1 px-2 ml-2"
              title="Eliminar"
              onClick={() => {
                MySwal.fire({
                  background: "#f5ede4",
                  title: "¿Está seguro de eliminar la clasificación?",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Si",
                  cancelButtonText: "Cancelar",
                }).then((result) => {
                  if (result.isConfirmed) {
                    deleteClasificacionHandler(clasificacion._id);
                    MySwal.fire({
                      background: "#f5ede4",
                      icon: "success",
                      title: "La clasificación ha sido eliminada con éxito",
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

  const deleteClasificacionHandler = (id) => {
    dispatch(deleteClasificacion(id));
  };

  const exportPdf = () => {
    let cont = 1;
    var img = new Image(10, 10);
    img.crossOrigin = "";
    img.src = "//i.imgur.com/qU9CtWQ.png";

    const unit = "pt";
    const size = "A4";
    const orientation = "portrait";

    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);
    const title = "Tabla de posiciones";
    const headers = [["POSICIÓN", "NOMBRE DEL EQUIPO", "PUNTOS", "GOL DE DIFERENCIA"]];

    const rows = [];

    clasificaciones.forEach(pos => {
      var temp = [cont++, pos.equipo, pos.puntos, pos.golDiferencia];
      rows.push(temp);
    }
    );


    let content = {
      startY: 80,
      head: headers,
      body: rows
    };

    doc.addImage(img, 275, 5);
    doc.text(title, 40, 70);
    doc.autoTable(content);
    doc.save("posiciones.pdf")
  }
  return (
    <>
      <MetaData title={"Listar clasificaciones"} />
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
                  to={`/admin-clasificacion`}
                  className="btn btn-primary btn-radius"
                >
                  Crear nueva
                </Link>
                <h3 className="my-4">Tabla de posiciones</h3>
                <div className="botonpdf">
                  <button
                    className="btn btn-danger py-1 px-2 ml-2"
                    onClick={() => {
                      exportPdf()
                    }}
                    title="Generar PDF"
                  >

                    <i className="fa fa-file-pdf-o"></i>
                  </button>
                </div>
                <MDBDataTable
                  data={setClasificaciones()}
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

export default ListClasificaciones;
