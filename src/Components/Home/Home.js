import { Col, Menu, Row } from "antd";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";

import Logo from "../Logo/Logo";
import { useEffect } from "react/cjs/react.production.min";

const Home = () => {
  const { user } = useContext(UserContext);

  const isAuthed = user;

  const onLogOut = () => {
    console.log("Log Out");
  };

  return isAuthed ? (
    <Row className="home-page">
      <Col style={{ padding: "1em" }} span={24}>
        <Logo hasText />
      </Col>
      <Col span={18} offset={3}>
        <Menu className="is-menu-container" style={{ borderRadius: "10px" }}>
          <Menu.Item key={"post"} className="is-menu-item menu-first">
            <Link to="/new-post">New Post</Link>
          </Menu.Item>
          <Menu.Item key={"profile"} className="is-menu-item">
            <Link to={`/profile/${user.username}`}>Profile</Link>
          </Menu.Item>
          <Menu.Item key={"feed"} className="is-menu-item">
            <Link to="/feed">Feed</Link>
          </Menu.Item>
          <Menu.Item
            key={"logout"}
            onClick={() => onLogOut()}
            className="is-menu-item menu-last"
          >
            Log Out
          </Menu.Item>
        </Menu>
      </Col>
    </Row>
  ) : (
    <Row className="home-page">
      <Col style={{ padding: "1em" }} span={24}>
        <Logo hasText />
      </Col>
      <Col span={18} offset={3}>
        <Menu className="is-menu-container" style={{ borderRadius: "10px" }}>
          <Menu.Item key={"profile"} className="is-menu-item">
            <Link to="/profile/yip-yap-team">Yip-Yap Team Profile</Link>
          </Menu.Item>
          <Menu.Item key={"feed"} className="is-menu-item">
            <Link to="/feed">Community Feed</Link>
          </Menu.Item>
          <Menu.Item key={"post"} className="is-menu-item menu-first">
            <Link to="/auth">Sign In / Sign Up</Link>
          </Menu.Item>
        </Menu>
      </Col>
    </Row>
  );
};

export default Home;
