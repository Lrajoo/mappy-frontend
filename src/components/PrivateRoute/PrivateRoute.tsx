import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "../../components/AuthContext/AuthContext";

const PrivateRoute = () => {
  const { loginStatus } = useContext(AuthContext);
  // return loginStatus || process.env.NODE_ENV === "development" ? <Outlet /> : <Navigate to="/login" />;
  return loginStatus ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
