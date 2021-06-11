import React from "react";
import { Link } from "react-router-dom";
import MetaData from "../section/MetaData";

import { useDispatch, useSelector } from "react-redux";
import { addItemCesta, removeItemCesta } from "../../actions/cestaActions";

const Cesta = ({ history }) => {
  const dispatch = useDispatch();

  const { itemsCesta } = useSelector((state) => state.cesta);

  const removeCestaItemHandler = (id) => {
    dispatch(removeItemCesta(id));
  };

  const increaseCantidad = (id, cantidad, stock) => {
    const newCantidad = cantidad + 1;

    if (newCantidad > stock) return;

    dispatch(addItemCesta(id, newCantidad));
  };

  const decreaseCantidad = (id, cantidad) => {
    const newCantidad = cantidad - 1;

    if (newCantidad <= 0) return;

    dispatch(addItemCesta(id, newCantidad));
  };

  const checkoutHandler = () => {
    history.push("/login?redirect=envio");
  };
  return (
    <>
      <MetaData title={"Tu cesta"} />
      <section className="inner-banner-section bg_img base-overlay">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="inner-banner-content text-center">
                <h2 className="page-title">cesta de compras</h2>
                <ol className="breadcum d-flex justify-content-center">
                  <li>
                    <Link to="/" style={{ textDecoration: "none" }}>
                      Inicio
                    </Link>
                  </li>
                  <li>
                    <Link to="/tienda" style={{ textDecoration: "none" }}>
                      Tienda
                    </Link>
                  </li>
                  <li>cesta de compras</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>
      {itemsCesta.length === 0 ? (
        <h4 className="mt-5" style={{ textAlign: "center" }}>
          Tú cesta está vacía
        </h4>
      ) : (
        <>
          <h4 className="mt-5" style={{ textAlign: "center" }}>
            Tú cesta: <b>{itemsCesta.length} items</b>
          </h4>
          <section className="cart-section pt-120 pb-120">
            <div className="container">
              <div className="row">
                <div className="col-lg-10">
                  <div className="product-table-area table-responsive">
                    <table className="product-table">
                      <thead>
                        <tr>
                          <th>Imagen</th>
                          <th>Producto</th>
                          <th>Cantidad</th>
                          <th>Precio</th>
                          <th>Remover</th>
                        </tr>
                      </thead>
                      <tbody>
                        {itemsCesta.map((item) => (
                          <tr key={item.producto}>
                            <td>
                              <div className="product-thumb">
                                <img
                                  src={item.imagen}
                                  alt=""
                                  height="88"
                                  width="63"
                                />
                              </div>
                            </td>
                            <td>
                              <Link to={`/tienda/productos/${item.producto}`}>
                                {item.nombre}
                              </Link>
                            </td>
                            <td>
                              <div className="stockCounter d-inline">
                                <span
                                  className="btn btn-danger minus"
                                  onClick={() =>
                                    decreaseCantidad(
                                      item.producto,
                                      item.cantidad
                                    )
                                  }
                                >
                                  -
                                </span>

                                <input
                                  type="number"
                                  className="count d-inline"
                                  value={item.cantidad}
                                  readOnly
                                />

                                <span
                                  className="btn btn-primary plus"
                                  onClick={() =>
                                    increaseCantidad(
                                      item.producto,
                                      item.cantidad,
                                      item.stock
                                    )
                                  }
                                >
                                  +
                                </span>
                              </div>
                            </td>
                            <td>
                              <span className="price">$ {item.precio}</span>
                            </td>

                            <td>
                              <button type="button" className="delete-btn">
                                <i
                                  className="fa fa-trash"
                                  onClick={() =>
                                    removeCestaItemHandler(item.producto)
                                  }
                                />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="col-lg-2 order-lg-2 order-1">
                  <div className="order-summary-wrapper">
                    <h4 className="title">Resumen del pedido</h4>
                    <ul className="order-summary-list">
                      <li>
                        <span className="caption">subtotal</span>
                        <span>
                          {itemsCesta.reduce(
                            (acc, item) => acc + Number(item.cantidad),
                            0
                          )}{" "}
                          (Unidades)
                        </span>
                      </li>
                      <li>
                        <span className="caption">total</span>
                        <span>
                          {" "}
                          $
                          {itemsCesta
                            .reduce(
                              (acc, item) => acc + item.cantidad * item.precio,
                              0
                            )
                            .toFixed(2)}
                        </span>
                      </li>
                    </ul>
                    <button
                      className="btn btn-primary btn-radius"
                      onClick={checkoutHandler}
                    >
                      Pagar
                    </button>
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

export default Cesta;