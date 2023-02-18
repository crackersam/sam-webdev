import axios from "axios";

const API_URL = "/api/users/";

const register = async (regData) => {
  const response = await axios.post(API_URL, regData);
  return response.data;
};

const logout = async () => {
  const response = await axios.get(API_URL + "logout", {
    withCredentials: true,
  });
  return response.data;
};

const login = async (loginData) => {
  const response = await axios.post(API_URL + "login", loginData);
  return response.data;
};

const getProfile = async () => {
  const response = await axios.get(API_URL + "me", { withCredentials: true });
  console.log("response", response);
  return response.data;
};

const resetPassword = async (email) => {
  const response = await axios.post(API_URL + "reset-password", {
    email,
  });
  return response.data;
};

const setNewPassword = async (resetToken, password) => {
  const response = await axios.post(API_URL + "reset-password/" + resetToken, {
    password,
  });
  return response.data;
};

const verifyEmail = async (verificationToken) => {
  const response = await axios.get(API_URL + "verify/" + verificationToken);
  return response.data;
};

const authService = {
  register,
  getProfile,
  logout,
  login,
  resetPassword,
  verifyEmail,
  setNewPassword,
};

export default authService;
