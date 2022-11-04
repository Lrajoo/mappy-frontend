import React, { useState } from "react";
import { Col, Row, Layout, Button } from "antd";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import Sidebar from "../../components/Sider/Sidebar";
import "./MapPage.css";

const { Sider, Content } = Layout;

// import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const MapPage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

  const toggleSidebarView = (collapsed: boolean) => {
    setSidebarCollapsed(collapsed);
  };

  return (
    <Layout>
      <Sidebar collapsed={sidebarCollapsed} toggleSidebarView={toggleSidebarView} />
      <Content>
        <Row>
          <Col span={24}>
            <Row>
              <Col span={12}>
                <Row justify="start">
                  <MenuOutlined onClick={() => toggleSidebarView(false)} />
                </Row>
              </Col>
              <Col span={12}>
                <Row justify="end">New York City</Row>
              </Col>
            </Row>
            <Row>
              <Col>
                <h1>Map View</h1>
              </Col>
            </Row>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default MapPage;

// const MapView = () => {
//   const containerStyle = {
//     width: "400px",
//     height: "400px",
//   };

//   const center = {
//     lat: -3.745,
//     lng: -38.523,
//   };

//   const position = {
//     lat: -3.745,
//     lng: -38.523,
//   };

//   return (
//     <>
//       <h1>Map View</h1>
//       <LoadScript googleMapsApiKey="AIzaSyCnUNg45EPh0XpuM39m8yrjIU1VGVOhH-8">
//         <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
//           <Marker position={position} />
//         </GoogleMap>
//       </LoadScript>
//     </>
//   );
// };
