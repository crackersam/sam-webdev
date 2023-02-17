import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../features/auth/AuthSlice";
import { useSelector } from "react-redux";

const Login = () => {
  const [fields, setFields] = React.useState({
    email: "",
    password: "",
  });
  const { email, password } = fields;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { successMessage } = useSelector((state) => state.auth);

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
    if (successMessage) {
      navigate("/");
    }
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
          <button type="submit">Login</button>
        </form>
      </section>
    </>
  );
};

export default Login;
