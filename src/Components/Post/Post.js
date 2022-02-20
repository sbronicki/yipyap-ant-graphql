import { Col, Comment, Row } from "antd";

const Post = ({ postData, className }) => {
  const { title, content, id, username, image } = postData;

  return (
    <Row className={`post-container ${className}`} id={id}>
      <Col offset={1} span={22}>
        <Comment
          author={username}
          content={<PostBody title={title} content={content} />}
        />
      </Col>
    </Row>
  );
};

export default Post;

const PostBody = ({ title, content }) => {
  return (
    <Row className="stack-cols post-body text-align-left">
      <Col offset={2} span={20}>
        <p>{title}</p>
      </Col>
      <Col offset={2} span={20}>
        <p>{content}</p>
      </Col>
    </Row>
  );
};
