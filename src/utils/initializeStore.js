import { useMemo } from "react";
import create from "zustand";
import axios from "axios";
import jwtDecode from "jwt-decode";
import Router from "next/router";
import { setAuthToken } from "./auth";
import baseUrl from "./baseUrl";

let store;

const initialState = {
  user: {},
  isAuthenticated: false,
};

function initStore(preloadedState = initialState) {
  return create((set, get) => ({
    ...initialState,
    ...preloadedState,

    setCurrentUser: (user) => {
      set({ user: user, isAuthenticated: true });
    },

    updateUser: (user) => {
      axios
        .patch(`/users/${user._id}`, user)
        .then((res) => {
          const { token, user } = res.data;
          localStorage.setItem("jwtToken", token);
          setAuthToken(token);
          set({ user: user });
          window.location.href = `/users/${user.name}`;
        })
        .catch((err) => {});
    },

    deleteUser: (userId) => {
      axios
        .delete(`/users/${userId}`)
        .then((res) => {
          window.location.href = "/users";
        })
        .catch((err) => {
          alert("Was not able to delete the user.");
        });
    },

    signUpUser: (user) => {
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
      window.location.href = "/login";
    },
  }));
}

export const initializeStore = (preloadedState) => {
  let _store = store ?? initStore(preloadedState);

  // After navigating to a page with an initial Zustand state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === "undefined") return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
};

export function useHydrate(initialState) {
  const state =
    typeof initialState === "string" ? JSON.parse(initialState) : initialState;
  const store = useMemo(() => initializeStore(state), [state]);
  return store;
}
