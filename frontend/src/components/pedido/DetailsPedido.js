import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import MetaData from "../section/MetaData";
import Banner from "../section/Banner";
import Loader from "../section/Loader";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useDispatch, useSelector } from "react-redux";
import { getPedidoDetails, clearErrors } from "../../actions/pedidoActions";

var MySwal;

const DetailsPedido = ({ match }) => {
  MySwal = withReactContent(Swal);
  const dispatch = useDispatch();

  const {
    loading,
    error,
    pedido = {},
  } = useSelector((state) => state.pedidoDetails);
  const {
    infoEnvio,
    itemsPedido,
    infoPago,
    usuario,
    precioTotal,
    estadoPedido,
  } = pedido;

  useEffect(() => {
    dispatch(getPedidoDetails(match.params.id));

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
  }, [dispatch, error, match.params.id]);

  return (
    <>
      {" "}
      <MetaData title={"Detalles pedido"} />
      <Banner title={"Detalles pedido"} />
      {loading ? (
        <Loader />
      ) : (
        <>
          <section className="cart-section pt-120 pb-120">
            <div className="container">
              <div className="row">
                <div className="col-lg-8">
                  <h4 className="mb-4">Información del pedido</h4>
                  <p>
                    <b>Número de pedido:</b> {pedido._id}
                  </p>
                  <p>
                    <b>Estado pedido:</b> {estadoPedido}
                  </p>
                  <p>
                    <b>Estado pago:</b> {infoPago && infoPago.estado}
                  </p>

                  <h4 className="my-4">Productos</h4>

                  <div className="cart-item my-1">
                    {itemsPedido &&
                      itemsPedido.map((item) => (
                        <div key={item.producto} className="row my-5">
                          <div className="col-4 col-lg-2">
                            <img
                              src={item.imagen}
                              alt={item.nombre}
                              height="45"
                              width="65"
                            />
                          </div>

                          <div className="col-5 col-lg-5">
                            <Link to={`/tienda/productos/${item.producto}`}>
                              {item.nombre}
                            </Link>
                          </div>

                          <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                            <p>
                              {item.cantidad} x ${item.precio} ={" "}
                              <b>${(item.cantidad * item.precio).toFixed(2)}</b>
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                <div className="col-lg-4">
                  <h4 className="mb-4">Información de envío</h4>
                  <p>
                    <b>Nombre:</b> {usuario && usuario.nombre}
                  </p>
                  <p>
                    <b>Dirección:</b> {infoEnvio && infoEnvio.direccion}
                  </p>
                  <p>
                    <b>Teléfono:</b> {infoEnvio && infoEnvio.telefono}
                  </p>

                  <p>
                    <b>Ciudad:</b> {infoEnvio && infoEnvio.ciudad}
                  </p>
                  <p>
                    <b>Código Postal:</b> {infoEnvio && infoEnvio.codigoPostal}
                  </p>

                  <br></br>
                  <div className="order-summary-wrapper">
                    <h4 className="mb-4">Resumen del pago</h4>

                    <p>
                      <b>Subtotal:</b> ${pedido.precioItems}
                    </p>
                    <p>
                      <b>Envío:</b> ${pedido.precioEnvio}
                    </p>
                    <p>
                      <b>Iva(12%):</b> ${pedido.precioImpuesto}
                    </p>
                    <p>
                      <b>Total:</b> ${precioTotal}
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default DetailsPedido;
