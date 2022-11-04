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
      style={{ position: "absolute", height: "100vh", zIndex: 2, backgroundColor: "#282828" }}
      trigger={null}
      collapsible
      collapsed={props.collapsed}
      collapsedWidth={0}
    >
      <Row>
        <Col span={24}>
          <Row justify="end">
            <CloseOutlined onClick={() => props.toggleSidebarView(true)} style={{ color: "#FFFFFF" }} />
          </Row>
          <Row justify="space-around">
            <Button type="primary" onClick={() => navigate("/list")}>
              My List
            </Button>
          </Row>
          <Row justify="space-around">
            <Button type="primary" onClick={() => navigate("/")}>
              Map
            </Button>
          </Row>
          <Row justify="space-around">
            <Button type="primary" onClick={() => navigate("/search")}>
              Search
            </Button>
          </Row>
        </Col>
      </Row>
    </Sider>
  );
};

export default Sidebar;
