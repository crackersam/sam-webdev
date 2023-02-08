import React from "react";
import NavLinks from "./NavLinks";
import { CSSTransition } from "react-transition-group";
import { createPortal } from "react-dom";

import "./SideDrawer.css";

const SideDrawer = ({ drawerIsOpen, setDrawerIsOpen }) => {
  const node = React.useRef(null);
  const portalContent = (
    <>
      {drawerIsOpen && (
        <div className="backdrop" onClick={() => setDrawerIsOpen(false)}></div>
      )}
      <CSSTransition
        in={drawerIsOpen}
        timeout={300}
        classNames="slide-in-left"
        mountOnEnter
        unmountOnExit
        nodeRef={node}
      >
        <aside
          onClick={() => setDrawerIsOpen(false)}
          className="side-drawer"
          ref={node}
        >
          <nav className="side-drawer__nav">
            <NavLinks />
          </nav>
        </aside>
      </CSSTransition>
    </>
  );
  return createPortal(portalContent, document.getElementById("drawer-hook"));
};

export default SideDrawer;
