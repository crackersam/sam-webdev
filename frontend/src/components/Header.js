import React from "react";
import NavLinks from "./NavLinks";
import "./Header.css";

const Header = ({ drawerIsOpen, setDrawerIsOpen }) => {
  return (
    <header className="main-header">
      <h1>Sam Ames - Web Developer</h1>
      <nav className="big-navigation">
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
