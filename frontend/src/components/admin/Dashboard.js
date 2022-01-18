import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Bar } from 'react-chartjs-2';
import MetaData from "../section/MetaData";
import Loader from "../section/Loader";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getAdminProductos } from "../../actions/productoActions";
import { getAdminPedidos } from "../../actions/pedidoActions";
import { getPedidosMensual } from "../../actions/pedidoActions";
import { getAdminNoticias } from "../../actions/noticiaActions";
import { getUsuarios } from "../../actions/usuarioActions";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { productos } = useSelector((state) => state.productos);
  const { noticias } = useSelector((state) => state.noticias);
  const { usuarios } = useSelector((state) => state.getUsuarios);

  const {
    montoTotal,
    loading,
  } = useSelector((state) => state.getPedidos);


  const { pedido = {} } = useSelector((state) => state.pedidoDetails);
  const {
    montoEnero,
    montoFebrero,
    montoMarzo,
    montoAbril,
    montoMayo,
    montoJunio,
    montoJulio,
    montoAgosto,
    montoSeptiembre,
    montoOctubre,
    montoNoviembre,
    montoDiciembre
  } = pedido;


  const [anio, setAnio] = useState(new Date().getFullYear());


  useEffect(() => {
    dispatch(getAdminProductos());
    dispatch(getAdminPedidos());
    dispatch(getAdminNoticias());
    dispatch(getUsuarios());
    dispatch(getPedidosMensual(anio));
  }, [dispatch, anio]);

  const grafico = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    datasets: [
      {
        label: 'Ventas por mes del año: ' + (anio),
        backgroundColor: 'rgba(75,181,67,1)',
        borderWidth: 0,
        data: [montoEnero, montoFebrero, montoMarzo, montoAbril, montoMayo, montoJunio, montoJulio, montoAgosto, montoSeptiembre, montoOctubre, montoNoviembre, montoDiciembre]
      }
    ]
  }

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
                  <div className="col-xl-3 col-sm-6 mb-3">
                    <div className="card text-white bg-info o-hidden h-100">
                      <div className="card-body">
                        <div className="text-center card-font-size">
                          <i className="fa fa-info-circle"></i> Información del
                          club
                        </div>
                      </div>
                      <Link
                        className="card-footer text-white clearfix small z-1"
                        to="/informacion"
                      >
                        <span className="float-left" style={{ color: "white" }}>
                          Ver detalles
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
                    <div className="card text-white bg-warning o-hidden h-100">
                      <div className="card-body">
                        <div className="text-center card-font-size">
                          <i className="fa fa-product-hunt"></i> Productos
                          registrados
                          <br /> <b>{productos && productos.length}</b>
                        </div>
                      </div>
                      <Link
                        className="card-footer text-white clearfix small z-1"
                        to="/admin-productos"
                      >
                        <span className="float-left" style={{ color: "white" }}>
                          Ver listado
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
                          <i className="fa fa-users"></i> Usuarios registrados
                          <br /> <b>{usuarios && usuarios.length}</b>
                        </div>
                      </div>
                      <Link
                        className="card-footer text-white clearfix small z-1"
                        to="/admin-usuarios"
                      >
                        <span className="float-left" style={{ color: "white" }}>
                          Ver listado
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
                    <div className="card text-white bg-primary o-hidden h-100">
                      <div className="card-body">
                        <div className="text-center card-font-size">
                          <i className="fa fa-newspaper-o"></i> Noticias
                          registradas
                          <br /> <b>{noticias && noticias.length}</b>
                        </div>
                      </div>
                      <Link
                        className="card-footer text-white clearfix small z-1"
                        to="/admin-noticias"
                      >
                        <span className="float-left" style={{ color: "white" }}>
                          Ver listado
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
                </div>

                <div className="row pr-4">
                  <div className="col-xl-12 col-sm-12 mb-3">
                    <div className="card text-white bg-success o-hidden h-100">
                      <div className="card-body">
                        <div className="text-center card-font-size">
                          Total Ventas
                          <br /> <b>${montoTotal && montoTotal.toFixed(2)}</b>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row justify-content-center pr-4">
                  <form >
                    <div className="frm-group">
                      <option value={""}>
                        Filtrar por año
                      </option>
                      <input
                        type="number"
                        value={anio}
                        step="1"
                        min="2021"
                        max={new Date().getFullYear()}
                        onChange={(e) => setAnio(e.target.value)}
                      />
                    </div>
                  </form>
                  <Bar
                    data={grafico}
                    options={{
                      title: {
                        display: true,
                        text: 'Ventas por mes',
                        fontSize: 20
                      },
                      legend: {
                        display: true,
                        position: 'right'
                      }
                    }}
                  />
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
