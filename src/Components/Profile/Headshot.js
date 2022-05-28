import { Layout } from "antd";
import { useContext } from "react";
import { MobileContext } from "../../Context/MobileContext";

import LogoSrc from "../Logo/yip-yap-logo-png.png";

const { Content } = Layout;
const Headshot = ({ imageSrc }) => {
  const { isMobile } = useContext(MobileContext);
  return (
    <Layout
      className={`headshot ${
        isMobile ? "has-border-basic-bottom" : "has-border-basic"
      }`}
    >
      <Content>
        <img src={imageSrc || LogoSrc} />
      </Content>
    </Layout>
  );
};

export default Headshot;
