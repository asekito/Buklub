import * as React from "react";
import { Link } from "react-router-dom";
import "../assets/Nav.scss";

const NavBar = () => {
  const handleLogout = () => {
    const token = localStorage.getItem("user");
    if (token) {
      localStorage.removeItem("user");
      window.location.reload();
    }
  };

  const user = localStorage.getItem("user")
    ? localStorage.getItem("user")
    : null;

  console.log(user);

  return (
    <div id="navigation-top">
      <h1 className="header">Buklub</h1>
      <nav>
        <ul className="navlist">
          {localStorage.getItem("user") ? null : (
            <li>
              <Link className="nav-item" to="/login">
                Login
              </Link>
            </li>
          )}
          {user === null ? (
            <li>
              <Link className="nav-item" to="/register">
                Sign Up
              </Link>
            </li>
          ) : null}
          <li>
            <Link className="nav-item" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="nav-item" to="/book-search">
              Book Search
            </Link>
          </li>
          <li>
            <Link className="nav-item" to="/book-randomizer">
              Randomizer
            </Link>
          </li>
          {user === null ? null : (
            <li>
              <Link className="nav-item" to="/read-list">
                Read List Profile
              </Link>
            </li>
          )}
          {localStorage.getItem("user") ? (
            <li onClick={handleLogout}>
              <a className="nav-item" href="">
                Logout
              </a>
            </li>
          ) : null}
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;

// type logoutHandler = () => void;
