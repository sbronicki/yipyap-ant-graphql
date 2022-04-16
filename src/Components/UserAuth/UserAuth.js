import { Col, Menu, Row, Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import Logo from "../Logo/Logo";
import { useState, useLayoutEffect } from "react";
import { useMutation } from "@apollo/client";
import {
  CREATE_USER_MUTATION,
  LOGIN_USER_MUTATION,
} from "../../GraphQL/mutations";
import { useContext } from "react";
import { UserContext, User } from "../../Context/UserContext";
import Loading from "../Loading/Loading";
import Error from "../Error/Error";

const UserAuth = () => {
  const { user, setUser } = useContext(UserContext);
  const [isSignup, setIsSignup] = useState(true);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const expandedClass = "is-expandable-expanded";
  const collapsedClass = "is-expandable-collapsed";

  const [createUser, { loading, error }] = useMutation(CREATE_USER_MUTATION);
  const [loginUser, { _loading, _error }] = useMutation(LOGIN_USER_MUTATION);

  if (loading || _loading) return <Loading />;
  if (error || _error) return <Error error={error} />;

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

  const onSubmit = () => {
    console.log({ email });
    if (isSignup) {
      createUser({
        variables: {
          email,
          username,
          password,
        },
      }).then((res) => {
        // not really tho lol
        setUser(new User(res.data.createUser));
      });
    } else {
      loginUser({
        variables: {
          username,
          password,
        },
      }).then((res) => {
        setUser(new User(res.data.loginUser));
      });
    }
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
              onFinish={onSubmit}
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
              onFinish={onSubmit}
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
  console.log(email);
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
