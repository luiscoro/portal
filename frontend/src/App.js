import React, { useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Footer from "./components/section/Footer";
import Header from "./components/section/Header";
import Home from "./components/Home";

//ADMIN
import Dashboard from "./components/admin/Dashboard";
import CreateProducto from "./components/admin/CreateProducto";
import CreateNoticia from "./components/admin/CreateNoticia";
import ListProductos from "./components/admin/ListProductos";
import ListNoticias from "./components/admin/ListNoticias";
import ListUsuarios from "./components/admin/ListUsuarios";
import UpdateProducto from "./components/admin/UpdateProducto";
import UpdateUsuario from "./components/admin/UpdateUsuario";
import UpdateNoticia from "./components/admin/UpdateNoticia";

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
        <div className="main-wrapper color-variation-four">
          <Route path="/" component={Home} exact />
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
        </div>
        <PrivateRoute
          path="/dashboard"
          esAdmin={true}
          component={Dashboard}
          exact
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

        {!loading && (!authenticatedUsuario || usuario.rol !== "admin") && (
          <Footer />
        )}
      </div>
    </Router>
  );
}

export default App;
