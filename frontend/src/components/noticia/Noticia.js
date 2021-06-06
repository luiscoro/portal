import React from "react";
import { Link } from "react-router-dom";

const Noticia = ({ noticia, col }) => {
  return (
    <div className={`col-lg-${col}`}>
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
              <Link to={`/noticias/${noticia._id}`}>{noticia.titulo}</Link>
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
  );
};

export default Noticia;
