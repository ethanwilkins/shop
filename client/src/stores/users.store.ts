import create from "zustand";
import { combine } from "zustand/middleware";
import axios from "axios";
import jwtDecode from "jwt-decode";
import setAuthToken from "../setAuthToken";
import { IUser, IUserDecoded } from "../types/User";

const useUsersStore = create(
  combine(
    {
      user: {},
      isAuthenticated: false,
    },

    (set) => ({
      setCurrentUser: (user: IUserDecoded) => {
        set({ user: user, isAuthenticated: true });
      },

      signUpUser: (user: IUser) => {
        axios
          .post("/users/signup", user)
          .then((res) => {
            const { token, result } = res.data;
            localStorage.setItem("jwtToken", token);
            setAuthToken(token);
            set({ user: result, isAuthenticated: true });
            window.location.href = "/";
          })
          .catch((err) => {});
      },

      loginUser: (user: IUser) => {
        axios
          .post("/users/login", user)
          .then((res) => {
            const { token } = res.data;
            localStorage.setItem("jwtToken", token);
            setAuthToken(token);
            const decodedUser: IUserDecoded = jwtDecode(token);
            set({ user: decodedUser, isAuthenticated: true });
            window.location.href = "/";
          })
          .catch((err) => {
            alert(JSON.stringify(err));
          });
      },

      logoutUser: () => {
        set({ user: {}, isAuthenticated: false });
        setAuthToken(false);
        localStorage.removeItem("jwtToken");
        window.location.href = "/login";
      },
    })
  )
);

export default useUsersStore;
