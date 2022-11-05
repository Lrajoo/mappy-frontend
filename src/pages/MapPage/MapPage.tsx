import React, { useState } from "react";
import { Col, Row, Layout, Button } from "antd";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sider/Sidebar";
import "./MapPage.css";

const { Content } = Layout;

const MapPage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

  const toggleSidebarView = (collapsed: boolean) => {
    setSidebarCollapsed(collapsed);
  };

  const center = {
    lat: 40.754932,
    lng: -73.984016,
  };

  // const position = {
  //   lat: 40.7128,
  //   lng: 74.006,
  // };

  return (
    <Layout>
      <Sidebar collapsed={sidebarCollapsed} toggleSidebarView={toggleSidebarView} />
      <Content>
        <Header toggleSidebarView={toggleSidebarView} />
        <LoadScript googleMapsApiKey="">
          <GoogleMap
            mapContainerStyle={{ width: "100vw", height: "93vh" }}
            center={center}
            zoom={13}
            options={{
              fullscreenControl: false,
              mapTypeControl: false,
              streetViewControl: false,
              zoomControlOptions: { position: 6.0 },
            }}
          >
            {/* <Marker position={position} /> */}
          </GoogleMap>
        </LoadScript>
      </Content>
    </Layout>
  );
};

export default MapPage;
