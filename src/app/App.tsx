import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MapView from "../pages/MapView/MapView";
import ListView from "../pages/ListView/ListView";
import SearchLocation from "../pages/SearchLocation/SearchLocation";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MapView />} />
        <Route path="/list" element={<ListView />} />
        <Route path="/search" element={<SearchLocation />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
