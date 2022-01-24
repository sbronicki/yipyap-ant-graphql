import { Col, Descriptions, PageHeader, Row } from "antd";
import Posts from "../Post/Posts";
import Banner from "./Banner";
import Headshot from "./Headshot";

const Profile = () => {
  const created = "08/09/2022";
  const numPosts = "3";
  const colWidth =
    window.innerWidth < 768 ? { span: 24, offset: 0 } : { span: 8, offset: 2 };

  const dummyPosts = [
    {
      title: "post title",
      body: "POST BODY",
      postID: "id-123",
      author: "post author",
      image: "",
    },
    {
      title: "post title 2",
      body: "POST BODY 2",
      postID: "id-456",
      author: "post author 2",
      image: "",
    },
    {
      title: "post title 3",
      body: "POST BODY 3POST BODY 3POST BODY 3POST BODY 3POST BODY 3POST BODY 3POST BODY 3POST BODY 3POST BODY 3POST BODY 3POST BODY 3POST BODY 3POST BODY 3POST BODY 3POST BODY 3POST BODY 3POST BODY 3POST BODY 3POST BODY 3POST BODY 3POST BODY 3POST BODY 3",
      postID: "id-789",
      author: "post author 3",
      image: "",
    },
  ];

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
            <PageHeader title="USER'S Profile" subTitle="I'm the user!">
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
        <Posts postList={dummyPosts} />
      </Col>
    </Row>
  );
};

export default Profile;
