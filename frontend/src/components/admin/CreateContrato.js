import React, { useState, useEffect } from "react";
import MetaData from "../section/MetaData";
import Sidebar from "./Sidebar";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Loader from "../section/Loader";
import { useDispatch, useSelector } from "react-redux";
import { createContrato, clearErrors } from "../../actions/contratoActions";
import { getAdminMiembros } from "../../actions/miembroActions";
import { getAdminTipoMiembros } from "../../actions/tipoMiembroActions";
import { CREATE_CONTRATO_RESET } from "../../constants/contratoConstants";

var MySwal;

const CreateContrato = ({ history }) => {
    const [miembro, setMiembro] = useState("");
    const [tipoMiembro, setTipoMiembro] = useState("");
    const [tipo, setTipo] = useState("");
    const [sueldo, setSueldo] = useState(200.0);
    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaFin, setFechaFin] = useState("");

    MySwal = withReactContent(Swal);
    const dispatch = useDispatch();
    const dispatch1 = useDispatch();
    const dispatch2 = useDispatch();

    const { error, success } = useSelector((state) => state.createContrato);
    const { miembros } = useSelector((state) => state.miembros);
    const { loading1, tipoMiembros } = useSelector((state) => state.tipoMiembros);

    useEffect(() => {
        dispatch1(getAdminMiembros());
        dispatch2(getAdminTipoMiembros());
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

        if (success) {
            history.push("/admin-contratos");
            MySwal.fire({
                background: "#f5ede4",
                icon: "success",
                title: "El contrato ha sido creado con éxito",
                showConfirmButton: false,
                showCloseButton: false,
                timer: 2000,
            });
            dispatch({ type: CREATE_CONTRATO_RESET });
        }
    }, [dispatch, error, success, history, dispatch1, dispatch2]);

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set("miembro", miembro);
        formData.set("tipo", tipo);
        formData.set("sueldo", sueldo);
        formData.set("fechaInicio", fechaInicio);
        formData.set("fechaFin", fechaFin);

        dispatch(createContrato(formData));
    };


    return (
        <>
            {" "}
            <MetaData title={"Nuevo contrato"} />
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
                                                    <h3 className="title">Nuevo contrato</h3>
                                                    <form
                                                        className="login-form"
                                                        onSubmit={submitHandler}
                                                    >
                                                        <div className="frm-group">
                                                            <label>Tipo de miembro</label>
                                                            {loading1 ? (
                                                                <Loader />
                                                            ) : (
                                                                <select
                                                                    value={tipoMiembro}
                                                                    onChange={(e) => setTipoMiembro(e.target.value)}
                                                                >
                                                                    <option value={""}>
                                                                        Seleccione el tipo de miembro
                                                                    </option>
                                                                    {tipoMiembros.map((tipo) => (
                                                                        <option
                                                                            key={tipo._id}
                                                                            value={tipo.nombre}
                                                                        >
                                                                            {tipo.nombre}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                            )}
                                                        </div>

                                                        <div className="frm-group">
                                                            <label>Miembro</label>
                                                            {tipoMiembro === "" ? (
                                                                <option value={""}>
                                                                    Seleccione primero el tipo de miembro
                                                                </option>
                                                            ) : (
                                                                <select
                                                                    name="miembro"
                                                                    value={miembro}
                                                                    onChange={(e) => setMiembro(e.target.value)}
                                                                >
                                                                    <option value={""}>
                                                                        Seleccione el miembro del club
                                                                    </option>
                                                                    {miembros.filter(miembro => (miembro.tipo && miembro.tipo.nombre) === tipoMiembro && miembro.estado === "activo").map(filtmiembro => (
                                                                        <option
                                                                            key={filtmiembro._id}
                                                                            value={filtmiembro._id}
                                                                        >
                                                                            {filtmiembro.nombre}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                            )}
                                                        </div>

                                                        <div className="frm-group">
                                                            <label>Tipo de contrato:</label>
                                                            <select
                                                                name="tipo"
                                                                value={tipo}
                                                                onChange={(e) => setTipo(e.target.value)}
                                                            >
                                                                <option value={""}>
                                                                    Seleccione el tipo de contrato
                                                                </option>
                                                                <option value="definido">definido</option>
                                                                <option value="indefinido">indefinido</option>
                                                            </select>
                                                        </div>
                                                        <div className="frm-group">
                                                            <label>Sueldo:</label>
                                                            <input
                                                                name="sueldo"
                                                                type="number"
                                                                value={sueldo}
                                                                onChange={(e) => setSueldo(e.target.value)}
                                                            />
                                                        </div>

                                                        <div className="frm-group">
                                                            <label>Fecha de inicio</label>
                                                            <input
                                                                name="fechaInicio"
                                                                type="date"
                                                                value={fechaInicio}
                                                                onChange={(e) => setFechaInicio(e.target.value)}
                                                            />
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
                                                                        value={fechaFin}
                                                                        onChange={(e) => setFechaFin(e.target.value)}
                                                                    />
                                                                </>
                                                            )}
                                                        </div>

                                                        <div className="frm-group">
                                                            <input type="submit" value="Crear" />
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

export default CreateContrato;
