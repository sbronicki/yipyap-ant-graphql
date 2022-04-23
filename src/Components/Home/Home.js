import { Col, Menu, Row } from "antd";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";

import Logo from "../Logo/Logo";

const Home = ({ hasLogo = true }) => {
  return (
    <Row className="home-page">
      <Col style={{ padding: "1em" }} span={24}>
        {hasLogo && <Logo hasText />}
      </Col>
      <Col span={18} offset={3}>
        <NavMenu />
      </Col>
    </Row>
  );
};

export default Home;

export const NavMenu = ({ classNames, styles, inSideBar = false }) => {
  const { user, logout } = useContext(UserContext);

  return (
    <Menu
      className={classNames || "is-menu-container"}
      style={styles || { borderRadius: "10px" }}
    >
      {user ? (
        <>
          {inSideBar && (
            <Menu.Item key={"home"} className="is-menu-item">
              <Link to="/">Home</Link>
            </Menu.Item>
          )}
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
            onClick={logout}
            className="is-menu-item menu-last"
          >
            Log Out
          </Menu.Item>
        </>
      ) : (
        <>
          <Menu.Item key={"profile"} className="is-menu-item menu-first">
            <Link to="/profile/yip-yap-team">Yip-Yap Team Profile</Link>
          </Menu.Item>
          <Menu.Item key={"feed"} className="is-menu-item">
            <Link to="/feed">Community Feed</Link>
          </Menu.Item>
          <Menu.Item key={"post"} className="is-menu-item menu-last">
            <Link to="/auth">Sign In / Sign Up</Link>
          </Menu.Item>
        </>
      )}
    </Menu>
  );
};
