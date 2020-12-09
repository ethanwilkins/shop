import React from "react";
import ReactDOM from "react-dom";
import jwtDecode from "jwt-decode";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

import App from "./components/App";
import setAuthToken from "./setAuthToken";
import "./styles/index.scss";

axios.defaults.baseURL = "http://localhost:5000";

interface IToken {
  exp: number;
}

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded: IToken = jwtDecode(localStorage.jwtToken);
  // set current user here

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // log out user here
    window.location.href = "/login";
  }
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
