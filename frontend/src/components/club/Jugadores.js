import React, { useEffect } from "react";
import Loader from "../section/Loader";
import { useDispatch, useSelector } from "react-redux";
import { getJugadores, clearErrors } from "../../actions/miembroActions";
import OwlCarousel from "react-owl-carousel";
import { getAdminPosiciones } from "../../actions/posicionActions";

var ageCalculator = require("age-calculator");
let { AgeFromDateString } = ageCalculator;
const Directiva = () => {
  const dispatch = useDispatch();
  const dispatch1 = useDispatch();

  const { loading, error, jugadores } = useSelector((state) => state.jugadores);
  const { posiciones } = useSelector((state) => state.posiciones);

  const options = {
    animateOut: "fadeOut",
    animateIn: "fadeIn",
    loop: true,
    margin: 0,
    smartSpeed: 1000,
    dots: false,
    nav: true,
    navText: [
      "<i class='fa fa-chevron-left'></i>",
      "<i class='fa fa-chevron-right'></i>",
    ],
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
      },
      992: {
        items: 1,
      },
    },
  };

  useEffect(() => {
    dispatch1(getAdminPosiciones());

    dispatch(getJugadores());
    if (error) {
      dispatch(clearErrors());
    }
  }, [dispatch, error, dispatch1]);

  return loading ? (
    <Loader />
  ) : (
    <section className="player-section base-overlay bg_img">
      <OwlCarousel className="single-player-slider owl-carousel" {...options}>
        {jugadores.map((jugador) => (
          <div
            className="single-player-details-area d-flex flex-wrap"
            key={jugador._id}
          >
            <div className="thumb">
              <div className="thumb-inner">
                <img src={jugador.foto && jugador.foto.url} alt="" />
              </div>
            </div>
            <div className="details text-center">
              <div className="header">
                <h4 className="title">{jugador.nombre}</h4>
              </div>
              <ul className="details-list">
                <li>
                  <span className="caption">Posición</span>
                  {posiciones.map((posicion) =>
                    posicion._id === jugador.posicion ? (
                      <span className="list-description" key={posicion._id}>
                        {posicion.nombre}
                      </span>
                    ) : (
                      <></>
                    )
                  )}
                </li>
                <li>
                  <span className="caption">Camiseta</span>
                  <span className="list-description">
                    #{jugador.numeroCamiseta}
                  </span>
                </li>
                <li>
                  <span className="caption">Edad</span>
                  <span className="list-description">
                    {
                      new AgeFromDateString(
                        jugador.fechaNacimiento.substring(0, 10)
                      ).age
                    }
                    &nbsp;años
                  </span>
                </li>
                <li>
                  <span className="caption">Nacionalidad</span>
                  <span className="list-description">
                    {jugador.nacionalidad}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        ))}
      </OwlCarousel>
    </section>
  );
};

export default Directiva;
