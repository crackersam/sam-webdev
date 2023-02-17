import axios from "axios";

const API_URL = "/api/admin/";

const getUsersAndFiles = async () => {
  const response = await axios.get(API_URL + "/assets", {
    withCredentials: true,
  });
  return response.data;
};

export default {
  getUsersAndFiles,
};
