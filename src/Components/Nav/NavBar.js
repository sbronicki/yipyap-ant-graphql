import { useState } from "react";

import { Avatar } from "antd";
import { Header } from "antd/lib/layout/layout";
import { MenuOutlined, UserOutlined } from "@ant-design/icons";

import Logo from "../Logo/Logo";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [toggleSideDrawer, setToggleSideDrawer] = useState(false);

  return (
    <Header className="navbar">
      <div className="nav-item-container">
        <MenuOutlined
          onClick={() => setToggleSideDrawer(!toggleSideDrawer)}
          style={{ fontSize: "2em" }}
        />
        <Logo />
        <Link to="/profile/">
          <Avatar
            style={{
              border: "2px solid #fff",
              backgroundColor: "transparent",
            }}
            icon={<UserOutlined />}
          />
        </Link>
      </div>
    </Header>
  );
};

export default NavBar;
