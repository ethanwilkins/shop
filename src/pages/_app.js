import { useEffect } from "react";
import jwtDecode from "jwt-decode";

import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.scss";

import Layout from "../components/_App/Layout";
import useUsersStore from "../stores/users.store";
import { setAuthToken } from "../utils/auth";

const App = ({ Component, pageProps }) => {
  const { setCurrentUser, logoutUser } = useUsersStore();

  useEffect(() => {
    if (localStorage.jwtToken) {
      setAuthToken(localStorage.jwtToken);
      const decoded = jwtDecode(localStorage.jwtToken);
      setCurrentUser(decoded);

      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        logoutUser();
      }
    }
  }, [setCurrentUser, logoutUser]);

  return (
    <Layout {...pageProps}>
      <Component {...pageProps} />
    </Layout>
  );
};

export default App;
