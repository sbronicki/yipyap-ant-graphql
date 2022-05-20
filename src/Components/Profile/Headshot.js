import { Layout } from "antd";

import tempImg from "../Logo/yip-yap-logo-png.png";

const { Content } = Layout;
const Headshot = () => {
  const isMobile = window.innerWidth < 768;
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
