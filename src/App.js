import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

import { Layout } from "antd";
import "./App.css";

import FooterContent from "./Components/Footer/Footer";
import NavBar from "./Components/Nav/NavBar";
import Home from "./Components/Home/Home";
import Profile from "./Components/Profile/Profile";
import Feed from "./Components/Feed/Feed";
import NewPost from "./Components/NewPost/NewPost";
import UserAuth from "./Components/UserAuth/UserAuth";
import { UserContext } from "./Context/UserContext";
import { useEffect } from "react";
import { useContext } from "react";

const { Content } = Layout;

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { user } = useContext(UserContext);

  useEffect(() => {
    const path = location.pathname.split("/")[1];
    if (!allowedRoutes.includes(path)) {
      if (user) {
        navigate("/");
      } else {
        navigate("/auth");
      }
    }
  }, [location, navigate, user]);

  return (
    <div className="App">
      <Layout>
        <NavBar />
        <Layout className="main-layout">
          <Content className="main-content is-flex-center has-border-basic">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profile/*" element={<Profile />} />
              <Route path="/feed" element={<Feed />} />
              <Route path="/new-post" element={<NewPost />} />
              <Route
                path="/auth"
                element={user ? <Navigate to="/" /> : <UserAuth />}
              />
              <Route path="/redirect" element={<Navigate to="/" />} />
            </Routes>
          </Content>
        </Layout>
        <FooterContent />
      </Layout>
    </div>
  );
};

export default App;

const allowedRoutes = ["", "profile", "feed", "new-post", "auth"];
