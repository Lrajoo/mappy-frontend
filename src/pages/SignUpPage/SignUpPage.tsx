import React, { useState } from "react";
import { Row, Layout, Input, Button, Form, Select, DatePicker, message } from "antd";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { postUser, postVerify, postLogin } from "./SignUpPageService";
import "./SignUpPage.css";

const { Content } = Layout;

export interface SignUpPageInterface {
  authenticateUser: (userData: object) => void;
}

const SignUpPage = (props: SignUpPageInterface) => {
  const [firstName, setFirstName] = useState("");
  const [lasttName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [homeCity, setHomeCity] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState({}) as any;
  const [verifyStatus, setVerifyStatus] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const dateFormatList = "DD/MM/YYYY";
  let navigate = useNavigate();

  const signUp = async () => {
    const payload = {
      firstName: firstName,
      lastName: lasttName,
      userName: userName,
      email: email,
      phoneNumber: phoneNumber,
      dateOfBirth: dateOfBirth.format(dateFormatList),
      homeCity: homeCity,
    };
    try {
      const resPostUser = await postUser(payload);
      const resPostLogin = await postLogin(payload);
      setVerifyStatus(true);
    } catch (e) {
      console.error("signUp error", e);
    }
  };

  const verify = async () => {
    const payload = {
      phoneNumber: phoneNumber,
      verificationCode: verificationCode,
    };
    try {
      const res = await postVerify(payload);
      if (res.data.loginStatus) {
        props.authenticateUser(res.data);
        navigate("/");
        setTimeout(() => message.success("Welcome to Mappy!"), 1000);
      }
    } catch (e) {
      console.error("verify error", e);
    }
  };

  const login = () => {
    navigate("/login");
  };

  return (
    <Layout>
      <Content
        style={{
          backgroundColor: "#620CA5",
          width: "100vw",
          height: verifyStatus ? "100vh" : "100%",
          paddingTop: verifyStatus ? "50vw" : "20px",
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
          {verifyStatus ? (
            <Input
              size="large"
              placeholder="Verification Code"
              style={{ width: "70%" }}
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />
          ) : (
            <Form>
              <Form.Item label="First Name">
                <Input placeholder="First Name" onChange={(e) => setFirstName(e.target.value)} />
              </Form.Item>
              <Form.Item label="Last Name">
                <Input placeholder="Last Name" onChange={(e) => setLastName(e.target.value)} />
              </Form.Item>
              <Form.Item label="Username">
                <Input placeholder="Username" onChange={(e) => setUserName(e.target.value)} />
              </Form.Item>
              <Form.Item label="Email Address">
                <Input placeholder="Email Address" onChange={(e) => setEmail(e.target.value)} />
              </Form.Item>
              <Form.Item label="Phone Number">
                <Input placeholder="Phone Number" onChange={(e) => setPhoneNumber(e.target.value)} />
              </Form.Item>
              <Form.Item label="Date of Birth">
                <DatePicker
                  placeholder="Select date of birth"
                  format={dateFormatList}
                  onChange={(value) => setDateOfBirth(value)}
                  style={{ width: "100%" }}
                />
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
                  style={{ width: "100%", backgroundColor: "#FFFFFF", border: 0, color: "#620CA5", fontWeight: "bold" }}
                >
                  Sign Up
                </Button>
              </Form.Item>
            </Form>
          )}
        </Row>
        <Row justify="center">
          {verifyStatus && (
            <Button
              type="primary"
              size="large"
              // loading={loginStatus}
              onClick={() => verify()}
              style={{
                backgroundColor: "#FFFFFF",
                color: "#620CA5",
                fontWeight: "bold",
                border: "0",
                width: "70%",
                marginTop: "20px",
                marginBottom: "10px",
              }}
            >
              Verify
            </Button>
          )}
          <Button type="link" style={{ color: "#FFFFFF", marginBottom: "30px" }} onClick={() => login()}>
            Back to Login Page
          </Button>
        </Row>
      </Content>
    </Layout>
  );
};

export default SignUpPage;
