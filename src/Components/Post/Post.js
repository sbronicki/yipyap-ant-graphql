import {
  CheckOutlined,
  DeleteOutlined,
  EditOutlined,
  UndoOutlined,
} from "@ant-design/icons";
import { useMutation } from "@apollo/client";
import { Col, Comment, Input, Row, Tooltip } from "antd";
import {
  DELETE_POST_MUTATION,
  UPDATE_POST_MUTATION,
} from "../../GraphQL/mutations";
import { useState } from "react/cjs/react.development";

const { TextArea } = Input;

const Post = ({ postData, className }) => {
  const { id, user } = postData;
  const [title, setTitle] = useState(postData.title);
  const [content, setContent] = useState(postData.content);
  const [image, setImage] = useState(postData.image);

  const [editMode, setEditMode] = useState(false);

  const [deletePost, { loading, error }] = useMutation(DELETE_POST_MUTATION);
  const [updatePost] = useMutation(UPDATE_POST_MUTATION);

  const onEdit = () => {
    setEditMode(!editMode);
  };

  const onDiscardEdit = () => {
    console.log("need temps v tired comiitfnngfdn");
  };

  const onUpdate = (postID) => {
    console.log(postID);
    console.log("edit post");
    updatePost({
      variables: {
        id,
        title,
        content,
        image,
      },
    });
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
              setTitle={setTitle}
              content={content}
              setContent={setContent}
              onUpdate={onUpdate}
              editMode={editMode}
              onDiscardEdit={onDiscardEdit}
              onEdit={onEdit}
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

const PostBody = ({
  title,
  setTitle,
  content,
  setContent,
  editMode,
  onDiscardEdit,
  onEdit,
  onUpdate,
  onDelete,
  id,
}) => {
  return (
    <Row className="stack-cols post-body text-align-left">
      <Col offset={2} span={20}>
        <Row>
          <Col span={21}>
            {editMode ? (
              <Input
                maxLength={20}
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            ) : (
              <p>{title}</p>
            )}
          </Col>
          <Col className="is-flex-center" span={3}>
            <PostActions
              id={id}
              editMode={editMode}
              onDiscardEdit={onDiscardEdit}
              onEdit={onEdit}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          </Col>
        </Row>
      </Col>
      <Col offset={2} span={20}>
        {editMode ? (
          <TextArea
            size="large"
            maxLength={100}
            onChange={(e) => setContent(e.target.value)}
            value={content}
          />
        ) : (
          <p>{content}</p>
        )}
      </Col>
    </Row>
  );
};

const PostActions = ({
  id,
  editMode,
  onDiscardEdit,
  onEdit,
  onUpdate,
  onDelete,
}) => {
  return editMode ? (
    <>
      <Tooltip>
        <span onClick={onEdit}>
          <EditOutlined className="has-spacer-padding" />
        </span>
      </Tooltip>
      <Tooltip>
        <span onClick={onDiscardEdit}>
          <UndoOutlined className="has-spacer-padding" />
        </span>
      </Tooltip>
      <Tooltip>
        <span onClick={(e) => onDelete(id)}>
          <CheckOutlined className="has-spacer-padding" />
        </span>
      </Tooltip>
    </>
  ) : (
    <>
      <Tooltip>
        <span onClick={onEdit}>
          <EditOutlined className="has-spacer-padding" />
        </span>
      </Tooltip>
      <Tooltip>
        <span onClick={(e) => onDelete(id)}>
          <DeleteOutlined className="has-spacer-padding" />
        </span>
      </Tooltip>
    </>
  );
};
