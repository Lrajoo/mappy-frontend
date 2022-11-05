import React, { useState } from "react";
import { Layout, Button } from "antd";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sider/Sidebar";
import "./MapPage.css";

const { Content } = Layout;

const MapPage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [places, setPlaces] = useState([]);
  let navigate = useNavigate();

  const toggleSidebarView = (collapsed: boolean) => {
    setSidebarCollapsed(collapsed);
  };

  const center = {
    lat: 40.7309,
    lng: -73.9973,
  };

  const currentLocation = {
    lat: 40.723,
    lng: -73.9934,
  };

  return (
    <Layout>
      <Sidebar collapsed={sidebarCollapsed} toggleSidebarView={toggleSidebarView} />
      <Content>
        <Header toggleSidebarView={toggleSidebarView} />
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
          onLoad={() => {
            const placesLoaded: any = [
              {
                key: "1",
                position: {
                  lat: 40.739111,
                  lng: -73.989113,
                },
                icon: "https://img.icons8.com/fluency/35/null/coffee-to-go.png",
              },
              {
                key: "2",
                position: {
                  lat: 40.7160576,
                  lng: -73.9646899,
                },
                icon: "https://img.icons8.com/fluency/35/null/coffee-to-go.png",
              },
              {
                key: "3",
                position: {
                  lat: 40.6885567,
                  lng: -73.98345909999999,
                },
                icon: "https://img.icons8.com/fluency/35/null/coffee-to-go.png",
              },
              {
                key: "4",
                position: {
                  lat: 40.7138484,
                  lng: -73.9909298,
                },
                icon: "https://img.icons8.com/external-bearicons-blue-bearicons/35/null/external-Restaurant-location-bearicons-blue-bearicons.png",
              },
              {
                key: "5",
                position: {
                  lat: 40.7049369,
                  lng: -74.00973429999999,
                },
                icon: "https://img.icons8.com/external-bearicons-blue-bearicons/35/null/external-Restaurant-location-bearicons-blue-bearicons.png",
              },
              {
                key: "6",
                position: {
                  lat: 40.7032685,
                  lng: -74.01102179999999,
                },
                icon: "https://img.icons8.com/external-vitaliy-gorbachev-flat-vitaly-gorbachev/35/null/external-cocktail-vacation-vitaliy-gorbachev-flat-vitaly-gorbachev-1.png",
              },
              {
                key: "7",
                position: {
                  lat: 40.7421711,
                  lng: -74.00352199999999,
                },
                icon: "https://img.icons8.com/external-vitaliy-gorbachev-flat-vitaly-gorbachev/35/null/external-cocktail-vacation-vitaliy-gorbachev-flat-vitaly-gorbachev-1.png",
              },
            ];
            setPlaces(placesLoaded);
          }}
        >
          <Marker
            position={currentLocation}
            icon="https://img.icons8.com/external-anggara-blue-anggara-putra/35/null/external-user-user-interface-basic-anggara-blue-anggara-putra.png"
          />
          {places.length > 0 &&
            places.map((place: any) => {
              return <Marker key={place.key} icon={place.icon} position={place.position} />;
            })}
        </GoogleMap>
        <Button
          type="primary"
          style={{ position: "absolute", bottom: "4vh", right: "2vh" }}
          onClick={() => navigate("/search")}
        >
          Add Location
        </Button>
      </Content>
    </Layout>
  );
};

export default MapPage;
