import axios from "axios";

const api = process.env.NODE_ENV === "development" ? "http://localhost:3001" : process.env.REACT_APP_BACKEND_API_URL;

export const postUser = async (payload: object) => {
  const res = await axios.post(`${api}/mappy/api/users`, payload);
  return res;
};
