import { LoadingOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";
import React from "react";
import Logo from "../Logo/Logo";

const LoadingLogo = () => {
  return (
    <Row className="error error-is-auth">
      <Col style={{ padding: "1em" }} span={24}>
        <Logo />
      </Col>
      <Col className="has-spacer-padding-bottom" span={24}>
        <LoadingOutlined style={{ fontSize: "32px", color: "#05fca9" }} />
      </Col>
    </Row>
  );
};

export default LoadingLogo;
