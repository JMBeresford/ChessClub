import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Signin from './signin';
import Register from './register';

const Auth = () => {
  return (
    <div id='auth'>
      <Switch>
        <Route path='/auth/signin'>
          <Signin />
        </Route>
        <Route path='/auth/register'>
          <Register />
        </Route>
      </Switch>
    </div>
  );
};

export default Auth;
