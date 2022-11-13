import React, { useState } from "react";
import { Col, Row, Modal, Button } from "antd";
import { DetailedPlace } from "../../interface/detailedPlace";

export interface LocationCardProps {
  open: boolean;
  disableLocation: boolean;
  locationDetails: DetailedPlace;
  addLocation: () => void;
  removeLocation?: () => void;
  hideLocationCard: () => void;
}

const LocationCard = (props: LocationCardProps) => {
  const currentDay = new Date().getDay();
  const getIcon = (category: string[]) => {
    if (category && category.includes("bar")) {
      return "https://img.icons8.com/external-vitaliy-gorbachev-flat-vitaly-gorbachev/35/null/external-cocktail-vacation-vitaliy-gorbachev-flat-vitaly-gorbachev-1.png";
    } else if (category && category.includes("coffee")) {
      return "https://img.icons8.com/fluency/35/null/coffee-to-go.png";
    } else if (category && category.includes("restaurant")) {
      return "https://img.icons8.com/external-bearicons-blue-bearicons/35/null/external-Restaurant-location-bearicons-blue-bearicons.png";
    }
  };

  const title = props !== undefined && (
    <>
      <h2>
        <img src={getIcon(props.locationDetails.category)} alt="Category Icon" />
        {props.locationDetails.name}
      </h2>
    </>
  );

  return (
    <Modal
      open={props.open}
      title={title}
      onCancel={props.hideLocationCard}
      footer={null}
      style={{ padding: 0 }}
      bodyStyle={{ padding: "20px" }}
    >
      <Row>
        <Col span={24}>
          <Row style={{ marginBottom: "10px", fontSize: "18px" }}>
            Description:<br></br>
            {props.locationDetails.description}
          </Row>
          <Row style={{ marginBottom: "10px", fontSize: "18px" }}>
            Address:<br></br>
            {props.locationDetails.address}
          </Row>
          <Row style={{ marginBottom: "10px", fontSize: "18px" }}>
            Hours:<br></br>
            {props.locationDetails.openingHours && props.locationDetails.openingHours[currentDay]}
          </Row>
          <Row style={{ marginBottom: "10px", fontSize: "18px" }}>
            Contact:<br></br>
            {props.locationDetails.phoneNumber}
          </Row>
          <Row style={{ marginBottom: "30px", fontSize: "18px" }}>
            {props.locationDetails.location && (
              <img
                src={`https://maps.googleapis.com/maps/api/staticmap?center=${props.locationDetails.location.lat},${props.locationDetails.location.lng}&zoom=13&size=325x200&markers=color:red%7C${props.locationDetails.location.lat},${props.locationDetails.location.lng}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`}
                alt="Pinned Map Location"
              />
            )}
          </Row>
          <Row justify="center">
            {props.disableLocation ? (
              <Button type="primary" danger onClick={props.removeLocation}>
                Delete Location
              </Button>
            ) : (
              <Button type="primary" onClick={props.addLocation}>
                Add Location
              </Button>
            )}
          </Row>
        </Col>
      </Row>
    </Modal>
  );
};

export default LocationCard;
