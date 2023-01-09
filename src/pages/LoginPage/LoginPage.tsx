import React, { useState, useEffect, useContext } from "react";
import { Button, Row, Layout, Input, message, Form } from "antd";
import { PhoneOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { postLogin, postVerify } from "./LoginPageService";
import { AuthContext } from "../../components/AuthContext/AuthContext";
import "./LoginPage.css";

const { Content } = Layout;

export interface LoginPageInterface {
  authenticateUser: (userData: object) => void;
}

const LoginPage = (props: LoginPageInterface) => {
  const [loading, setLoading] = useState(false);
  const [verifyStatus, setVerifyStatus] = useState(false);
  const [verificationCodeFormStatus, setVerificationCodeFormStatus] = useState("") as any;
  const [verificationCodeFormMessage, setVerificationCodeFormMessage] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberFormStatus, setPhoneNumberFormStatus] = useState("") as any;
  const [phoneNumberFormMessage, setPhoneNumberFormMessage] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const { loginStatus, userId, firstName, lastName, userName, homeCity, homeState } = useContext(AuthContext);
  let navigate = useNavigate();

  useEffect(() => {}, []);

  const login = async () => {
    if (phoneNumber.length !== 10) {
      setPhoneNumberFormStatus("error");
      setPhoneNumberFormMessage("Enter a valid phone number");
      return;
    }
    const payload = {
      phoneNumber: phoneNumber,
    };
    try {
      setLoading(true);
      const res = await postLogin(payload);
      setLoading(false);
      setVerifyStatus(true);
      setTimeout(() => message.success("Verification code sent!"), 1000);
    } catch (e) {
      setPhoneNumberFormStatus("error");
      setPhoneNumberFormMessage("No account associated with this number");
      console.error("login error", e);
    }
  };

  const verify = async () => {
    console.log("verify");
    const payload = {
      phoneNumber: phoneNumber,
      verificationCode: verificationCode,
    };
    try {
      setLoading(true);
      const res = await postVerify(payload);
      setLoading(false);
      if (res.data.loginStatus) {
        props.authenticateUser(res.data);
        navigate("/");
        setTimeout(() => message.success(`Welcome back ${userName}!`), 1000);
      }
    } catch (e) {
      setVerificationCodeFormStatus("error");
      setVerificationCodeFormMessage("Enter the correct code");
      console.error("verify error", e);
    }
  };

  const signUp = () => {
    navigate("/signup");
  };

  const updatePhoneNumber = (phoneNumber: string) => {
    setPhoneNumberFormStatus("");
    setPhoneNumberFormMessage("");
    setPhoneNumber(phoneNumber);
  };

  const updateVerificationCode = (verificationCode: string) => {
    setVerificationCodeFormStatus("");
    setVerificationCodeFormMessage("");
    setVerificationCode(verificationCode);
  };

  const enterPhonerNumber = () => {
    setVerifyStatus(false);
    setPhoneNumber("");
    setPhoneNumberFormStatus("");
    setPhoneNumberFormMessage("");
    setVerificationCode("");
    setVerificationCodeFormStatus("");
    setVerificationCodeFormMessage("");
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
          <Form style={{ width: "80%" }}>
            {verifyStatus ? (
              <Form.Item
                label="Verification Code"
                validateStatus={verificationCodeFormStatus}
                help={verificationCodeFormMessage}
              >
                <Input
                  size="large"
                  placeholder="Verification Code"
                  value={verificationCode}
                  onChange={(e) => updateVerificationCode(e.target.value)}
                />
              </Form.Item>
            ) : (
              <Form.Item label="Phone Number" validateStatus={phoneNumberFormStatus} help={phoneNumberFormMessage}>
                <Input
                  size="large"
                  placeholder="Phone Number"
                  prefix={<PhoneOutlined />}
                  value={phoneNumber}
                  style={{ width: "100%" }}
                  onChange={(e) => updatePhoneNumber(e.target.value)}
                />
              </Form.Item>
            )}
          </Form>
        </Row>
        <Row justify="center" style={{ marginBottom: "10px" }}>
          {verifyStatus ? (
            <>
              <Button
                type="primary"
                size="large"
                loading={loading}
                onClick={() => verify()}
                style={{
                  backgroundColor: "#FFFFFF",
                  color: "#620CA5",
                  fontWeight: "bold",
                  border: "0",
                  width: "80%",
                  marginBottom: "10px",
                }}
              >
                Verify
              </Button>
              <Button
                type="link"
                size="large"
                onClick={() => enterPhonerNumber()}
                style={{ color: "#FFFFFF", width: "80%" }}
              >
                Re-enter Phone Number
              </Button>
              <Button type="link" size="large" onClick={() => login()} style={{ color: "#FFFFFF", width: "80%" }}>
                Resend verification code
              </Button>
            </>
          ) : (
            <Button
              type="primary"
              size="large"
              loading={loading}
              onClick={() => login()}
              style={{ backgroundColor: "#FFFFFF", color: "#620CA5", fontWeight: "bold", border: "0", width: "80%" }}
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
