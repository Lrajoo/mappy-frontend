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
    <Row style={{ padding: "15px", height: "7vh" }}>
      <Col span={12}>
        <Row justify="start">
          <MenuOutlined style={{ fontSize: "18px" }} onClick={() => props.toggleSidebarView(false)} />
        </Row>
      </Col>
      <Col span={12}>
        <Row justify="end" style={{ fontSize: "18px", fontWeight: "bold" }}>
          {homeCity}
        </Row>
      </Col>
    </Row>
  );
};

export default Header;
