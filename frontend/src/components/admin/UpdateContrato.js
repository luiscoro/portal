import React, { useState, useEffect } from "react";
import MetaData from "../section/MetaData";
import Sidebar from "./Sidebar";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useDispatch, useSelector } from "react-redux";
import {
    getContratoDetails,
    updateContrato,
    clearErrors,
} from "../../actions/contratoActions";
import { UPDATE_CONTRATO_RESET } from "../../constants/contratoConstants";

var MySwal;

const UpdateContrato = ({ match, history }) => {

    const [tipo, setTipo] = useState("");
    const [estado, setEstado] = useState("");
    const [sueldo, setSueldo] = useState(0);
    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaFin, setFechaFin] = useState("");

    MySwal = withReactContent(Swal);
    const dispatch = useDispatch();

    const { error, contrato } = useSelector((state) => state.contratoDetails);
    const { error: updateError, esActualizado } = useSelector(
        (state) => state.contrato
    );

    const contratoId = match.params.id;

    useEffect(() => {
        if (contrato && contrato._id !== contratoId) {
            dispatch(getContratoDetails(contratoId));
        } else {
            setTipo(contrato.tipo);
            setEstado(contrato.estado);
            setSueldo(contrato.sueldo);
            setFechaInicio(contrato.fechaInicio);
            setFechaFin(contrato.fechaFin);
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
            history.push("/admin-contratos");
            dispatch({
                type: UPDATE_CONTRATO_RESET,
            });
        }
    }, [
        dispatch,
        error,
        history,
        esActualizado,
        updateError,
        contratoId,
        contrato,
    ]);

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set("tipo", tipo);
        formData.set("estado", estado);
        formData.set("sueldo", sueldo);
        formData.set("fechaInicio", fechaInicio);
        formData.set("fechaFin", fechaFin);
        dispatch(updateContrato(contrato._id, formData));
    };


    return (
        <>
            {" "}
            <MetaData title={"Actualizar contrato"} />
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
                                                    <h3 className="title">Actualizar contrato</h3>

                                                    <form
                                                        className="login-form"
                                                        onSubmit={submitHandler}
                                                    >
                                                        <div className="frm-group">
                                                            <label>Tipo de contrato</label>
                                                            <select
                                                                value={tipo}
                                                                onChange={(e) => setTipo(e.target.value)}
                                                            >
                                                                <option value="definido">definido</option>
                                                                <option value="indefinido">indefinido</option>
                                                            </select>
                                                        </div>
                                                        <div className="frm-group">
                                                            <label>Sueldo ($)</label>
                                                            <input
                                                                type="number"
                                                                placeholder="Ingresa el sueldo"
                                                                value={sueldo}
                                                                onChange={(e) => setSueldo(e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="frm-group">
                                                            <label>Estado:</label>
                                                            <select
                                                                name="estado"
                                                                value={estado}
                                                                onChange={(e) => setEstado(e.target.value)}

                                                            >
                                                                <option value="vigente">vigente</option>
                                                                <option value="terminado">terminado</option>
                                                            </select>
                                                        </div>
                                                        <div className="frm-group">
                                                            {estado === "terminado" ? (
                                                                <>
                                                                    <label>Fecha de inicio</label>
                                                                    <input
                                                                        type="date"
                                                                        value={String(fechaInicio).substring(0, 10)}
                                                                        onChange={(e) => setFechaInicio(e.target.value)}

                                                                    />
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <label>Fecha de inicio</label>
                                                                    <input
                                                                        type="date"
                                                                        value={String(fechaInicio).substring(0, 10)}
                                                                        onChange={(e) => setFechaInicio(e.target.value)}
                                                                        disabled

                                                                    />
                                                                </>
                                                            )}

                                                        </div>
                                                        <div className="frm-group">

                                                            {tipo === "indefinido" ? (
                                                                <></>
                                                            ) : (
                                                                <>
                                                                    <label>Fecha de fin</label>
                                                                    <input
                                                                        name="fechaFin"
                                                                        type="date"
                                                                        value={String(fechaFin).substring(0, 10)}
                                                                        onChange={(e) => setFechaFin(e.target.value)}
                                                                    />
                                                                </>
                                                            )}
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

export default UpdateContrato;
