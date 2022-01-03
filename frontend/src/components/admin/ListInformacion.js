import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import MetaData from "../section/MetaData";
import Loader from "../section/Loader";
import Sidebar from "./Sidebar";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useDispatch, useSelector } from "react-redux";
import {
  getAdminInformacion,
  clearErrors,
} from "../../actions/informacionActions";

var MySwal;
var bandera;

const ListInformacion = ({ history }) => {
  MySwal = withReactContent(Swal);
  bandera = parseInt(localStorage.getItem("actualizado"));
  const dispatch = useDispatch();
  const { loading, error, informacion } = useSelector(
    (state) => state.informacion
  );

  useEffect(() => {
    dispatch(getAdminInformacion());

    if (bandera === 1) {
      localStorage.setItem("actualizado", 0);
      MySwal.fire({
        background: "#f5ede4",
        icon: "success",
        title: "La información ha sido actualizada con éxito",
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

  const setInformacion = () => {
    const data = {
      columns: [
        {
          label: "Lema principal",
          field: "lemaPrincipal",
        },
        {
          label: "Lema secundario",
          field: "lemaSecundario",
        },

        {
          label: "Emblema",
          field: "emblemaAcerca",
        },
        {
          label: "Misión",
          field: "mision",
        },
        {
          label: "Visión",
          field: "vision",
        },

        {
          label: "Acción",
          field: "accion",
        },
      ],
      rows: [],
    };

    informacion.forEach((info) => {
      data.rows.push({
        lemaPrincipal: info.lemaPrincipal,
        lemaSecundario: info.lemaSecundario,
        emblemaAcerca: info.emblemaAcerca,
        mision: info.mision,
        vision: info.vision,

        accion: (
          <>
            <Link
              to={`/informacion/${info._id}`}
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
      <MetaData title={"Listar noticias"} />
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
                <h3 className="my-4">Información del club</h3>

                <MDBDataTable
                  data={setInformacion()}
                  className="px-3"
                  bordered
                  pagination={false}
                  searching={false}
                  displayEntries={false}
                  paging={false}
                />
              </>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ListInformacion;
