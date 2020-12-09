import React, { useEffect } from "react";
import jwtDecode from "jwt-decode";

import AppWithRouter from "./AppWithRouter";
import setAuthToken from "../setAuthToken";
import useUsersStore from "../stores/users.store";
import IUser from "../types/User";

const App = () => {
  const { setCurrentUser, logoutUser } = useUsersStore();

  useEffect(() => {
    if (localStorage.jwtToken) {
      setAuthToken(localStorage.jwtToken);
      const decoded: IUser = jwtDecode(localStorage.jwtToken);
      setCurrentUser(decoded);

      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        logoutUser();
        window.location.href = "/login";
      }
    }
  }, [setCurrentUser, logoutUser]);

  return <AppWithRouter />;
};

export default App;
