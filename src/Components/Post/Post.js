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
import Error from "../Error/Error";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import LoadingLogo from "../Loading/LoadingLogo";

const { TextArea } = Input;

const Post = ({ postData, className, deleteCB }) => {
  const { id, username, created } = postData;
  const [title, setTitle] = useState(postData.title);
  const [content, setContent] = useState(postData.content);
  const [image, setImage] = useState(postData.image);
  const [titleEdit, setTitleEdit] = useState(postData.title);
  const [contentEdit, setContentEdit] = useState(postData.content);
  const [imageEdit, setImageEdit] = useState(postData.image);

  const [editMode, setEditMode] = useState(false);

  const [deletePost, { loading, error }] = useMutation(DELETE_POST_MUTATION);
  const [updatePost, { loading: _loading, error: _error }] =
    useMutation(UPDATE_POST_MUTATION);

  const onEdit = () => {
    onDiscardEdit();
    setEditMode(!editMode);
  };

  const onDiscardEdit = () => {
    setTitleEdit(title);
    setContentEdit(content);
    setImageEdit(image);
  };

  const onUpdate = () => {
    updatePost({
      variables: {
        id,
        titleEdit,
        contentEdit,
        imageEdit,
      },
    }).then((res) => {
      debugger;
    });
  };

  const onDelete = () => {
    deletePost({
      variables: {
        id,
      },
      notifyOnNetworkStatusChange: true,
    }).then((res) => {
      deleteCB();
    });
  };

  if (loading || _loading) return <LoadingLogo />;
  if (error || _error) return <Error error={error} />;

  return (
    <Row className={`post-container ${className}`} id={id} key={id}>
      <Col offset={1} span={22}>
        <Comment
          datetime={created}
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
  editMode,
  onDiscardEdit,
  onEdit,
  onUpdate,
  onDelete,
}) => {
  return editMode ? (
    <>
      <Tooltip className="tool-tip-hover">
        <span onClick={onEdit}>
          <EditOutlined className="has-spacer-padding" />
        </span>
      </Tooltip>
      <Tooltip className="tool-tip-hover">
        <span onClick={onDiscardEdit}>
          <UndoOutlined className="has-spacer-padding" />
        </span>
      </Tooltip>
      <Tooltip className="tool-tip-hover">
        <span onClick={onUpdate}>
          <CheckOutlined className="has-spacer-padding" />
        </span>
      </Tooltip>
    </>
  ) : (
    <>
      <Tooltip className="tool-tip-hover">
        <span onClick={onEdit}>
          <EditOutlined className="has-spacer-padding" />
        </span>
      </Tooltip>
      <Tooltip className="tool-tip-hover">
        <span onClick={onDelete}>
          <DeleteOutlined className="has-spacer-padding" />
        </span>
      </Tooltip>
    </>
  );
};
