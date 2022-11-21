import React, { useState, useEffect } from "react";
import { Button, Row, Layout, Input, message } from "antd";
import { PhoneOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { postLogin, postVerify } from "./LoginPageService";
import "./LoginPage.css";

const { Content } = Layout;

const LoginPage = () => {
  const [verifyStatus, setVerifyStatus] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  let navigate = useNavigate();

  useEffect(() => {}, []);

  const login = async () => {
    if (phoneNumber.length !== 10) return;
    const payload = {
      phoneNumber: phoneNumber,
    };
    try {
      const res = await postLogin(payload);
      setVerifyStatus(true);
    } catch (e) {
      console.log("login error", e);
    }
  };

  const verify = async () => {
    const payload = {
      phoneNumber: phoneNumber,
      verificationCode: verificationCode,
    };
    try {
      const res = await postVerify(payload);
      if (res.data.status === "approved") {
        navigate("/map");
        setTimeout(() => message.success("Signed In!"), 1000);
      }
    } catch (e) {
      console.log("verify error", e);
    }
  };

  const signUp = () => {
    navigate("/signup");
  };

  return (
    <Layout>
      <Content
        style={{
          backgroundColor: "#620CA5",
          width: "100vw",
          height: "100vh",
          paddingTop: "50vw",
        }}
      >
        <Row justify="center" style={{ marginBottom: "40px" }}>
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
        <Row justify="center" style={{ marginBottom: "20px" }}>
          {verifyStatus ? (
            <Input
              size="large"
              placeholder="Verification Code"
              style={{ width: "70%" }}
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />
          ) : (
            <Input
              size="large"
              placeholder="Phone Number"
              prefix={<PhoneOutlined />}
              style={{ width: "70%" }}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          )}
        </Row>
        <Row justify="center" style={{ marginBottom: "10px" }}>
          {verifyStatus ? (
            <>
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
                  marginBottom: "10px",
                }}
              >
                Verify
              </Button>
              <Button
                type="link"
                size="large"
                // loading={loginStatus}
                onClick={() => verify()}
                style={{ color: "#FFFFFF", width: "70%" }}
              >
                Re-enter Phone Number
              </Button>
              <Button
                type="link"
                size="large"
                // loading={loginStatus}
                onClick={() => verify()}
                style={{ color: "#FFFFFF", width: "70%" }}
              >
                Resend verification code
              </Button>
            </>
          ) : (
            <Button
              type="primary"
              size="large"
              // loading={loginStatus}
              onClick={() => login()}
              style={{ backgroundColor: "#FFFFFF", color: "#620CA5", fontWeight: "bold", border: "0", width: "70%" }}
            >
              Login
            </Button>
          )}
        </Row>
        {!verifyStatus && (
          <Row justify="center">
            <Button type="link" style={{ color: "#FFFFFF" }} onClick={() => signUp()}>
              Don't have an account? Sign Up Here!
            </Button>
          </Row>
        )}
      </Content>
    </Layout>
  );
};

export default LoginPage;
