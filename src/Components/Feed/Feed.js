import { gql, useQuery } from "@apollo/client";
import { Col, Row } from "antd";
import { GET_POSTS_QUERY } from "../../GraphQL/queries";
import Posts from "../Post/Posts";

const Feed = () => {
  const { loading, error, data } = useQuery(GET_POSTS_QUERY);

  if (loading) return <></>;
  if (error) return <></>;

  console.log(data);
  return (
    <Row>
      <Col className="is-flex-center stack-cols" span={24}>
        <Posts postList={data.posts} />
      </Col>
    </Row>
  );
};

export default Feed;
