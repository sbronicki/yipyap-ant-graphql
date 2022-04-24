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
import Loading from "../Loading/Loading";
import Error from "../Error/Error";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";

const { TextArea } = Input;

const Post = ({ postData, className }) => {
  const { id, username } = postData;
  const [title, setTitle] = useState(postData.title);
  const [content, setContent] = useState(postData.content);
  const [image, setImage] = useState(postData.image);
  const [titleEdit, setTitleEdit] = useState(postData.title);
  const [contentEdit, setContentEdit] = useState(postData.content);
  const [imageEdit, setImageEdit] = useState(postData.image);

  const [editMode, setEditMode] = useState(false);

  const [deletePost, { loading, error }] = useMutation(DELETE_POST_MUTATION);
  const [updatePost] = useMutation(UPDATE_POST_MUTATION);

  const onEdit = () => {
    onDiscardEdit();
    setEditMode(!editMode);
  };

  const onDiscardEdit = () => {
    setTitleEdit(title);
    setContentEdit(content);
    setImageEdit(image);
  };

  const onUpdate = (postID) => {
    console.log(postID);
    console.log("edit post");
    updatePost({
      variables: {
        id,
        titleEdit,
        contentEdit,
        imageEdit,
      },
    });
  };

  const onDelete = (id) => {
    deletePost({
      variables: {
        id,
      },
    }).then((res) => console.log(res));
  };

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;

  return (
    <Row className={`post-container ${className}`} id={id} key={id}>
      <Col offset={1} span={22}>
        <Comment
          author={<Link to={`/profile/${username}`}>{username}</Link>}
          content={
            <PostBody
              title={title}
              titleEdit={titleEdit}
              setTitle={setTitle}
              setTitleEdit={setTitleEdit}
              content={content}
              contentEdit={contentEdit}
              setContent={setContent}
              setContentEdit={setContentEdit}
              onUpdate={onUpdate}
              editMode={editMode}
              onDiscardEdit={onDiscardEdit}
              onEdit={onEdit}
              onDelete={onDelete}
              id={id}
              username={username}
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
  content,
  titleEdit,
  setTitleEdit,
  contentEdit,
  setContentEdit,
  editMode,
  onDiscardEdit,
  onEdit,
  onUpdate,
  onDelete,
  id,
  username,
}) => {
  const { user } = useContext(UserContext);
  const showPostActions = user && user.username === username;

  return (
    <Row className="stack-cols post-body text-align-left">
      <Col offset={2} span={20}>
        <Row>
          <Col span={21}>
            {editMode ? (
              <Input
                maxLength={50}
                onChange={(e) => setTitleEdit(e.target.value)}
                value={titleEdit}
              />
            ) : (
              <p>{title}</p>
            )}
          </Col>
          {showPostActions && (
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
          )}
        </Row>
      </Col>
      <Col offset={2} span={20}>
        {editMode ? (
          <TextArea
            size="large"
            maxLength={100}
            onChange={(e) => setContentEdit(e.target.value)}
            value={contentEdit}
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
        <span onClick={(e) => onUpdate(id)}>
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
