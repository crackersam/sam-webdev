import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { verifyEmail } from "../features/auth/AuthSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useToast } from "../hooks/useToast";

const VerifyEmail = () => {
  const dispatch = useDispatch();
  const { token } = useParams();
  const navigate = useNavigate();
  const { successMessage } = useSelector((state) => state.auth);
  useToast();

  useEffect(() => {
    if (successMessage) {
      navigate("/");
    }
  }, [successMessage]);

  useEffect(() => {
    dispatch(verifyEmail(token));
  }, [token]);

  return null;
};

export default VerifyEmail;
