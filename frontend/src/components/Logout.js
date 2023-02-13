import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/AuthSlice";
import { useNavigate } from "react-router-dom";
import { useToast } from "../hooks/useToast";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useToast();
  React.useEffect(() => {
    dispatch(logout());
  }, []);

  return null;
};

export default Logout;
