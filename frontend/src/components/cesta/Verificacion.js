import React from "react";
import { Link } from "react-router-dom";
import Banner from "../section/Banner";

const Verificacion = ({ envio, confirmarPedido, pagar }) => {
  return (
    <>
      <Banner title={"Verificar pedido"} />

      <div className="checkout-progress d-flex justify-content-center mt-5">
        {envio ? (
          <Link to="/envio" className="float-right">
            <div className="triangle2-active"></div>
            <div className="step active-step">Datos de envío</div>
            <div className="triangle-active"></div>
          </Link>
        ) : (
          <Link to="#!" disabled>
            <div className="triangle2-incomplete"></div>
            <div className="step incomplete">Datos de envío</div>
            <div className="triangle-incomplete"></div>
          </Link>
        )}

        {confirmarPedido ? (
          <Link to="confirmar" className="float-right">
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

        {pagar ? (
          <Link to="/pagar" className="float-right">
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
