import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "../../components/AuthContext/AuthContext";

const PrivateRoute = () => {
  const { loginStatus } = useContext(AuthContext);
  const userData = JSON.parse(localStorage.getItem("userData") ?? "{}");
  console.log("userData private", userData);
  return loginStatus || userData.loginStatus ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
