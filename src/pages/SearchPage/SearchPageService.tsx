import axios from "axios";

export const getSearchResults = async (searchQuery: string) => {
  const res = await axios.get(`http://localhost:3001/mappy/api/places?search=${searchQuery}`);
  return res;
};
