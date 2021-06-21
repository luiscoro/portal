import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from "../section/Loader";
import MetaData from "../section/MetaData";
import Banner from "../section/Banner";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUsuario,
  clearErrors,
  logout,
} from "../../actions/usuarioActions";
import { DELETE_USUARIO_RESET } from "../../constants/usuarioConstants";

var MySwal;

const Perfil = ({ history }) => {
  MySwal = withReactContent(Swal);
  const dispatch = useDispatch();

  const { usuario } = useSelector((state) => state.auth);
  const { error, esActualizado, loading } = useSelector(
    (state) => state.usuario
  );

  useEffect(() => {
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

    if (esActualizado) {
      MySwal.fire({
        background: "#f5ede4",
        icon: "success",
        title: "La cuenta ha sido eliminada con éxito",
        timer: 5000,
        showConfirmButton: true,
        confirmButtonColor: "#3085d6",
        showCloseButton: false,
      });
      dispatch(logout());

      dispatch({
        type: DELETE_USUARIO_RESET,
      });
    }
  }, [dispatch, error, history, usuario, esActualizado]);

  const deleteCuenta = () => {
    const formData = new FormData();
    formData.set("estado", "inactivo");

    dispatch(deleteUsuario(formData));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={"Perfil"} />
          <Banner title={"Perfil"} />
          <div className="row justify-content-center mt-5">
            <div className="col-12 col-md-5">
              <h4>Nombre</h4>
              <p>{usuario.nombre}</p>
              <br></br>
              <h4>Correo electrónico</h4>
              <p>{usuario.email}</p>
              <br></br>
              <h4>Fecha de creación de la cuenta</h4>
              <p>{String(usuario.fechaCreacion).substring(0, 10)}</p>
              <Link
                to="/perfil/actualizar"
                className="btn btn-primary btn-block mt-3"
              >
                Editar datos
              </Link>

              <Link
                to="/password/actualizar"
                className="btn btn-secondary btn-block mt-3"
              >
                Cambiar contraseña
              </Link>

              <button
                className="btn btn-danger btn-block mt-3"
                onClick={() => {
                  MySwal.fire({
                    background: "#f5ede4",
                    title: "¿Está seguro de eliminar la cuenta?",
                    text: "Si elimina su cuenta, no podrá acceder a su cuenta y tampoco crear una nueva cuenta con el correo electrónico registrado.",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Si",
                    cancelButtonText: "Cancelar",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      deleteCuenta();
                    }
                  });
                }}
              >
                Eliminar cuenta
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Perfil;
