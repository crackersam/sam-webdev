import React from "react";
import { NavLink } from "react-router-dom";

import "./NavLinks.css";

const MainNavigation = () => {
  const links = !document.cookie ? (
    <>
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
    </>
  ) : (
    <>
      <li>
        <NavLink to="/protected">Protected</NavLink>
      </li>
      <li>
        <NavLink to="/logout">Logout</NavLink>
      </li>
    </>
  );

  return <ul className="nav-links">{links}</ul>;
};

export default MainNavigation;
