import React from "react";
import CopyrightYear from "react-copyright-year";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      {/* footer-section start */}
      <footer className="footer-section">
        <div className="footer-bottom">
          <div className="container">
            <div className="row">
              <div className="col-sm-6">
                <p className="copy-right-text text-center text-sm-left">
                  Copyright <CopyrightYear style={{ color: "#777777" }} /> -
                  Todos los derechos reservados
                </p>
              </div>

              <div className="col-sm-4">
                <div className="site-logo site-title">
                  <Link to="/">
                    <img src="/assets/images/logo2.png" alt="" />
                  </Link>
                  <span className="logo-icon">
                    <i className="flaticon-fire" />
                  </span>
                </div>
              </div>

              <div className="col-sm-2">
                <ul className="social-links">
                  <li>
                    <a href="https://www.facebook.com/Sport3DeJulio/">
                      <i className="fa fa-facebook" />
                    </a>
                  </li>
                  <li>
                    <a href="https://www.youtube.com/channel/UCvtYi7VqEfd1kiMFr-kDBOA">
                      <i className="fa fa-youtube-play" />
                    </a>
                  </li>
                  <li>
                    <a href="https://www.instagram.com/sport.3dejulio">
                      <i className="fa fa-instagram" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* footer-bottom end */}
      </footer>
      {/* footer-section end */}
    </>
  );
};

export default Footer;
