import React, { useState } from "react";
import { Col, Row, Layout } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import Sidebar from "../../components/Sider/Sidebar";
import "./SearchPage.css";

const { Content } = Layout;

const SearchPage = () => {
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
            <Row justify="start">
              <MenuOutlined onClick={() => toggleSidebarView(false)} />
            </Row>
            <Row>
              <Col>
                <h1>Search View</h1>
              </Col>
            </Row>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default SearchPage;
