import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Row, Layout, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { AuthContext } from "../../components/AuthContext/AuthContext";
const { Sider } = Layout;

export interface SidebarProps {
  collapsed: boolean;
  toggleSidebarView: (collapsed: boolean) => void;
}

const Sidebar = (props: SidebarProps) => {
  let navigate = useNavigate();
  const [page, setPage] = useState("");
  const { loginStatus, userId, firstName, lastName, userName, homeCity, homeState } = useContext(AuthContext);

  useEffect(() => {
    const page = window.location.pathname.split("/")[1];
    setPage(page);
  });

  const navigateToMap = () => {
    setPage("map");
    navigate("/");
  };

  const navigateToList = () => {
    setPage("list");
    navigate("/list");
  };

  const navigateToSearch = () => {
    setPage("search");
    navigate("/search");
  };

  const navigateToProfile = () => {
    setPage("profile");
    navigate(`/profile/${userName}`);
  };

  const navigateToFriends = () => {
    setPage("friends");
    navigate(`/friends`);
  };

  const logout = () => {
    localStorage.removeItem("userData");
    navigate("/login");
  };

  return (
    <Sider
      style={{ position: "absolute", height: "100vh", zIndex: 2, backgroundColor: "#8E4BC2F2" }}
      trigger={null}
      collapsible
      collapsed={props.collapsed}
      collapsedWidth={0}
    >
      <Row style={{ height: "90vh" }}>
        <Col span={24}>
          <Row justify="end">
            <CloseOutlined
              onClick={() => props.toggleSidebarView(true)}
              style={{ color: "#FFFFFF", fontSize: "18px", marginTop: "15px", marginRight: "15px" }}
            />
          </Row>
          <Row style={{ margin: "20px" }} justify="space-around">
            <h2
              style={{
                fontFamily: "Dancing Script",
                fontSize: "32px",
                color: "#FFFFFF",
              }}
            >
              Mappy
            </h2>
          </Row>
          <Row style={{ marginBottom: "10px" }} justify="space-around">
            <Button
              style={{
                color: "#FFFFFF",
                fontWeight: "bold",
                borderBottom: page === "profile" ? "1px solid white" : "",
              }}
              type="link"
              onClick={() => navigateToProfile()}
            >
              Profile
            </Button>
          </Row>
          <Row style={{ marginBottom: "10px" }} justify="space-around">
            <Button
              style={{ color: "#FFFFFF", fontWeight: "bold", borderBottom: page === "" ? "1px solid white" : "" }}
              type="link"
              onClick={() => navigateToMap()}
            >
              Map
            </Button>
          </Row>
          <Row style={{ marginBottom: "10px" }} justify="space-around">
            <Button
              style={{ color: "#FFFFFF", fontWeight: "bold", borderBottom: page === "list" ? "1px solid white" : "" }}
              type="link"
              onClick={() => navigateToList()}
            >
              List
            </Button>
          </Row>
          <Row style={{ marginBottom: "10px" }} justify="space-around">
            <Button
              style={{ color: "#FFFFFF", fontWeight: "bold", borderBottom: page === "search" ? "1px solid white" : "" }}
              type="link"
              onClick={() => navigateToSearch()}
            >
              Search
            </Button>
          </Row>
          <Row style={{ marginBottom: "10px" }} justify="space-around">
            <Button
              style={{
                color: "#FFFFFF",
                fontWeight: "bold",
                borderBottom: page === "friends" ? "1px solid white" : "",
              }}
              type="link"
              onClick={() => navigateToFriends()}
            >
              Friends
            </Button>
          </Row>
        </Col>
      </Row>
      <Row justify="space-around">
        <Button onClick={() => logout()} style={{ fontWeight: "bold" }}>
          Logout
        </Button>
      </Row>
    </Sider>
  );
};

export default Sidebar;
