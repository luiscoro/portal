import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Footer from "./components/section/Footer";
import Header from "./components/section/Header";
import Home from "./components/Home";
import Dashboard from "./components/admin/Dashboard";
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
          <PrivateRoute
            path="/perfil/actualizar"
            component={UpdatePerfil}
            exact
          />
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
        {!loading && (!authenticatedUsuario || usuario.rol !== "admin") && (
          <Footer />
        )}
      </div>
    </Router>
  );
}

export default App;
