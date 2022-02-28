import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../section/Loader";
import MetaData from "../section/MetaData";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Carousel } from "react-bootstrap";
import ListRevisiones from "../revision/ListRevisiones";
import {
  getProductoDetails,
  createRevision,
  clearErrors,
} from "../../actions/productoActions";
import { addItemCesta } from "../../actions/cestaActions";
import { CREATE_REVISION_RESET } from "../../constants/productoConstants";

var MySwal;
var cant;
var idProd;
var temporales;

const DetailsProducto = ({ match }) => {
  const [cantidad, setCantidad] = useState(1);
  const [calificacion, setCalificacion] = useState(0);
  const [comentario, setComentario] = useState("");
  const [talla, setTalla] = useState("");

  MySwal = withReactContent(Swal);
  const dispatch = useDispatch();

  const { loading, error, producto } = useSelector(
    (state) => state.productoDetails
  );
  const { usuario } = useSelector((state) => state.auth);
  const { error: revisionError, success } = useSelector(
    (state) => state.createRevision
  );

  useEffect(() => {
    dispatch(getProductoDetails(match.params.id));
    localStorage.setItem("idProd", producto._id);

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

    if (revisionError) {
      MySwal.fire({
        background: "#f5ede4",
        toast: true,
        showCloseButton: true,
        icon: "warning",
        iconColor: "orange",
        title: revisionError,
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
      MySwal.fire({
        background: "#f5ede4",
        toast: true,
        showCloseButton: true,
        icon: "success",
        iconColor: "green",
        title: "Su valoración ha sido registrada con éxito",
        position: "bottom",
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseover", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });
      dispatch({ type: CREATE_REVISION_RESET });
    }

  }, [dispatch, error, revisionError, match.params.id, success, producto._id]);


  const addCesta = () => {

    idProd = localStorage.getItem("idProd");

    var temp = localStorage.getItem("itemsCesta")

    temporales = temp ? JSON.parse(temp) : [];

    if (!Object.keys(temporales).length) {
      cant = 0;
    } else {
      const res = temporales.some(item => item.producto === String(idProd));

      if (res) {
        const result = temporales.filter(tempo => tempo.producto === String(idProd));
        cant = result[0].cantidad;
      } else {
        cant = 0;
      }

    }

    cant = cant + cantidad;

    if (cant > producto.stock) {
      MySwal.fire({
        background: "#f5ede4",
        icon: "warning",
        iconColor: "orange",
        title: "Lo sentimos, no se puede agregar más de la cantidad disponible del producto",
        html:
          '<b>' + producto.nombre + '</b> ' +
          '<p></p> ' +
          'Cantidad disponible: ' + producto.stock + '<p></p> ' +
          'Cantidad que deseas agregar : ' + cant,
        showCancelButton: true,
        confirmButtonColor: "#0047a5",
        cancelButtonColor: "#008000",
        confirmButtonText: "Ver cesta",
        cancelButtonText: "Comprar otros productos",

      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/cesta";
        } else {
          window.location.href = "/tienda";
        }
      });
    } else {
      if (talla === "" && producto.tallas && producto.tallas.length !== 0) {
        MySwal.fire({
          background: "#f5ede4",
          toast: true,
          showCloseButton: true,
          icon: "warning",
          iconColor: "orange",
          title: "Se debe seleccionar la talla",
          position: "bottom",
          showConfirmButton: false,
          timer: 5000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseover", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });
      } else {
        dispatch(addItemCesta(match.params.id, cant, talla));
        MySwal.fire({
          background: "#f5ede4",
          icon: "success",
          iconColor: "green",
          title: "El producto ha sido añadido a tu cesta de pedidos",
          html:
            '<b>' + producto.nombre + '</b> ' +
            '<p></p> ' +
            'Cantidad : ' + cant + '<p></p> ' +
            'Precio : $' + producto.precio + '<p></p> ' + (producto.tallas && producto.tallas.length !== 0 ?
              'Talla: ' + talla : ''),
          showCancelButton: true,
          confirmButtonColor: "#0047a5",
          cancelButtonColor: "#008000",
          confirmButtonText: "Ver cesta",
          cancelButtonText: "Continuar comprando",

        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "/cesta";
          }
        });
      }
    }
  };

  const increaseCantidad = () => {
    const count = document.querySelector(".count");

    if (count.valueAsNumber >= producto.stock) return;

    const cantidad = count.valueAsNumber + 1;

    setCantidad(cantidad);
  };

  const decreaseCantidad = () => {
    const count = document.querySelector(".count");

    if (count.valueAsNumber <= 1) return;

    const cantidad = count.valueAsNumber - 1;

    setCantidad(cantidad);
  };

  function setUsuarioCalificaciones() {
    const stars = document.querySelectorAll(".star");

    stars.forEach((star, index) => {
      star.starValue = index + 1;

      ["click", "mouseover", "mouseout"].forEach(function (e) {
        star.addEventListener(e, showCalificaciones);
      });
    });

    function showCalificaciones(e) {
      stars.forEach((star, index) => {
        if (e.type === "click") {
          if (index < this.starValue) {
            star.classList.add("orange");

            setCalificacion(this.starValue);
          } else {
            star.classList.remove("orange");
          }
        }

        if (e.type === "mouseover") {
          if (index < this.starValue) {
            star.classList.add("yellow");
          } else {
            star.classList.remove("yellow");
          }
        }

        if (e.type === "mouseout") {
          star.classList.remove("yellow");
        }
      });
    }
  }

  const revisionHandler = () => {
    const formData = new FormData();

    formData.set("calificacion", calificacion);
    formData.set("comentario", comentario);
    formData.set("productoId", match.params.id);

    dispatch(createRevision(formData));
  };

  return (
    <>
      <MetaData title={producto.nombre} />
      <section className="inner-banner-section bg_img base-overlay">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="inner-banner-content text-center">
                <h2 className="page-title">Detalles</h2>
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
                  <li>{producto.nombre}</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>
      {loading ? (
        <Loader />
      ) : (
        <>
          <section className="product-details-section pt-120 pb-120">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="product-details-area">
                    <div className="col-12 col-lg-5 img-fluid mt-5">
                      <Carousel pause="hover">
                        {producto.imagenes &&
                          producto.imagenes.map((imagen) => (
                            <Carousel.Item key={imagen.public_id}>
                              <img
                                className="d-block w-100"
                                src={imagen.url}
                                alt=""
                              />
                            </Carousel.Item>
                          ))}
                      </Carousel>
                    </div>

                    <div className="col-12 col-lg-5 mt-5">
                      <h4 className="product-name">
                        <a href>{producto.nombre}</a>
                      </h4>

                      <hr />

                      <div className="rating-outer">
                        <div
                          className="rating-inner"
                          style={{
                            width: `${(producto.calificaciones / 5) * 100}%`,
                          }}
                        ></div>
                      </div>
                      <span id="no_of_reviews">
                        &nbsp; Valoraciones&nbsp;({producto.numeroRevisiones})
                      </span>

                      <hr />

                      <p id="product_price">$ {producto.precio}</p>
                      <div className="stockCounter d-inline">
                        <span
                          className="btn btn-danger minus"
                          onClick={decreaseCantidad}
                        >
                          -
                        </span>

                        <input
                          type="number"
                          className="form-control count d-inline"
                          value={cantidad}
                          readOnly
                        />

                        <span
                          className="btn btn-primary plus"
                          onClick={increaseCantidad}
                        >
                          +
                        </span>
                      </div>
                      <button
                        type="button"
                        id="cart_btn"
                        className="btn btn-primary d-inline ml-4"
                        disabled={producto.stock === 0}
                        onClick={addCesta}
                      >
                        Añadir a la cesta
                      </button>
                      {producto.tallas && producto.tallas.length !== 0 ?
                        <>
                          <hr />
                          <div className="frm-group">
                            <select
                              value={talla}
                              onChange={(e) => setTalla(e.target.value)}
                            >
                              <option value="">
                                Seleccione la talla
                              </option>
                              {producto.tallas &&
                                producto.tallas.map((i) => (
                                  <option
                                    key={i._id}
                                    value={i.talla}
                                  >
                                    {i.talla}
                                  </option>
                                ))}
                            </select>
                          </div>
                        </>
                        : <><input value={""} type="hidden" onChange={(e) => setTalla(e.target.value)} /></>
                      }
                      <hr />

                      <p>
                        <span
                          id="stock_status"
                          className={
                            producto.stock > 0 ? "greenColor" : "redColor"
                          }
                        >
                          {producto.stock > 0
                            ? `${producto.stock} disponibles`
                            : "No disponible"}
                        </span>
                      </p>

                      <hr />

                      <h4 className="mt-2">Descripción:</h4>

                      <p>{producto.descripcion}</p>
                      <hr />

                      {usuario ? (
                        <button
                          id="review_btn"
                          type="button"
                          className="btn btn-primary mt-4"
                          data-toggle="modal"
                          data-target="#ratingModal"
                          onClick={setUsuarioCalificaciones}
                        >
                          Valorar el producto
                        </button>
                      ) : (
                        <div className="alert alert-danger mt-5" type="alert">
                          Inicie sesión para valorar el producto
                        </div>
                      )}

                      <div className="row mt-2 mb-5">
                        <div className="rating w-50">
                          <div
                            className="modal fade"
                            id="ratingModal"
                            tabIndex="-1"
                            role="dialog"
                            aria-labelledby="ratingModalLabel"
                            aria-hidden="true"
                          >
                            <div className="modal-dialog" role="document">
                              <div className="modal-content">
                                <div className="modal-header">
                                  <h5
                                    className="modal-title"
                                    id="ratingModalLabel"
                                  >
                                    Valoración del producto
                                  </h5>
                                  <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                  >
                                    <span aria-hidden="true">&times;</span>
                                  </button>
                                </div>
                                <div className="modal-body">
                                  <ul className="stars">
                                    <li className="star">
                                      <i className="fa fa-star"></i>
                                    </li>
                                    <li className="star">
                                      <i className="fa fa-star"></i>
                                    </li>
                                    <li className="star">
                                      <i className="fa fa-star"></i>
                                    </li>
                                    <li className="star">
                                      <i className="fa fa-star"></i>
                                    </li>
                                    <li className="star">
                                      <i className="fa fa-star"></i>
                                    </li>
                                  </ul>

                                  <textarea
                                    placeholder="Ingresa tu comentario..."
                                    name="review"
                                    id="review"
                                    className="mt-3"
                                    value={comentario}
                                    onChange={(e) =>
                                      setComentario(e.target.value)
                                    }
                                  ></textarea>

                                  <button
                                    id="review_btn"
                                    type="button"
                                    className="btn btn-primary mt-4"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                    onClick={revisionHandler}
                                  >
                                    Publicar
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {producto.revisiones && producto.revisiones.length > 0 && (
                    <ListRevisiones revisiones={producto.revisiones} />
                  )}
                </div>
              </div>
            </div>
          </section>
        </>
      )
      }
    </>
  );
};

export default DetailsProducto;
