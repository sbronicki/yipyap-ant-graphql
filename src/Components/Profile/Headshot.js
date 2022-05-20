import { Layout } from "antd";
import { useContext } from "react";
import { MobileContext } from "../../Context/MobileContext";

import tempImg from "../Logo/yip-yap-logo-png.png";

const { Content } = Layout;
const Headshot = () => {
  const { isMobile } = useContext(MobileContext);
  return (
    <Layout
      className={`headshot ${
        isMobile ? "has-border-basic-bottom" : "has-border-basic"
      }`}
    >
      <Content>
        <img src={tempImg} />
      </Content>
    </Layout>
  );
};

export default Headshot;
