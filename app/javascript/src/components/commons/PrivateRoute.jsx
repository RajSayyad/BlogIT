import React from "react";

import PropTypes from "prop-types";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({
  component: Component,
  render,
  condition,
  path,
  redirectRoute,
  ...props
}) => {
  if (!condition) {
    return (
      <Redirect
        to={{
          pathname: redirectRoute,
          from: props.location,
        }}
      />
    );
  }

  return (
    <Route
      path={path}
      {...props}
      render={routeProps =>
        Component ? <Component {...routeProps} /> : render(routeProps)
      }
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.elementType,
  render: PropTypes.func,
  condition: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  redirectRoute: PropTypes.string.isRequired,
  location: PropTypes.object,
};

export default PrivateRoute;
