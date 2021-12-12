import React, { useState, useEffect } from "react";

import MetaData from "../section/MetaData";
import Sidebar from "./Sidebar";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useDispatch, useSelector } from "react-redux";
import { createTipoMiembro, clearErrors } from "../../actions/tipoMiembroActions";
import { CREATE_TIPOMIEMBRO_RESET } from "../../constants/tipoMiembroConstants";

var MySwal;

const CreateTipoMiembro = ({ history }) => {
    const [nombre, setNombre] = useState("");

    MySwal = withReactContent(Swal);
    const dispatch = useDispatch();

    const { error, success } = useSelector((state) => state.createTipoMiembro);

    useEffect(() => {
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
            history.push("/admin-tipomiembros");
            MySwal.fire({
                background: "#f5ede4",
                icon: "success",
                title: "El tipo de miembro ha sido creado con éxito",
                showConfirmButton: false,
                showCloseButton: false,
                timer: 2000,
            });
            dispatch({ type: CREATE_TIPOMIEMBRO_RESET });
        }
    }, [dispatch, error, success, history]);

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(createTipoMiembro(nombre));
    };

    return (
        <>
            {" "}
            <MetaData title={"Nuevo tipo de miembro"} />
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
                                                    <h3 className="title">Nuevo tipo de miembro</h3>
                                                    <form className="login-form" onSubmit={submitHandler}>
                                                        <div className="frm-group">
                                                            <label>Nombre</label>
                                                            <input
                                                                name="nombre"
                                                                type="text"
                                                                placeholder="Ingresa el nombre"
                                                                value={nombre}
                                                                onChange={(e) => setNombre(e.target.value)}
                                                            />
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

export default CreateTipoMiembro;
