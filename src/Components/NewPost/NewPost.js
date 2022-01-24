import { UploadOutlined } from "@ant-design/icons";
import { clear } from "@testing-library/user-event/dist/clear";
import { Button, Col, Input, Row, Upload } from "antd";
import { useState } from "react/cjs/react.development";

const { TextArea } = Input;

const NewPost = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState({});

  const onSave = () => {
    const post = {
      title: title,
      body: body,
      image: image,
    };
    console.log(post);
    clear();
  };
  const clear = () => {
    setTitle("");
    setBody("");
    setImage({});
    // clear file list
  };
  console.log(title, body, image);
  return (
    <Row className="has-spacer-padding has-spacer-padding-below">
      <Col
        className="has-spacer-padding has-spacer-padding-below"
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
          placeholder="Post Body"
          maxLength={100}
          onChange={(e) => setBody(e.target.value)}
          value={body}
        />
      </Col>
      <Col className="has-spacer-padding" span={24}>
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
