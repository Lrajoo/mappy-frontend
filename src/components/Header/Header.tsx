import React, { useContext } from "react";
import { Col, Row } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { AuthContext } from "../../components/AuthContext/AuthContext";

export interface HeaderProps {
  toggleSidebarView: (collapsed: boolean) => void;
}

const Header = (props: HeaderProps) => {
  const { homeCity } = useContext(AuthContext);

  return (
    <Row style={{ padding: "15px", height: "7vh", backgroundColor: "#620CA5F2" }}>
      <Col span={12}>
        <Row justify="start">
          <MenuOutlined
            style={{ fontSize: "18px", color: "#FFFFFF", marginTop: "5px" }}
            onClick={() => props.toggleSidebarView(false)}
          />
        </Row>
      </Col>
      <Col span={12}>
        <Row justify="end" style={{ fontSize: "18px", fontWeight: "bold", color: "#FFFFFF" }}>
          {homeCity}
        </Row>
      </Col>
    </Row>
  );
};

export default Header;
