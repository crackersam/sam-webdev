import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const Protector = () => {
  if (!document.cookie) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};

export default Protector;
