import axios from "axios";

const API_URL = "/api/admin/";

const getUsersAndFiles = async () => {
  const response = await axios.get(API_URL + "/assets", {
    withCredentials: true,
  });
  return response.data;
};

const downloadFile = async (filename) => {
  const response = await axios.get(API_URL + "assets/" + filename, {
    withCredentials: true,
    responseType: "blob",
  });
  const filenamePrep = filename.split(".");
  filenamePrep.shift();
  const filenameClean = filenamePrep.join(".");
  return {
    file: window.URL.createObjectURL(response.data),
    filename: filenameClean,
  };
};

export default {
  getUsersAndFiles,
  downloadFile,
};
