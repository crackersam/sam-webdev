import axios from "axios";

const API_URL = "/api/calls/";

const allowedToCall = async () => {
  const response = await axios.get(
    API_URL + "allowed-to-call",
    {},
    {
      withCredentials: true,
    }
  );
  return response.data;
};

const defaultExport = {
  allowedToCall,
};
export default defaultExport;
