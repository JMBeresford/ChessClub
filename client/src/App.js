import React, { useLayoutEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Auth from './components/auth';
import vhCheck from 'vh-check';

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
          <Route path='/auth'>
            <Auth />
          </Route>
          <Route path='/home'>
            <h1>ass home</h1>
          </Route>
        </Switch>
        <div id='bg' />
      </div>
    </Router>
  );
}

export default App;
