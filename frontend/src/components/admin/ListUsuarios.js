import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import MetaData from "../section/MetaData";
import Loader from "../section/Loader";
import Sidebar from "./Sidebar";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
  getUsuarios,
  deleteUsuario,
  clearErrors,
} from "../../actions/usuarioActions";
import { DELETE_USUARIO_RESET } from "../../constants/usuarioConstants";

const ListUsuarios = ({ history }) => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, usuarios } = useSelector(
    (state) => state.getUsuarios
  );
  const { error: deleteError, esEliminado } = useSelector(
    (state) => state.usuario
  );

  useEffect(() => {
    dispatch(getUsuarios());

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (esEliminado) {
      alert.success("El usuario se ha eliminado con éxito");
      history.push("/admin-usuarios");
      dispatch({ type: DELETE_USUARIO_RESET });
    }
  }, [dispatch, alert, error, deleteError, esEliminado, history]);

  const setUsuarios = () => {
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
          label: "Correo electrónico",
          field: "email",
          sort: "asc",
        },
        {
          label: "Rol",
          field: "rol",
          sort: "asc",
        },
        {
          label: "Acciones",
          field: "acciones",
        },
      ],
      rows: [],
    };

    usuarios.forEach((usuario) => {
      data.rows.push({
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
        acciones: (
          <>
            <Link
              to={`/admin-usuario/${usuario._id}`}
              className="btn btn-primary py-1 px-2"
            >
              <i className="fa fa-pencil"></i>
            </Link>
            <button
              className="btn btn-danger py-1 px-2 ml-2"
              onClick={() => {
                if (window.confirm("'Está seguro de eliminar el registro'?")) {
                  deleteUsuarioHandler(usuario._id);
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

  const deleteUsuarioHandler = (id) => {
    dispatch(deleteUsuario(id));
  };
  return (
    <>
      <MetaData title={"Listar usuarios"} />
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
                <h3 className="my-4">Listado de usuarios</h3>

                <MDBDataTable
                  data={setUsuarios()}
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

export default ListUsuarios;
