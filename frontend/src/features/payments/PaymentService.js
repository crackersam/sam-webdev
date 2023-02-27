import axios from "axios";

const API_URL = "/api/payments/";

const getMyPayments = async () => {
  const response = await axios.get(API_URL, {
    withCredentials: true,
  });
  return response.data;
};

const defaultExport = {
  getMyPayments,
};
export default defaultExport;
