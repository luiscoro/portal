import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import Pagination from "react-js-pagination";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import MetaData from "./section/MetaData";
import Loader from "./section/Loader";
import Banner from "./section/Banner";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Producto from "./producto/Producto";
import SearchProducto from "./section/SearchProducto";
import { useDispatch, useSelector } from "react-redux";
import { getAdminCategorias } from "../actions/categoriaActions";
import { getProductos } from "../actions/productoActions";

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

var MySwal;

const Tienda = ({ match }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [precio, setPrecio] = useState([1, 100]);
  const [categoria, setCategoria] = useState("");
  const [calificacion, setCalificacion] = useState(0);

  MySwal = withReactContent(Swal);
  const dispatch = useDispatch();
  const dispatch1 = useDispatch();
  const {
    loading,
    productos,
    error,
    productosCount,
    resPerPage,
    filteredProductosCount,
  } = useSelector((state) => state.productos);

  const { categorias } = useSelector((state) => state.categorias);
  const keyword = match.params.keyword;

  useEffect(() => {
    dispatch1(getAdminCategorias());
    if (error) {
      return MySwal.fire({
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
    }
    dispatch(
      getProductos(keyword, currentPage, precio, categoria, calificacion)
    );
  }, [
    dispatch,
    error,
    keyword,
    currentPage,
    precio,
    categoria,
    calificacion,
    dispatch1,
  ]);

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }

  let count = productosCount;
  if (keyword) {
    count = filteredProductosCount;
  }
  return (
    <>
      {" "}
      <MetaData title={"Tienda"} />
      <Banner title={"Tienda"} />
      <div className="d-flex justify-content-end">
        <Route render={({ history }) => <SearchProducto history={history} />} />
      </div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <section className="product-section pt-120 pb-120">
            <div className="container">
              <h4 className="title text-uppercase f-24 mb-30">
                Nuestros productos
              </h4>
              {keyword ? (
                <>
                  {filteredProductosCount === 0 ? (
                    <h5 className="title">No se encontró algún producto con el nombre ingresado</h5>
                  ) : (
                    <div className="row">
                      <div className="col-lg-9">
                        {productos.map((producto) => (
                          <Producto
                            key={producto._id}
                            producto={producto}
                            col={3}
                          />
                        ))}
                      </div>
                      <div className="col-lg-3">
                        <div className="sidebar">
                          <div className="widget">
                            <div className="widget-header">
                              <i className="fa fa-bars" />
                              <h4 className="widget-title">
                                Filtrar por categoría
                              </h4>
                            </div>
                            <ul className="category-list">
                              {categorias.map((categoria) => (
                                <li key={categoria._id}>
                                  <a
                                    href
                                    onClick={() => setCategoria(categoria._id)}
                                    style={{
                                      cursor: "pointer",
                                    }}
                                  >
                                    {categoria.nombre}
                                    <i className="fa fa-angle-double-right" />
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="widget">
                            <div className="widget-header">
                              <i className="fa fa-bars" />
                              <h4 className="widget-title">Filtrar por precio</h4>
                            </div>
                            <div className="price-range">
                              <Range
                                marks={{
                                  1: `$1`,
                                  100: `$100`,
                                }}
                                min={1}
                                max={100}
                                defaultValue={[1, 100]}
                                tipFormatter={(value) => `$${value}`}
                                tipProps={{
                                  placement: "top",
                                  visible: true,
                                }}
                                value={precio}
                                onChange={(precio) => setPrecio(precio)}
                              />
                            </div>
                          </div>

                          <div className="widget">
                            <div className="widget-header">
                              <i className="fa fa-bars" />
                              <h4 className="widget-title">
                                Filtrar por calificación
                              </h4>
                            </div>
                            <ul className="pl-0">
                              {[5, 4, 3, 2, 1, 0].map((star) => (
                                <li
                                  style={{
                                    cursor: "pointer",
                                    listStyleType: "none",
                                  }}
                                  key={star}
                                  onClick={() => setCalificacion(star)}
                                >
                                  <div className="rating-outer">
                                    <div
                                      className="rating-inner"
                                      style={{
                                        width: `${star * 20}%`,
                                      }}
                                    ></div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className="row">
                    <div className="col-lg-9">
                      {productos.map((producto) => (
                        <Producto
                          key={producto._id}
                          producto={producto}
                          col={3}
                        />
                      ))}
                    </div>
                    <div className="col-lg-3">
                      <div className="sidebar">
                        <div className="widget">
                          <div className="widget-header">
                            <i className="fa fa-bars" />
                            <h4 className="widget-title">
                              Filtrar por categoría
                            </h4>
                          </div>
                          <ul className="category-list">
                            {categorias.map((categoria) => (
                              <li key={categoria._id}>
                                <a
                                  href
                                  onClick={() => setCategoria(categoria._id)}
                                  style={{
                                    cursor: "pointer",
                                  }}
                                >
                                  {categoria.nombre}
                                  <i className="fa fa-angle-double-right" />
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="widget">
                          <div className="widget-header">
                            <i className="fa fa-bars" />
                            <h4 className="widget-title">Filtrar por precio</h4>
                          </div>
                          <div className="price-range">
                            <Range
                              style={{
                                cursor: "pointer",
                              }}
                              marks={{
                                1: `$1`,
                                100: `$100`,
                              }}
                              min={1}
                              max={100}
                              defaultValue={[1, 100]}
                              tipFormatter={(value) => `$${value}`}
                              tipProps={{
                                placement: "top",
                                visible: true,
                              }}
                              value={precio}
                              onChange={(precio) => setPrecio(precio)}
                            />
                          </div>
                        </div>

                        <div className="widget">
                          <div className="widget-header">
                            <i className="fa fa-bars" />
                            <h4 className="widget-title">
                              Filtrar por calificación
                            </h4>
                          </div>
                          <ul className="pl-0">
                            {[5, 4, 3, 2, 1, 0].map((star) => (
                              <li
                                style={{
                                  cursor: "pointer",
                                  listStyleType: "none",
                                }}
                                key={star}
                                onClick={() => setCalificacion(star)}
                              >
                                <div className="rating-outer">
                                  <div
                                    className="rating-inner"
                                    style={{
                                      width: `${star * 20}%`,
                                    }}
                                  ></div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </section>

          {resPerPage <= count && (
            <div className="d-flex justify-content-center mt-5">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resPerPage}
                totalItemsCount={productosCount}
                onChange={setCurrentPageNo}
                nextPageText={"Siguiente"}
                prevPageText={"Anterior"}
                firstPageText={"Primera"}
                lastPageText={"Última"}
                itemClass="page-item"
                linkClass="page-link"
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Tienda;
