import React, { useState, useEffect } from "react";
import { Col, Row, Layout, Tabs, Input } from "antd";
import {} from "./FriendsPageService";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sider/Sidebar";
import FriendsProfileCard from "../../components/FriendsProfileCard/FriendsProfileCard";
import { AuthContext } from "../../components/AuthContext/AuthContext";
import {} from "@ant-design/icons";
import "./FriendsPage.css";

const { Content } = Layout;
const { Search } = Input;

const FriendsPage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

  useEffect(() => {
    console.log("useEffect");
    populateFriends();
  });

  const toggleSidebarView = (collapsed: boolean) => {
    setSidebarCollapsed(collapsed);
  };

  const populateFriends = () => {};

  const onChangeTab = (key: string) => {};

  const friendsTabContent = () => {
    return (
      <Row>
        <Col span={24}>
          <Row justify="center" style={{ fontSize: "24px", marginBottom: "20px" }}>
            My Friends
          </Row>
          <Row justify="center" style={{ fontSize: "24px", marginBottom: "20px" }}>
            <FriendsProfileCard type="friends" />
          </Row>
        </Col>
      </Row>
    );
  };

  const searchTabContent = () => {
    return (
      <Row>
        <Col span={24}>
          <Row justify="center" style={{ fontSize: "24px", marginBottom: "20px" }}>
            Add Friends
          </Row>
          <Row justify="space-evenly">
            <Search
              placeholder={"Name or Username"}
              allowClear
              enterButton="Search"
              size="large"
              //   loading={searchLoading}
              //   onSearch={(value: string) => {
              //     searchPlaces(value);
              //   }}
              style={{
                width: "90%",
                marginBottom: "20px",
              }}
            />
          </Row>
          <Row justify="start" style={{ fontSize: "18px", marginLeft: "20px", marginBottom: "20px" }}>
            Results
          </Row>
          <Row justify="center" style={{ fontSize: "24px", marginBottom: "20px" }}>
            <FriendsProfileCard type="search" />
          </Row>
        </Col>
      </Row>
    );
  };

  const requestsTabContent = () => {
    return (
      <Row>
        <Col span={24}>
          <Row justify="center" style={{ fontSize: "24px", marginBottom: "20px" }}>
            Your Requests
          </Row>
          <Row justify="center" style={{ fontSize: "24px", marginBottom: "20px" }}>
            <FriendsProfileCard type="requests" />
          </Row>
        </Col>
      </Row>
    );
  };

  return (
    <Layout>
      <Sidebar collapsed={sidebarCollapsed} toggleSidebarView={toggleSidebarView} />
      <Content>
        <Header toggleSidebarView={toggleSidebarView} />
        <Row style={{ height: "93vh" }}>
          <Col span={24}>
            <Tabs
              centered
              defaultActiveKey="friends"
              onChange={(key) => onChangeTab(key)}
              items={[
                {
                  label: `Friends`,
                  key: "friends",
                  children: friendsTabContent(),
                },
                {
                  label: `Search`,
                  key: "search",
                  children: searchTabContent(),
                },
                {
                  label: `Requests`,
                  key: "requests",
                  children: requestsTabContent(),
                },
              ]}
            />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default FriendsPage;
