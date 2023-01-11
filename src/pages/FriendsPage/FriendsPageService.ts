import axios from "axios";

const api = process.env.NODE_ENV === "development" ? "http://localhost:3001" : process.env.REACT_APP_BACKEND_API_URL;

export const getFriends = async (userName: string) => {
  const res = await axios.get(`${api}/mappy/api/users/${userName}/friends`);
  return res;
};

export const getUsers = async (searchQuery: string) => {
  const res = await axios.get(`${api}/mappy/api/users?search=${searchQuery}`);
  return res;
};

export const postFriend = async (payload: any) => {
  const res = await axios.post(`${api}/mappy/api/users/friends`, payload);
  return res;
};

export const postAddFriend = async (payload: any) => {
  const res = await axios.post(`${api}/mappy/api/users/friends/request`, payload);
  return res;
};

export const postDeclineFriend = async (payload: any) => {
  const res = await axios.post(`${api}/mappy/api/users/friends/request`, payload);
  return res;
};
