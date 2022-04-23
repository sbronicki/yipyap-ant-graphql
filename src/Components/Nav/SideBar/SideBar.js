import React from "react";
import { Layout, Menu, MenuProps, PageHeader } from "antd";
import { NavMenu } from "../../Home/Home";
import { useContext } from "react";
import { UserContext } from "../../../Context/UserContext";

const { Content, Sider } = Layout;

const SideBar = ({ showSideBar }) => {
  const { user } = useContext(UserContext);

  return (
    <Sider
      width={showSideBar ? 375 : 0}
      className={`sidebar ${
        showSideBar ? "sidebar-active" : "sidebar-inactive"
      }`}
    >
      <SideBarMessage username={user?.username} />
      <NavMenu classNames={"sidebar-menu"} />
    </Sider>
  );
};

export default SideBar;

const SideBarMessage = ({ username }) => {
  return (
    <PageHeader
      title={username ? `Hello, ${username}.` : "Welcome to Yip-Yap!"}
    />
  );
};
