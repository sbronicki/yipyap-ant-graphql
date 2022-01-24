import { Layout } from "antd";

import tempImg from "../Logo/yip-yap-logo-png.png";

const { Content } = Layout;
const Headshot = () => {
  return (
    <Layout className="headshot has-border-basic">
      <Content>
        <img src={tempImg} />
      </Content>
    </Layout>
  );
};

export default Headshot;
