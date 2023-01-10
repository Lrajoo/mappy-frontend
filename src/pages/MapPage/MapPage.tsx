import React, { useState, useEffect, useContext } from "react";
import { Layout, Button, Row, Spin, message } from "antd";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";
import { getLocations, getPlaceDetails, deleteLocation } from "./MapPageService";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sider/Sidebar";
import LocationCard from "../../components/LocationCard/LocationCard";
import { AuthContext } from "../../components/AuthContext/AuthContext";
import { getCategory } from "../../utils/category";
import "./MapPage.css";

const { Content } = Layout;

const MapPage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [places, setPlaces] = useState([]);
  const [placeIds, setPlaceIds] = useState([]);
  const [locationDetails, setLocationDetails] = useState({}) as any;
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  const { loginStatus, userId, firstName, lastName, userName, homeCity, homeState } = useContext(AuthContext);

  useEffect(() => {
    if (userId) populateMap();
  }, [userId]);

  const toggleSidebarView = (collapsed: boolean) => {
    setSidebarCollapsed(collapsed);
  };

  const showLocationCard = async (placeId: string) => {
    setLoading(true);
    setOpen(true);
    try {
      const res = await getPlaceDetails(placeId);
      setLoading(false);
      setLocationDetails(res.data);
    } catch (e) {
      console.error("showLocationCard error", e);
    }
  };

  const hideLocationCard = () => {
    setOpen(false);
  };

  const populateMap = async () => {
    const res = await getLocations(homeCity, userId);
    let loadedPlaces: any = [];
    let loadedPlaceIds: any = [];
    await res.data.map(async (place: any) => {
      try {
        const locationDetail = await getPlaceDetails(place.placeId);
        loadedPlaces = [...loadedPlaces, locationDetail.data];
        loadedPlaceIds = [...loadedPlaceIds, place.placeId];
        setPlaces(loadedPlaces);
        setPlaceIds(loadedPlaceIds);
      } catch (e) {
        console.error("populateMap error", e);
      }
    });
  };

  const addLocation = () => {
    setOpen(false);
  };

  const removeLocation = async () => {
    setLoading(true);
    try {
      const res = await deleteLocation(locationDetails.placeId);
      populateMap();
      setLoading(false);
      setOpen(false);
      setTimeout(() => message.error(`Removed ${locationDetails.name}!`), 1000);
    } catch (e) {
      console.error("removeLocation error", e);
    }
  };

  const center: any = {
    "New York City": {
      lat: 40.7128,
      lng: -74.006,
    },
    "San Francisco": {
      lat: 37.7749,
      lng: -122.4194,
    },
  };

  const currentLocation = {
    lat: 40.723,
    lng: -73.9934,
  };

  return (
    // <AuthContext.Consumer>
    <Layout>
      <Sidebar collapsed={sidebarCollapsed} toggleSidebarView={toggleSidebarView} />
      <Content>
        <Header toggleSidebarView={toggleSidebarView} />
        {places.length >= 0 ? (
          <>
            <GoogleMap
              mapContainerStyle={{ width: "100vw", height: "93vh" }}
              center={center[homeCity]}
              zoom={13}
              options={{
                fullscreenControl: false,
                mapTypeControl: false,
                streetViewControl: false,
                zoomControlOptions: { position: 6.0 },
              }}
            >
              <Marker
                position={currentLocation}
                icon="https://img.icons8.com/external-anggara-blue-anggara-putra/35/null/external-user-user-interface-basic-anggara-blue-anggara-putra.png"
              />
              {places.length > 0 &&
                places.map((place: any) => {
                  return (
                    <Marker
                      key={place.placeId}
                      icon={getCategory(place.category)}
                      position={place.location}
                      onClick={() => showLocationCard(place.placeId)}
                    />
                  );
                })}
            </GoogleMap>
            <Button
              type="primary"
              style={{
                position: "absolute",
                bottom: "4vh",
                right: "2vh",
                fontWeight: "bold",
                backgroundColor: "#620CA5",
                color: "#FFFFFF",
                border: "0px",
              }}
              onClick={() =>
                navigate("/search", {
                  state: {
                    placeIds: placeIds,
                  },
                })
              }
            >
              Add Location
            </Button>
            <LocationCard
              open={open}
              loading={loading}
              disableLocation={true}
              hideLocationCard={hideLocationCard}
              addLocation={addLocation}
              removeLocation={removeLocation}
              locationDetails={locationDetails}
            />
          </>
        ) : (
          <Row justify="center" align="middle" style={{ height: "93vh", width: "100vw" }}>
            <Spin tip="Loading..." size="large" />
          </Row>
        )}
      </Content>
    </Layout>
    // </AuthContext.Consumer>
  );
};

export default MapPage;
