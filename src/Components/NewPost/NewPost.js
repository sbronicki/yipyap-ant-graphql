import { UploadOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/client";
import { Button, Col, Input, Row, Upload } from "antd";
import { useState } from "react/cjs/react.development";
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import { CREATE_POST_MUTATION } from "../../GraphQL/mutations";
import Error from "../Error/Error";
import Loading from "../Loading/Loading";

const { TextArea } = Input;

const NewPost = () => {
  const { user } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const [createPost, { loading, error }] = useMutation(CREATE_POST_MUTATION, {
    context: {
      headers: {
        // "Content-Type": "application/json",
        Authorization: "Bearer " + user.auth.token,
      },
    },
  });

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;

  const onSave = (e) => {
    createPost({
      variables: {
        username: user.username,
        title,
        content,
        image,
      },
    }).then((res) => {
      console.log(res);
    });
    clear();
  };
  const clear = () => {
    setTitle("");
    setContent("");
    setImage("");
    // clear file list
  };
  return (
    <Row className="has-spacer-padding-top has-spacer-padding-bottom">
      <Col
        className="has-spacer-padding-top has-spacer-padding-bottom"
        span={22}
        offset={1}
      >
        <h2>New Post!</h2>
      </Col>
      <Col span={22} offset={1}>
        <Input
          placeholder="Post Title"
          maxLength={20}
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <TextArea
          size="large"
          placeholder="Post content"
          maxLength={100}
          onChange={(e) => setContent(e.target.value)}
          value={content}
        />
      </Col>
      <Col
        className="has-spacer-padding-top has-spacer-padding-bottom"
        span={24}
      >
        <Row>
          <Col span={12}>
            <Upload onChange={(e) => setImage(e)} maxCount={1}>
              <Button className="button" icon={<UploadOutlined />}>
                Upload Image
              </Button>
            </Upload>
          </Col>
          <Col span={12}>
            <Button className="bg-brand save-post-btn button" onClick={onSave}>
              Save
            </Button>
            <Button className="button" onClick={clear} type="default">
              Clear
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default NewPost;
