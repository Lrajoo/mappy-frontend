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
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [firstNameFormStatus, setFirstNameFormStatus] = useState("") as any;
  const [firstNameFormMessage, setFirstNameFormMessage] = useState("");
  const [lastName, setLastName] = useState("");
  const [lastNameFormStatus, setLastNameFormStatus] = useState("") as any;
  const [lastNameFormMessage, setLastNameFormMessage] = useState("");
  const [userName, setUserName] = useState("");
  const [userNameFormStatus, setUserNameFormStatus] = useState("") as any;
  const [userNameFormMessage, setUserNameFormMessage] = useState("");
  const [email, setEmail] = useState("");
  const [emailFormStatus, setEmailFormStatus] = useState("") as any;
  const [emailFormMessage, setEmailFormMessage] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberFormStatus, setPhoneNumberFormStatus] = useState("") as any;
  const [phoneNumberFormMessage, setPhoneNumberFormMessage] = useState("");
  const [homeCity, setHomeCity] = useState("");
  const [homeCityFormStatus, setHomeCityFormStatus] = useState("") as any;
  const [homeCityFormMessage, setHomeCityFormMessage] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState({}) as any;
  const [dateOfBirthFormStatus, setDateOfBirthFormStatus] = useState("") as any;
  const [dateOfBirthFormMessage, setDateOfBirthFormMessage] = useState("");
  const [verifyStatus, setVerifyStatus] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationCodeFormStatus, setVerificationCodeFormStatus] = useState("") as any;
  const [verificationCodeFormMessage, setVerificationCodeFormMessage] = useState("");
  const dateFormatList = "DD/MM/YYYY";
  let navigate = useNavigate();

  const updateFirstName = (input: string) => {
    setFirstName(input);
    setFirstNameFormStatus("");
    setFirstNameFormMessage("");
  };

  const updateLastName = (input: string) => {
    setLastName(input);
    setLastNameFormStatus("");
    setLastNameFormMessage("");
  };

  const updateUserName = (input: string) => {
    setUserName(input);
    setUserNameFormStatus("");
    setUserNameFormMessage("");
  };

  const updateEmail = (input: string) => {
    setEmail(input);
    setEmailFormStatus("");
    setEmailFormMessage("");
  };

  const updatePhoneNumber = (input: string) => {
    setPhoneNumber(input);
    setPhoneNumberFormStatus("");
    setPhoneNumberFormMessage("");
  };

  const updateHomeCity = (input: string) => {
    setHomeCity(input);
    setHomeCityFormStatus("");
    setHomeCityFormMessage("");
  };

  const updateDateOfBirth = (input: any) => {
    setDateOfBirth(input);
    setDateOfBirthFormStatus("");
    setDateOfBirthFormMessage("");
  };

  const validateForm = () => {
    let validationStatus = true;
    if (firstName === "") {
      validationStatus = false;
      setFirstNameFormStatus("error");
      setFirstNameFormMessage("Enter your first name");
    }
    if (lastName === "") {
      validationStatus = false;
      setLastNameFormStatus("error");
      setLastNameFormMessage("Enter your last name");
    }
    if (userName === "") {
      validationStatus = false;
      setUserNameFormStatus("error");
      setUserNameFormMessage("Pick a username");
    }
    if (email === "") {
      validationStatus = false;
      setEmailFormStatus("error");
      setEmailFormMessage("Enter your email");
    }
    if (phoneNumber === "") {
      validationStatus = false;
      setPhoneNumberFormStatus("error");
      setPhoneNumberFormMessage("Enter your phone number");
    }
    if (dateOfBirth._d === null || dateOfBirth._d === undefined) {
      validationStatus = false;
      setDateOfBirthFormStatus("error");
      setDateOfBirthFormMessage("Select your date of birth");
    }
    if (homeCity === "") {
      validationStatus = false;
      setHomeCityFormStatus("error");
      setHomeCityFormMessage("Select your home city");
    }
    return validationStatus;
  };

  const signUp = async () => {
    const payload = {
      firstName: firstName,
      lastName: lastName,
      userName: userName,
      email: email,
      phoneNumber: phoneNumber,
      dateOfBirth: dateOfBirth.format(dateFormatList),
      homeCity: homeCity,
    };
    try {
      setLoading(true);
      const resPostUser = await postUser(payload);
      const resPostLogin = await postLogin(payload);
      setLoading(false);
      setTimeout(() => message.success("Verification code sent!"), 1000);
      setVerifyStatus(true);
    } catch (e: any) {
      console.error("signUp error", e);
      if (e.response.data.field === "userName") {
        setUserNameFormStatus("error");
        setUserNameFormMessage(e.response.data.errorMessage);
      } else if (e.response.data.field === "phoneNumber") {
        setPhoneNumberFormStatus("error");
        setPhoneNumberFormMessage(e.response.data.errorMessage);
      }
    }
  };

  const verify = async () => {
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
        setTimeout(() => message.success("Welcome to Mappy!"), 1000);
      }
    } catch (e) {
      setVerificationCodeFormStatus("error");
      setVerificationCodeFormMessage("Enter the correct code");
      console.error("verify error", e);
    }
  };

  const login = () => {
    navigate("/login");
  };

  const updateVerificationCode = (verificationCode: string) => {
    setVerificationCodeFormStatus("");
    setVerificationCodeFormMessage("");
    setVerificationCode(verificationCode);
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
              <>
                <Form.Item label="First Name" validateStatus={firstNameFormStatus} help={firstNameFormMessage}>
                  <Input placeholder="First Name" onChange={(e) => updateFirstName(e.target.value)} />
                </Form.Item>
                <Form.Item label="Last Name" validateStatus={lastNameFormStatus} help={lastNameFormMessage}>
                  <Input placeholder="Last Name" onChange={(e) => updateLastName(e.target.value)} />
                </Form.Item>
                <Form.Item label="Username" validateStatus={userNameFormStatus} help={userNameFormMessage}>
                  <Input placeholder="Username" onChange={(e) => updateUserName(e.target.value)} />
                </Form.Item>
                <Form.Item label="Email Address" validateStatus={emailFormStatus} help={emailFormMessage}>
                  <Input placeholder="Email Address" onChange={(e) => updateEmail(e.target.value)} />
                </Form.Item>
                <Form.Item label="Phone Number" validateStatus={phoneNumberFormStatus} help={phoneNumberFormMessage}>
                  <Input placeholder="Phone Number" onChange={(e) => updatePhoneNumber(e.target.value)} />
                </Form.Item>
                <Form.Item label="Date of Birth" validateStatus={dateOfBirthFormStatus} help={dateOfBirthFormMessage}>
                  <DatePicker
                    placeholder="Select date of birth"
                    format={dateFormatList}
                    onChange={(value) => updateDateOfBirth(value)}
                    style={{ width: "100%" }}
                  />
                </Form.Item>
                <Form.Item label="Home City" validateStatus={homeCityFormStatus} help={homeCityFormMessage}>
                  <Select
                    showSearch
                    placeholder="Select your home city"
                    optionFilterProp="children"
                    onChange={(city) => updateHomeCity(city)}
                    filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
                    options={[
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
                      validateForm() && signUp();
                    }}
                    loading={loading}
                    style={{
                      width: "100%",
                      backgroundColor: "#FFFFFF",
                      border: 0,
                      color: "#620CA5",
                      fontWeight: "bold",
                    }}
                  >
                    Sign Up
                  </Button>
                </Form.Item>
              </>
            )}
          </Form>
        </Row>
        <Row justify="center">
          {verifyStatus && (
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
                  marginTop: "20px",
                  marginBottom: "10px",
                }}
              >
                Verify
              </Button>
            </>
          )}
          <Button
            type="link"
            style={{ color: "#FFFFFF", marginBottom: "30px", fontWeight: "bold" }}
            onClick={() => login()}
          >
            Back to Login Page
          </Button>
        </Row>
      </Content>
    </Layout>
  );
};

export default SignUpPage;
