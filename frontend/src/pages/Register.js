import React from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register, reset } from "../features/auth/AuthSlice";

const Register = () => {
  const [fields, setFields] = React.useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { name, email, password, confirmPassword } = fields;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isError, isSuccess, errorMessage } = useSelector(
    (state) => state.auth
  );

  React.useEffect(() => {
    if (isError) {
      toast.error(errorMessage);
      dispatch(reset());
    }

    if (isSuccess) {
      toast.success("Registration successful");
      dispatch(reset());
      navigate("/");
    }
    if (document.cookie) {
      navigate("/");
    }
  }, [isError, errorMessage, isSuccess, dispatch, navigate]);

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
      dispatch(register({ name, email, password }));
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
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              value={name}
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
