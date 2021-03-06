import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import MetaData from "../section/MetaData";
import Loader from "../section/Loader";
import Sidebar from "./Sidebar";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useDispatch, useSelector } from "react-redux";
import { getUsuarios, clearErrors } from "../../actions/usuarioActions";

var MySwal;
var bandera;

const ListUsuarios = ({ history }) => {
  MySwal = withReactContent(Swal);
  bandera = parseInt(localStorage.getItem("actualizado"));
  const dispatch = useDispatch();
  const { loading, error, usuarios } = useSelector(
    (state) => state.getUsuarios
  );

  useEffect(() => {
    dispatch(getUsuarios());

    if (bandera === 1) {
      localStorage.setItem("actualizado", 0);
      MySwal.fire({
        background: "#f5ede4",
        icon: "success",
        title: "El usuario ha sido actualizado con éxito",
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
  }, [dispatch, error, history]);

  const setUsuarios = () => {
    const data = {
      columns: [
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
          label: "Estado",
          field: "estado",
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
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
        estado: usuario.estado,
        acciones: (
          <>
            <Link
              to={`/admin-usuario/${usuario._id}`}
              className="btn btn-primary py-1 px-2"
              title="Editar"
            >
              <i className="fa fa-pencil"></i>
            </Link>
          </>
        ),
      });
    });

    return data;
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
