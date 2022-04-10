import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Layout } from "antd";
import "./App.css";

import FooterContent from "./Components/Footer/Footer";
import NavBar from "./Components/Nav/NavBar";
import Home from "./Components/Home/Home";
import Profile from "./Components/Profile/Profile";
import Feed from "./Components/Feed/Feed";
import NewPost from "./Components/NewPost/NewPost";
import UserAuth from "./Components/UserAuth/UserAuth";
import { UserProvider } from "./Context/UserContext";

const { Content } = Layout;

const App = () => {
  return (
    <BrowserRouter>
      <UserProvider>
        <div className="App">
          <Layout>
            <NavBar />
            <Layout className="main-layout">
              <Content className="main-content is-flex-center has-border-basic">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/profile/" element={<Profile />} />
                  <Route path="/feed" element={<Feed />} />
                  <Route path="/new-post" element={<NewPost />} />
                  <Route path="/auth" element={<UserAuth />} />
                </Routes>
              </Content>
            </Layout>
            <FooterContent />
          </Layout>
        </div>
      </UserProvider>
    </BrowserRouter>
  );
};

export default App;
