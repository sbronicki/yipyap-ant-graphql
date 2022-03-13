import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/client";
import { Col, Comment, Row, Tooltip } from "antd";
import { DELETE_POST_MUTATION } from "../../GraphQL/mutations";

const Post = ({ postData, className }) => {
  const { title, content, id, image, user } = postData;

  const [deletePost, { loading, error }] = useMutation(DELETE_POST_MUTATION);

  const editPost = (postID) => {
    console.log(postID);
    console.log("edit post");
  };

  const onDelete = (id) => {
    console.log("delete post");
    console.log(id);
    deletePost({
      variables: {
        id,
      },
    }).then((res) => console.log(res));
  };

  if (loading) return <></>;
  if (error) return <></>;

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
              onDelete={onDelete}
              id={id}
            />
          }
        />
      </Col>
    </Row>
  );
};

export default Post;

const PostBody = ({ title, content, editPost, onDelete, id }) => {
  return (
    <Row className="stack-cols post-body text-align-left">
      <Col offset={2} span={20}>
        <Row>
          <Col span={22}>
            <p>{title}</p>
          </Col>
          <Col className="is-flex-center" span={2}>
            <PostActions id={id} editPost={editPost} onDelete={onDelete} />
          </Col>
        </Row>
      </Col>
      <Col offset={2} span={20}>
        <p>{content}</p>
      </Col>
    </Row>
  );
};

const PostActions = ({ id, editPost, onDelete }) => {
  return (
    <>
      <Tooltip>
        <span onClick={() => editPost(id)}>
          <EditOutlined className="has-spacer-padding" />
        </span>
      </Tooltip>
      <Tooltip>
        <span onClick={() => onDelete(id)}>
          <DeleteOutlined className="has-spacer-padding" />
        </span>
      </Tooltip>
    </>
  );
};
