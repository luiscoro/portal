import React from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { logout } from "../../actions/usuarioActions";
import { removeItemCesta } from "../../actions/cestaActions";

var MySwal;

const Header = () => {
  MySwal = withReactContent(Swal);
  const dispatch = useDispatch();

  const { usuario, loading } = useSelector((state) => state.auth);
  const { itemsCesta } = useSelector((state) => state.cesta);

  const removeCestaItemHandler = (id) => {
    dispatch(removeItemCesta(id));
  };

  const logoutHandler = () => {
    dispatch(logout());
    MySwal.fire({
      background: "#f5ede4",
      toast: true,
      showCloseButton: true,
      icon: "info",
      iconColor: "blue",
      title: "La sesión se está cerrando",
      position: "bottom",
      showConfirmButton: false,
      timer: 5000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseover", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });
    setTimeout(function () {
      window.location.href = "/login";
    }, 2000);
  };

  return (
    <>
      <header className="header-section header-style-three">
        <div className="header-top">
          <div className="container">
            <div className="row align-items-center justify-content-between">
              <div className="col-lg-3 col-sm-6">
                <ul className="social-links">
                  <li>
                    <a href="https://www.facebook.com/Sport3DeJulio/">
                      <i className="fa fa-facebook" />
                    </a>
                  </li>
                  <li>
                    <a href="https://www.youtube.com/channel/UCvtYi7VqEfd1kiMFr-kDBOA">
                      <i className="fa fa-youtube-play" />
                    </a>
                  </li>
                  <li>
                    <a href="https://www.instagram.com/sport.3dejulio">
                      <i className="fa fa-instagram" />
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-lg-4 col-sm-6">
                <div className="header-top-right">
                  <div className="header-cart-menu-area">
                    {itemsCesta.length === 0 ? (
                      <>
                        <div className="header-cart-menu-btn toggle-close">
                          <i className="fa fa-cart-plus" />
                          &nbsp;
                          <sup
                            className="header-total-cart-number"
                            style={{ fontSize: "90%", fontWeight: "bold" }}
                          >
                            {itemsCesta.length}
                          </sup>
                        </div>
                        <div className="shopping-cart-dropdown">
                          <h5 className="title">Tú cesta está vacía</h5>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="header-cart-menu-btn toggle-close">
                          <i className="fa fa-cart-plus" />
                          &nbsp;
                          <sup
                            className="header-total-cart-number"
                            style={{ fontSize: "90%", fontWeight: "bold" }}
                          >
                            {itemsCesta.length}
                          </sup>
                        </div>

                        <div className="shopping-cart-dropdown">
                          <h5 className="title">Cesta de compras</h5>
                          <ul className="dropdown-shopping-cart-list">
                            {itemsCesta.map((item) => (
                              <li
                                className="dropdown-shopping-cart-item"
                                key={item.producto}
                              >
                                <div className="thumb">
                                  <img
                                    src={item.imagen}
                                    alt=""
                                    height="88"
                                    width="63"
                                  />
                                </div>
                                <div className="details">
                                  <h6 className="product-name">
                                    <Link
                                      to={`/tienda/productos/${item.producto}`}
                                    >
                                      {item.nombre}
                                    </Link>
                                  </h6>
                                  <span className="price">{item.precio}</span>
                                  <span className="quantity">
                                    {item.cantidad}
                                  </span>
                                </div>
                                <div className="cart-remove-btn">
                                  <button type="button" className="delete-btn">
                                    <i
                                      className="fa fa-trash"
                                      onClick={() =>
                                        removeCestaItemHandler(item.producto)
                                      }
                                    />
                                  </button>
                                </div>
                              </li>
                            ))}
                          </ul>
                          <div className="header-shopping-cart-footer">
                            <Link to={`/envio`} className="border-btn">
                              Pagar
                            </Link>
                            <Link to={`/cesta`} className="btn btn-primary">
                              Ver cesta
                            </Link>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="login-registration-area">
                    {!usuario ? (
                      !loading && (
                        <div className="ml-4 dropdown d-inline">
                          <Link
                            to="#"
                            className="btn dropdown-toggle text-#255ba3 mr-4"
                            type="button"
                            id="dropDownMenuButton"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <i className="fa fa-user" />
                            MI CUENTA
                          </Link>
                          <div
                            className="dropdown-menu"
                            aria-labelledby="dropDownMenuButton"
                          >
                            <Link className="dropdown-item" to="/login">
                              Iniciar sesión
                            </Link>
                            <hr className="dropdown-divider" />
                            <Link className="dropdown-item" to="/registro">
                              Registrarse
                            </Link>
                          </div>
                        </div>
                      )
                    ) : (
                      <div className="ml-4 dropdown d-inline">
                        <Link
                          to="#"
                          className="btn dropdown-toggle text-#255ba3 mr-4"
                          type="button"
                          id="dropDownMenuButton"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <i className="fa fa-user" />
                          {usuario && usuario.nombre}
                        </Link>
                        <div
                          className="dropdown-menu"
                          aria-labelledby="dropDownMenuButton"
                        >
                          {usuario && usuario.rol === "admin" && (
                            <Link className="dropdown-item" to="/dashboard">
                              Dashboard
                            </Link>
                          )}
                          <Link className="dropdown-item" to="/orders/me">
                            Pedidos
                          </Link>
                          <Link className="dropdown-item" to="/perfil">
                            Perfil
                          </Link>
                          <Link
                            className="dropdown-item text-danger"
                            to="/"
                            onClick={logoutHandler}
                          >
                            Cerrar sesión
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="header-bottom">
          <div className="container">
            <nav className="navbar navbar-expand-xl p-0 align-items-start">
              <div className="site-logo site-title">
                <Link to="/">
                  <img src="/assets/images/logo.png" alt="" />
                </Link>
                <span className="logo-icon">
                  <i className="flaticon-fire" />
                </span>
              </div>
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="menu-toggle" />
              </button>
              <div
                className="collapse navbar-collapse align-items-center"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav main-menu ml-auto">
                  <li>
                    <Link to="/" style={{ textDecoration: "none" }}>
                      Inicio
                    </Link>
                  </li>

                  <li>
                    <Link to="/" style={{ textDecoration: "none" }}>
                      Nuestro club
                    </Link>
                  </li>
                  <li>
                    <Link to="/resultados" style={{ textDecoration: "none" }}>
                      Resultados
                    </Link>
                  </li>
                  <li>
                    <Link to="/noticias" style={{ textDecoration: "none" }}>
                      Noticias
                    </Link>
                  </li>
                  <li>
                    <Link to="/tienda" style={{ textDecoration: "none" }}>
                      Nuestra Tienda
                    </Link>
                  </li>
                  <li>
                    <Link to="/" style={{ textDecoration: "none" }}>
                      Contacto
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
