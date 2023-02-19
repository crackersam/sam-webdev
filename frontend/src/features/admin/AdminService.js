import axios from "axios";

const API_URL = "/api/admin/";

const getUsersAndFiles = async () => {
  const response = await axios.get(API_URL + "assets", {
    withCredentials: true,
  });
  return response.data;
};

const downloadFile = async (filename) => {
  const response = await axios.get(
    API_URL + "assets/" + filename,
    {
      withCredentials: true,
      responseType: "blob",
    }
  );
  const filenamePrep = filename.split(".");
  filenamePrep.shift();
  const filenameClean = filenamePrep.join(".");
  return {
    file: window.URL.createObjectURL(response.data),
    filename: filenameClean,
  };
};

const updateAvailability = async (data) => {
  const response = await axios.put(
    API_URL + "availability",
    data,
    {
      withCredentials: true,
    }
  );
  return response.data;
};

const getAvailability = async () => {
  const response = await axios.get(
    API_URL + "availability"
  );
  return response.data;
};

export default {
  getUsersAndFiles,
  downloadFile,
  updateAvailability,
  getAvailability,
};
