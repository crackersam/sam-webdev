import axios from "axios";

const API_URL = "/api/appointments/";

const getAvailableTimes = async () => {
  const response = await axios.get(
    API_URL + "available-times",
    {
      withCredentials: true,
    }
  );
  return response.data;
};

const appointmentsService = {
  getAvailableTimes,
};
export default appointmentsService;
