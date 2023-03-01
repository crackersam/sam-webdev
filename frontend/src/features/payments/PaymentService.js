import axios from "axios";

const API_URL = "/api/payments/";

const getMyPayments = async () => {
  const response = await axios.get(API_URL, {
    withCredentials: true,
  });
  return response.data;
};

const createPaymentIntent = async (paymentId) => {
  const response = await axios.post(
    API_URL + "create-payment-intent",
    {
      paymentId,
    },
    {
      withCredentials: true,
    }
  );
  return response.data;
};

const successfulPayment = async (paymentId) => {
  const response = await axios.put(
    API_URL + "successful-payment",
    {
      paymentId,
    },
    {
      withCredentials: true,
    }
  );
  return response.data;
};

const defaultExport = {
  getMyPayments,
  createPaymentIntent,
  successfulPayment,
};
export default defaultExport;
