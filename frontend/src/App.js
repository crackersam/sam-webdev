import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SideDrawer from "./components/SideDrawer";
import Header from "./components/Header";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [drawerIsOpen, setDrawerIsOpen] = React.useState(false);

  return (
    <>
      <Router>
        <SideDrawer
          drawerIsOpen={drawerIsOpen}
          setDrawerIsOpen={setDrawerIsOpen}
        />
        <Header drawerIsOpen={drawerIsOpen} setDrawerIsOpen={setDrawerIsOpen} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
};

export default App;
