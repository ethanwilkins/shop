import create from "zustand";
import { combine } from "zustand/middleware";
import { setAuthToken } from "../utils/auth";

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

      logoutUser: () => {
        set({ user: {}, isAuthenticated: false });
        setAuthToken(false);
        localStorage.removeItem("jwtToken");
      },
    })
  )
);

export default useUsersStore;
