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
    getAdminContratos,
    deleteContrato,
    clearErrors,
} from "../../actions/contratoActions";
import {
    getTipoMiembroDetails,
} from "../../actions/tipoMiembroActions";
import { getAdminTipoMiembros } from "../../actions/tipoMiembroActions";
import { DELETE_CONTRATO_RESET } from "../../constants/contratoConstants";
import jsPDF from "jspdf";
import "jspdf-autotable";
var ageCalculator = require("age-calculator");
let { AgeFromDateString } = ageCalculator;

var MySwal;
var bandera;


const ListContratos = ({ history }) => {

    const [tipoId, setTipoId] = useState("");
    MySwal = withReactContent(Swal);
    bandera = parseInt(localStorage.getItem("actualizado"));
    const dispatch = useDispatch();

    const { error, contratos } = useSelector((state) => state.contratos);
    const { error: deleteError, esEliminado } = useSelector(
        (state) => state.contrato
    );
    const { loading, tipoMiembros } = useSelector(
        (state) => state.tipoMiembros
    );

    const { tipoMiembro } = useSelector((state) => state.tipoMiembroDetails);

    const tipoMiembroId = tipoId;

    useEffect(() => {
        dispatch(getAdminContratos());
        dispatch(getAdminTipoMiembros());
        dispatch(getTipoMiembroDetails(tipoMiembroId));
        if (bandera === 1) {
            localStorage.setItem("actualizado", 0);
            MySwal.fire({
                background: "#f5ede4",
                icon: "success",
                title: "El contrato ha sido actualizado con éxito",
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
            dispatch(getAdminContratos());
        }

        if (esEliminado) {
            history.push("/admin-contratos");
            dispatch({ type: DELETE_CONTRATO_RESET });
        }
    }, [dispatch, tipoMiembroId, tipoId, error, deleteError, esEliminado, history]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(getAdminContratos());
    };

    const exportPdf = (id) => {

        var img = new Image(10, 10);
        img.crossOrigin = "";
        img.src = "//i.imgur.com/qU9CtWQ.png";
        var ced, mie, nac, fec, tip, feci, fecf, sue;

        const unit = "pt";
        const size = "A4";
        const orientation = "portrait";

        const doc = new jsPDF(orientation, unit, size);

        doc.setFontSize(12);
        const title = "CONTRATO CON EL CLUB";

        contratos.forEach(contrato => {
            if (contrato._id === id && contrato.miembro.estado === "activo" && contrato.estado === "vigente") {
                ced = contrato.miembro.cedula;
                mie = contrato.miembro.nombre;
                nac = contrato.miembro.nacionalidad;
                fec = contrato.miembro.fechaNacimiento;
                tip = contrato.tipo;
                feci = String(contrato.fechaInicio).substring(0, 10);
                fecf = (contrato.fechaFin === null ? ("") : (String(contrato.fechaFin).substring(0, 10)));
                sue = contrato.sueldo;
            }
        });


        doc.addImage(img, 275, 5);
        doc.text(title, 40, 70);
        doc.text("_____________________________________________________________________________", 40, 75);
        doc.text("1.- PARTES", 40, 90);
        doc.text("Equipo : Club Sport 3 de Julio", 40, 105);
        doc.text("Miembro : " + mie, 40, 120);
        doc.text("Tipo de miembro : " + tipoMiembro.nombre, 40, 135);
        doc.text("2.- DATOS GENERALES DEL MIEMBRO", 40, 165);
        doc.text("Identificación : " + ced, 40, 180);
        doc.text("Nombre : " + mie, 40, 195);
        doc.text("Nacionalidad : " + nac, 40, 210);
        doc.text("Edad : " + new AgeFromDateString(
            fec.substring(0, 10)
        ).age, 40, 225);
        doc.text("3.- VIGENCIA", 40, 255);
        doc.text("Tipo de contrato : " + tip, 40, 270);
        doc.text("Fecha de inicio : " + feci, 40, 285);
        doc.text("Fecha de fin : " + fecf, 40, 300);
        doc.text("4.- SUELDO", 40, 330);
        doc.text("A la cantidad de $: " + sue + " se incluirán las primas definidas de forma interna.", 40, 345);
        doc.text("5.- CONDICIONES LABORALES", 40, 375);
        doc.text("El miembro reconoce expresamente que su relación laboral con el club se rige exclusivamente", 40, 390);
        doc.text("por lo dispuesto en el presente contrato, y por las disposiciones internas del club.", 40, 405);
        doc.text("________________________", 110, 550);
        doc.text("    " + mie, 115, 565);
        doc.text(" MIEMBRO DEL CLUB ", 115, 580);
        doc.text("________________________", 300, 550);
        doc.text("    Edgar Nogales", 315, 565);
        doc.text(" PRESIDENTE DEL CLUB", 315, 580);
        doc.save("contrato" + mie + ".pdf")
    }

    const exportContratos = () => {

        var img = new Image(10, 10);
        img.crossOrigin = "";
        img.src = "//i.imgur.com/qU9CtWQ.png";

        const unit = "pt";
        const size = "A4";
        const orientation = "portrait";

        const doc = new jsPDF(orientation, unit, size);

        doc.setFontSize(15);
        const title = "Listado de contratos";
        const tipo = "Tipo de miembro: " + tipoMiembro.nombre;
        const headers = [["TIPO DE CONTRATO", "NOMBRE DEL MIEMBRO", "SUELDO", "FECHA INICIO", "FECHA DE FIN", "ESTADO"]];

        const rows = [];

        contratos.forEach(contrato => {
            if (contrato.miembro && contrato.miembro.tipo === tipoId && contrato.miembro.estado === "activo") {
                var temp = [contrato.tipo, contrato.miembro && contrato.miembro.nombre, "$ " + contrato.sueldo, String(contrato.fechaInicio).substring(0, 10), (contrato.fechaFin === null ? ("") : (String(contrato.fechaFin).substring(0, 10))), contrato.estado];
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
        doc.save("contratos" + tipoMiembro.nombre + ".pdf")
    }



    const setContratos = () => {
        const data = {
            columns: [
                {
                    label: "Tipo",
                    field: "tipo",
                    sort: "asc",
                },

                {
                    label: "Miembro",
                    field: "nombre",
                    sort: "asc",
                },
                {
                    label: "Sueldo ($)",
                    field: "sueldo",
                    sort: "asc",
                },
                {
                    label: "Fecha de inicio",
                    field: "fechaInicio",
                    sort: "asc",
                },
                {
                    label: "Fecha de fin",
                    field: "fechaFin",
                    sort: "asc",
                },

                {
                    label: "Estado",
                    field: "estado",
                    sort: "asc",
                },

                {
                    label: "Acciones",
                    field: "acciones",
                },
            ],
            rows: [],
        };

        contratos.forEach((contrato) => {
            if (contrato.miembro && contrato.miembro.tipo === tipoId && contrato.miembro.estado === "activo") {
                data.rows.push({
                    tipo: contrato.tipo,
                    nombre: contrato.miembro && contrato.miembro.nombre,
                    sueldo: contrato.sueldo,
                    fechaInicio: String(contrato.fechaInicio).substring(0, 10),
                    fechaFin: (contrato.fechaFin === null ? (<></>) : (String(contrato.fechaFin).substring(0, 10))),
                    estado: contrato.estado,
                    acciones: (
                        <>
                            <Link
                                to={`/admin-contrato/${contrato._id}`}
                                className="btn btn-primary py-1 px-2"
                                title="Editar"
                            >
                                <i className="fa fa-pencil"></i>
                            </Link>
                            {contrato.estado === "terminado" ? (
                                <>
                                    <button
                                        className="btn btn-danger py-1 px-2 ml-2"
                                        title="Eliminar"
                                        onClick={() => {
                                            MySwal.fire({
                                                background: "#f5ede4",
                                                title: "¿Está seguro de eliminar el contrato?",
                                                icon: "warning",
                                                showCancelButton: true,
                                                confirmButtonColor: "#3085d6",
                                                cancelButtonColor: "#d33",
                                                confirmButtonText: "Si",
                                                cancelButtonText: "Cancelar",
                                            }).then((result) => {
                                                if (result.isConfirmed) {
                                                    deleteContratoHandler(contrato._id);
                                                    MySwal.fire({
                                                        background: "#f5ede4",
                                                        icon: "success",
                                                        title: "El contrato ha sido eliminado con éxito",
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
                                    <button
                                        className="btn btn-danger py-1 px-2 ml-2"
                                        disabled
                                    ><i className="fa fa-file-pdf-o"></i></button>
                                </>) : (<>

                                    <button
                                        className="btn btn-danger py-1 px-2 ml-2"
                                        disabled
                                    >
                                        <i className="fa fa-trash"></i>
                                    </button>
                                    <button
                                        className="btn btn-danger py-1 px-2 ml-2"
                                        title="Generar PDF"
                                        onClick={() => {
                                            exportPdf(contrato._id)
                                        }}
                                    ><i className="fa fa-file-pdf-o"></i></button></>)}

                        </>
                    ),
                });
            }
        });

        return data;
    };

    const deleteContratoHandler = (id) => {
        dispatch(deleteContrato(id));
    };


    return (
        <>
            <MetaData title={"Listar contratos"} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>
                <div className="dashboard">
                    <div className="col-12 col-md-10">
                        <>
                            <br />
                            <Link
                                to={`/admin-contrato`}
                                className="btn btn-primary btn-radius"
                            >
                                Crear nuevo
                            </Link>
                            <h3 className="my-4">Listado de contratos</h3>

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
                                                    {tipoMiembros.filter(tipoM => tipoM.estado === "activo").map(filtTipoM => (
                                                        <option
                                                            key={filtTipoM._id}
                                                            value={filtTipoM._id}
                                                        >
                                                            {filtTipoM.nombre}
                                                        </option>
                                                    ))}

                                                </select>
                                            )}
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="botonpdf">
                                <button
                                    className="btn btn-danger py-1 px-2 ml-2"
                                    onClick={() => {
                                        exportContratos()
                                    }}
                                    title="Generar PDF"
                                >

                                    <i className="fa fa-file-pdf-o"></i>
                                </button>
                            </div>
                            <MDBDataTable
                                data={setContratos()}
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

export default ListContratos;
