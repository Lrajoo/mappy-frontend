import React, { useState } from "react";
import { Col, Row, Layout } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import Header from "../../components/Header/Header";
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
        <Header toggleSidebarView={toggleSidebarView} />
      </Content>
    </Layout>
  );
};

export default SearchPage;
