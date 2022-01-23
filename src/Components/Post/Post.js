import { Col, Comment, Row } from "antd";

const Post = ({ postData, className }) => {
  const { title, body, postID, author, image } = postData;

  return (
    <Row className={`post-container ${className}`} id={postID}>
      <Col offset={1} span={22}>
        <Comment
          author={author}
          content={<PostBody title={title} body={body} />}
        />
      </Col>
    </Row>
  );
};

export default Post;

const PostBody = ({ title, body }) => {
  return (
    <Row className="stack-cols post-body text-align-left">
      <Col offset={2} span={20}>
        <p>{title}</p>
      </Col>
      <Col offset={2} span={20}>
        <p>{body}</p>
      </Col>
    </Row>
  );
};
