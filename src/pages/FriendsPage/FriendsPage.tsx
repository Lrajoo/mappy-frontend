import React, { useState, useEffect, useContext } from "react";
import { Col, Row, Layout, Tabs, Input, message } from "antd";
import { getFriends, getUsers, postFriend, postAddFriend, postDeclineFriend } from "./FriendsPageService";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sider/Sidebar";
import FriendsProfileCard from "../../components/FriendsProfileCard/FriendsProfileCard";
import { AuthContext } from "../../components/AuthContext/AuthContext";
import { Friend } from "../../interface/friend";
import "./FriendsPage.css";

const { Content } = Layout;
const { Search } = Input;

const FriendsPage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [allFriends, setAllFriends] = useState([]);
  const [friends, setFriends] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [requests, setRequests] = useState([]);
  const { userId, firstName, lastName, userName } = useContext(AuthContext);

  useEffect(() => {
    populateFriends();
  });

  const toggleSidebarView = (collapsed: boolean) => {
    setSidebarCollapsed(collapsed);
  };

  const populateFriends = async () => {
    try {
      const userName = window.location.pathname.split("/")[2];
      const res = await getFriends(userName);
      setAllFriends(res.data);
      const updateFriendsResults = res.data.filter((friend: any) => friend.friendStatus === "accept");
      setFriends(updateFriendsResults);
    } catch (e) {
      console.error("populateFriends error", e);
    }
  };

  const onChangeTab = (key: string) => {
    setSearchResults([]);
    if (key === "friends") populateFriends();
    if (key === "requests") populateRequests();
  };

  const search = async (query: string) => {
    if (query.length === 0) return;
    setSearchResults([]);
    try {
      const res = await getUsers(query);
      const updateSearchResults = res.data
        .filter((user: any) => !(user.userId === userId))
        .map((user: any) => {
          allFriends.forEach((friend: any) => {
            if (user.userId === friend.userId) {
              user["friendStatus"] = friend.friendStatus;
            }
          });
          return user;
        });
      setSearchResults(updateSearchResults);
    } catch (e) {
      console.error("search error", e);
    }
  };

  const addFriend = async (
    friendId: string,
    friendFirstName: string,
    friendLastName: string,
    friendUserName: string
  ) => {
    try {
      const payload = {
        user: {
          userId: userId,
          firstName: firstName,
          lastName: lastName,
          userName: userName,
        },
        friend: {
          userId: friendId,
          firstName: friendFirstName,
          lastName: friendLastName,
          userName: friendUserName,
        },
      };
      const res = await postFriend(payload);
      setTimeout(() => message.success(`Friend request sent to ${friendUserName}!`), 500);
    } catch (e) {
      console.error("addFriend error", e);
    }
  };

  const friendsTabContent = () => {
    return (
      <Row>
        <Col span={24}>
          <Row justify="center" style={{ fontSize: "24px", marginBottom: "20px" }}>
            My Friends
          </Row>
          {friends.map((friend: Friend) => (
            <Row justify="center" style={{ fontSize: "24px", marginBottom: "20px" }} key={friend.userId}>
              <FriendsProfileCard
                type="friends"
                firstName={friend.firstName}
                lastName={friend.lastName}
                userId={friend.userId}
                userName={friend.userName}
              />
            </Row>
          ))}
          {friends.length === 0 && (
            <Row justify="start" style={{ fontSize: "18px", marginBottom: "20px", marginLeft: "20px" }}>
              Add friends using the search tab
            </Row>
          )}
        </Col>
      </Row>
    );
  };

  const searchTabContent = () => {
    return (
      <Row>
        <Col span={24}>
          <Row justify="center" style={{ fontSize: "24px", marginBottom: "20px" }}>
            Add Friends
          </Row>
          <Row justify="space-evenly">
            <Search
              placeholder={"Name or Username"}
              allowClear
              enterButton="Search"
              size="large"
              //   loading={searchLoading}
              onSearch={search}
              style={{
                width: "90%",
                marginBottom: "20px",
              }}
            />
          </Row>
          <Row justify="start" style={{ fontSize: "18px", marginLeft: "20px", marginBottom: "20px" }}>
            Results
          </Row>
          {searchResults.map((friend: Friend) => (
            <Row justify="center" style={{ fontSize: "24px", marginBottom: "20px" }} key={friend.userId}>
              <FriendsProfileCard
                type="search"
                firstName={friend.firstName}
                lastName={friend.lastName}
                userId={friend.userId}
                userName={friend.userName}
                friendStatus={friend.friendStatus}
                addFriend={addFriend}
              />
            </Row>
          ))}
        </Col>
      </Row>
    );
  };

  const populateRequests = async () => {
    try {
      const res = await getFriends(userName);
      const requestsList = res.data.filter(
        (friend: any) => friend.requestStatus === "receive" && friend.friendStatus === "pending"
      );
      setRequests(requestsList);
    } catch (e) {
      console.error("populateRequests error", e);
    }
  };

  const requestsTabContent = () => {
    return (
      <Row>
        <Col span={24}>
          <Row justify="center" style={{ fontSize: "24px", marginBottom: "20px" }}>
            Your Requests
          </Row>
          {requests.map((friend: Friend) => (
            <Row justify="center" style={{ fontSize: "24px", marginBottom: "20px" }} key={friend.userId}>
              <FriendsProfileCard
                type="requests"
                firstName={friend.firstName}
                lastName={friend.lastName}
                userId={friend.userId}
                userName={friend.userName}
                friendStatus={friend.friendStatus}
                acceptFriend={acceptFriend}
                declineFriend={declineFriend}
              />
            </Row>
          ))}
          {requests.length === 0 && (
            <Row justify="start" style={{ fontSize: "18px", marginBottom: "20px", marginLeft: "20px" }}>
              0 requests
            </Row>
          )}
        </Col>
      </Row>
    );
  };

  const acceptFriend = async (friendId: string) => {
    try {
      const payload = {
        userId: userId,
        friendId: friendId,
        friendStatus: "accept",
      };
      const res = await postAddFriend(payload);
      populateRequests();
    } catch (e) {
      console.error("acceptFriend error", e);
    }
  };

  const declineFriend = async (friendId: string) => {
    try {
      const payload = {
        userId: userId,
        friendId: friendId,
        friendStatus: "decline",
      };
      const res = await postDeclineFriend(payload);
      populateRequests();
    } catch (e) {
      console.error("declineFriend error", e);
    }
  };

  return (
    <Layout>
      <Sidebar collapsed={sidebarCollapsed} toggleSidebarView={toggleSidebarView} />
      <Content>
        <Header toggleSidebarView={toggleSidebarView} />
        <Row style={{ height: "93vh" }}>
          <Col span={24}>
            <Tabs
              centered
              defaultActiveKey="friends"
              onChange={(key) => onChangeTab(key)}
              items={[
                {
                  label: `Friends`,
                  key: "friends",
                  children: friendsTabContent(),
                },
                {
                  label: `Search`,
                  key: "search",
                  children: searchTabContent(),
                },
                {
                  label: `Requests`,
                  key: "requests",
                  children: requestsTabContent(),
                },
              ]}
            />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default FriendsPage;
