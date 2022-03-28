import { gql, useQuery } from "@apollo/client";
import { Col, PageHeader, Row } from "antd";
import { GET_POSTS_QUERY } from "../../GraphQL/queries";
import Posts from "../Post/Posts";
import Banner from "../Profile/Banner";

const Feed = () => {
  const { loading, error, data } = useQuery(GET_POSTS_QUERY);

  if (loading) return <></>;
  if (error) return <></>;

  const colWidth =
    window.innerWidth < 768 ? { span: 24, offset: 0 } : { span: 8, offset: 2 };

  console.log({ data });
  return (
    <Row className="is-fullWidth">
      <FeedBanner
        text={"Yip Yap Global Feed!"}
        subText={
          "This page shows the most recent posts from all fellow Yip Yap users!"
        }
      />
      <Col className="is-flex-center stack-cols" span={24}>
        <Posts postList={data.posts} parent="feed" />
      </Col>
    </Row>
  );
};

export default Feed;

const FeedBanner = ({ text, subText }) => {
  return (
    <Row>
      <Col span={24}>
        <h2 className="has-spacer-padding-top">{text}</h2>
      </Col>
      <Col span={24}>
        <h2 className="has-spacer-padding-top">{subText}</h2>
      </Col>
    </Row>
  );
};
