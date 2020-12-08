import React from "react";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, withRouter } from "react-router-dom";
import { Container } from "react-bootstrap";

import Home from "../pages/Home";
import SignUp from "../pages/Users/SignUp";
import UsersList from "../pages/Users/List";
import ProductsList from "../pages/Products/List";
import NotFound from "../pages/NotFound";
import Navbar from "./Navbar";

export const history = createBrowserHistory();

const Root = () => (
  <>
    <Navbar />
    <Container>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/products" component={ProductsList} />
        <Route exact path="/users" component={UsersList} />
        <Route exact path="/sign_up" component={SignUp} />
        <Route component={NotFound} />
      </Switch>
    </Container>
  </>
);

const App = withRouter(Root);

const AppWithRouter = () => (
  <Router history={history}>
    <App />
  </Router>
);

export default AppWithRouter;
