import React from "react";
import { useDispatch } from "react-redux";
import { setNewPassword } from "../features/auth/AuthSlice";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useToast } from "../hooks/useToast";

const NewPassword = () => {
  const [formData, setFormData] = React.useState({
    password: "",
    password2: "",
  });
  const dispatch = useDispatch();
  const { token } = useParams();

  useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.password2) {
      toast.error("Passwords do not match");
      return;
    }
    dispatch(setNewPassword({ token, password: formData.password }));
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        value={formData.password}
        onChange={handleChange}
      />
      <label htmlFor="password2">Confirm Password</label>
      <input
        type="password"
        name="password2"
        id="password2"
        value={formData.password2}
        onChange={handleChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default NewPassword;
