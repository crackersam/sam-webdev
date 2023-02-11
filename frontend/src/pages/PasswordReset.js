import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../features/auth/AuthSlice";
import { toast } from "react-toastify";

const PasswordReset = () => {
  const [email, setEmail] = React.useState("");
  const { isSuccess, isError, errorMessage } = useSelector(
    (state) => state.auth
  )``;
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Password reset email sent");
    }
    if (isError) {
      toast.error(errorMessage);
    }
  }, [isSuccess, isError, errorMessage]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPassword(email));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">Reset Password</button>
    </form>
  );
};

export default PasswordReset;
