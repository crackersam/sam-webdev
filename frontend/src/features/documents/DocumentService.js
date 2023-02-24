import axios from "axios";

const API_URL = "/api/documents/";

const saveDocument = async (document) => {
  const response = await axios.post(API_URL, document, {
    withCredentials: true,
  });
  return response.data;
};

const getMyDocuments = async () => {
  const response = await axios.get(
    API_URL + "my-documents",
    {
      withCredentials: true,
    }
  );
  return response.data;
};

const getDocument = async (slug) => {
  const response = await axios.get(API_URL + slug, {
    withCredentials: true,
  });
  return response.data;
};

const updateDocument = async (document) => {
  const response = await axios.put(
    API_URL + document.slug,
    document,
    {
      withCredentials: true,
    }
  );
  return response.data;
};

export default {
  saveDocument,
  getMyDocuments,
  getDocument,
  updateDocument,
};
