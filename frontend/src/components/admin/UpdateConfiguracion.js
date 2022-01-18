import React, { useState, useEffect } from "react";
import MetaData from "../section/MetaData";
import Sidebar from "./Sidebar";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useDispatch, useSelector } from "react-redux";
import {
    getAdminConfiguraciones,
    updateConfiguracion,
    clearErrors,
} from "../../actions/configuracionActions";
import { UPDATE_CONFIGURACION_RESET } from "../../constants/configuracionConstants";

var MySwal;

const UpdateConfiguracion = ({ history }) => {

    const [porcentajeIva, setPorcentajeIva] = useState(12);
    const [costoEnvio, setCostoEnvio] = useState(5);

    MySwal = withReactContent(Swal);
    const dispatch = useDispatch();

    const { error, configuracion } = useSelector(
        (state) => state.configuraciones
    );

    localStorage.setItem("configId", configuracion._id);

    const { error: updateError, esActualizado } = useSelector(
        (state) => state.configuracion

    );

    const configId = localStorage.getItem("configId");


    useEffect(() => {

        if (configuracion && configuracion._id !== configId) {
            dispatch(getAdminConfiguraciones());
        } else {
            setPorcentajeIva(configuracion.porcentajeIva);
            setCostoEnvio(configuracion.costoEnvio);
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
            dispatch({
                type: UPDATE_CONFIGURACION_RESET,
            });
            MySwal.fire({
                background: "#f5ede4",
                icon: "success",
                title: "La configuración ha sido actualizada con éxito",
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
    }, [
        dispatch,
        error,
        history,
        esActualizado,
        updateError,
        configId,
        configuracion,
    ]);

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set("id", configuracion._id);
        formData.set("porcentajeIva", porcentajeIva);
        formData.set("costoEnvio", costoEnvio);
        dispatch(updateConfiguracion(formData));
    };


    return (
        <>
            {" "}
            <MetaData title={"Actualizar configuración"} />
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
                                                    <h3 className="title">Actualizar configuración</h3>

                                                    <form
                                                        className="login-form"
                                                        onSubmit={submitHandler}
                                                    >
                                                        <div className="frm-group">
                                                            <label>IVA (%)</label>
                                                            <input
                                                                type="number"
                                                                placeholder="Ingresa el IVA "
                                                                value={porcentajeIva}
                                                                min={1}
                                                                max={20}
                                                                step="0.1"
                                                                onChange={(e) => setPorcentajeIva(e.target.value)}
                                                            />
                                                        </div>

                                                        <div className="frm-group">
                                                            <label>Precio de envío ($)</label>
                                                            <input
                                                                type="number"
                                                                placeholder="Ingresa el precio de envío "
                                                                value={costoEnvio}
                                                                min={5}
                                                                max={20}
                                                                step="0.1"
                                                                onChange={(e) => setCostoEnvio(e.target.value)}
                                                            />
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

export default UpdateConfiguracion;
