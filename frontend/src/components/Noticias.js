import React from "react";
import { Route, Link } from "react-router-dom";
import MetaData from "./section/MetaData";
import SearchNoticia from "./section/SearchNoticia";

const Noticias = () => {
  return (
    <>
      <MetaData title={"Noticias"} />
      <section className="inner-banner-section bg_img base-overlay">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="inner-banner-content text-center">
                <h2 className="page-title">noticias</h2>
                <ol className="breadcum d-flex justify-content-center">
                  <li>
                    <Link to="/" style={{ textDecoration: "none" }}>
                      Inicio
                    </Link>
                  </li>
                  <li>noticias</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="d-flex justify-content-end">
        <Route render={({ history }) => <SearchNoticia history={history} />} />
      </div>
      <section className="blog-section pt-120 pb-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="post-item post-list--style">
                <div className="thumb">
                  <img src="assets/images/blog/ragbi/b1.jpg" alt="" />
                </div>
                <div className="content">
                  <div className="post-date">
                    <a href="#0">
                      <span className="date">20</span>
                      <span className="month">dec</span>
                    </a>
                  </div>
                  <div className="header-area">
                    <h4 className="post-title">
                      <a href="#0">
                        molestie sedfusce lorem velit praesent dui ornare
                        quisque urna libero.{" "}
                      </a>
                    </h4>
                    <ul className="post-meta">
                      <li>
                        <a href="#0">
                          <i className="fa fa-user" />
                          minhazur rahman
                        </a>
                      </li>
                      <li>
                        <a href="#0">
                          <i className="fa fa-commenting" />
                          350 comment
                        </a>
                      </li>
                      <li>
                        <a href="#0">
                          <i className="fa fa-share-alt" />
                          share post
                        </a>
                      </li>
                    </ul>
                  </div>

                  <a href="#0" className="btn btn-primary btn-radius">
                    read more
                  </a>
                </div>
              </div>
              {/* post-item end */}
            </div>
            <div className="col-lg-6">
              <div className="post-item post-list--style">
                <div className="thumb">
                  <img src="assets/images/blog/ragbi/b1.jpg" alt="" />
                </div>
                <div className="content">
                  <div className="post-date">
                    <a href="#0">
                      <span className="date">20</span>
                      <span className="month">dec</span>
                    </a>
                  </div>
                  <div className="header-area">
                    <h4 className="post-title">
                      <a href="#0">
                        molestie sedfusce lorem velit praesent dui ornare
                        quisque urna libero.{" "}
                      </a>
                    </h4>
                    <ul className="post-meta">
                      <li>
                        <a href="#0">
                          <i className="fa fa-user" />
                          minhazur rahman
                        </a>
                      </li>
                      <li>
                        <a href="#0">
                          <i className="fa fa-commenting" />
                          350 comment
                        </a>
                      </li>
                      <li>
                        <a href="#0">
                          <i className="fa fa-share-alt" />
                          share post
                        </a>
                      </li>
                    </ul>
                  </div>

                  <a href="#0" className="btn btn-primary btn-radius">
                    read more
                  </a>
                </div>
              </div>
              {/* post-item end */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Noticias;
