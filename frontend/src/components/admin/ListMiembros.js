import React, { useState, useEffect } from "react";
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
import { getAdminTipoMiembros } from "../../actions/tipoMiembroActions";
import { DELETE_MIEMBRO_RESET } from "../../constants/miembroConstants";
import jsPDF from "jspdf";
import "jspdf-autotable";
var ageCalculator = require("age-calculator");
let { AgeFromDateString } = ageCalculator;
var MySwal;
var bandera;


const ListMiembros = ({ history }) => {

  const [tipoId, setTipoId] = useState("");
  const [est, setEst] = useState("");
  MySwal = withReactContent(Swal);
  bandera = parseInt(localStorage.getItem("actualizado"));
  const dispatch = useDispatch();
  const dispatch1 = useDispatch();

  const { error, miembros } = useSelector((state) => state.miembros);
  const { error: deleteError, esEliminado } = useSelector(
    (state) => state.miembro
  );
  const { loading, tipoMiembros } = useSelector(
    (state) => state.tipoMiembros
  );

  useEffect(() => {
    dispatch(getAdminMiembros());
    dispatch1(getAdminTipoMiembros());
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

    if (tipoId !== "") {
      dispatch(getAdminMiembros());
    }

    if (esEliminado) {
      history.push("/admin-miembros");
      dispatch({ type: DELETE_MIEMBRO_RESET });
    }
  }, [dispatch, dispatch1, tipoId, error, deleteError, esEliminado, history, est]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(getAdminMiembros());
  };


  const setMiembros = () => {
    const data = {
      columns: [
        {
          label: "Identificación",
          field: "cedula",
        },
        {
          label: "Posición",
          field: "posicion",
          sort: "asc",
        },
        {
          label: "Nombre",
          field: "nombre",
          sort: "asc",
        },
        {
          label: "Edad",
          field: "edad",
          sort: "asc",
        },
        {
          label: "Nacionalidad",
          field: "nacionalidad",
          sort: "asc",
        },
        {
          label: "Camiseta",
          field: "numeroCamiseta",
        },
        {
          label: "Estado",
          field: "estado",
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
      if (miembro.tipo && miembro.tipo.nombre === tipoId && miembro.estado === est) {
        data.rows.push({
          cedula: miembro.cedula,
          posicion: miembro.posicion && miembro.posicion.nombre,
          edad: new AgeFromDateString(
            miembro.fechaNacimiento.substring(0, 10)
          ).age,
          nombre: miembro.nombre,
          nacionalidad: miembro.nacionalidad,
          numeroCamiseta: (miembro.numeroCamiseta === null ? (<></>) : ("# " + miembro.numeroCamiseta)),
          estado: miembro.estado,
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
                        title: "El miembro ha sido eliminado con éxito",
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
      }
    });

    return data;
  };

  const deleteMiembroHandler = (id) => {
    dispatch(deleteMiembro(id));
  };

  const exportPdf = () => {

    var img = new Image(10, 10);
    img.crossOrigin = "";
    img.src = "//i.imgur.com/qU9CtWQ.png";

    const unit = "pt";
    const size = "A4";
    const orientation = "portrait";

    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);
    const title = "Listado de miembros";
    const tipo = "Tipo: " + tipoId;
    const headers = [["IDENTIFICACIÓN", "POSICIÓN", "NOMBRE", "EDAD", "NACIONALIDAD", "NÚMERO DE CAMISETA"]];

    const rows = [];

    miembros.forEach(miembro => {
      if (miembro.tipo && miembro.tipo.nombre === tipoId && miembro.estado === est) {
        var temp = [miembro.cedula, miembro.posicion && miembro.posicion.nombre, miembro.nombre, new AgeFromDateString(
          miembro.fechaNacimiento.substring(0, 10)
        ).age, miembro.nacionalidad, (miembro.numeroCamiseta === null ? (<></>) : ("# " + miembro.numeroCamiseta))];
        rows.push(temp);
      }
    });


    let content = {
      startY: 80,
      head: headers,
      body: rows
    };

    doc.addImage(img, 275, 5);
    doc.text(title, 40, 70);
    doc.text(tipo, 275, 70);
    doc.autoTable(content);
    doc.save(tipoId + ".pdf")
  }


  return (
    <>
      <MetaData title={"Listar miembros"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="dashboard">
          <div className="col-12 col-md-10">
            <>
              <br />
              <Link
                to={`/admin-miembro`}
                className="btn btn-primary btn-radius"
              >
                Crear nuevo
              </Link>
              <h3 className="my-4">Listado de miembros del club</h3>

              <div className="row justify-content-center mt-5">
                <div className="col-5">
                  <form onSubmit={submitHandler}>
                    <div className="frm-group">
                      {loading ? (
                        <Loader />
                      ) : (
                        <select
                          value={tipoId}
                          onChange={(e) => setTipoId(e.target.value)}
                        >
                          <option value={""}>Filtrar por tipo de miembro</option>
                          {tipoMiembros.map((tipo) => (
                            <option key={tipo._id} value={tipo.nombre}>
                              {tipo.nombre}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>
                    <p></p>
                    <div className="frm-group">
                      {tipoId !== "" ? (
                        <select
                          value={est}
                          onChange={(e) => setEst(e.target.value)}
                        >
                          <option value={""}>Filtrar por tipo</option>
                          <option value="activo">activo</option>
                          <option value="inactivo">inactivo</option>
                        </select>
                      ) : (
                        <></>
                      )}
                    </div>

                  </form>
                </div>
              </div>

              {est === "activo" ? (
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
              ) : (
                <div className="botonpdf">
                  <button
                    className="btn btn-danger py-1 px-2 ml-2"
                    disabled
                  >

                    <i className="fa fa-file-pdf-o"></i>
                  </button>
                </div>
              )}
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
        </div>
      </div >
    </>
  );
};

export default ListMiembros;
