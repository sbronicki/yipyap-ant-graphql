import { Col, Comment, Layout, Row } from "antd";

const { Content } = Layout;

const Post = ({ postData }) => {
  const { title, body, postID, author, image } = postData;

  return (
    <Layout id={postID}>
      <Content>
        <Comment
          author={author}
          content={<PostBody title={title} body={body} />}
        />
      </Content>
    </Layout>
  );
};

export default Post;

const PostBody = ({ title, body }) => {
  return (
    <Row className="stack-cols">
      <Col>
        <p>{title}</p>
      </Col>
      <Col>
        <p>{body}</p>
      </Col>
    </Row>
  );
};
