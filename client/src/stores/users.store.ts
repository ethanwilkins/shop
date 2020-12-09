import create from "zustand";
import { combine } from "zustand/middleware";
import axios from "axios";
import jwtDecode from "jwt-decode";
import setAuthToken from "../setAuthToken";
import IUser from "../types/User";

const useUsersStore = create(
  combine(
    {
      user: {},
      isAuthenticated: false,
    },

    (set) => ({
      setCurrentUser: (user: IUser) => {
        set({ user: user });
      },

      loginUser: (user: IUser) => {
        axios
          .post("/users/login", user)
          .then((res) => {
            const { token } = res.data;
            localStorage.setItem("jwtToken", token);
            setAuthToken(token);
            const decodedUser: IUser = jwtDecode(token);
            set({ user: decodedUser });
          })
          .catch((err) => {});
      },

      logoutUser: () => {
        set({ isAuthenticated: false });
        setAuthToken(false);
        localStorage.removeItem("jwtToken");
      },
    })
  )
);

export default useUsersStore;
