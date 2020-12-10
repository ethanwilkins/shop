import React from "react";
import { Link } from "react-router-dom";

import useUsersStore from "../stores/users.store";

const Navbar = () => {
  const isAuthenticated = useUsersStore((state) => state.isAuthenticated);
  const { logoutUser } = useUsersStore();

  return (
    <nav
      className="navbar navbar-dark bg-dark navbar-expand-lg"
      style={{ marginBottom: "50px" }}
    >
      <Link to="/" className="navbar-brand">
        Shop
      </Link>

      <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
            <Link to="/products" className="nav-link">
              Products
            </Link>
          </li>

          <li className="navbar-item">
            <Link to="/users" className="nav-link">
              Users
            </Link>
          </li>

          {isAuthenticated ? (
            <li className="navbar-item">
              <Link onClick={() => logoutUser()} className="nav-link">
                Log out
              </Link>
            </li>
          ) : (
            <li className="navbar-item">
              <Link to="/sign_up" className="nav-link">
                Sign up
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
