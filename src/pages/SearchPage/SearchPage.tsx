import React, { useState } from "react";
import { Col, Row, Layout, Input, Space } from "antd";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sider/Sidebar";
import ResultCard from "../../components/ResultCard/ResultCard";
import "./SearchPage.css";

const { Content } = Layout;
const { Search } = Input;

const SearchPage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

  const toggleSidebarView = (collapsed: boolean) => {
    setSidebarCollapsed(collapsed);
  };

  const results = [
    {
      key: "1",
      name: "Devocion",
      categories: ["Coffee", "Cafe"],
      cuisine: "Colombian",
      address: "25 E 20th St, New York, NY 10003",
    },
    {
      key: "2",
      name: "Hangawi",
      categories: ["Restaurant"],
      cuisine: "Korean",
      address: "12 E 32nd St, New York, NY 10016",
    },
    {
      key: "3",
      name: "Dead Rabbit",
      categories: ["Bar"],
      cuisine: "Pub",
      address: "30 Water St, New York, NY 10004",
    },
    {
      key: "4",
      name: "Chai Spot",
      categories: ["Coffee", "Cafe"],
      cuisine: "Indian",
      address: "156 Mott St, New York, NY 10013",
    },
    {
      key: "5",
      name: "Kopitiam",
      categories: ["Restaurant", "Cafe"],
      cuisine: "Malaysian",
      address: "151 E Broadway, New York, NY 10002",
    },
    {
      key: "6",
      name: "Leo's Bagels",
      categories: ["Cafe"],
      cuisine: "Jewish",
      address: "3 Hanover Square, New York, NY 10004",
    },
    {
      key: "7",
      name: "La Parisienne",
      categories: ["Cafe"],
      cuisine: "French",
      address: "9 Maiden Ln, New York, NY 10038",
    },
    {
      key: "8",
      name: "Laut",
      categories: ["Restaurant"],
      cuisine: "Singaporean",
      address: "31 E 20th St, New York, NY 10003",
    },
    {
      key: "9",
      name: "Salma",
      categories: ["Restaurant"],
      cuisine: "Lebanese",
      address: "351 E 12th St, New York, NY 10003",
    },
  ];

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
                onSearch={() => {}}
                style={{ width: "80vw", marginBottom: "20px" }}
              />
            </Row>
            <Row justify="space-evenly" style={{ fontSize: "16px", marginBottom: "20px" }}>
              Results
            </Row>
            {results.map((result: any) => {
              return (
                <Row justify="space-evenly" key={result.name} style={{ fontSize: "16px", marginBottom: "10px" }}>
                  <ResultCard name={result.name} address={result.address}></ResultCard>
                </Row>
              );
            })}
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default SearchPage;
