import axios from "axios";

export const getPlaceDetails = async (placeID: string) => {
  const res = await axios.get(`http://localhost:3001/mappy/api/place/${placeID}`);
  return res;
};
