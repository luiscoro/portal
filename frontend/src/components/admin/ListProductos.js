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
  getAdminProductos,
  deleteProducto,
  clearErrors,
} from "../../actions/productoActions";
import { DELETE_PRODUCTO_RESET } from "../../constants/productoConstants";

const ListProductos = ({ history }) => {
  const MySwal = withReactContent(Swal);
  const dispatch = useDispatch();

  const { loading, error, productos } = useSelector((state) => state.productos);
  const { error: deleteError, esEliminado } = useSelector(
    (state) => state.producto
  );

  useEffect(() => {
    dispatch(getAdminProductos());

    if (error) {
      //alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      //alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (esEliminado) {
      //alert.success("El producto se ha eliminado con éxito");
      history.push("/admin-productos");
      dispatch({ type: DELETE_PRODUCTO_RESET });
    }
  }, [dispatch, error, deleteError, esEliminado, history]);

  const setProductos = () => {
    const data = {
      columns: [
        {
          label: "ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Nombre",
          field: "nombre",
          sort: "asc",
        },
        {
          label: "Precio",
          field: "precio",
          sort: "asc",
        },
        {
          label: "Stock",
          field: "stock",
          sort: "asc",
        },
        {
          label: "Acciones",
          field: "acciones",
        },
      ],
      rows: [],
    };

    productos.forEach((producto) => {
      data.rows.push({
        id: producto._id,
        nombre: producto.nombre,
        precio: `$${producto.precio}`,
        stock: producto.stock,
        acciones: (
          <>
            <Link
              to={`/admin-producto/${producto._id}`}
              className="btn btn-primary py-1 px-2"
            >
              <i className="fa fa-pencil"></i>
            </Link>
            <button
              className="btn btn-danger py-1 px-2 ml-2"
              onClick={() => {
                if (window.confirm("'Está seguro de eliminar el registro'?")) {
                  deleteProductoHandler(producto._id);
                }
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

  const deleteProductoHandler = (id) => {
    dispatch(deleteProducto(id));
  };
  return (
    <>
      <MetaData title={"Listar productos"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="dashboard">
          <div className="col-12 col-md-10">
            <>
              <h3 className="my-4">Listado de productos</h3>
              {loading ? (
                <Loader />
              ) : (
                <MDBDataTable
                  data={setProductos()}
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

export default ListProductos;
