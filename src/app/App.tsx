import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage/LoginPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import MapPage from "../pages/MapPage/MapPage";
import ListPage from "../pages/ListPage/ListPage";
import SearchPage from "../pages/SearchPage/SearchPage";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";
import { AuthContext } from "../components/AuthContext/AuthContext";
import "./App.css";
import "antd/dist/antd.css";

function App() {
  const [userData, setUserData] = useState({
    loginStatus: false,
    userId: "",
    firstName: "",
    lastName: "",
    userName: "",
    homeCity: "",
    homeState: "",
  });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData") ?? "{}");
    setUserData(userData);
  }, []);

  const authenticateUser = (userData: any) => {
    localStorage.setItem("userData", JSON.stringify(userData));
    setUserData(userData);
    return;
  };

  return (
    <BrowserRouter>
      <AuthContext.Provider
        value={{
          loginStatus: userData.loginStatus,
          userId: userData.userId,
          firstName: userData.firstName,
          lastName: userData.lastName,
          userName: userData.userName,
          homeCity: userData.homeCity,
          homeState: userData.homeState,
        }}
      >
        <Routes>
          <Route path="/signup" element={<SignUpPage authenticateUser={authenticateUser} />} />
          <Route path="/login" element={<LoginPage authenticateUser={authenticateUser} />} />
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<MapPage />} />
            <Route path="/list" element={<ListPage />} />
            <Route path="/search" element={<SearchPage />} />
          </Route>
        </Routes>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
