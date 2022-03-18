import { Col, Menu, Row, Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import Logo from "../Logo/Logo";
import { useState, useLayoutEffect } from "react";

const UserAuth = () => {
  const [isSignup, setIsSignup] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const expandedClass = "is-expandable-expanded";
  const collapsedClass = "is-expandable-collapsed";

  const onChangeForm = (_isSignup) => {
    if (isSignup && _isSignup) {
      return;
    } else if (!isSignup && !_isSignup) {
      return;
    } else {
      setIsSignup(_isSignup);
      setUsername("");
      setEmail("");
      setPassword("");
    }
  };

  const onSignup = () => {
    console.log({ username }, { email }, { password });
  };

  return (
    <Row className="auth-page">
      <Col style={{ padding: "1em" }} span={24}>
        <Logo hasText />
      </Col>
      <Col span={18} offset={3}>
        <Menu className="is-menu-container" style={{ borderRadius: "10px" }}>
          <Menu.Item
            key={"signup"}
            className={`is-menu-item is-expandable-item menu-first ${
              isSignup ? expandedClass : collapsedClass
            }`}
            onClick={() => onChangeForm(true)}
          >
            Join Yip-Yap Today!
            <SigninSignup
              isSignup
              username={username}
              email={email}
              password={password}
              setUsername={setUsername}
              setEmail={setEmail}
              setPassword={setPassword}
              onFinish={onSignup}
            />
          </Menu.Item>
          <Menu.Item
            key={"signin"}
            className={`is-menu-item is-expandable-item menu-last ${
              !isSignup ? expandedClass : collapsedClass
            }`}
            onClick={() => onChangeForm(false)}
          >
            Already have an account? Sign in
            <SigninSignup
              username={username}
              email={email}
              password={password}
              setUsername={setUsername}
              setEmail={setEmail}
              setPassword={setPassword}
              onFinish={onSignup}
            />
          </Menu.Item>
        </Menu>
      </Col>
    </Row>
  );
};

export default UserAuth;

const SigninSignup = ({
  onFinish,
  isSignup,
  username,
  email,
  password,
  setUsername,
  setEmail,
  setPassword,
}) => {
  return (
    <Form
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        rules={[{ required: true, message: "Please input your Username!" }]}
      >
        <Input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
        />
      </Form.Item>
      {isSignup && (
        <Form.Item
          rules={[{ required: true, message: "Please input your Email!" }]}
        >
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
      )}
      <Form.Item
        rules={[{ required: true, message: "Please input your Password!" }]}
      >
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          {isSignup ? "Sign up" : "Sign in"}
        </Button>
      </Form.Item>
    </Form>
  );
};
