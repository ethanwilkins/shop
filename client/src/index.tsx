import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

import App from "./components/App";
import "./styles/index.scss";

axios.defaults.baseURL = "http://localhost:5000";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
