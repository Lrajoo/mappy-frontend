import React, { useState } from "react";
import { Col, Row, Layout, Table, Button, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sider/Sidebar";
import "./ListPage.css";

const { Content } = Layout;

const ListPage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

  let navigate = useNavigate();

  const toggleSidebarView = (collapsed: boolean) => {
    setSidebarCollapsed(collapsed);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: any) => <a>{text}</a>,
    },
    {
      title: "Category",
      key: "categories",
      dataIndex: "categories",
      render: (_: any, { categories }: any) => (
        <>
          {categories.map((category: any) => {
            let color = "blue";
            if (category === "Coffee") {
              color = "brown";
            } else if (category === "Bar") {
              color = "volcano";
            } else if (category === "Cafe") {
              color = "green";
            }
            return (
              <Tag color={color} key={category}>
                {category.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Cuisine",
      dataIndex: "cuisine",
      key: "cuisine",
    },
  ];

  const data = [
    {
      key: "1",
      name: "Devocion",
      categories: ["Coffee", "Cafe"],
      cuisine: "Colombian",
    },
    {
      key: "2",
      name: "Hangawi",
      categories: ["Restaurant"],
      cuisine: "Korean",
    },
    {
      key: "3",
      name: "Dead Rabbit",
      categories: ["Bar"],
      cuisine: "Pub",
    },
    {
      key: "4",
      name: "Chai Spot",
      categories: ["Coffee", "Cafe"],
      cuisine: "Indian",
    },
    {
      key: "5",
      name: "Kopitiam",
      categories: ["Restaurant", "Cafe"],
      cuisine: "Malaysian",
    },
    {
      key: "6",
      name: "Leo's Bagels",
      categories: ["Cafe"],
      cuisine: "Jewish",
    },
    {
      key: "7",
      name: "La Parisienne",
      categories: ["Cafe"],
      cuisine: "French",
    },
    {
      key: "8",
      name: "Laut",
      categories: ["Restaurant"],
      cuisine: "Singaporean",
    },
    {
      key: "9",
      name: "Salma",
      categories: ["Restaurant"],
      cuisine: "Lebanese",
    },
  ];

  return (
    <Layout>
      <Sidebar collapsed={sidebarCollapsed} toggleSidebarView={toggleSidebarView} />
      <Content>
        <Header toggleSidebarView={toggleSidebarView} />
        <Row style={{ marginTop: "10px", marginBottom: "10px" }}>
          <Col span={12}>
            <Row justify="start" style={{ fontSize: "18px", fontWeight: "bold", marginLeft: "20px" }}>
              My List
            </Row>
          </Col>
          <Col span={12}>
            <Row justify="end" style={{ marginRight: "20px" }}>
              <Button type="primary">Filter</Button>
            </Row>
          </Col>
        </Row>
        <Table columns={columns} dataSource={data} pagination={false} />
        <Button
          type="primary"
          style={{ position: "fixed", bottom: "4vh", right: "2vh" }}
          onClick={() => navigate("/search")}
        >
          Add Location
        </Button>
      </Content>
    </Layout>
  );
};

export default ListPage;
