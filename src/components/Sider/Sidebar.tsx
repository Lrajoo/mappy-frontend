import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Row, Layout, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
const { Sider } = Layout;

export interface SidebarProps {
  collapsed: boolean;
  toggleSidebarView: (collapsed: boolean) => void;
}

const Sidebar = (props: SidebarProps) => {
  let navigate = useNavigate();

  return (
    <Sider
      style={{ position: "absolute", height: "100vh", zIndex: 2, backgroundColor: "#282828E1" }}
      trigger={null}
      collapsible
      collapsed={props.collapsed}
      collapsedWidth={0}
    >
      <Row>
        <Col span={24}>
          <Row justify="end">
            <CloseOutlined
              onClick={() => props.toggleSidebarView(true)}
              style={{ color: "#FFFFFF", fontSize: "18px", marginTop: "15px", marginRight: "15px" }}
            />
          </Row>
          <Row style={{ margin: "20px" }} justify="space-around">
            <h2 style={{ color: "#FFFFFF" }}>
              <img src="https://img.icons8.com/color/35/null/map-pin.png" alt="Mappy logo" /> Mappy
            </h2>
          </Row>
          <Row style={{ marginBottom: "10px" }} justify="space-around">
            <Button style={{ color: "#FFFFFF" }} type="link" onClick={() => navigate("/list")}>
              My List
            </Button>
          </Row>
          <Row style={{ marginBottom: "10px" }} justify="space-around">
            <Button style={{ color: "#FFFFFF" }} type="link" onClick={() => navigate("/")}>
              Map
            </Button>
          </Row>
          <Row style={{ marginBottom: "10px" }} justify="space-around">
            <Button style={{ color: "#FFFFFF" }} type="link" onClick={() => navigate("/search")}>
              Search
            </Button>
          </Row>
        </Col>
      </Row>
    </Sider>
  );
};

export default Sidebar;
