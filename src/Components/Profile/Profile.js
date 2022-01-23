import { Col, Descriptions, PageHeader, Row } from "antd";
import Banner from "./Banner";
import Headshot from "./Headshot";

const Profile = () => {
  const created = "08/09/2022";
  const numPosts = "3";
  return (
    <Row>
      <Col className="is-overflow-hidden is-flex-center" span={24}>
        <Banner />
      </Col>
      <Col span={12}>
        <PageHeader title="USER'S Profile" subTitle="I'm the user!">
          <Descriptions column={1}>
            <Descriptions.Item label="Member Since">
              {created}
            </Descriptions.Item>
            <Descriptions.Item label="Posts">{numPosts}</Descriptions.Item>
          </Descriptions>
        </PageHeader>
      </Col>
      <Col span={12}>
        <Headshot />
      </Col>
    </Row>
  );
};

export default Profile;
