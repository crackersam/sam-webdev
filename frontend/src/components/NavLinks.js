import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import "./NavLinks.css";

const MainNavigation = () => {
  const { admin } = useSelector((state) => state.auth);
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
        <NavLink to="/assets">Assets</NavLink>
      </li>
      <li>
        <NavLink to="/appointments">Appointments</NavLink>
      </li>
      <li>
        <NavLink to="/logout">Logout</NavLink>
      </li>
      <li>
        <NavLink to="/documents">Documents</NavLink>
      </li>
      <li>
        <NavLink to="/payments">Payments</NavLink>
      </li>
      <li>
        <NavLink to="/call">Call</NavLink>
      </li>
      {admin && (
        <li>
          <NavLink to="/admin">Admin</NavLink>
        </li>
      )}
    </>
  );

  return <ul className="nav-links">{links}</ul>;
};

export default MainNavigation;
