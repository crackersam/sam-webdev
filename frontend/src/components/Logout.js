import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/AuthSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  React.useEffect(() => {
    dispatch(logout());
    navigate("/");
    toast.success("You have been logged out");
  }, []);

  return null;
};

export default Logout;
