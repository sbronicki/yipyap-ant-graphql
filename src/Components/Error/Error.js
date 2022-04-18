import { Col, Menu, Row, Card } from "antd";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";

import Logo from "../Logo/Logo";
import {
  HomeOutlined,
  RollbackOutlined,
  WarningOutlined,
} from "@ant-design/icons";

const Error = ({ error }) => {
  const { user, logout } = useContext(UserContext);

  const defaultErrorMessage = "There seems to have been an error!";

  console.log(error);
  return (
    <Row className="error error-is-auth">
      <Col style={{ padding: "1em" }} span={24}>
        <Logo />
      </Col>
      <Col className="has-spacer-padding-bottom" span={24}>
        <Card size="small" title="Error!">
          <h1>Uh Oh!</h1>
          <p>
            {typeof error === "string"
              ? error
              : error.message || defaultErrorMessage}
          </p>
          <Link to={"/"}>
            <HomeOutlined />
            {` Go Home `}
            <RollbackOutlined />
          </Link>
        </Card>
      </Col>
    </Row>
  );
};

export default Error;
