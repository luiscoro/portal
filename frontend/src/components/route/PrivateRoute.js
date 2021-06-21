import React, { Fragment } from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ esAdmin, component: Component, ...rest }) => {
  const { authenticatedUsuario, loading, usuario } = useSelector(
    (state) => state.auth
  );

  return (
    <Fragment>
      {loading === false && (
        <Route
          {...rest}
          render={(props) => {
            if (authenticatedUsuario === false) {
              return <Redirect to="/login" />;
            }

            if (esAdmin === true && usuario.rol !== "administrador") {
              return <Redirect to="/" />;
            }

            return <Component {...props} />;
          }}
        />
      )}
    </Fragment>
  );
};

export default PrivateRoute;
