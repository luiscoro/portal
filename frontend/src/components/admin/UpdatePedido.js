import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MetaData from "../section/MetaData";
import Loader from "../section/Loader";
import Sidebar from "./Sidebar";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useDispatch, useSelector } from "react-redux";
import {
  getPedidoDetails,
  updatePedido,
  clearErrors,
} from "../../actions/pedidoActions";
import { UPDATE_PEDIDO_RESET } from "../../constants/pedidoConstants";

var MySwal;

const UpdatePedido = ({ match, history }) => {
  const [estado, setEstado] = useState("");

  MySwal = withReactContent(Swal);
  const dispatch = useDispatch();

  const { loading, pedido = {} } = useSelector((state) => state.pedidoDetails);
  const {
    infoEnvio,
    itemsPedido,
    infoPago,
    usuario,
    estadoPedido,
    precioTotal,
  } = pedido;
  const { error, esActualizado } = useSelector((state) => state.pedido);
  const pedidoId = match.params.id;

  useEffect(() => {
    dispatch(getPedidoDetails(pedidoId));
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

    if (esActualizado) {
      localStorage.setItem("actualizado", "1");
      history.push("/admin-pedidos");
      dispatch({
        type: UPDATE_PEDIDO_RESET,
      });
    }
  }, [dispatch, history, error, esActualizado, pedidoId]);

  const updaPedidoHandler = (id) => {
    const formData = new FormData();
    formData.set("estado", estado);

    dispatch(updatePedido(id, formData));
  };

  return (
    <>
      {" "}
      <MetaData title={"Actualizar pedido"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="dashboard">
          <div className="col-12 col-md-10">
            <>
              {loading ? (
                <Loader />
              ) : (
                <section className="cart-section pt-120 pb-120">
                  <div className="container">
                    <div className="row">
                      <div className="col-lg-8">
                        <h4 className="mb-4">Información del pedido</h4>
                        <p>
                          <b>Número de pedido:</b> {pedido._id}
                        </p>
                        <p>
                          <b>Identificador del pago:</b>{" "}
                          {infoPago && infoPago.id}
                        </p>
                        <p>
                          <b>Estado pago:</b> {infoPago && infoPago.estado}
                        </p>
                        <p>
                          <b>Estado actual del pedido:</b> {estadoPedido}
                        </p>

                        <h4 className="my-4">Cambiar estado del pedido</h4>

                        <div className="frm-group">
                          <select
                            name="estado"
                            value={estado}
                            onChange={(e) => setEstado(e.target.value)}
                          >
                            <option value="">
                              Seleccione el nuevo estado del pedido
                            </option>
                            <option value="pendiente de envío">
                              Pendiente de envío
                            </option>
                            <option value="enviado">Enviado</option>
                            <option value="entregado">Entregado</option>
                          </select>
                        </div>
                        <div className="text-center">
                          <br />
                          <button
                            className="btn btn-primary btn-radius"
                            onClick={() => updaPedidoHandler(pedido._id)}
                          >
                            Actualizar
                          </button>
                        </div>

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
                                  <Link
                                    to={`/tienda/productos/${item.producto}`}
                                  >
                                    {item.nombre}
                                  </Link>
                                  <p>
                                    Talla :
                                    <b> {item.talla}</b>
                                  </p>
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
                          <b>Identificación:</b> {usuario && usuario.cedula}
                        </p>
                        <p>
                          <b>Correo electrónico:</b> {usuario && usuario.email}
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
                          <b>Código Postal:</b>{" "}
                          {infoEnvio && infoEnvio.codigoPostal}
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
                            <b>Iva({(pedido.precioImpuesto * 100) / pedido.precioItems}%):</b> ${pedido.precioImpuesto}
                          </p>
                          <p>
                            <b>Total:</b> ${precioTotal}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              )}
            </>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdatePedido;
