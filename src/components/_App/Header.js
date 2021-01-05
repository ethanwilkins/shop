import React from "react";
import Link from "next/link";
import { Nav } from "react-bootstrap";

import { useStore } from "../../utils/zustandProvider";
import shallow from "zustand/shallow";

const useUsersStore = () => {
  return useStore(
    (store) => ({
      isAuthenticated: store.isAuthenticated,
      user: store.user,
      logoutUser: store.logoutUser,
    }),
    shallow
  );
};

const Header = () => {
  const { isAuthenticated, user, logoutUser } = useUsersStore();

  return (
    <nav
      className="navbar navbar-dark bg-dark navbar-expand-lg"
      style={{ marginBottom: "50px" }}
    >
      <Link href="/" passHref>
        <Nav.Link className="navbar-brand">Shop</Nav.Link>
      </Link>

      <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
            <Link href="/products/list" passHref>
              <Nav.Link className="nav-link">Products</Nav.Link>
            </Link>
          </li>

          <li className="navbar-item">
            <Link href="/users/list" passHref>
              <Nav.Link className="nav-link">Users</Nav.Link>
            </Link>
          </li>

          <li className="navbar-item">
            <Link href="/images/list" passHref>
              <Nav.Link className="nav-link">Images</Nav.Link>
            </Link>
          </li>

          <li className="navbar-item">
            <Link href="/checkout" passHref>
              <Nav.Link className="nav-link">Checkout</Nav.Link>
            </Link>
          </li>

          {isAuthenticated ? (
            <>
              <li className="navbar-item">
                <Link href={`/users/${user.name}`} passHref>
                  <Nav.Link className="nav-link">{user.name}</Nav.Link>
                </Link>
              </li>

              <li className="navbar-item">
                <Link
                  href="#"
                  passHref
                  onClick={() =>
                    window.confirm("Are you sure you want to log out?") &&
                    logoutUser()
                  }
                >
                  <Nav.Link className="nav-link">Log out</Nav.Link>
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="navbar-item">
                <Link href="/users/login" passHref>
                  <Nav.Link className="nav-link">Log in</Nav.Link>
                </Link>
              </li>

              <li className="navbar-item">
                <Link href="/users/signup" passHref>
                  <Nav.Link className="nav-link">Sign up</Nav.Link>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
