import React, { useState, useEffect } from "react";
import type { MenuProps } from "antd";
import { Col, Row, Layout, Input, Button, Form, Select } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import {} from "./SignUpPageService";
import "./SignUpPage.css";

const { Content } = Layout;

const SignUpPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lasttName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [homeCity, setHomeCity] = useState("");
  let navigate = useNavigate();

  const signUp = () => {
    const payload = {
      firstName: firstName,
      lasttName: lasttName,
      emailAddress: emailAddress,
      phoneNumber: phoneNumber,
      homeCity: homeCity,
    };
    console.log(payload);
  };

  const login = () => {
    navigate("/");
  };

  return (
    <Layout>
      <Content
        style={{
          backgroundColor: "#620CA5",
          width: "100vw",
          height: "100vh",
          paddingTop: "20px",
        }}
      >
        <Row justify="center">
          <h1
            style={{
              fontFamily: "Dancing Script",
              fontSize: "64px",
              color: "#FFFFFF",
            }}
          >
            mappy
          </h1>
        </Row>
        <Row justify="center">
          <Form>
            <Form.Item label="First Name">
              <Input placeholder="First Name" onChange={(e) => setFirstName(e.target.value)} />
            </Form.Item>
            <Form.Item label="Last Name">
              <Input placeholder="Last Name" onChange={(e) => setLastName(e.target.value)} />
            </Form.Item>
            <Form.Item label="Email Address">
              <Input placeholder="Email Address" onChange={(e) => setEmailAddress(e.target.value)} />
            </Form.Item>
            <Form.Item label="Phone Number">
              <Input placeholder="Phone Number" onChange={(e) => setPhoneNumber(e.target.value)} />
            </Form.Item>
            <Form.Item label="Home City">
              <Select
                showSearch
                placeholder="Select your home city"
                optionFilterProp="children"
                onChange={(city) => setHomeCity(city)}
                filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
                options={[
                  {
                    value: "San Francisco, CA",
                    label: "San Francisco, CA",
                  },
                  {
                    value: "New York City, NY",
                    label: "New York City, NY",
                  },
                ]}
              />
            </Form.Item>
            <Form.Item style={{ marginTop: "30px" }}>
              <Button
                type="primary"
                onClick={() => {
                  signUp();
                }}
                style={{ width: "100%" }}
              >
                Sign Up
              </Button>
            </Form.Item>
          </Form>
        </Row>
        <Row justify="center">
          <Button type="link" style={{ color: "#FFFFFF" }} onClick={() => login()}>
            Login
          </Button>
        </Row>
      </Content>
    </Layout>
  );
};

export default SignUpPage;
