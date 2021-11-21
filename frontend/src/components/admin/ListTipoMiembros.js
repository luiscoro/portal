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
    getAdminTipoMiembros,
    deleteTipoMiembro,
    clearErrors,
} from "../../actions/tipoMiembroActions";
import { DELETE_TIPOMIEMBRO_RESET } from "../../constants/tipoMiembroConstants";

var MySwal;
var bandera;

const ListTipoMiembros = ({ history }) => {
    MySwal = withReactContent(Swal);
    bandera = parseInt(localStorage.getItem("actualizado"));
    const dispatch = useDispatch();
    const { loading, error, tipoMiembros } = useSelector(
        (state) => state.tipoMiembros
    );
    const { error: deleteError, esEliminado } = useSelector(
        (state) => state.tipoMiembro
    );

    useEffect(() => {
        dispatch(getAdminTipoMiembros());

        if (bandera === 1) {
            localStorage.setItem("actualizado", 0);
            MySwal.fire({
                background: "#f5ede4",
                icon: "success",
                title: "El tipo de miembro ha sido actualizado con éxito",
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
            history.push("/admin-tipomiembros");
            dispatch({ type: DELETE_TIPOMIEMBRO_RESET });
        }
    }, [dispatch, error, deleteError, esEliminado, history]);

    const setTipoMiembros = () => {
        const data = {
            columns: [
                {
                    label: "ID",
                    field: "id",
                    sort: "asc",
                },
                {
                    label: "Nombre",
                    field: "nombre",
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

        tipoMiembros.forEach((tipomiembro) => {
            data.rows.push({
                id: tipomiembro._id,
                nombre: tipomiembro.nombre,
                estado: tipomiembro.estado,
                acciones: (
                    <>
                        <Link
                            to={`/admin-tipomiembro/${tipomiembro._id}`}
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
                                    title: "¿Está seguro de inactivar el tipo de miembro?",
                                    icon: "warning",
                                    showCancelButton: true,
                                    confirmButtonColor: "#3085d6",
                                    cancelButtonColor: "#d33",
                                    confirmButtonText: "Si",
                                    cancelButtonText: "Cancelar",
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        deleteTipoMiembroHandler(tipomiembro._id);
                                        MySwal.fire({
                                            background: "#f5ede4",
                                            icon: "success",
                                            title: "El tipo de miembro ha sido inactivado con éxito",
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

    const deleteTipoMiembroHandler = (id) => {
        dispatch(deleteTipoMiembro(id));
    };
    return (
        <>
            <MetaData title={"Listar tipos de miembros"} />
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
                                    to={`/admin-tipomiembro`}
                                    className="btn btn-primary btn-radius"
                                >
                                    Crear nuevo
                                </Link>
                                <h3 className="my-4">Listado de tipos de miembros</h3>

                                <MDBDataTable
                                    data={setTipoMiembros()}
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

export default ListTipoMiembros;
