import React, { useLayoutEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from '../../lib/authUtils';

const UnprotectedRoute = ({ component: Component, ...rest }) => {
  const [auth, setAuth] = useState(false);

  useLayoutEffect(() => {
    async function wrapper() {
      let res = await isAuthenticated();
      setAuth(res);
    }

    wrapper();
  }, []);

  return (
    <Route
      {...rest}
      render={(props) => {
        return auth ? (
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        ) : (
          <Component />
        );
      }}
    />
  );
};

export default UnprotectedRoute;
