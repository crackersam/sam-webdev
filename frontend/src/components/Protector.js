import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const Protector = () => {
  if (!document.cookie) {
    toast.error("You need to log in, first! ;^)");

    return <Navigate to="/login" />;
  }
  return <Outlet />;
};

export default Protector;
