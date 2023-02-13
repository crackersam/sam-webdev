import axios from "axios";

const API_URL = "/api/uploads/";

const upload = async (file) => {
  const response = await axios.post(API_URL, file, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  });
  return response.data;
};

const uploadService = {
  upload,
};
export default uploadService;
