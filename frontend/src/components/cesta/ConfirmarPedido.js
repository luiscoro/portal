import React from "react";
import { Link } from "react-router-dom";
import MetaData from "../section/MetaData";
import Verificacion from "./Verificacion";
import { useSelector } from "react-redux";

const ConfirmarPedido = ({ history }) => {
  const { itemsCesta } = useSelector((state) => state.cesta);
  const { usuario } = useSelector((state) => state.auth);

  const precioItems = itemsCesta.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );
  const precioEnvio = precioItems > 50 ? 0 : 5;
  const precioImpuesto = Number((0.12 * precioItems).toFixed(2));
  const precioTotal = (precioItems + precioEnvio + precioImpuesto).toFixed(2);

  const confirmarPedido = () => {
    const data = {
      precioItems: precioItems.toFixed(2),
      precioEnvio,
      precioImpuesto,
      precioTotal,
    };

    sessionStorage.setItem("infoPedido", JSON.stringify(data));
    history.push("/pago");
  };
  return (
    <>
      <MetaData title={"Confirmar pedido"} />
      <Verificacion envio confirmarPedido />
      <section className="cart-section pt-120 pb-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-10">
              <h4 className="mb-3">Información de envío</h4>
              <p>
                <b>Nombre:</b> {usuario && usuario.nombre}
              </p>
              <p>
                <b>Teléfono:</b> {usuario && usuario.telefono}
              </p>
              <p>
                <b>Dirección:</b> {usuario && usuario.direccion}
              </p>
              <p>
                <b>Ciudad:</b> {usuario && usuario.ciudad}
              </p>
              <p>
                <b>Código postal:</b> {usuario && usuario.codigoPostal}
              </p>

              <hr />
              <h4 className="mt-4">Tú cesta:</h4>

              {itemsCesta.map((item) => (
                <>
                  <hr />
                  <div className="cart-item my-1" key={item.producto}>
                    <div className="row">
                      <div className="col-4 col-lg-2">
                        <img src={item.imagen} alt="" height="45" width="65" />
                      </div>

                      <div className="col-5 col-lg-6">
                        <Link to={`/tienda/productos/${item.producto}`}>
                          {item.nombre}
                        </Link>
                      </div>

                      <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                        <p>
                          {item.cantidad} x ${item.precio} ={" "}
                          <b>${(item.cantidad * item.precio).toFixed(2)}</b>
                        </p>
                      </div>
                    </div>
                  </div>
                  <hr />
                </>
              ))}
            </div>
            <div className="col-lg-2 order-lg-2 order-1">
              <div className="order-summary-wrapper">
                <h4 className="title">Resumen</h4>
                <ul className="order-summary-list">
                  <li>
                    <span className="caption">subtotal</span>
                    <span>${precioItems}</span>
                  </li>
                  <li>
                    <span className="caption">envío</span>
                    <span>${precioEnvio}</span>
                  </li>
                  <li>
                    <span className="caption">impuestos</span>
                    <span>${precioImpuesto}</span>
                  </li>
                  <li>
                    <span className="caption">total</span>
                    <span>${precioTotal}</span>
                  </li>
                </ul>
                <button
                  className="btn btn-primary btn-radius"
                  onClick={confirmarPedido}
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ConfirmarPedido;
