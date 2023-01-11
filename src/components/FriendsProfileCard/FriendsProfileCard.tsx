import React, { useState } from "react";
import { Col, Row, Card } from "antd";
import { UserOutlined, PlusSquareOutlined, CloseSquareOutlined, CheckSquareOutlined } from "@ant-design/icons";

export interface FriendsProfileCardProps {
  type: "friends" | "search" | "requests";
  userId: string;
  firstName: string;
  lastName: string;
  userName: string;
  friendStatus?: "pending" | "accept" | "decline";
  requestStatus?: "send" | "receive";
  addFriend?: (friendId: string, friendFirstName: string, friendLastName: string, friendUserName: string) => void;
  acceptFriend?: (friendId: string) => void;
  declineFriend?: (friendId: string) => void;
}

const FriendsProfileCard = (props: FriendsProfileCardProps) => {
  return (
    <Card style={{ width: "90%" }} bodyStyle={{ padding: "12px" }}>
      <Row align="middle">
        <Col span={4}>
          <UserOutlined style={{ fontSize: "36px", color: "#620CA5", verticalAlign: "middle" }} />
        </Col>
        <Col span={props.type === "requests" ? 14 : 16}>
          <Row style={{ fontSize: "18px", color: "#620CA5", fontWeight: "bold" }}>
            {props.firstName} {props.lastName}
          </Row>
          <Row style={{ fontSize: "18px", color: "#620CA596" }}>{props.userName}</Row>
        </Col>
        {props.type === "search" && (
          <Col span={4}>
            <Row justify="end">
              {props.friendStatus && props.friendStatus === "pending" ? (
                <h3 style={{ backgroundColor: "#8E4BC2F2", color: "#FFFFFF", padding: "5px" }}>Pending</h3>
              ) : (
                <PlusSquareOutlined
                  style={{ fontSize: "36px", verticalAlign: "middle" }}
                  onClick={() =>
                    props.addFriend && props.addFriend(props.userId, props.firstName, props.lastName, props.userName)
                  }
                />
              )}
            </Row>
          </Col>
        )}
        {props.type === "requests" && (
          <Col span={6}>
            <Row justify="end">
              <CloseSquareOutlined
                style={{ fontSize: "28px", verticalAlign: "middle", marginRight: "5px" }}
                onClick={() => props.declineFriend && props.declineFriend(props.userId)}
              />
              <CheckSquareOutlined
                style={{ fontSize: "28px", verticalAlign: "middle" }}
                onClick={() => props.acceptFriend && props.acceptFriend(props.userId)}
              />
            </Row>
          </Col>
        )}
      </Row>
    </Card>
  );
};

export default FriendsProfileCard;
