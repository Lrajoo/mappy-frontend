import React, { useState } from "react";
import { Col, Row, Modal, Button } from "antd";

export interface LocationCardProps {
  open: boolean;
  locationDetails: any;
  addLocation: () => void;
  hideLocationCard: () => void;
}

const LocationCard = (props: LocationCardProps) => {
  const getIcon = (category: string[]) => {
    if (category && category.includes("bar")) {
      return "https://img.icons8.com/external-vitaliy-gorbachev-flat-vitaly-gorbachev/35/null/external-cocktail-vacation-vitaliy-gorbachev-flat-vitaly-gorbachev-1.png";
    } else if (category && category.includes("coffee")) {
      return "https://img.icons8.com/fluency/35/null/coffee-to-go.png";
    } else if (category && category.includes("restaurant")) {
      return "https://img.icons8.com/external-bearicons-blue-bearicons/35/null/external-Restaurant-location-bearicons-blue-bearicons.png";
    }
  };

  const title = props != undefined && (
    <>
      <h2>
        <img src={getIcon(props.locationDetails.category)} alt="Category Icon" />
        {props.locationDetails.name}
      </h2>
    </>
  );

  return (
    <Modal open={props.open} title={title} onCancel={props.hideLocationCard} footer={null}>
      <Row>
        <Col span={24}>
          <Row style={{ marginBottom: "10px" }}>
            Address:<br></br>
            {props.locationDetails.address}
          </Row>
          <Row style={{ marginBottom: "10px" }}>
            Hours:<br></br>
          </Row>
          <Row style={{ marginBottom: "30px" }}>
            Contact:<br></br>(XXX) XXX-XXXX
          </Row>
          <Row justify="center">
            <Button type="primary" onClick={props.addLocation}>
              Add Location
            </Button>
          </Row>
        </Col>
      </Row>
    </Modal>
  );
};

export default LocationCard;
