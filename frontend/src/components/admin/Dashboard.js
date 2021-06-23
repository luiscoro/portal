import React, { useEffect } from "react";

import { Link } from "react-router-dom";

import MetaData from "../section/MetaData";
import Loader from "../section/Loader";
import Sidebar from "./Sidebar";

import { useDispatch, useSelector } from "react-redux";

import { getAdminProductos } from "../../actions/productoActions";
import { getAdminPedidos } from "../../actions/pedidoActions";
import { getUsuarios } from "../../actions/usuarioActions";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { productos } = useSelector((state) => state.productos);
  const { usuarios } = useSelector((state) => state.getUsuarios);
  const { pedidos, montoTotal, loading } = useSelector(
    (state) => state.getPedidos
  );

  let fueraStock = 0;
  productos.forEach((producto) => {
    if (producto.stock === 0) {
      fueraStock += 1;
    }
  });

  useEffect(() => {
    dispatch(getAdminProductos());
    dispatch(getAdminPedidos());
    dispatch(getUsuarios());
  }, [dispatch]);

  return (
    <>
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="dashboard">
          <div className="col-12 col-md-10">
            <h3 className="my-4">Dashboard</h3>

            {loading ? (
              <Loader />
            ) : (
              <>
                <MetaData title={"Dashboard"} />

                <div className="row pr-4">
                  <div className="col-xl-12 col-sm-12 mb-3">
                    <div className="card text-white bg-secondary o-hidden h-100">
                      <div className="card-body">
                        <div className="text-center card-font-size">
                          Total Ventas
                          <br /> <b>${montoTotal && montoTotal.toFixed(2)}</b>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row pr-4">
                  <div className="col-xl-3 col-sm-6 mb-3">
                    <div className="card text-white bg-success o-hidden h-100">
                      <div className="card-body">
                        <div className="text-center card-font-size">
                          Productos
                          <br /> <b>{productos && productos.length}</b>
                        </div>
                      </div>
                      <Link
                        className="card-footer text-white clearfix small z-1"
                        to="/admin-productos"
                      >
                        <span className="float-left" style={{ color: "white" }}>
                          Ver Detalles
                        </span>
                        <span className="float-right">
                          <i
                            className="fa fa-angle-right"
                            style={{ color: "white" }}
                          ></i>
                        </span>
                      </Link>
                    </div>
                  </div>

                  <div className="col-xl-3 col-sm-6 mb-3">
                    <div className="card text-white bg-info o-hidden h-100">
                      <div className="card-body">
                        <div className="text-center card-font-size">
                          Pedidos
                          <br /> <b>{pedidos && pedidos.length}</b>
                        </div>
                      </div>
                      <Link
                        className="card-footer text-white clearfix small z-1"
                        to="/admin-pedidos"
                      >
                        <span className="float-left" style={{ color: "white" }}>
                          Ver Detalles
                        </span>
                        <span className="float-right">
                          <i
                            className="fa fa-angle-right"
                            style={{ color: "white" }}
                          ></i>
                        </span>
                      </Link>
                    </div>
                  </div>

                  <div className="col-xl-3 col-sm-6 mb-3">
                    <div className="card text-white bg-dark o-hidden h-100">
                      <div className="card-body">
                        <div className="text-center card-font-size">
                          Usuarios
                          <br /> <b>{usuarios && usuarios.length}</b>
                        </div>
                      </div>
                      <Link
                        className="card-footer text-white clearfix small z-1"
                        to="/admin-usuarios"
                      >
                        <span className="float-left" style={{ color: "white" }}>
                          Ver Detalles
                        </span>
                        <span className="float-right">
                          <i
                            className="fa fa-angle-right"
                            style={{ color: "white" }}
                          ></i>
                        </span>
                      </Link>
                    </div>
                  </div>

                  <div className="col-xl-3 col-sm-6 mb-3">
                    <div className="card text-white bg-danger o-hidden h-100">
                      <div className="card-body">
                        <div className="text-center card-font-size">
                          Productos fuera de stock
                          <br /> <b>{fueraStock}</b>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
