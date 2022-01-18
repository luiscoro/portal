import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import MetaData from "../section/MetaData";
import Loader from "../section/Loader";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import {
  getAdminCategorias,
} from "../../actions/categoriaActions";


const ListCategoriasInactivas = () => {
  const dispatch = useDispatch();
  const { loading, categorias } = useSelector(
    (state) => state.categorias
  );
  useEffect(() => {
    dispatch(getAdminCategorias());
  }, [dispatch]);

  const setCategorias = () => {
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
          label: "Acciones",
          field: "acciones",
        },
      ],
      rows: [],
    };

    categorias.forEach((categoria) => {
      if (categoria.estado === "inactiva") {
        data.rows.push({
          id: categoria._id,
          nombre: categoria.nombre,
          acciones: (
            <>
              <Link
                to={`/admin-categoria/${categoria._id}`}
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
      <MetaData title={"Listar categorías inactivas"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="dashboard">
          {loading ? (
            <Loader />
          ) : (
            <div className="col-12 col-md-10">
              <>
                <h3 className="my-4">Listado de categorías inactivas</h3>

                <MDBDataTable
                  data={setCategorias()}
                  className="px-3"
                  bordered
                  striped
                  searchLabel="Buscar"
                  entriesLabel="Mostrando registros"
                  paginationLabel={["Anterior", "Siguiente"]}
                  infoLabel={["", "-", "de", "registros"]}
                  noRecordsFoundLabel="No se encontró ningún registro"
                />
              </>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ListCategoriasInactivas;
