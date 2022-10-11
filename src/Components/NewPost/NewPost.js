import { UploadOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/client";
import { Button, Col, Input, Row, Upload } from "antd";
import { useState } from "react/cjs/react.development";
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import { CREATE_POST_MUTATION } from "../../GraphQL/mutations";
import Error from "../Error/Error";
import LoadingLogo from "../Loading/LoadingLogo";
import { getBase64 } from "../../utils/helperFuncs";

const { TextArea } = Input;

const NewPost = () => {
  const { user } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const [createPost, { loading, error }] = useMutation(CREATE_POST_MUTATION, {
    context: {
      headers: {
        Authorization: "Bearer " + user.token,
      },
    },
  });

  if (loading) return <LoadingLogo />;
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
      clear();
    });
  };

  const onChangeImg = (image) => {
    getBase64(image.file.originFileObj, (e) => {
      setImage(e);
    });
    debugger;
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
          maxLength={50}
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <TextArea
          className="border-top-none"
          size="large"
          placeholder="Post content"
          maxLength={1000}
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
            <Upload onChange={onChangeImg} maxCount={1}>
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
