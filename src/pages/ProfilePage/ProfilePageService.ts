import axios from "axios";

const api = process.env.NODE_ENV === "development" ? "http://localhost:3001" : process.env.REACT_APP_BACKEND_API_URL;

export const getProfile = async (userName: string) => {
  const res = await axios.get(`${api}/mappy/api/users/${userName}`);
  return res;
};
