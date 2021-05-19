import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import Loader from "../section/Loader";
import MetaData from "../section/MetaData";

const Perfil = () => {
  const { usuario, loading } = useSelector((state) => state.auth);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={"Perfil"} />
          {/* inner-banner-section start */}
          <section
            className="inner-banner-section bg_img base-overlay"
            data-background="assets/images/bg/home-eight-banner.jpg"
          >
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-8">
                  <div className="inner-banner-content text-center">
                    <h2 className="page-title">PERFIL</h2>
                    <ol className="breadcum d-flex justify-content-center">
                      <li>
                        <Link to="/" style={{ textDecoration: "none" }}>
                          Inicio
                        </Link>
                      </li>
                      <li>perfil</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* inner-banner-section end */}

          <div className="row justify-content-center mt-5">
            <div className="col-12 col-md-5">
              <h4>Nombre</h4>
              <p>{usuario.nombre}</p>
              <br></br>
              <h4>Correo electrónico</h4>
              <p>{usuario.email}</p>
              <br></br>
              <h4>Fecha en la que creaste tu cuenta</h4>
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
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Perfil;
