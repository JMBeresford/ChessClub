import React, { useLayoutEffect } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import ProtectedRoute from './components/routing/protectedRoute';
import UnprotectedRoute from './components/routing/unprotectedRoute';
import Auth from './components/auth';
import vhCheck from 'vh-check';
import Home from './pages/home';
import Background from './components/background';

function App() {
  useLayoutEffect(() => {
    const vhObj = vhCheck({
      cssVarName: 'vh-offset',
      force: false,
      bind: true,
      redefineVh: false,
      updateOnTouch: false,
      onUpdate: function noop() {},
    });

    return () => {
      vhObj.unbind();
    };
  });

  return (
    <Router>
      <div className='App'>
        <Switch>
          <UnprotectedRoute path='/auth' component={Auth} />
          <ProtectedRoute path='/' component={Home} />
        </Switch>
      </div>
      <Background />
    </Router>
  );
}

export default App;
