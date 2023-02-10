import axios from "axios";

const API_URL = "/api/users/";

const register = async (regData) => {
  const response = await axios.post(API_URL, regData);
  if (response.data) {
    localStorage.setItem("token", JSON.stringify(response.data.token));
  }
  return response.data;
};

const authService = {
  register,
};

export default authService;
