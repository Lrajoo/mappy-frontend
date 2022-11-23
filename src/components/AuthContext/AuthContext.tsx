import { createContext } from "react";

interface AuthContextInterface {
  loginStatus: boolean;
  userId: string;
  firstName: string;
  lastName: string;
  userName: string;
  homeCity: string;
  homeState: string;
}

export const AuthContext = createContext({
  loginStatus: false,
  userId: "",
  firstName: "",
  lastName: "",
  userName: "",
  homeCity: "",
  homeState: "",
});
