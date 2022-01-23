import { Layout } from "antd";

import tempImg from "../Logo/yip-yap-logo-png.png";

const { Content } = Layout;
const Headshot = () => {
  return (
    <Layout className="headshot">
      <Content>
        <img src={tempImg} />
      </Content>
    </Layout>
  );
};

export default Headshot;
