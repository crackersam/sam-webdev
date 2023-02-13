import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const RedirectLoggedIn = () => {
  const navigate = useNavigate();
  const forename = useSelector((state) => state.auth.forename);
  useEffect(() => {
    if (forename) {
      navigate("/");
    }
  }, [forename, navigate]);
  return <Outlet />;
};

export default RedirectLoggedIn;
