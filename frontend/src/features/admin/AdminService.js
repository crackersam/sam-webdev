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

const getAppointments = async () => {
  const response = await axios.get(
    API_URL + "appointments",
    {
      withCredentials: true,
    }
  );
  return response.data;
};

const rejectAppointment = async (id) => {
  const response = await axios.delete(
    API_URL + "appointments",
    { data: { id } },
    {
      withCredentials: true,
    }
  );
  return response.data;
};

const confirmAppointment = async (id) => {
  const response = await axios.put(
    API_URL + "appointments",
    { id },
    {
      withCredentials: true,
    }
  );
  return response.data;
};
const getDocuments = async () => {
  const response = await axios.get(API_URL + "documents", {
    withCredentials: true,
  });

  return response.data;
};

const getPayments = async () => {
  const response = await axios.get(API_URL + "payments", {
    withCredentials: true,
  });

  return response.data;
};

const createPayment = async (data) => {
  const response = await axios.post(
    API_URL + "payments",
    data,
    {
      withCredentials: true,
    }
  );

  return response.data;
};

const deletePayment = async (id) => {
  const response = await axios.delete(
    API_URL + "payments",
    { data: { id } },
    {
      withCredentials: true,
    }
  );

  return response.data;
};

const defaultExport = {
  getUsersAndFiles,
  downloadFile,
  updateAvailability,
  getAvailability,
  getAppointments,
  rejectAppointment,
  confirmAppointment,
  getDocuments,
  getPayments,
  createPayment,
  deletePayment,
};
export default defaultExport;
