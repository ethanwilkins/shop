import React from "react";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, withRouter } from "react-router-dom";
import { Container } from "react-bootstrap";

import Home from "../pages/Home";
import SignUp from "../pages/Users/SignUp";
import Login from "../pages/Users/Login";
import UsersList from "../pages/Users/List";
import UsersShow from "../pages/Users/Show";
import UsersEdit from "../pages/Users/Edit";
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
        <Route path="/users/:name" component={UsersShow} />
        <Route path="/users_edit/:name" component={UsersEdit} />
        <Route exact path="/sign_up" component={SignUp} />
        <Route exact path="/login" component={Login} />
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
