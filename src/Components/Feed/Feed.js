import { gql, useQuery } from "@apollo/client";
import { Col, Row } from "antd";
import Posts from "../Post/Posts";

const Feed = () => {
  const getPostsQuery = gql`
    {
      posts {
        id
        title
        content
        creator
        username
      }
    }
  `;

  const { loading, error, data } = useQuery(getPostsQuery);

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
