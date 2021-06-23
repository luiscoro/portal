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
        title: "El pedido ha sido actualizado con éxito",
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

  const setPedidos = () => {
    const data = {
      columns: [
        {
          label: "Número de pedido",
          field: "id",
          sort: "asc",
        },
        {
          label: "Número de productos",
          field: "numOfItems",
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
        numOfItems: pedido.itemsPedido.length,
        precio: `$${pedido.precioTotal}`,
        estado:
          pedido.estadoPedido &&
          String(pedido.estadoPedido).includes("entregado") ? (
            <p style={{ color: "green" }}>{pedido.estadoPedido}</p>
          ) : (
            <p style={{ color: "red" }}>{pedido.estadoPedido}</p>
          ),
        estadoPago:
          pedido.estadoPedido &&
          String(pedido.estadoPedido).includes("pendiente de envío") ? (
            <p style={{ color: "green" }}>{"exitoso"}</p>
          ) : (
            <p style={{ color: "red" }}>{""}</p>
          ),
        acciones: (
          <>
            <Link
              to={`/admin-pedido/${pedido._id}`}
              className="btn btn-primary py-1 px-2"
            >
              <i className="fa fa-pencil"></i>
            </Link>
            <button
              className="btn btn-danger py-1 px-2 ml-2"
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
                      showConfirmButton: false,
                      showCloseButton: false,
                      timer: 3000,
                    });
                  }
                });
              }}
            >
              <i className="fa fa-trash"></i>
            </button>
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
