import React, { useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Footer from "./components/section/Footer";
import Header from "./components/section/Header";
import Home from "./components/Home";
import Resultados from "./components/Resultados";
import Noticias from "./components/Noticias";
import Tienda from "./components/Tienda";

//ADMIN
import Dashboard from "./components/admin/Dashboard";
import CreateCategoria from "./components/admin/CreateCategoria";
import CreateProducto from "./components/admin/CreateProducto";
import CreateNoticia from "./components/admin/CreateNoticia";
import CreatePartido from "./components/admin/CreatePartido";
import CreateAuspiciante from "./components/admin/CreateAuspiciante";
import CreateInformacion from "./components/admin/CreateInformacion";
import ListCategorias from "./components/admin/ListCategorias";
import ListProductos from "./components/admin/ListProductos";
import ListInformacion from "./components/admin/ListInformacion";
import ListNoticias from "./components/admin/ListNoticias";
import ListPartidos from "./components/admin/ListPartidos";
import ListAuspiciantes from "./components/admin/ListAuspiciantes";
import ListUsuarios from "./components/admin/ListUsuarios";
import UpdateInformacion from "./components/admin/UpdateInformacion";
import UpdateCategoria from "./components/admin/UpdateCategoria";
import UpdateProducto from "./components/admin/UpdateProducto";
import UpdateUsuario from "./components/admin/UpdateUsuario";
import UpdateNoticia from "./components/admin/UpdateNoticia";
import UpdatePartido from "./components/admin/UpdatePartido";
import UpdateAuspiciante from "./components/admin/UpdateAuspiciante";

//USUARIO
import Login from "./components/usuario/Login";
import Registro from "./components/usuario/Registro";
import ForgotPassword from "./components/usuario/ForgotPassword";
import NewPassword from "./components/usuario/NewPassword";
import UpdatePassword from "./components/usuario/UpdatePassword";
import Perfil from "./components/usuario/Perfil";
import UpdatePerfil from "./components/usuario/UpdatePerfil";

import PrivateRoute from "./components/route/PrivateRoute";
import { loadUsuario } from "./actions/usuarioActions";
import store from "./store";
import { useSelector } from "react-redux";

function App() {
  useEffect(() => {
    store.dispatch(loadUsuario());
  }, []);

  const { usuario, authenticatedUsuario, loading } = useSelector(
    (state) => state.auth
  );
  return (
    <Router>
      <div className="main-wrapper color-variation-four">
        <Header />
        <Route path="/" component={Home} exact />
        <Route path="/resultados" component={Resultados} />
        <Route path="/noticias" component={Noticias} exact />
        <Route path="/noticias/buscar/:keyword" component={Noticias} />
        <Route path="/tienda" component={Tienda} exact />
        <Route path="/tienda/buscar/:keyword" component={Tienda} exact />
        <Route path="/login" component={Login} />
        <Route path="/registro" component={Registro} />
        <Route path="/password/olvido" component={ForgotPassword} exact />
        <Route path="/password/reset/:token" component={NewPassword} exact />
        <PrivateRoute path="/perfil" component={Perfil} exact />
        <PrivateRoute path="/perfil/actualizar" component={UpdatePerfil} />
        <PrivateRoute
          path="/password/actualizar"
          component={UpdatePassword}
          exact
        />
        <PrivateRoute
          path="/dashboard"
          esAdmin={true}
          component={Dashboard}
          exact
        />
        <PrivateRoute
          path="/admin-informacion"
          esAdmin={true}
          component={CreateInformacion}
          exact
        />
        <PrivateRoute
          path="/informacion"
          esAdmin={true}
          component={ListInformacion}
          exact
        />
        <PrivateRoute
          path="/informacion/:id"
          esAdmin={true}
          component={UpdateInformacion}
        />
        <PrivateRoute
          path="/admin-categoria"
          esAdmin={true}
          component={CreateCategoria}
          exact
        />
        <PrivateRoute
          path="/admin-categorias"
          esAdmin={true}
          component={ListCategorias}
          exact
        />
        <PrivateRoute
          path="/admin-categoria/:id"
          esAdmin={true}
          component={UpdateCategoria}
        />
        <PrivateRoute
          path="/admin-producto"
          esAdmin={true}
          component={CreateProducto}
          exact
        />
        <PrivateRoute
          path="/admin-productos"
          esAdmin={true}
          component={ListProductos}
          exact
        />
        <PrivateRoute
          path="/admin-producto/:id"
          esAdmin={true}
          component={UpdateProducto}
        />
        <PrivateRoute
          path="/admin-usuarios"
          esAdmin={true}
          component={ListUsuarios}
          exact
        />
        <PrivateRoute
          path="/admin-usuario/:id"
          esAdmin={true}
          component={UpdateUsuario}
        />
        <PrivateRoute
          path="/admin-noticia"
          esAdmin={true}
          component={CreateNoticia}
          exact
        />
        <PrivateRoute
          path="/admin-noticias"
          esAdmin={true}
          component={ListNoticias}
          exact
        />
        <PrivateRoute
          path="/admin-noticia/:id"
          esAdmin={true}
          component={UpdateNoticia}
        />
        <PrivateRoute
          path="/admin-partido"
          esAdmin={true}
          component={CreatePartido}
          exact
        />
        <PrivateRoute
          path="/admin-partidos"
          esAdmin={true}
          component={ListPartidos}
          exact
        />
        <PrivateRoute
          path="/admin-partido/:id"
          esAdmin={true}
          component={UpdatePartido}
        />
        <PrivateRoute
          path="/admin-auspiciante"
          esAdmin={true}
          component={CreateAuspiciante}
          exact
        />
        <PrivateRoute
          path="/admin-auspiciantes"
          esAdmin={true}
          component={ListAuspiciantes}
          exact
        />
        <PrivateRoute
          path="/admin-auspiciante/:id"
          esAdmin={true}
          component={UpdateAuspiciante}
        />
        {!loading && (!authenticatedUsuario || usuario.rol !== "admin") && (
          <Footer />
        )}
      </div>
    </Router>
  );
}

export default App;
