import React, { useState } from "react";
import { Col, Row, Layout } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import Sidebar from "../../components/Sider/Sidebar";
import "./ListPage.css";

const { Content } = Layout;

const ListPage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

  const toggleSidebarView = (collapsed: boolean) => {
    setSidebarCollapsed(collapsed);
  };
  return (
    <Layout>
      <Sidebar collapsed={sidebarCollapsed} toggleSidebarView={toggleSidebarView} />
      <Content>
        <Row>
          <Col span={24}>
            <Row>
              <Col span={12}>
                <Row justify="start">
                  <MenuOutlined onClick={() => toggleSidebarView(false)} />
                </Row>
              </Col>
              <Col span={12}>
                <Row justify="end">New York City</Row>
              </Col>
            </Row>
            <Row>
              <Col>
                <h1>List View</h1>
              </Col>
            </Row>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default ListPage;
