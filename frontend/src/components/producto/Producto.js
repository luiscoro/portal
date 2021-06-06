import React from "react";
import { Link } from "react-router-dom";

const Producto = ({ producto, col }) => {
  return (
    <div className={`product-store mb-30 col-lg-${col}`}>
      <div className="product-thumb">
        <img src={producto.imagenes[0].url} alt="" />
      </div>
      <div className="content">
        <h4 className="product-name">
          <Link to={`/tienda/productos/${producto._id}`}>
            {producto.nombre}
          </Link>
        </h4>
        <span className="product-price">$ {producto.precio}</span>
        <div className="product-ratings">
          <div className="rating-outer">
            <div
              className="rating-inner"
              style={{
                width: `${(producto.calificaciones / 5) * 100}%`,
              }}
            ></div>
          </div>
        </div>
      </div>
      <div className="product-store-cart">
        <Link to={`/tienda/productos/${producto._id}`}>
          {" "}
          <i className="fa fa-eye" />
        </Link>
      </div>
    </div>
  );
};

export default Producto;
