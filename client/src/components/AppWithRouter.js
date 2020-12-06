import React from 'react';
import { createBrowserHistory } from 'history'
import { Router, Route, Switch, withRouter } from 'react-router-dom';

import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import Navbar from './Navbar';

export const history = createBrowserHistory();

const Root = () => (
  <div class=".container">
    <Navbar />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  </div>
);

const App = withRouter(Root);

const AppWithRouter = () => (
  <Router history={history}>
    <App />
  </Router>
);

export default AppWithRouter;
