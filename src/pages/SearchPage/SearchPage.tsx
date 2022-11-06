import React, { useState } from "react";
import { Col, Row, Layout, Input, Space } from "antd";
import { getSearchResults } from "./SearchPageService";
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
  const [locationDetails, setLocationDetails] = useState({});
  const [open, setOpen] = useState(false);

  const toggleSidebarView = (collapsed: boolean) => {
    setSidebarCollapsed(collapsed);
  };

  const searchPlaces = async (searchString: string) => {
    const searchQuery = searchString.replace(" ", "+") + "New+York";
    const res = await getSearchResults(searchQuery);
    setResults(res.data);
  };

  const showLocationCard = (details: any) => {
    setOpen(true);
    setLocationDetails(details);
  };

  const hideLocationCard = () => {
    setOpen(false);
  };

  const addLocation = () => {
    setOpen(false);
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
                  onClick={() => showLocationCard(result)}
                >
                  <ResultCard name={result.name} address={result.address}></ResultCard>
                </Row>
              );
            })}
          </Col>
        </Row>
        <LocationCard
          open={open}
          hideLocationCard={hideLocationCard}
          addLocation={addLocation}
          locationDetails={locationDetails}
        />
      </Content>
    </Layout>
  );
};

export default SearchPage;
