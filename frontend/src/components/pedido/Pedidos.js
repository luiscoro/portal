import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import MetaData from "../section/MetaData";
import Banner from "../section/Banner";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Loader from "../section/Loader";
import { useDispatch, useSelector } from "react-redux";
import { getPedidos, clearErrors } from "../../actions/pedidoActions";

var MySwal;

const Pedidos = () => {
  MySwal = withReactContent(Swal);
  const dispatch = useDispatch();

  const { loading, error, pedidos } = useSelector((state) => state.pedidos);

  useEffect(() => {
    dispatch(getPedidos());

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
  }, [dispatch, error]);

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
          label: "Ver detalles",
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
            <p style={{ color: "yellow" }}>{pedido.estadoPedido}</p>
          ),
        estadoPago: (
          <p style={{ color: "green" }}>
            {pedido.infoPago && pedido.infoPago.estado}
          </p>
        ),
        acciones: (
          <Link
            to={`/pedido/${pedido._id}`}
            className="btn btn-primary py-1 px-2"
          >
            <i className="fa fa-eye"></i>
          </Link>
        ),
      });
    });

    return data;
  };
  return (
    <>
      <MetaData title={"Mis pedidos"} />
      <Banner title={"Mis pedidos"} />
      {loading ? (
        <Loader />
      ) : (
        <section className="product-details-section pt-120 pb-120">
          <div className="container">
            <div className="row justify-content-center col-lg-12 col-md-10">
              <>
                <MDBDataTable
                  data={setPedidos()}
                  className="px-6"
                  bordered
                  striped
                  searchLabel="Buscar"
                  entriesLabel="Mostrando pedidos"
                  paginationLabel={["Anterior", "Siguiente"]}
                  infoLabel={["", "-", "de", "registros"]}
                  noRecordsFoundLabel="No tienes pedidos"
                />
              </>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Pedidos;
