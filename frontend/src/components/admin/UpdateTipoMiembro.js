import React, { useState, useEffect } from "react";
import MetaData from "../section/MetaData";
import Sidebar from "./Sidebar";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useDispatch, useSelector } from "react-redux";
import {
    updateTipoMiembro,
    getTipoMiembroDetails,
    clearErrors,
} from "../../actions/tipoMiembroActions";
import { UPDATE_TIPOMIEMBRO_RESET } from "../../constants/tipoMiembroConstants";

var MySwal;

const UpdateTipoMiembro = ({ history, match, location }) => {
    const [nombre, setNombre] = useState("");
    const [estado, setEstado] = useState("");

    MySwal = withReactContent(Swal);
    const dispatch = useDispatch();

    const { error, tipoMiembro } = useSelector((state) => state.tipoMiembroDetails);
    const { error: updateError, esActualizado } = useSelector(
        (state) => state.tipoMiembro
    );

    const tipoMiembroId = match.params.id;

    useEffect(() => {
        console.log(tipoMiembro && tipoMiembro._id !== tipoMiembroId);
        if (tipoMiembro && tipoMiembro._id !== tipoMiembroId) {
            dispatch(getTipoMiembroDetails(tipoMiembroId));
        } else {
            setNombre(tipoMiembro.nombre);
            setEstado(tipoMiembro.estado);
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

        if (updateError) {
            MySwal.fire({
                background: "#f5ede4",
                toast: true,
                showCloseButton: true,
                icon: "error",
                iconColor: "red",
                title: updateError,
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

        if (esActualizado) {
            localStorage.setItem("actualizado", "1");
            history.push("/admin-tipomiembros");

            dispatch({
                type: UPDATE_TIPOMIEMBRO_RESET,
            });
        }
    }, [
        dispatch,
        error,
        location,
        history,
        esActualizado,
        updateError,
        tipoMiembroId,
        tipoMiembro,
    ]);

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set("nombre", nombre);
        formData.set("estado", estado);

        dispatch(updateTipoMiembro(tipoMiembro._id, formData));
    };
    return (
        <>
            {" "}
            <MetaData title={"Actualizar tipo de miembro"} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>
                <div className="dashboard">
                    <div className="col-12 col-md-10">
                        <>
                            <section className="login-section pt-120 pb-120">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="login-block text-center">
                                                <div className="login-block-inner">
                                                    <h3 className="title">Actualizar tipo de miembro</h3>

                                                    <form className="login-form" onSubmit={submitHandler}>
                                                        <div className="frm-group">
                                                            <label>Nombre</label>
                                                            <input
                                                                type="text"
                                                                disabled
                                                                value={nombre}
                                                                onChange={(e) => setNombre(e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="frm-group">
                                                            <label>Estado:</label>
                                                            <select
                                                                value={estado}
                                                                onChange={(e) => setEstado(e.target.value)}
                                                            >
                                                                <option value="activo">activo</option>
                                                                <option value="inactivo">inactivo</option>
                                                            </select>
                                                        </div>
                                                        <div className="frm-group">
                                                            <input type="submit" value="Actualizar" />
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UpdateTipoMiembro;
