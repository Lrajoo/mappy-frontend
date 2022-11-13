import axios from "axios";

const api = process.env.NODE_ENV === "development" ? "http://localhost:3001" : process.env.REACT_APP_BACKEND_API_URL;

export const getLocations = async () => {
  const res = await axios.get(`${api}/mappy/api/locations`);
  return res;
};

export const deleteLocation = async (placeId: string) => {
  const res = await axios.delete(`${api}/mappy/api/locations/${placeId}`);
  return res;
};

export const getPlaceDetails = async (placeID: string) => {
  const res = await axios.get(`${api}/mappy/api/place/${placeID}`);
  return res;
};
