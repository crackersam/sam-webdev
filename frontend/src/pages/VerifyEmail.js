import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { verifyEmail } from "../features/auth/AuthSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const VerifyEmail = () => {
  const dispatch = useDispatch();
  const { token } = useParams();
  const { isSuccess, isError, errorMessage, isLoading } = useSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Email verified");
      navigate("/login");
    }
    if (isError) {
      toast.error(errorMessage);
    }
    if (!isSuccess && !isError && !isLoading) {
      dispatch(verifyEmail(token));
    }
  }, [isSuccess, isError, errorMessage, isLoading]);

  return null;
};

export default VerifyEmail;
