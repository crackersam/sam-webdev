import React from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../features/auth/AuthSlice";

const Login = () => {
  const [fields, setFields] = React.useState({
    email: "",
    password: "",
  });
  const { email, password } = fields;
  const dispatch = useDispatch();
  const { user, isLoading, isSuccess, errorMessage } = useSelector(
    (state) => state.auth
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { email, password };
    dispatch(login(user));
  };
  return (
    <>
      <section>
        <h2>Log in</h2>
        <p>Please log in</p>
      </section>
      <section>
        <form onSubmit={handleSubmit}>
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
          <button type="submit">Register</button>
        </form>
      </section>
    </>
  );
};

export default Login;
