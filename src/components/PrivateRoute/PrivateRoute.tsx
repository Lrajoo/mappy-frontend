import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "../../components/AuthContext/AuthContext";

const PrivateRoute = () => {
  const { loginStatus } = useContext(AuthContext);
  return loginStatus ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
