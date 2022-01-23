import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Layout } from "antd";
import "./App.css";

import FooterContent from "./Components/Footer/Footer";
import NavBar from "./Components/Nav/NavBar";
import Home from "./Components/Home/Home";

const { Content } = Layout;

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Layout>
          <NavBar />
          <Layout className="main-layout">
            <Content className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
              </Routes>
            </Content>
          </Layout>
          <FooterContent />
        </Layout>
      </div>
    </BrowserRouter>
  );
};

export default App;
