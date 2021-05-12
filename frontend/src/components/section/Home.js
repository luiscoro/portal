import React from "react";

const Home = () => {
  return (
    <>
      {/* banner-section start */}
      <section className="banner-section">
        <div className="base-layer">
          <img src="assets/images/bg/home-banner1.jpg" alt="" />
        </div>
        <div className="secondary-layer">
          <img src="assets/images/bg/home-banner2.jpg" alt="" />
        </div>
        <div className="banner-element">
          <img src="assets/images/banner-elements/home-3.png" alt="" />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="banner-content">
                <span className="sub-title">Santo Domingo pasión</span>
                <h2 className="title">somos un equipo somos historia</h2>
                <a
                  className="video-btn"
                  href="https://www.youtube.com/embed/EEQnxJZ5WiU"
                  data-rel="lightcase:myCollection"
                >
                  <i className="fa fa-play" />
                  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                  <h1 className="title">SÚPER 3</h1>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* banner-section end */}
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
                      <h4 className="club-name text-uppercase">dhaka pro</h4>
                    </div>
                    <div className="result">
                      <span>03</span>
                    </div>
                  </div>
                  <span className="verses">vs</span>
                  <div className="club-two d-flex flex-wrap justify-content-between align-items-center">
                    <div className="brand-area text-center">
                      <img src="assets/images/club-logo/soccer.png" alt="" />
                      <h4 className="club-name text-uppercase">soccer club</h4>
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
      {/* about-section start */}
      <section className="about-section pt-120 pb-120">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="section-header text-center">
                <h2 className="section-title text-uppercase">
                  <b>club</b> 3 de julio
                </h2>
              </div>
            </div>
          </div>
          <div className="row justify-content-between">
            <div className="col-lg-5">
              <div className="about-image">
                <img
                  src="assets/images/football/about.jpg"
                  alt=""
                  data-paroller-factor="0.05"
                  data-paroller-type="foreground"
                  data-paroller-direction="vertical"
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="about-content">
                <blockquote>
                  Nuestro objetivo es llegar a ser el mejor equipo de fútbol del
                  Ecuador.
                </blockquote>
                <p>
                  Lorem ipsum dolor sit amet, risus augue neque pulvinar ut,
                  eget cursus ante consectetuer sed nulla vitae, porttitor porta
                  erat quisque leointger. Praesent est augue. Blandit turpis
                  porttitor nulla felis, arcu nec amet litora vitae euismod,
                  ridiculus dolor.
                </p>
                <ul className="common-list">
                  <li>Fusce nonummy neque mattis</li>
                  <li>Tortor donec idatsed felis</li>
                  <li>Aipiscing purus praesent</li>
                  <li>Curabitur mauris pede</li>
                  <li>Proin id sem rutrum praesen</li>
                  <li>Consectetuer velit nunc </li>
                  <li>Exercitationem eget dolor</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* about-section end */}
      {/* player-section start */}
      <section
        className="player-section base-overlay bg_img"
        data-background="assets/images/bg/home-one-banner-two.jpg"
      >
        <div className="single-player-slider owl-carousel">
          <div className="single-player-details-area d-flex flex-wrap">
            <div className="thumb">
              <div className="thumb-inner">
                <img src="assets/images/ragbi/player-1.png" alt="image" />
              </div>
            </div>
            <div className="details text-center">
              <div className="header">
                <h4 className="title">Martin hover</h4>
              </div>
              <ul className="details-list">
                <li>
                  <span className="caption">Age</span>
                  <span className="list-description">35 years</span>
                </li>
                <li>
                  <span className="caption">club</span>
                  <span className="list-description">lagisa FC</span>
                </li>
                <li>
                  <span className="caption">Experience</span>
                  <span className="list-description">10 years</span>
                </li>
                <li>
                  <span className="caption">Height</span>
                  <span className="list-description">6' 2"</span>
                </li>
                <li>
                  <span className="caption">weight</span>
                  <span className="list-description">110KG</span>
                </li>
              </ul>
              <a href="#0" className="btn btn-primary btn-radius">
                View Details
              </a>
            </div>
          </div>
          {/* single-player-details-area end */}
          <div className="single-player-details-area d-flex flex-wrap">
            <div className="thumb">
              <div className="thumb-inner">
                <img src="assets/images/ragbi/player-1.png" alt="image" />
              </div>
            </div>
            <div className="details text-center">
              <div className="header">
                <h4 className="title">Martin hover</h4>
              </div>
              <ul className="details-list">
                <li>
                  <span className="caption">Age</span>
                  <span className="list-description">35 years</span>
                </li>
                <li>
                  <span className="caption">club</span>
                  <span className="list-description">lagisa FC</span>
                </li>
                <li>
                  <span className="caption">Experience</span>
                  <span className="list-description">10 years</span>
                </li>
                <li>
                  <span className="caption">Height</span>
                  <span className="list-description">6' 2"</span>
                </li>
                <li>
                  <span className="caption">weight</span>
                  <span className="list-description">110KG</span>
                </li>
              </ul>
              <a href="#0" className="btn btn-primary btn-radius">
                View Details
              </a>
            </div>
          </div>
          {/* single-player-details-area end */}
        </div>
      </section>
      {/* player-section end */}
      {/* gallery-section start */}
      <section className="gallery-section pt-120 pb-120">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="section-header">
                <h2 className="section-title text-uppercase">
                  <b>Galería</b> de fotos
                </h2>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="grid">
                <div className="grid-item">
                  <div className="gallery-thumb style--two">
                    <img src="assets/images/football/1.jpg" alt="" />
                    <a
                      href="assets/images/football/1.jpg"
                      className="icon"
                      data-rel="lightcase:myCollection:slideshow"
                    >
                      <i
                        className="fa fa-picture-o"
                        title="Your title is here"
                      />
                    </a>
                  </div>
                </div>
                {/* grid-item end */}
                <div className="grid-item">
                  <div className="gallery-thumb style--two">
                    <img src="assets/images/football/1.jpg" alt="" />
                    <a
                      href="assets/images/football/1.jpg"
                      className="icon"
                      data-rel="lightcase:myCollection:slideshow"
                    >
                      <i
                        className="fa fa-picture-o"
                        title="Your title is here"
                      />
                    </a>
                  </div>
                </div>
                {/* grid-item end */}
                <div className="grid-item">
                  <div className="gallery-thumb style--two">
                    <img src="assets/images/football/1.jpg" alt="" />
                    <a
                      href="assets/images/football/1.jpg"
                      className="icon"
                      data-rel="lightcase:myCollection:slideshow"
                    >
                      <i
                        className="fa fa-picture-o"
                        title="Your title is here"
                      />
                    </a>
                  </div>
                </div>
                {/* grid-item end */}
                <div className="grid-item">
                  <div className="gallery-thumb style--two">
                    <img src="assets/images/football/1.jpg" alt="" />
                    <a
                      href="assets/images/football/1.jpg"
                      className="icon"
                      data-rel="lightcase:myCollection:slideshow"
                    >
                      <i
                        className="fa fa-picture-o"
                        title="Your title is here"
                      />
                    </a>
                  </div>
                </div>
                {/* grid-item end */}
                <div className="grid-item">
                  <div className="gallery-thumb style--two">
                    <img src="assets/images/football/1.jpg" alt="" />
                    <a
                      href="assets/images/football/1.jpg"
                      className="icon"
                      data-rel="lightcase:myCollection:slideshow"
                    >
                      <i
                        className="fa fa-picture-o"
                        title="Your title is here"
                      />
                    </a>
                  </div>
                </div>
                {/* grid-item end */}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* gallery-section end */}
      {/* product-section start */}
      <section className="product-section section-bg pt-120 pb-120">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="section-header">
                <h2 className="section-title text-uppercase">
                  <b>Nuestra</b> tienda
                </h2>
              </div>
            </div>
          </div>
          <div className="product-slider owl-carousel">
            <div className="product-item">
              <div className="product-thumb">
                <img src="assets/images/shopping/1.png" alt="" />
              </div>
              <div className="content">
                <h4 className="product-name">
                  <a href="#0">basketball</a>
                </h4>
                <span className="product-price">
                  $25<del>$65</del>
                </span>
                <div className="product-ratings">
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star-half-empty" />
                  <i className="fa fa-star-o" />
                </div>
              </div>
              <div className="product-item-cart">
                <a href="#0">
                  <i className="fa fa-shopping-cart" />
                </a>
                <a href="#0">
                  <i className="fa fa-eye" />
                </a>
              </div>
            </div>
            {/* product-item end */}
            <div className="product-item">
              <div className="product-thumb">
                <img src="assets/images/shopping/2.png" alt="" />
              </div>
              <div className="content">
                <h4 className="product-name">
                  <a href="#0">basketball</a>
                </h4>
                <span className="product-price">
                  $25<del>$65</del>
                </span>
                <div className="product-ratings">
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star-half-empty" />
                  <i className="fa fa-star-o" />
                </div>
              </div>
              <div className="product-item-cart">
                <a href="#0">
                  <i className="fa fa-shopping-cart" />
                </a>
                <a href="#0">
                  <i className="fa fa-eye" />
                </a>
              </div>
            </div>
            {/* product-item end */}
            <div className="product-item">
              <div className="product-thumb">
                <img src="assets/images/shopping/3.png" alt="" />
              </div>
              <div className="content">
                <h4 className="product-name">
                  <a href="#0">basketball</a>
                </h4>
                <span className="product-price">
                  $25<del>$65</del>
                </span>
                <div className="product-ratings">
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star-half-empty" />
                  <i className="fa fa-star-o" />
                </div>
              </div>
              <div className="product-item-cart">
                <a href="#0">
                  <i className="fa fa-shopping-cart" />
                </a>
                <a href="#0">
                  <i className="fa fa-eye" />
                </a>
              </div>
            </div>
            {/* product-item end */}
            <div className="product-item">
              <div className="product-thumb">
                <img src="assets/images/shopping/4.png" alt="" />
              </div>
              <div className="content">
                <h4 className="product-name">
                  <a href="#0">basketball</a>
                </h4>
                <span className="product-price">
                  $25<del>$65</del>
                </span>
                <div className="product-ratings">
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star-half-empty" />
                  <i className="fa fa-star-o" />
                </div>
              </div>
              <div className="product-item-cart">
                <a href="#0">
                  <i className="fa fa-shopping-cart" />
                </a>
                <a href="#0">
                  <i className="fa fa-eye" />
                </a>
              </div>
            </div>
            {/* product-item end */}
            <div className="product-item">
              <div className="product-thumb">
                <img src="assets/images/shopping/1.png" alt="" />
              </div>
              <div className="content">
                <h4 className="product-name">
                  <a href="#0">basketball</a>
                </h4>
                <span className="product-price">
                  $25<del>$65</del>
                </span>
                <div className="product-ratings">
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star-half-empty" />
                  <i className="fa fa-star-o" />
                </div>
              </div>
              <div className="product-item-cart">
                <a href="#0">
                  <i className="fa fa-shopping-cart" />
                </a>
                <a href="#0">
                  <i className="fa fa-eye" />
                </a>
              </div>
            </div>
            {/* product-item end */}
          </div>
        </div>
      </section>
      {/* product-section end */}
      {/* blog-section start */}
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
          <div className="row mb-none-30">
            <div className="col-lg-6">
              <div className="post-item post-list--style mb-30">
                <div className="thumb">
                  <img src="assets/images/blog/basketball/1.jpg" alt="" />
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
                        molestie sedfusce lorem velit pra ornare quisque urna
                        libero.
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
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="post-item post-list--style mb-30">
                <div className="thumb">
                  <img src="assets/images/blog/basketball/2.jpg" alt="" />
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
                        molestie sedfusce lorem velit pra ornare quisque urna
                        libero.
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* blog-section end */}
      {/* sponser-section start */}
      <section className="sponser-section pb-120">
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
          <div className="row">
            <div className="col-lg-12">
              <div className="sponsor-slider-area">
                <div className="sponsor-slider owl-carousel">
                  <div className="sponsor-item">
                    <img src="assets/images/sponsor/ragbi/1.png" alt="" />
                  </div>
                  {/* sponsor-item end */}
                  <div className="sponsor-item">
                    <img src="assets/images/sponsor/ragbi/2.png" alt="" />
                  </div>
                  {/* sponsor-item end */}
                  <div className="sponsor-item">
                    <img src="assets/images/sponsor/ragbi/3.png" alt="" />
                  </div>
                  {/* sponsor-item end */}
                  <div className="sponsor-item">
                    <img src="assets/images/sponsor/ragbi/1.png" alt="" />
                  </div>
                  {/* sponsor-item end */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* sponser-section end */}
    </>
  );
};

export default Home;
