import { Col, Row } from "antd";
import Posts from "../Post/Posts";

const Feed = () => {
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
    <Row>
      <Col className="is-flex-center stack-cols" span={24}>
        <Posts postList={dummyPosts} />
      </Col>
    </Row>
  );
};

export default Feed;
