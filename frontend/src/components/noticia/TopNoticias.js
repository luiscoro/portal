import React, { useEffect } from "react";
import Loader from "../section/Loader";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getNoticiasTop, clearErrors } from "../../actions/noticiaActions";

const TopNoticias = () => {
  const dispatch = useDispatch();

  const { loading, error, noticias } = useSelector((state) => state.noticias);

  useEffect(() => {
    dispatch(getNoticiasTop());
    if (error) {
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  return loading ? (
    <Loader />
  ) : (
    <section className="blog-section pt-120 pb-120">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="section-header text-center">
              <h2 className="section-title text-uppercase">
                <b>Últimas</b> noticias
              </h2>
            </div>
          </div>
        </div>
        <>
          <div className="row mb-none-30">
            {noticias.map((noticia) => (
              <div className="col-lg-6" key={noticia._id}>
                <div className="post-item post-list--style mb-30">
                  <div className="thumb">
                    <img src={noticia.imagen.url} alt="" />
                  </div>
                  <div className="content">
                    <div className="post-date">
                      <Link to={`/noticias/${noticia._id}`}>
                        <span className="month">
                          {String(noticia.fecha).substring(8, 10)}
                          {"-"}
                          {String(noticia.fecha).substring(5, 7)}
                        </span>
                        <span className="date">
                          {String(noticia.fecha).substring(0, 4)}
                        </span>
                      </Link>
                    </div>
                    <div className="header-area">
                      <h4 className="post-title">
                        <Link to={`/noticias/${noticia._id}`}>
                          {noticia.titulo}
                        </Link>
                      </h4>
                    </div>
                    <Link
                      to={`/noticias/${noticia._id}`}
                      className="btn btn-primary btn-radius"
                    >
                      Ver detalles
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      </div>
    </section>
  );
};

export default TopNoticias;
