import React, { useEffect } from "react";
import Loader from "../section/Loader";
import { useDispatch, useSelector } from "react-redux";
import { getCuerpoTecnico, clearErrors } from "../../actions/miembroActions";


const CuerpoTecnico = () => {
  const dispatch = useDispatch();


  const { loading, error, cuerpoTecnico } = useSelector(
    (state) => state.cuerpoTecnico
  );


  useEffect(() => {

    dispatch(getCuerpoTecnico());
    if (error) {
      dispatch(clearErrors());
    }
  }, [dispatch, error]);
  return loading ? (
    <Loader />
  ) : (
    <section className="team-section pt-120 pb-120">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-12">
            <div className="section-header text-center">
              <h2 className="section-title text-uppercase">
                <b>Nuestro</b> cuerpo técnico
              </h2>
            </div>
          </div>
        </div>
        <div className="row mb-none-30">
          {cuerpoTecnico.map((ct) => ct.tipo && ct.tipo.nombre === "cuerpo técnico" && ct.estado === "activo" ? (
            <div className="col-lg-3 col-md-4 col-sm-6" key={ct._id}>
              <div className="team-item">
                <div className="team-thumb">
                  <div className="team-thumb-inner">
                    <img src={ct.foto && ct.foto.url} alt="" />
                  </div>
                </div>
                <div className="team-content">
                  <h4 className="name">{ct.nombre}</h4>
                  <span className="list-description">
                    {ct.posicion && ct.posicion.nombre}
                  </span>
                </div>
              </div>
            </div>
          ) : (<></>))}
        </div>
      </div>
    </section>
  );
};

export default CuerpoTecnico;
