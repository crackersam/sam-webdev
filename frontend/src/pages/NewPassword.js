import React from "react";

const NewPassword = () => {
  const [formData, setFormData] = React.useState({
    password: "",
    password2: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    // dispatch(setNewPassword(password))
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
