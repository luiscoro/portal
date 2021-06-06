import React from "react";
/* import { Link } from "react-router-dom"; */

const Noticia = ({ noticia, col }) => {
  return (
    <div className={`col-lg-${col}`}>
      <div className="post-item post-list--style">
        <div className="thumb">
          <img src={noticia.imagen.url} alt="" />
        </div>
        <div className="content">
          <div className="post-date">
            <a href="#0">
              <span className="month">
                {String(noticia.fecha).substring(8, 10)}
                {"-"}
                {String(noticia.fecha).substring(5, 7)}
              </span>
              <span className="date">
                {String(noticia.fecha).substring(0, 4)}
              </span>
            </a>
          </div>
          <div className="header-area">
            <h4 className="post-title">
              <a href="#0">{noticia.titulo}</a>
            </h4>
          </div>
          <a href="#0" className="btn btn-primary btn-radius">
            Ver detalles
          </a>
        </div>
      </div>
    </div>
  );
};

export default Noticia;
