import React from "react";
import { Link } from "react-router-dom";

const Verificacion = ({ envio, confirmarPedido, pago }) => {
  return (
    <>
      <section
        className="inner-banner-section bg_img base-overlay"
        data-background="assets/images/bg/home-eight-banner.jpg"
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="inner-banner-content text-center">
                <h2 className="page-title">Verificar pedido</h2>
                <ol className="breadcum d-flex justify-content-center">
                  <li>
                    <Link to="/" style={{ textDecoration: "none" }}>
                      Inicio
                    </Link>
                  </li>
                  <li>Verificar pedido</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="checkout-progress d-flex justify-content-center mt-5">
        {envio ? (
          <Link to="/envio" className="float-right">
            <div className="triangle2-active"></div>
            <div className="step active-step">Información de envío</div>
            <div className="triangle-active"></div>
          </Link>
        ) : (
          <Link to="#!" disabled>
            <div className="triangle2-incomplete"></div>
            <div className="step incomplete">Información de envío</div>
            <div className="triangle-incomplete"></div>
          </Link>
        )}

        {confirmarPedido ? (
          <Link to="/order/confirm" className="float-right">
            <div className="triangle2-active"></div>
            <div className="step active-step">Confirmar pedido</div>
            <div className="triangle-active"></div>
          </Link>
        ) : (
          <Link to="#!" disabled>
            <div className="triangle2-incomplete"></div>
            <div className="step incomplete">Confirmar pedido</div>
            <div className="triangle-incomplete"></div>
          </Link>
        )}

        {pago ? (
          <Link to="/pago" className="float-right">
            <div className="triangle2-active"></div>
            <div className="step active-step">Proceder a pagar</div>
            <div className="triangle-active"></div>
          </Link>
        ) : (
          <Link to="#!" disabled>
            <div className="triangle2-incomplete"></div>
            <div className="step incomplete">Proceder a pagar</div>
            <div className="triangle-incomplete"></div>
          </Link>
        )}
      </div>
    </>
  );
};

export default Verificacion;
