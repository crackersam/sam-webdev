import React from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../features/auth/AuthSlice";
import { useToast } from "../hooks/useToast";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [fields, setFields] = React.useState({
    forename: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { successMessage } = useSelector((state) => state.auth);
  const { forename, email, password, confirmPassword } = fields;
  const dispatch = useDispatch();
  useToast();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    } else {
      dispatch(register({ forename, email, password })).then(() => {
        if (successMessage) {
          navigate("/");
        }
      });
    }
  };

  return (
    <>
      <section>
        <h2>Register</h2>
        <p>Please create an account</p>
      </section>
      <section>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="forename">Forename</label>
            <input
              type="text"
              name="forename"
              value={forename}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Register</button>
        </form>
      </section>
    </>
  );
};

export default Register;
