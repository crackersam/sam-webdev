import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../features/auth/AuthSlice";

const PasswordReset = () => {
  const [email, setEmail] = React.useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
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
