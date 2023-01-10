import React, { useState, useEffect } from "react";
import { Col, Row, Layout } from "antd";
import { getProfile } from "./ProfilePageService";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sider/Sidebar";
import { AuthContext } from "../../components/AuthContext/AuthContext";
import { UserOutlined } from "@ant-design/icons";
import "./ProfilePage.css";

const { Content } = Layout;

const ProfilePage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [profile, setProfile] = useState({}) as any;

  useEffect(() => {
    loadProfile();
  });

  const toggleSidebarView = (collapsed: boolean) => {
    setSidebarCollapsed(collapsed);
  };

  const loadProfile = async () => {
    try {
      const userName = window.location.pathname.split("/")[2];
      const res = await getProfile(userName);
      setProfile(res.data);
    } catch (e) {
      console.error("loadProfile error", e);
    }
  };

  return (
    <Layout>
      <Sidebar collapsed={sidebarCollapsed} toggleSidebarView={toggleSidebarView} />
      <Content>
        <Header toggleSidebarView={toggleSidebarView} />
        <Row style={{ height: "93vh" }}>
          <Col span={24}>
            <Row justify="center" style={{ margin: "40px" }}>
              <UserOutlined style={{ fontSize: "36px", color: "#620CA5" }} />
            </Row>
            <Row style={{ marginBottom: "20px" }}>
              <Col span={8}>
                <Row justify="start" style={{ fontSize: "18px", marginLeft: "20px", color: "#620CA5" }}>
                  Name
                </Row>
              </Col>
              <Col span={16}>
                <Row justify="start" style={{ fontSize: "18px" }}>
                  {profile.firstName} {profile.lastName}
                </Row>
              </Col>
            </Row>
            <Row style={{ marginBottom: "20px" }}>
              <Col span={8}>
                <Row justify="start" style={{ fontSize: "18px", marginLeft: "20px", color: "#620CA5" }}>
                  Username
                </Row>
              </Col>
              <Col span={16}>
                <Row justify="start" style={{ fontSize: "18px" }}>
                  {profile.userName}
                </Row>
              </Col>
            </Row>
            <Row style={{ marginBottom: "20px" }}>
              <Col span={8}>
                <Row justify="start" style={{ fontSize: "18px", marginLeft: "20px", color: "#620CA5" }}>
                  Phone Num
                </Row>
              </Col>
              <Col span={16}>
                <Row justify="start" style={{ fontSize: "18px" }}>
                  {profile.phoneNumber}
                </Row>
              </Col>
            </Row>
            <Row style={{ marginBottom: "20px" }}>
              <Col span={8}>
                <Row justify="start" style={{ fontSize: "18px", marginLeft: "20px", color: "#620CA5" }}>
                  Email
                </Row>
              </Col>
              <Col span={16}>
                <Row justify="start" style={{ fontSize: "18px" }}>
                  {profile.email}
                </Row>
              </Col>
            </Row>
            <Row style={{ marginBottom: "20px" }}>
              <Col span={8}>
                <Row justify="start" style={{ fontSize: "18px", marginLeft: "20px", color: "#620CA5" }}>
                  Home City
                </Row>
              </Col>
              <Col span={16}>
                <Row justify="start" style={{ fontSize: "18px" }}>
                  {profile.homeCity}, {profile.homeState}
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default ProfilePage;
