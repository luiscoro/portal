import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Loader from "../section/Loader";
import MetaData from "../section/MetaData";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { getNoticiaDetails, clearErrors } from "../../actions/noticiaActions";

var MySwal;

const DetailsNoticia = ({ match }) => {
  MySwal = withReactContent(Swal);
  const dispatch = useDispatch();

  const { loading, error, noticia } = useSelector(
    (state) => state.noticiaDetails
  );

  useEffect(() => {
    dispatch(getNoticiaDetails(match.params.id));
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
      <MetaData title={noticia.titulo} />
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
                    <Link to="/noticias" style={{ textDecoration: "none" }}>
                      Noticias
                    </Link>
                  </li>
                  <li>{noticia.titulo}</li>
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
          <section className="blog-details-section pt-120 pb-120">
            <div className="container">
              <div className="row">
                <div className="col-lg-8">
                  <div className="post-details-area post-list--style">
                    <div className="thumb">
                      <img src={noticia.imagen && noticia.imagen.url} alt="" />
                    </div>
                    <div className="post-header-area">
                      <div className="post-date">
                        <a href>
                          <span className="month">
                            {String(noticia.fecha).substring(8, 10)}
                            {"-"}
                            {String(noticia.fecha).substring(5, 7)}
                          </span>
                          <span className="date">
                            {String(noticia.fecha).substring(0, 4)}
                          </span>
                        </a>
                      </div>
                      <div className="post-header">
                        <h4 className="post-title">{noticia.titulo}</h4>
                      </div>
                    </div>
                    <div className="post-content">
                      <p>{noticia.descripcion}</p>
                    </div>
                  </div>
                  {/* post-item end */}
                </div>
                <div className="col-lg-4">
                  <div className="sidebar">
                    <div className="widget">
                      <div className="widget-header">
                        <i className="fa fa-bars" />
                        <h4 className="widget-title">Tabla de posiciones</h4>
                      </div>
                      <div className="team-cart-table-area mb-30">
                        <table
                          className="team-cart-table bg_img base-overlay"
                          data-background
                        >
                          <thead>
                            <tr>
                              <th>equipo</th>
                              <th>puntos</th>
                              <th>gd</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <span>01</span>Liver Pool
                              </td>
                              <td>03</td>
                              <td>01</td>
                            </tr>
                            <tr>
                              <td>
                                <span>01</span>Dhaka Pro
                              </td>
                              <td>02</td>
                              <td>00</td>
                            </tr>
                            <tr>
                              <td>
                                <span>01</span>Finica LC
                              </td>
                              <td>03</td>
                              <td>01</td>
                            </tr>
                            <tr>
                              <td>
                                <span>01</span>Ace Milan
                              </td>
                              <td>03</td>
                              <td>01</td>
                            </tr>
                            <tr>
                              <td>
                                <span>01</span>Wokapiya
                              </td>
                              <td>03</td>
                              <td>01</td>
                            </tr>
                            <tr>
                              <td>
                                <span>01</span>Anchya
                              </td>
                              <td>01</td>
                              <td>01</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    {/* widget end */}
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

export default DetailsNoticia;
