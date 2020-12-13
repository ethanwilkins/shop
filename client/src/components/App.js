import React, { useEffect } from "react";
import jwtDecode from "jwt-decode";

import AppWithRouter from "./AppWithRouter";
import useUsersStore from "../stores/users.store";
import setAuthToken from "../setAuthToken";

const App = () => {
  const { setCurrentUser, logoutUser } = useUsersStore();

  useEffect(() => {
    if (localStorage.jwtToken) {
      alert("Hello!");
      setAuthToken(localStorage.jwtToken);
      const decoded = jwtDecode(localStorage.jwtToken);
      setCurrentUser(decoded);

      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        logoutUser();
      }
    }
  }, [setCurrentUser, logoutUser]);

  return <AppWithRouter />;
};

export default App;
