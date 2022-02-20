import { gql, useQuery } from "@apollo/client";
import { Col, Descriptions, PageHeader, Row } from "antd";
import Posts from "../Post/Posts";
import Banner from "./Banner";
import Headshot from "./Headshot";

const Profile = ({ userID }) => {
  const getUserQuery = gql`
    {
      user(id: "6060f2bf516c070015695607") {
        id
        username
        email
        posts {
          id
          title
          content
          creator
          username
        }
      }
    }
  `;
  const { loading, error, data } = useQuery(getUserQuery);

  if (loading) return <></>;
  if (error) return <></>;

  const user = data.user;

  console.log(user);

  const created = "08/09/2022";
  const numPosts = user.posts.length;
  const colWidth =
    window.innerWidth < 768 ? { span: 24, offset: 0 } : { span: 8, offset: 2 };

  return (
    <Row className="has-spacer-padding">
      <Col
        className="is-overflow-hidden is-flex-center banner-container"
        span={24}
      >
        <Banner />
      </Col>
      <Col>
        <Row className="stack-cols-mobile">
          <Col
            className="has-spacer-padding-bottom"
            span={colWidth.span}
            offset={colWidth.offset}
          >
            <Headshot />
          </Col>
          <Col span={colWidth.span} offset={colWidth.offset}>
            <PageHeader title={user.username} subTitle="I'm the user!">
              <Descriptions column={1}>
                <Descriptions.Item label="Member Since">
                  {created}
                </Descriptions.Item>
                <Descriptions.Item label="Posts">{numPosts}</Descriptions.Item>
              </Descriptions>
            </PageHeader>
          </Col>
        </Row>
      </Col>
      <Col className="is-flex-center stack-cols" span={24}>
        <Posts postList={user.posts} />
      </Col>
    </Row>
  );
};

export default Profile;
