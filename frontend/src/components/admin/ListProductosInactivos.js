import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import MetaData from "../section/MetaData";
import Loader from "../section/Loader";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import {
  getAdminProductos,
} from "../../actions/productoActions";


const ListProductos = () => {
  const dispatch = useDispatch();
  const { loading, productos } = useSelector((state) => state.productos);

  useEffect(() => {
    dispatch(getAdminProductos())

  }, [dispatch]);

  const setProductos = () => {
    const data = {
      columns: [
        {
          label: "Categoría",
          field: "categoria",
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
          label: "Descripción",
          field: "descripcion",
          sort: "asc",
        },
        {
          label: "Stock",
          field: "stock",
          sort: "asc",
        },
        {
          label: "Marca",
          field: "marca",
          sort: "asc",
        },
        {
          label: "Foto",
          field: "foto",
        },
        {
          label: "Acciones",
          field: "acciones",
        },
      ],
      rows: [],
    };

    productos.forEach((producto) => {
      if (producto.categoria && producto.categoria.estado === "activa" && producto.estado === "inactivo") {
        data.rows.push({
          categoria: producto.categoria && producto.categoria.nombre,
          nombre: producto.nombre,
          precio: `$${producto.precio}`,
          descripcion: producto.descripcion,
          stock: producto.stock,
          marca: producto.marca,
          foto: (
            <img
              alt=""
              src={producto.imagenes && producto.imagenes[0].url}
              width="55"
              height="52"
            />
          ),
          acciones: (
            <>
              <Link
                to={`/admin-producto/${producto._id}`}
                className="btn btn-primary py-1 px-2"
                title="Editar"
              >
                <i className="fa fa-pencil"></i>
              </Link>
            </>
          ),
        });
      }
    });

    return data;
  };


  return (
    <>
      <MetaData title={"Listar productos inactivos"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="dashboard">
          <div className="col-12 col-md-10">
            <>
              <br />
              <h3 className="my-4">Listado de productos inactivos</h3>
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
