import React, { useEffect } from "react";
import Loader from "../section/Loader";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAdminProductos, clearErrors } from "../../actions/productoActions";
import OwlCarousel from "react-owl-carousel";

const TopProductos = () => {
  const dispatch = useDispatch();

  const { loading, error, productos } = useSelector((state) => state.productos);

  const options = {
    loop: true,
    margin: 30,
    smartSpeed: 1000,
    dots: false,
    nav: true,
    navText: [
      "<i class='fa fa-chevron-left'></i>",
      "<i class='fa fa-chevron-right'></i>",
    ],
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
      },
      575: {
        items: 2,
      },
      767: {
        items: 3,
      },
      992: {
        items: 3,
      },
    },
  };

  useEffect(() => {
    dispatch(getAdminProductos());
    if (error) {
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  return loading ? (
    <Loader />
  ) : (
    <section className="product-section section-bg pt-120 pb-120">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="section-header text-center">
              <h2 className="section-title text-uppercase">
                <b>Nuestros</b> productos
              </h2>
            </div>
          </div>
        </div>
        <OwlCarousel className="product-slider owl-carousel" {...options}>
          {productos.filter(prod => prod.estado === "activo").map(producto => (
            <div className="product-item" key={producto._id}>
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
              <div className="product-item-cart">
                <Link to={`/tienda/productos/${producto._id}`}>
                  {" "}
                  <i className="fa fa-eye" />
                </Link>
              </div>
            </div>
          ))}
        </OwlCarousel>
      </div>
    </section>
  );
};

export default TopProductos;
