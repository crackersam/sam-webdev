import React from "react";
import NavLinks from "./NavLinks";
import "./Header.css";
import { Link } from "react-router-dom";

import "./Header.css";

const Header = ({ drawerIsOpen, setDrawerIsOpen }) => {
  return (
    <header className="main-header">
      <Link to="/" className="main-header__title-link">
        <h1 className="main-header__title">Sam Ames - Web Developer</h1>
      </Link>
      <nav className="main-header__navigation">
        <NavLinks />
      </nav>

      {!drawerIsOpen && (
        <img
          src="https://img.icons8.com/ios/50/000000/menu.png"
          alt="menu"
          className="menu-icon"
          onClick={() => setDrawerIsOpen(true)}
        />
      )}
    </header>
  );
};

export default Header;
