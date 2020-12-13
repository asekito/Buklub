import * as React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const handleLogout = () => {
    const token = localStorage.getItem("user");
    if (token) {
      localStorage.removeItem("user");
      window.location.reload();
    }
  };

  return (
    <nav>
      <ul>
        {localStorage.getItem("user") ? null : (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
        {localStorage.getItem("user") ? null : (
          <li>
            <Link to="/register">Sign Up</Link>
          </li>
        )}
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/book-search">Book Search</Link>
        </li>
        <li>
          <Link to="/book-randomizer">Randomizer</Link>
        </li>
        {localStorage.getItem("user") ? (
          <li>
            <Link to="/read-list">Read List Profile</Link>
          </li>
        ) : null}
        {localStorage.getItem("user") ? (
          <li onClick={handleLogout}>Logout</li>
        ) : null}
      </ul>
    </nav>
  );
};

export default NavBar;

// type logoutHandler = () => void;
