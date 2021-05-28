import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar-wrapper">
      <nav id="sidebar">
        <ul className="list-unstyled components">
          <li>
            <Link to="/dashboard">
              <i className="fa fa-tachometer"></i> Dashboard
            </Link>
          </li>

          <li>
            <a
              href="#productSubmenu"
              data-toggle="collapse"
              aria-expanded="false"
              className="dropdown-toggle"
            >
              <i className="fa fa-product-hunt"></i> Productos
            </a>
            <ul className="collapse list-unstyled" id="productSubmenu">
              <li>
                <Link to="/admin-productos">
                  <i className="fa fa-clipboard"></i> Listado
                </Link>
              </li>

              <li>
                <Link to="/admin-producto">
                  <i className="fa fa-plus"></i> Nuevo
                </Link>
              </li>

              <li>
                <Link to="/admin-revisiones">
                  <i className="fa fa-star"></i> Revisiones
                </Link>
              </li>
            </ul>
          </li>

          <li>
            <Link to="/admin/orders">
              <i className="fa fa-shopping-basket"></i> Pedidos
            </Link>
          </li>

          <li>
            <a
              href="#noticiaSubmenu"
              data-toggle="collapse"
              aria-expanded="false"
              className="dropdown-toggle"
            >
              <i className="fa fa-newspaper-o"></i> Noticias
            </a>
            <ul className="collapse list-unstyled" id="noticiaSubmenu">
              <li>
                <Link to="/admin-noticias">
                  <i className="fa fa-clipboard"></i> Listado
                </Link>
              </li>

              <li>
                <Link to="/admin-noticia">
                  <i className="fa fa-plus"></i> Nueva
                </Link>
              </li>
            </ul>
          </li>

          <li>
            <Link to="/admin-usuarios">
              <i className="fa fa-users"></i> Usuarios
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
