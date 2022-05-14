import { Col, Menu, Row, Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import Logo from "../Logo/Logo";
import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import {
  CREATE_USER_MUTATION,
  LOGIN_USER_MUTATION,
} from "../../GraphQL/mutations";
import { useContext } from "react";
import { UserContext, User } from "../../Context/UserContext";
import Loading from "../Loading/Loading";
import Error from "../Error/Error";
import { useNavigate } from "react-router-dom";

const UserAuth = () => {
  const { user, setUser, login } = useContext(UserContext);
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(true);
  const [showWelcome, setShowWelcome] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const expandedClass = "is-expandable-expanded";
  const collapsedClass = "is-expandable-collapsed";

  const [createUser, { loading, error }] = useMutation(CREATE_USER_MUTATION);
  const [loginUser, { _loading, _error }] = useMutation(LOGIN_USER_MUTATION);

  useEffect(() => {
    if (user) navigate("/");
  }, [user]);

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
    if (isSignup) {
      createUser({
        variables: {
          email,
          username,
          password,
        },
      }).then((res) => {
        handleWelcome();
      });
    } else {
      loginUser({
        variables: {
          username,
          password,
        },
      }).then((res) => {
        login(new User(res.data.loginUser));
      });
    }
  };

  const handleWelcome = () => {
    // setTimeout to show welcome message then open signin form
    setShowWelcome(true);
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
            {isSignup && (loading || _loading) ? (
              <Loading />
            ) : showWelcome ? (
              <WelcomeNewUser />
            ) : (
              <>
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
              </>
            )}
          </Menu.Item>
          <Menu.Item
            key={"signin"}
            className={`is-menu-item is-expandable-item menu-last ${
              !isSignup ? expandedClass : collapsedClass
            }`}
            onClick={() => onChangeForm(false)}
          >
            {!isSignup && (loading || _loading) ? (
              <Loading />
            ) : (
              <>
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
              </>
            )}
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

const WelcomeNewUser = ({}) => {
  return <>WelcomeNewUser</>;
};
