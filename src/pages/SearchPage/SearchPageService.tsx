import axios from "axios";

const api = process.env.NODE_ENV === "development" ? "http://localhost:3001" : process.env.REACT_APP_BACKEND_API_URL;

export const getSearchResults = async (searchQuery: string) => {
  try {
    const res = await axios.get(`${api}/mappy/api/places?search=${searchQuery}`);
    return res;
  } catch (e) {
    console.log("API Error", e);
    return [];
  }
};

export const getPlaceDetails = async (placeID: string) => {
  try {
    const res = await axios.get(`${api}/mappy/api/place/${placeID}`);
    return res;
  } catch (e) {
    console.log("API Error", e);
    return {};
  }
};

export const postLocation = async (payload: any) => {
  try {
    const res = await axios.post(`${api}/mappy/api/location`, payload);
    return res;
  } catch (e) {
    console.log("API Error", e);
  }
};
