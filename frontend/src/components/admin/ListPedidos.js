import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import MetaData from "../section/MetaData";
import Loader from "../section/Loader";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import {
  getAdminPedidos,
  deletePedido,
  clearErrors,
} from "../../actions/pedidoActions";
import { DELETE_PEDIDO_RESET } from "../../constants/pedidoConstants";
import jsPDF from "jspdf";
import "jspdf-autotable";

var MySwal;
var bandera;

const ListPedidos = ({ history }) => {
  MySwal = withReactContent(Swal);
  bandera = parseInt(localStorage.getItem("actualizado"));
  const dispatch = useDispatch();
  const { loading, error, pedidos } = useSelector((state) => state.getPedidos);
  const { esEliminado } = useSelector((state) => state.pedido);

  useEffect(() => {
    dispatch(getAdminPedidos());
    if (bandera === 1) {
      localStorage.setItem("actualizado", 0);
      MySwal.fire({
        background: "#f5ede4",
        icon: "success",
        title: "El estado del pedido ha sido actualizado con éxito",
        timer: 5000,
        showConfirmButton: true,
        confirmButtonColor: "#3085d6",
        showCloseButton: false,
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        } else {
          window.location.reload();
        }
      });
    }

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

    if (esEliminado) {
      history.push("/admin-pedidos");
      dispatch({ type: DELETE_PEDIDO_RESET });
    }
  }, [dispatch, error, esEliminado, history]);

  const deletePedidoHandler = (id) => {
    dispatch(deletePedido(id));
  };

  const exportPdf = (id) => {

    var img = new Image(10, 10);
    img.crossOrigin = "";
    img.src = "//i.imgur.com/qU9CtWQ.png";

    var ced, nom, corr, tel, ciu, dir, codp, fecha;
    const unit = "pt";
    const size = "A4";
    const orientation = "portrait";

    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(12);
    const title = "PEDIDO N° " + id;
    const headers = [["CANTIDAD", "DESCRIPCIÓN", "PRECIO UNITARIO", "PRECIO TOTAL"]];

    const rows = [];

    pedidos.forEach(pedido => {
      if (pedido._id === id) {
        ced = pedido.usuario && pedido.usuario.cedula;
        nom = pedido.usuario && pedido.usuario.nombre;
        corr = pedido.usuario && pedido.usuario.email;
        tel = pedido.infoEnvio && pedido.infoEnvio.telefono;
        ciu = pedido.infoEnvio && pedido.infoEnvio.ciudad;
        dir = pedido.infoEnvio && pedido.infoEnvio.direccion;
        codp = pedido.infoEnvio && pedido.infoEnvio.codigoPostal;
        fecha = (pedido.fechaPago).toLocaleString();
        // eslint-disable-next-line
        pedido.itemsPedido.map((item) => {
          var temp = [item.cantidad, item.nombre, item.precio, item.cantidad * item.precio];
          rows.push(temp);
        })
        var temp1 = ["", "", "", ""]
        rows.push(temp1);
        temp1 = ["", "", "SUB TOTAL", pedido.precioItems]
        rows.push(temp1);
        temp1 = ["", "", "I.V.A (" + (pedido.precioImpuesto * 100) / pedido.precioItems + "%)", pedido.precioImpuesto]
        rows.push(temp1);
        temp1 = ["", "", "PRECIO DE ENVÍO", pedido.precioEnvio]
        rows.push(temp1);
        temp1 = ["", "", "TOTAL PEDIDO ", "$ " + pedido.precioTotal]
        rows.push(temp1);
      }

    });

    var fechap = fecha.substring(0, 10);
    let content = {
      startY: 215,
      head: headers,
      body: rows
    };

    doc.addImage(img, 275, 5);
    doc.text(title, 40, 70);
    doc.text("_____________________________________________________________________________", 40, 75);
    doc.text("Datos de facturación y envío", 40, 90);
    doc.text("N° cédula : " + ced, 40, 110);
    doc.text("Nombre : " + nom, 40, 125);
    doc.text("Correo electrónico : " + corr, 40, 140);
    doc.text("N° teléfono : " + tel, 40, 155);
    doc.text("Ciudad : " + ciu, 40, 170);
    doc.text("Dirección : " + dir, 40, 185);
    doc.text("Código Postal : " + codp, 40, 200);
    doc.text("Fecha del pedido : " + fechap, 275, 110);
    doc.autoTable(content);
    doc.save("pedido" + id + ".pdf")
  }

  const setPedidos = () => {
    const data = {
      columns: [
        {
          label: "Número de pedido",
          field: "id",
          sort: "asc",
        },
        {
          label: "Usuario",
          field: "usuario",
          sort: "asc",
        },
        {
          label: "Total pagado",
          field: "precio",
          sort: "asc",
        },
        {
          label: "Estado del pedido",
          field: "estado",
          sort: "asc",
        },
        {
          label: "Estado del pago",
          field: "estadoPago",
          sort: "asc",
        },
        {
          label: "Acciones",
          field: "acciones",
          sort: "asc",
        },
      ],
      rows: [],
    };

    pedidos.forEach((pedido) => {
      data.rows.push({
        id: pedido._id,
        usuario: pedido.usuario && pedido.usuario.nombre,
        precio: `$${pedido.precioTotal}`,
        estado:
          pedido.estadoPedido &&
            String(pedido.estadoPedido).includes("entregado") ? (
            <p style={{ color: "green" }}>{pedido.estadoPedido}</p>
          ) :
            pedido.estadoPedido &&
              String(pedido.estadoPedido).includes("enviado") ? (
              <p style={{ color: "orange" }}>{pedido.estadoPedido}</p>
            ) : (<p style={{ color: "red" }}>{pedido.estadoPedido}</p>),
        estadoPago: (
          <p style={{ color: "green" }}>
            {pedido.infoPago && pedido.infoPago.estado}
          </p>
        ),
        acciones: (
          <>
            <Link
              to={`/admin-pedido/${pedido._id}`}
              className="btn btn-primary py-1 px-2"
              title="Editar"
            >
              <i className="fa fa-pencil"></i>
            </Link>

            {(pedido.estadoPedido === "entregado" ? (<><button
              className="btn btn-danger py-1 px-2 ml-2"
              disabled
            >
              <i className="fa fa-trash"></i>
            </button> <button
              className="btn btn-danger py-1 px-2 ml-2"
              disabled
            >
                <i className="fa fa-file-pdf-o"></i>
              </button></>) : (<><button
                className="btn btn-danger py-1 px-2 ml-2"
                title="Eliminar"
                onClick={() => {
                  MySwal.fire({
                    background: "#f5ede4",
                    title: "¿Está seguro de eliminar el pedido?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Si",
                    cancelButtonText: "Cancelar",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      deletePedidoHandler(pedido._id);
                      MySwal.fire({
                        background: "#f5ede4",
                        icon: "success",
                        title: "El pedido ha sido eliminado con éxito",
                        showConfirmButton: true,
                        confirmButtonColor: "#3085d6",
                        showCloseButton: false,
                        timer: 3000,
                      });
                    }
                  });
                }}
              >
                <i className="fa fa-trash"></i>
              </button> <button
                className="btn btn-danger py-1 px-2 ml-2"
                title="Generar PDF"
                onClick={() => {
                  exportPdf(pedido._id)
                }}
              >
                  <i className="fa fa-file-pdf-o"></i>
                </button></>))}
          </>
        ),
      });
    });

    return data;
  };

  return (
    <>
      <MetaData title={"Listar pedidos"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="dashboard">
          <div className="col-12 col-md-10">
            <>
              <h3 className="my-4">Listado de pedidos</h3>
              {loading ? (
                <Loader />
              ) : (
                <MDBDataTable
                  data={setPedidos()}
                  className="px-3"
                  bordered
                  striped
                  searchLabel="Buscar"
                  entriesLabel="Mostrando registros"
                  paginationLabel={["Anterior", "Siguiente"]}
                  infoLabel={["", "-", "de", "registros"]}
                  noRecordsFoundLabel="No se encontró ningún registro"
                />
              )}
            </>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListPedidos;
