import axios from "axios";

const api = process.env.NODE_ENV === "development" ? "http://localhost:3001" : process.env.REACT_APP_BACKEND_API_URL;

export const getSearchResults = async (searchQuery: string) => {
  const res = await axios.get(`${api}/mappy/api/places?search=${searchQuery}`);
  return res;
};

export const getPlaceDetails = async (placeID: string) => {
  const res = await axios.get(`${api}/mappy/api/place/${placeID}`);
  return res;
};

export const postLocation = async (payload: any) => {
  const res = await axios.post(`${api}/mappy/api/locations`, payload);
  return res;
};
