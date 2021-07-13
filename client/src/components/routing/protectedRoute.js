import React, { useLayoutEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from '../../lib/authUtils';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const [auth, setAuth] = useState(true);

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
          <Component user={auth} />
        ) : (
          <Redirect
            to={{ pathname: '/auth/signin', state: { from: props.location } }}
          />
        );
      }}
    />
  );
};

export default ProtectedRoute;
