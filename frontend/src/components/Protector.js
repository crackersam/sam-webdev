import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Protector = (props) => {
  const { admin } = useSelector((state) => state.auth);
  if (props.admin && !admin) return <Navigate to="/" />;
  if (!document.cookie) return <Navigate to="/" />;

  return <Outlet />;
};

export default Protector;
