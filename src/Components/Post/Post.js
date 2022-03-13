import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Col, Comment, Row, Tooltip } from "antd";

const Post = ({ postData, className }) => {
  const { title, content, id, image, user } = postData;

  const editPost = (postID) => {
    console.log(postID);
    console.log("edit post");
  };

  const deletePost = (postID) => {
    console.log("delete post");
    console.log(postID);
  };

  return (
    <Row className={`post-container ${className}`} id={id} key={id}>
      <Col offset={1} span={22}>
        <Comment
          author={user.username}
          content={
            <PostBody
              title={title}
              content={content}
              editPost={editPost}
              deletePost={deletePost}
              id={id}
            />
          }
        />
      </Col>
    </Row>
  );
};

export default Post;

const PostBody = ({ title, content, editPost, deletePost, id }) => {
  return (
    <Row className="stack-cols post-body text-align-left">
      <Col offset={2} span={20}>
        <Row>
          <Col span={22}>
            <p>{title}</p>
          </Col>
          <Col className="is-flex-center" span={2}>
            <PostActions id={id} editPost={editPost} deletePost={deletePost} />
          </Col>
        </Row>
      </Col>
      <Col offset={2} span={20}>
        <p>{content}</p>
      </Col>
    </Row>
  );
};

const PostActions = ({ id, editPost, deletePost }) => {
  return (
    <>
      <Tooltip>
        <span onClick={() => editPost(id)}>
          <EditOutlined className="has-spacer-padding" />
        </span>
      </Tooltip>
      <Tooltip>
        <span onClick={() => deletePost(id)}>
          <DeleteOutlined className="has-spacer-padding" />
        </span>
      </Tooltip>
    </>
  );
};
