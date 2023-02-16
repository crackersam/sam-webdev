import axios from "axios";

const API_URL = "/api/assets/";

const upload = async (file) => {
  const response = await axios.post(API_URL, file, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  });
  return response.data;
};

const getMyFilenames = async () => {
  const response = await axios.get(API_URL, {
    withCredentials: true,
  });
  return response.data;
};

const downloadFile = async (filename) => {
  const response = await axios.get(API_URL + filename, {
    withCredentials: true,
    responseType: "blob",
  });
  return {
    file: window.URL.createObjectURL(response.data),
    filename: filename,
  };
};

const uploadService = {
  upload,
  getMyFilenames,
  downloadFile,
};
export default uploadService;
