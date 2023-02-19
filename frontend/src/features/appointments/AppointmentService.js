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

const newAppointmentRequest = async (date) => {
  const response = await axios.post(
    API_URL + "new-appointment",
    {
      date,
    },
    {
      withCredentials: true,
    }
  );
  return response.data;
};

const getMyAppointments = async () => {
  const response = await axios.get(
    API_URL + "my-appointments",
    {
      withCredentials: true,
    }
  );
  return response.data;
};

const cancelAppointment = async (id) => {
  const response = await axios.delete(
    API_URL + "cancel-appointment/",
    {
      data: {
        id,
      },
      withCredentials: true,
    }
  );
  return response.data;
};

const appointmentsService = {
  getAvailableTimes,
  newAppointmentRequest,
  getMyAppointments,
  cancelAppointment,
};
export default appointmentsService;
