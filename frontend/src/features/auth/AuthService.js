import axios from "axios";

const API_URL = "/api/users/";

const register = async (regData) => {
  const response = await axios.post(API_URL, regData);
  return response.data;
};

const getProfile = async () => {
  const response = await axios.get(API_URL + "me", { withCredentials: true });
  return response.data;
};

const authService = {
  register,
  getProfile,
};

export default authService;
