import { useState } from "react";

import { Avatar } from "antd";
import { Header } from "antd/lib/layout/layout";
import { MenuOutlined, UserOutlined } from "@ant-design/icons";

import Logo from "../Logo/Logo";
import { Link } from "react-router-dom";
import { useContext } from "react/cjs/react.development";
import { UserContext } from "../../Context/UserContext";
import { useEffect } from "react";

const NavBar = () => {
  const { user, setUser } = useContext(UserContext);
  const [toggleSideDrawer, setToggleSideDrawer] = useState(false);

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <Header className="navbar">
      <div className="nav-item-container">
        <MenuOutlined
          onClick={() => setToggleSideDrawer(!toggleSideDrawer)}
          style={{ fontSize: "2em" }}
        />
        <Logo size="small" />
        <Link to={`/profile/${user ? user.username : "yip-yap-team"}`}>
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
