import React, { useState } from "react";
import { Col, Row, Modal, Button, Spin, Card } from "antd";
import { UserOutlined, PlusSquareOutlined, CloseSquareOutlined, CheckSquareOutlined } from "@ant-design/icons";

export interface FriendsProfileCardProps {
  type: "friends" | "search" | "requests";
}

const FriendsProfileCard = (props: FriendsProfileCardProps) => {
  return (
    <Card style={{ width: "90%" }} bodyStyle={{ padding: "12px" }}>
      <Row align="middle">
        <Col span={4}>
          <UserOutlined style={{ fontSize: "36px", color: "#620CA5", verticalAlign: "middle" }} />
        </Col>
        <Col span={props.type === "requests" ? 14 : 16}>
          <Row style={{ fontSize: "18px", color: "#620CA5", fontWeight: "bold" }}>Lingess Rajoo</Row>
          <Row style={{ fontSize: "18px", color: "#620CA596" }}>rlingess33</Row>
        </Col>
        {props.type === "search" && (
          <Col span={4}>
            <Row justify="end">
              <PlusSquareOutlined style={{ fontSize: "36px", verticalAlign: "middle" }} />
            </Row>
          </Col>
        )}
        {props.type === "requests" && (
          <Col span={6}>
            <Row justify="end">
              <CloseSquareOutlined style={{ fontSize: "28px", verticalAlign: "middle", marginRight: "5px" }} />
              <CheckSquareOutlined style={{ fontSize: "28px", verticalAlign: "middle" }} />
            </Row>
          </Col>
        )}
      </Row>
    </Card>
  );
};

export default FriendsProfileCard;
