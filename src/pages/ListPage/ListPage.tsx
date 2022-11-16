import React, { useState, useEffect } from "react";
import { Col, Row, Layout, Table, Button, Tag, Spin, message } from "antd";
import { useNavigate } from "react-router-dom";
import { getPlaceDetails, getLocations, deleteLocation } from "./ListPageService";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sider/Sidebar";
import LocationCard from "../../components/LocationCard/LocationCard";
import "./ListPage.css";

const { Content } = Layout;

const ListPage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [locationDetails, setLocationDetails] = useState({}) as any;
  const [places, setPlaces] = useState([]);
  const [placeIds, setPlaceIds] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    populateList();
  }, []);

  const populateList = async () => {
    const res = await getLocations();
    let loadedPlaces: any = [];
    let loadedPlaceIds: any = [];
    await res.data.map(async (place: any) => {
      try {
        const locationDetail = await getPlaceDetails(place.placeId);
        locationDetail.data["key"] = place.placeId;
        loadedPlaces = [...loadedPlaces, locationDetail.data];
        loadedPlaceIds = [...loadedPlaceIds, place.placeId];
        setPlaces(loadedPlaces);
        setPlaceIds(loadedPlaceIds);
      } catch (e) {
        console.log("populateList error", e);
      }
    });
  };

  const toggleSidebarView = (collapsed: boolean) => {
    setSidebarCollapsed(collapsed);
  };

  const showLocationCard = async (placeID: string) => {
    setLoading(true);
    setOpen(true);
    const res = await getPlaceDetails(placeID);
    setLoading(false);
    setLocationDetails(res.data);
  };

  const hideLocationCard = () => {
    setOpen(false);
  };

  const addLocation = () => {
    setOpen(false);
  };

  const removeLocation = async () => {
    setLoading(true);
    try {
      const res = await deleteLocation(locationDetails.placeId);
      populateList();
      setLoading(false);
      setOpen(false);
      setTimeout(() => message.error(`Removed ${locationDetails.name}!`), 1000);
    } catch (e) {
      console.log("removeLocation error", e);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Category",
      key: "category",
      dataIndex: "category",
      render: (_: any, { category }: any) => (
        <>
          {category.map((category: any) => {
            let color = "blue";
            if (category === "coffee") {
              color = "brown";
            } else if (category === "bar") {
              color = "blue";
            } else if (category === "restaurant") {
              color = "red";
            }
            return (
              <Tag color={color} key={category}>
                {category.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
    },
  ];

  return (
    <Layout>
      <Sidebar collapsed={sidebarCollapsed} toggleSidebarView={toggleSidebarView} />
      <Content>
        <Header toggleSidebarView={toggleSidebarView} />
        {places.length > 0 ? (
          <>
            <Row style={{ marginTop: "10px", marginBottom: "10px" }}>
              <Col span={12}>
                <Row justify="start" style={{ fontSize: "18px", fontWeight: "bold", marginLeft: "20px" }}>
                  My List
                </Row>
              </Col>
              <Col span={12}>
                <Row justify="end" style={{ marginRight: "20px" }}>
                  <Button type="primary">Filter</Button>
                </Row>
              </Col>
            </Row>
            <Table
              columns={columns}
              dataSource={places}
              pagination={false}
              onRow={(record: any) => {
                return {
                  onClick: () => {
                    showLocationCard(record.placeId);
                  },
                };
              }}
            />
            <Button
              type="primary"
              style={{ position: "fixed", bottom: "4vh", right: "2vh" }}
              onClick={() => {
                navigate("/search", {
                  state: {
                    placeIds: placeIds,
                  },
                });
              }}
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
  );
};

export default ListPage;
