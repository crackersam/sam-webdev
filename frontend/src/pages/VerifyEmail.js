import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { verifyEmail } from "../features/auth/AuthSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useToast } from "../hooks/useToast";

const VerifyEmail = () => {
  const dispatch = useDispatch();
  const { token } = useParams();
  const navigate = useNavigate();
  const { successMessage } = useSelector((state) => state.auth);
  useToast();

  useEffect(() => {
    dispatch(verifyEmail(token)).then(() => {
      if (successMessage) {
        navigate("/");
      }
    });
  }, [token]);

  return null;
};

export default VerifyEmail;
