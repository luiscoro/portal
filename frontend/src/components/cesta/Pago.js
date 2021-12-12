import React, { useEffect } from "react";

import MetaData from "../section/MetaData";
import Verificacion from "./Verificacion";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useDispatch, useSelector } from "react-redux";
import { createPedido, clearErrors } from "../../actions/pedidoActions";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";

import axios from "axios";

var MySwal;
const options = {
  style: {
    base: {
      fontSize: "16px",
    },
    invalid: {
      color: "#9e2146",
    },
  },
};

const Pago = ({ history }) => {
  MySwal = withReactContent(Swal);

  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();

  const { usuario } = useSelector((state) => state.auth);
  const { itemsCesta } = useSelector((state) => state.cesta);
  const { error } = useSelector((state) => state.createPedido);

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

  const pagoData = {
    amount: Math.round(infoPedido.precioTotal * 100),
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    document.querySelector("#pay_btn").disabled = true;

    let res;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      res = await axios.post("/api/pago/procesar", pagoData, config);

      const clientSecret = res.data.client_secret;

      if (!stripe || !elements) {
        return;
      }

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: usuario.nombre,
            email: usuario.email,
          },
        },
      });

      if (result.error) {
        MySwal.fire({
          background: "#f5ede4",
          toast: true,
          showCloseButton: true,
          icon: "error",
          iconColor: "red",
          title: result.error.message,
          position: "bottom",
          showConfirmButton: false,
          timer: 5000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseover", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });
        document.querySelector("#pay_btn").disabled = false;
      } else {
        if (result.paymentIntent.status === "succeeded") {
          pedido.infoPago = {
            id: result.paymentIntent.id,
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
          });

          window.location.href = "/pedidos";
        } else {
          MySwal.fire({
            background: "#f5ede4",
            toast: true,
            showCloseButton: true,
            icon: "error",
            iconColor: "red",
            title:
              "Ocurrió un error mientras se procesaba el pago, vuelva a intentarlo",
            position: "bottom",
            showConfirmButton: false,
            timer: 5000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseover", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });
        }
      }
    } catch (error) {
      document.querySelector("#pay_btn").disabled = false;
      MySwal.fire({
        background: "#f5ede4",
        toast: true,
        showCloseButton: true,
        icon: "error",
        iconColor: "red",
        title: error.response.data.message,
        position: "bottom",
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseover", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });
    }
  };
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
                  <h3 className="title">Pagar pedido</h3>
                  <form
                    className="login-form"
                    onSubmit={submitHandler}
                    autoComplete="off"
                  >
                    <div className="frm-group">
                      <label>Número de tarjeta</label>
                      <br />

                      <CardNumberElement
                        type="text"
                        id="card_num_field"
                        options={options}
                      />
                    </div>
                    <div className="frm-group">
                      <label>Fecha de caducidad</label>
                      <br />
                      <CardExpiryElement
                        type="text"
                        id="card_exp_field"
                        options={options}
                      />
                    </div>

                    <div className="frm-group">
                      <label>Código de seguridad (CVC)</label>
                      <br />
                      <CardCvcElement
                        type="text"
                        id="card_cvc_field"
                        options={options}
                      />
                    </div>
                    <div className="frm-group">
                      <button
                        id="pay_btn"
                        type="submit"
                        className="btn btn-primary btn-radius"
                      >
                        Pagar {` - $ ${infoPedido && infoPedido.precioTotal}`}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Pago;
