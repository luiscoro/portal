import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = () => {

  const {
    cantP
  } = useSelector((state) => state.getPedidos);


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
            <Link to="/configuracion">
              <i className="fa fa-gear"></i> Configuración
            </Link>
          </li>
          <li>
            <a
              href="#miembroSubmenu"
              data-toggle="collapse"
              aria-expanded="false"
              className="dropdown-toggle"
            >
              <i className="fa fa-address-book-o"></i> Miembros
            </a>
            <ul className="collapse list-unstyled" id="miembroSubmenu">
              <li>
                <Link to="/admin-tipomiembros">
                  <i className="fa fa-universal-access"></i> Tipos
                </Link>
              </li>

              <li>
                <Link to="/admin-miembros">
                  <i className="fa fa-clipboard"></i> Listado
                </Link>
              </li>

              <li>
                <Link to="/admin-miembro">
                  <i className="fa fa-plus"></i> Nuevo
                </Link>
              </li>
              <li>
                <Link to="/admin-posiciones">
                  <i className="fa fa-universal-access"></i> Posiciones
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <a
              href="#contratoSubmenu"
              data-toggle="collapse"
              aria-expanded="false"
              className="dropdown-toggle"
            >
              <i className="fa fa-briefcase"></i> Contratos
            </a>
            <ul className="collapse list-unstyled" id="contratoSubmenu">

              <li>
                <Link to="/admin-contratos">
                  <i className="fa fa-clipboard"></i> Listado
                </Link>
              </li>

              <li>
                <Link to="/admin-contrato">
                  <i className="fa fa-plus"></i> Nuevo
                </Link>
              </li>

            </ul>
          </li>
          <li>
            <a
              href="#dirigenteSubmenu"
              data-toggle="collapse"
              aria-expanded="false"
              className="dropdown-toggle"
            >
              <i className="fa fa-address-card"></i> Dirigentes
            </a>
            <ul className="collapse list-unstyled" id="dirigenteSubmenu">
              <li>
                <Link to="/admin-dirigentes">
                  <i className="fa fa-clipboard"></i> Listado
                </Link>
              </li>

              <li>
                <Link to="/admin-dirigente">
                  <i className="fa fa-plus"></i> Nuevo
                </Link>
              </li>
            </ul>
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
                  <i className="fa fa-star"></i> Valoraciones
                </Link>
              </li>

              <li>
                <Link to="/admin-productos-inactivos">
                  <i className="fa fa-clipboard"></i> Inactivos
                </Link>
              </li>

              <li>
                <a
                  href="#categoriasSubmenu"
                  data-toggle="collapse"
                  aria-expanded="false"
                  className="dropdown-toggle"
                >
                  <i className="fa fa-list-alt"></i> Categorías
                </a>
                <ul className="collapse list-unstyled" id="categoriasSubmenu">
                  <li>
                    <Link to="/admin-categorias">
                      <i className="fa fa-clipboard"></i> Listado
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin-categorias-inactivas">
                      <i className="fa fa-clipboard"></i> Inactivas
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </li>

          <li>
            <Link to="/admin-pedidos">
              <i className="fa fa-shopping-basket"></i> Pedidos({cantP} nuevos)
            </Link>
          </li>

          <li>
            <Link to="/admin-usuarios">
              <i className="fa fa-users"></i> Usuarios
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
            <a
              href="#partidoSubmenu"
              data-toggle="collapse"
              aria-expanded="false"
              className="dropdown-toggle"
            >
              <i className="fa fa-life-ring"></i> Partidos
            </a>
            <ul className="collapse list-unstyled" id="partidoSubmenu">
              <li>
                <Link to="/admin-partidos">
                  <i className="fa fa-clipboard"></i> Listado
                </Link>
              </li>

              <li>
                <Link to="/admin-partido">
                  <i className="fa fa-plus"></i> Nuevo
                </Link>
              </li>
            </ul>
          </li>

          <li>
            <a
              href="#clasificacionSubmenu"
              data-toggle="collapse"
              aria-expanded="false"
              className="dropdown-toggle"
            >
              <i className="fa fa-table"></i> Clasificación
            </a>
            <ul className="collapse list-unstyled" id="clasificacionSubmenu">
              <li>
                <Link to="/admin-clasificaciones">
                  <i className="fa fa-clipboard"></i> Listado
                </Link>
              </li>

              <li>
                <Link to="/admin-clasificacion">
                  <i className="fa fa-plus"></i> Nueva
                </Link>
              </li>
            </ul>
          </li>

          <li>
            <a
              href="#auspicianteSubmenu"
              data-toggle="collapse"
              aria-expanded="false"
              className="dropdown-toggle"
            >
              <i className="fa fa-suitcase"></i> Auspiciantes
            </a>
            <ul className="collapse list-unstyled" id="auspicianteSubmenu">
              <li>
                <Link to="/admin-auspiciantes">
                  <i className="fa fa-clipboard"></i> Listado
                </Link>
              </li>

              <li>
                <Link to="/admin-auspiciante">
                  <i className="fa fa-plus"></i> Nuevo
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
