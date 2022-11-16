import React from "react";
import ReactDOM from "react-dom/client";
import { LoadScript } from "@react-google-maps/api";
import "./index.css";
import App from "./app/App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
const key = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || "";
root.render(
  // <React.StrictMode>
  <LoadScript googleMapsApiKey={key}>
    <App />
  </LoadScript>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
