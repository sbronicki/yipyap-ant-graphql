import React, { createContext, useContext, useEffect, useState } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState(null);
  const [username, setUsername] = useState(null);
  const [id, setId] = useState(null);
  const [banner, setBanner] = useState(null);
  const [image, setImage] = useState(null);
  const [bio, setBio] = useState(null);
  const [created, setCreated] = useState(null);
  const [posts, setPosts] = useState(null);
  const [user, setUser] = useState(null);
  window.gl_user = user;

  const login = (_user) => {
    const { email, id, token, username } = _user;

    setEmail(email);
    setId(id);
    setToken(token);
    setUsername(username);
    setUser(new User(_user));

    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
  };

  const logout = () => {
    setUser(null);
    setToken();
    setEmail();
    setUsername();
    setId();
    setBanner();
    setImage();
    setBio();
    setCreated();
    setPosts();
    setUser();
    localStorage.removeItem("token");
    localStorage.removeItem("username");
  };

  return (
    <UserContext.Provider
      value={{ user: user, setUser: setUser, logout: logout, login: login }}
    >
      {children}
    </UserContext.Provider>
  );
};

export class User {
  constructor(data) {
    // this.userID = data.id;
    this.token = data.token;
    this.email = data.email;
    this.username = data.username;
    this.id = data.id;
    this.banner = data.banner;
    this.image = data.image;
    this.bio = data.bio;
    this.createDate = data.createDate;
    this.posts = data.posts;
  }
}
