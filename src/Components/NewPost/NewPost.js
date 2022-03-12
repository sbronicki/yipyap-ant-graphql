import { UploadOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/client";
import { Button, Col, Input, Row, Upload } from "antd";
import { useState } from "react/cjs/react.development";
import { CREATE_POST_MUTATION } from "../../GraphQL/mutations";

const { TextArea } = Input;

const NewPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");

  const [createPost, { loading, error }] = useMutation(CREATE_POST_MUTATION);

  if (loading) return <></>;
  if (error) console.log(error);

  const onSave = (e) => {
    const userID = "622cd3001a05e78573bb1b1e";
    createPost({
      variables: {
        userID,
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
    <Row className="has-spacer-padding has-spacer-padding-bottom">
      <Col
        className="has-spacer-padding has-spacer-padding-bottom"
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
      <Col className="has-spacer-padding has-spacer-padding-bottom" span={24}>
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
