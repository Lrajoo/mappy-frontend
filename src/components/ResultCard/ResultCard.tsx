import React from "react";
import { Col, Row, Card } from "antd";
import { MenuOutlined } from "@ant-design/icons";

export interface ResultCardProps {
  name: string;
  address: string;
}

const ResultCard = (props: ResultCardProps) => {
  return (
    <Card size="small" title={props.name} style={{ width: "80vw" }}>
      <p>{props.address}</p>
    </Card>
  );
};

export default ResultCard;
