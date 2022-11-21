import React, { useState } from "react";
import { Row, Layout, Input, Button, Form, Select, message } from "antd";
import { useNavigate } from "react-router-dom";
import { postUser } from "./SignUpPageService";
import "./SignUpPage.css";

const { Content } = Layout;

const SignUpPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lasttName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [homeCity, setHomeCity] = useState("");
  let navigate = useNavigate();

  const signUp = async () => {
    const payload = {
      firstName: firstName,
      lastName: lasttName,
      email: email,
      phoneNumber: phoneNumber,
      homeCity: homeCity,
    };
    try {
      const res = await postUser(payload);
      navigate("/");
      setTimeout(() => message.success(`Signed Up! Login to Start!`), 1000);
    } catch (e) {
      console.log("signUp error", e);
    }
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
              <Input placeholder="Email Address" onChange={(e) => setEmail(e.target.value)} />
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
                    value: "Boston,Massachusetts",
                    label: "Boston, MA",
                  },
                  {
                    value: "San Francisco,California",
                    label: "San Francisco, CA",
                  },
                  {
                    value: "New York City,New York",
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
                style={{ width: "100%", backgroundColor: "#FFFFFF", border: 0, color: "#620CA5" }}
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
