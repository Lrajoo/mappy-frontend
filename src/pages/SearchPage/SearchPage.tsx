import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Col, Row, Layout, Input, message } from "antd";
import { getSearchResults, getPlaceDetails, postLocation } from "./SearchPageService";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sider/Sidebar";
import ResultCard from "../../components/ResultCard/ResultCard";
import LocationCard from "../../components/LocationCard/LocationCard";
import "./SearchPage.css";

const { Content } = Layout;
const { Search } = Input;

const SearchPage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [results, setResults] = useState([]);
  const [locationDetails, setLocationDetails] = useState({}) as any;
  const [open, setOpen] = useState(false);
  const [disableLocation, setDisableLocation] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const { state } = useLocation();

  const toggleSidebarView = (collapsed: boolean) => {
    setSidebarCollapsed(collapsed);
  };

  const searchPlaces = async (searchString: string) => {
    if (searchString === "") return;
    setSearchLoading(true);
    const searchQuery = searchString.replace(" ", "+") + "+New+York+City";
    const res = await getSearchResults(searchQuery);
    setResults(res.data);
    setSearchLoading(false);
  };

  const showLocationCard = async (placeID: string) => {
    const res = await getPlaceDetails(placeID);
    setOpen(true);
    setLocationDetails(res.data);
    // setDisableLocation(state.placeIds.includes(placeID));
  };

  const hideLocationCard = () => {
    setDisableLocation(false);
    setOpen(false);
  };

  const addLocation = async () => {
    setLoading(true);
    const payload = {
      userId: "f2cada03-140f-41ad-84eb-1ee7560ad516",
      placeId: locationDetails.placeId,
      mustHave: "",
      notes: "",
    };
    const res = await postLocation(payload);
    setLoading(false);
    setDisableLocation(false);
    setOpen(false);
    setTimeout(() => message.success(`Added ${locationDetails.name}!`), 1000);
  };

  return (
    <Layout>
      <Sidebar collapsed={sidebarCollapsed} toggleSidebarView={toggleSidebarView} />
      <Content>
        <Header toggleSidebarView={toggleSidebarView} />
        <Row>
          <Col span={24}>
            <Row justify="space-evenly" style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "20px" }}>
              Search
            </Row>
            <Row justify="space-evenly">
              <Search
                placeholder="Locations in New York"
                allowClear
                enterButton="Search"
                size="large"
                loading={searchLoading}
                onSearch={(value: string) => {
                  searchPlaces(value);
                }}
                style={{ width: "80vw", marginBottom: "20px" }}
              />
            </Row>
            <Row justify="space-evenly" style={{ fontSize: "16px", marginBottom: "20px" }}>
              Results
            </Row>
            {results.map((result: any) => {
              return (
                <Row
                  justify="space-evenly"
                  key={result.placeID}
                  style={{ fontSize: "16px", marginBottom: "10px" }}
                  onClick={() => showLocationCard(result.placeID)}
                >
                  <ResultCard name={result.name} address={result.address}></ResultCard>
                </Row>
              );
            })}
          </Col>
        </Row>
        <LocationCard
          open={open}
          loading={loading}
          disableLocation={disableLocation}
          hideLocationCard={hideLocationCard}
          addLocation={addLocation}
          locationDetails={locationDetails}
        />
      </Content>
    </Layout>
  );
};

export default SearchPage;
