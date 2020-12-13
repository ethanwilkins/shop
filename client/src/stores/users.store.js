import create from "zustand";
import { combine } from "zustand/middleware";
import axios from "axios";
import jwtDecode from "jwt-decode";
import setAuthToken from "../setAuthToken";

const useUsersStore = create(
  combine(
    {
      user: {},
      isAuthenticated: false,
    },

    (set) => ({
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
          .post("/users/login", user)
          .then((res) => {
            const { token } = res.data;
            localStorage.setItem("jwtToken", token);
            setAuthToken(token);
            const decodedUser = jwtDecode(token);
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
