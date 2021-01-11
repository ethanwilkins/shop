import create from "zustand";
import { combine } from "zustand/middleware";
import axios from "axios";
import jwtDecode from "jwt-decode";
import Router from "next/router";
import { setAuthToken } from "../utils/auth";
import baseUrl from "../utils/baseUrl";

const useUsersStore = create(
  combine(
    {
      user: {},
      isAuthenticated: false,
    },

    (set, get) => ({
      setCurrentUser: (user) => {
        set({ user: user, isAuthenticated: true });
      },

      updateUser: (user) => {
        axios
          .patch(`${baseUrl}/api/users/${user._id}`, user)
          .then((res) => {
            const currentUser = get().user;
            const { token, user } = res.data;

            if (currentUser._id === user._id) {
              localStorage.setItem("jwtToken", token);
              setAuthToken(token);
              set({ user: user });
            }

            Router.push(`/users/${user.name}`);
          })
          .catch((err) => {});
      },

      signUpUser: (user) => {
        axios
          .post(`${baseUrl}/api/users/signup`, user)
          .then((res) => {
            const { token, newUser } = res.data;
            localStorage.setItem("jwtToken", token);
            setAuthToken(token);
            set({ user: newUser, isAuthenticated: true });
            Router.push("/");
          })
          .catch((err) => {});
      },

      loginUser: (user) => {
        axios
          .post(`${baseUrl}/api/users/login`, user)
          .then((res) => {
            const { token } = res.data;
            localStorage.setItem("jwtToken", token);
            setAuthToken(token);
            const decodedUser = jwtDecode(token);
            set({ user: decodedUser, isAuthenticated: true });
            Router.push("/");
          })
          .catch((err) => {
            alert(JSON.stringify(err));
          });
      },

      logoutUser: () => {
        set({ user: {}, isAuthenticated: false });
        setAuthToken(false);
        localStorage.removeItem("jwtToken");
      },
    })
  )
);

export default useUsersStore;
