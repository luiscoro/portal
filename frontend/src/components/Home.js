import React, { useEffect } from "react";
import MetaData from "./section/MetaData";
import Banner from "./section/Banner";
import About from "./section/About";
import Loader from "./section/Loader";
import NoticiasTop from "./noticia/NoticiasTop";
import { useDispatch, useSelector } from "react-redux";

import {
  getAdminInformacion,
  clearErrors,
} from ".././actions/informacionActions";

const Home = () => {
  const dispatch = useDispatch();

  const { loading, error, informacion } = useSelector(
    (state) => state.informacion
  );

  useEffect(() => {
    dispatch(getAdminInformacion());
    if (error) {
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={"Inicio"} />
          {informacion.map((info) => (
            <Banner key={info._id} informacion={info} />
          ))}
          {/* latest-match-result-section start */}
          <div className="latest-match-result-section">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-8">
                  <div className="latest-match-result-area">
                    <div className="club-area d-flex flex-wrap align-items-center">
                      <div className="club-one d-flex flex-wrap justify-content-between align-items-center">
                        <div className="brand-area text-center">
                          <img src="assets/images/club-logo/dhaka.png" alt="" />
                          <h4 className="club-name text-uppercase">
                            dhaka pro
                          </h4>
                        </div>
                        <div className="result">
                          <span>03</span>
                        </div>
                      </div>
                      <span className="verses">vs</span>
                      <div className="club-two d-flex flex-wrap justify-content-between align-items-center">
                        <div className="brand-area text-center">
                          <img
                            src="assets/images/club-logo/soccer.png"
                            alt=""
                          />
                          <h4 className="club-name text-uppercase">
                            soccer club
                          </h4>
                        </div>
                        <div className="result">
                          <span>03</span>
                        </div>
                      </div>
                    </div>
                    {/* club-area end */}
                    <div className="description text-center">
                      <span className="text-capitalize">
                        sun, Oct 21, supper football
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* latest-match-result-section end */}
          {informacion.map((info) => (
            <About key={info._id} informacion={info} />
          ))}

          <NoticiasTop />
        </>
      )}
    </>
  );
};

export default Home;
