import { useEffect } from "react";
import jwtDecode from "jwt-decode";
import { ApolloProvider } from "@apollo/client";

import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.scss";

import Layout from "../components/_App/Layout";
import useUsersStore from "../stores/users.store";
import { setAuthToken } from "../utils/auth";
import { useApollo } from "../apollo/client";

const App = ({ Component, pageProps, apollo }) => {
  const apolloClient = useApollo(pageProps.initialApolloState);
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
    <ApolloProvider client={apolloClient}>
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
};

export default App;
