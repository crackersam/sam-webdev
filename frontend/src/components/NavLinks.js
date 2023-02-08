import React from "react";
import { NavLink } from "react-router-dom";

import "./NavLinks.css";

const MainNavigation = () => {
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/register">Register</NavLink>
      </li>
      <li>
        <NavLink to="/login">Login</NavLink>
      </li>
      <li>
        <NavLink to="/contact">Contact</NavLink>
      </li>
    </ul>
  );
};

export default MainNavigation;
