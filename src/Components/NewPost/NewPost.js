import { UploadOutlined } from "@ant-design/icons";
import { Button, Col, Input, Row, Upload } from "antd";

const { TextArea } = Input;

const NewPost = () => {
  const onInput = (e) => {
    console.log(e.target.value);
  };
  const onSave = () => {
    console.log("save");
  };
  const onClear = () => {
    console.log("clear");
  };

  return (
    <Row>
      <Col span={22} offset={1}>
        <Input
          placeholder="Post Title"
          maxLength={20}
          onChange={(e) => onInput(e)}
        />
        <TextArea
          size="large"
          placeholder="Post Body"
          maxLength={100}
          onChange={(e) => onInput(e)}
        />
      </Col>
      <Col className="spacer-padding" span={24}>
        <Row>
          <Col span={12}>
            <Upload maxCount={1}>
              <Button className="button" icon={<UploadOutlined />}>
                Upload
              </Button>
            </Upload>
          </Col>
          <Col span={12}>
            <Button className="bg-brand save-post-btn button" onClick={onSave}>
              Save
            </Button>
            <Button className="button" onClick={onClear} type="default">
              Clear
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default NewPost;
