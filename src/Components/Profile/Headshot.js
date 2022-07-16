import { Layout } from "antd";
import { useContext } from "react";
import { MobileContext } from "../../Context/MobileContext";

import Logo from "../Logo/yip-yap-logo-png.png";

const { Content } = Layout;
const Headshot = ({ src }) => {
  const { isMobile } = useContext(MobileContext);
  return (
    <Layout
      className={`headshot ${
        isMobile ? "has-border-basic-bottom" : "has-border-basic"
      }`}
    >
      <Content>
        <img src={src || Logo} alt="headshot" />
      </Content>
    </Layout>
  );
};

export default Headshot;
