import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MapPage from "../pages/MapPage/MapPage";
import ListPage from "../pages/ListPage/ListPage";
import SearchPage from "../pages/SearchPage/SearchPage";
import "./App.css";
import "antd/dist/antd.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MapPage />} />
        <Route path="/list" element={<ListPage />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
