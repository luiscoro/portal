import React, { useEffect } from "react";
import Loader from "../section/Loader";
import { useDispatch, useSelector } from "react-redux";

import {
  getAdminAuspiciantes,
  clearErrors,
} from "../../actions/auspicianteActions";
import OwlCarousel from "react-owl-carousel";

const Auspiciantes = () => {
  const dispatch = useDispatch();

  const { loading, error, auspiciantes } = useSelector(
    (state) => state.auspiciantes
  );

  const options = {
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
        autoplay: true,
      },
      575: {
        items: 2,
      },
      992: {
        items: 3,
      },
    },
  };

  useEffect(() => {
    dispatch(getAdminAuspiciantes());
    if (error) {
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  return loading ? (
    <Loader />
  ) : (
    <section className="blog-section section-bg pt-120 pb-120">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="section-header text-center">
              <h2 className="section-title text-uppercase">
                <b>Nuestros</b> auspiciantes
              </h2>
            </div>
          </div>
        </div>
        <>
          <div className="row">
            <div className="col-lg-12">
              <div className="sponsor-slider-area">
                <OwlCarousel
                  className="sponsor-slider owl-carousel"
                  {...options}
                >
                  {auspiciantes.map((auspiciante) => (
                    <div className="sponsor-item" key={auspiciante._id}>
                      <img src={auspiciante.logo.url} alt="" />
                    </div>
                  ))}
                </OwlCarousel>
              </div>
            </div>
          </div>
        </>
      </div>
    </section>
  );
};

export default Auspiciantes;
