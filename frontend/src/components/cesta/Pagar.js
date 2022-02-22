import React, { useEffect, useState } from "react";
import MetaData from "../section/MetaData";
import Verificacion from "./Verificacion";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Loader from "../section/Loader";
import { useDispatch, useSelector } from "react-redux";
import { createPedido, clearErrors } from "../../actions/pedidoActions";
import axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';

var MySwal;

const Pagar = () => {
    MySwal = withReactContent(Swal);
    const dispatch = useDispatch();
    const { usuario } = useSelector((state) => state.auth);
    const { itemsCesta } = useSelector((state) => state.cesta);
    const { error } = useSelector((state) => state.createPedido);

    const [sdkReady, setSdkReady] = useState(false);

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

        const addPayPalScript = async () => {
            const { data: clientId } = await axios.get('/api/config/paypal')
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            script.onload = () => {
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }

        if (!window.paypal) {
            addPayPalScript()
        } else {
            setSdkReady(true)
        }
    }, [dispatch, error]);

    const pedido = {
        itemsPedido: itemsCesta,
    };

    const infoPedido = JSON.parse(sessionStorage.getItem("infoPedido"));
    if (infoPedido) {
        pedido.precioItems = infoPedido.precioItems;
        pedido.precioEnvio = infoPedido.precioEnvio;
        pedido.precioImpuesto = infoPedido.precioImpuesto;
        pedido.precioTotal = infoPedido.precioTotal;
    }

    const successPaymentHandler = () => {
        let d = new Date();
        let time = Date.now(d);
        pedido.infoPago = {
            id: time + usuario._id,
            estado: "exitoso",
        };
        pedido.infoEnvio = {
            ciudad: usuario.ciudad,
            direccion: usuario.direccion,
            telefono: usuario.telefono,
            codigoPostal: usuario.codigoPostal,
        };
        pedido.usuario = usuario._id;
        dispatch(createPedido(pedido));
        localStorage.removeItem("itemsCesta");
        MySwal.fire({
            background: "#f5ede4",
            icon: "success",
            title: "El pedido se ha realizado con éxito",
            timer: 5000,
            showConfirmButton: true,
            confirmButtonColor: "#3085d6",
            showCloseButton: false,
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = "/pedidos";
            } else {
                window.location.href = "/pedidos";
            }
        });

    }

    return (
        <>
            {" "}
            <MetaData title={"Pagar pedido"} />
            <Verificacion envio confirmarPedido pago />
            <section className="login-section pt-120 pb-120">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="login-block text-center">
                                <div className="login-block-inner">
                                    <h3 className="title">Pagar {` - $ ${infoPedido && infoPedido.precioTotal}`}</h3>
                                    {!sdkReady ? (
                                        <Loader />
                                    ) : (
                                        <PayPalButton
                                            amount={infoPedido && infoPedido.precioTotal}
                                            onSuccess={successPaymentHandler}
                                            shippingPreference="NO_SHIPPING"
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Pagar
