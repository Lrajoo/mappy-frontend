import axios from "axios";

const api = process.env.REACT_APP_BACKEND_API_URL || "http://localhost:3001";

export const getSearchResults = async (searchQuery: string) => {
  const res = await axios.get(`${api}/mappy/api/places?search=${searchQuery}`);
  return res;
};

export const getPlaceDetails = async (placeID: string) => {
  const res = await axios.get(`${api}/mappy/api/place/${placeID}`);
  return res;
};
