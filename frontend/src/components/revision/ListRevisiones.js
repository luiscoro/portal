import React from "react";

const ListRevisiones = ({ revisiones }) => {
  return (
    <div className="product-review-area">
      <h4 className="title"> &nbsp;&nbsp;Comentarios:</h4>
      <ul className="review-list">
        {revisiones &&
          revisiones.map((revision) => (
            <li className="single-review" key={revision._id}>
              <div className="content">
                <h6 className="name">{revision.nombre}</h6>
                <div className="rating-outer">
                  <div
                    className="rating-inner"
                    style={{ width: `${(revision.calificacion / 5) * 100}%` }}
                  ></div>
                </div>
                <p>{revision.comentario}</p>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ListRevisiones;
