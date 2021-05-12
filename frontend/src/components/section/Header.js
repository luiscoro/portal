import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      {/* header section  */}
      {/*  header-section start  */}
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
                    <div className="header-cart-menu-btn toggle-close">
                      <i className="fa fa-cart-plus" />
                      <sup className="header-total-cart-number">02</sup>
                    </div>
                    <div className="shopping-cart-dropdown">
                      <h5 className="title">Shopping Cart</h5>
                      <ul className="dropdown-shopping-cart-list">
                        <li className="dropdown-shopping-cart-item">
                          <div className="thumb">
                            <img
                              src="assets/images/shopping/1.png"
                              alt="images"
                            />
                          </div>
                          <div className="details">
                            <h6 className="product-name">
                              <a href="#0">Basket ball</a>
                            </h6>
                            <span className="price">$55</span>
                            <span className="quantity">1</span>
                          </div>
                          <div className="cart-remove-btn">
                            <a href="#0">
                              <i className="fa fa-trash-o" />
                            </a>
                          </div>
                        </li>
                        <li className="dropdown-shopping-cart-item">
                          <div className="thumb">
                            <img
                              src="assets/images/shopping/3.png"
                              alt="images"
                            />
                          </div>
                          <div className="details">
                            <h6 className="product-name">
                              <a href="#0">Football Shorts</a>
                            </h6>
                            <span className="price">$21</span>
                            <span className="quantity">2</span>
                          </div>
                          <div className="cart-remove-btn">
                            <a href="#0">
                              <i className="fa fa-trash-o" />
                            </a>
                          </div>
                        </li>
                      </ul>
                      <div className="header-shopping-cart-footer">
                        <a href="#0" className="border-btn">
                          View Cart
                        </a>
                        <a href="#0" className="btn btn-primary">
                          Checkout
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="login-registration-area">
                    <i className="fa fa-user" />
                    <a href="login.html">Login</a>
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
                  <img src="assets/images/logo.png" alt="" />
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
                      Quienes somos
                    </Link>
                  </li>
                  <li>
                    <Link to="/" style={{ textDecoration: "none" }}>
                      Nuestro equipo
                    </Link>
                  </li>
                  <li>
                    <Link to="/" style={{ textDecoration: "none" }}>
                      Noticias
                    </Link>
                  </li>
                  <li>
                    <Link to="/" style={{ textDecoration: "none" }}>
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
        {/* header-bottom end */}
      </header>
      {/*  header-section end  */}
    </>
  );
};

export default Header;
