import React, { createContext, useState } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (data) => {
    const { token, username } = data;
    setUser(new User(data));

    localStorage.setItem("authToken", token);
    localStorage.setItem("username", username);
  };

  const updateCurrentUser = (data) => {
    setUser({ ...user, ...data });
  };

  const logout = () => {
    setUser(null);

    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
  };

  window.gl_user = user;

  return (
    <UserContext.Provider
      value={{ user, setUser, updateCurrentUser, logout, login }}
    >
      {children}
    </UserContext.Provider>
  );
};

export class User {
  constructor(data) {
    this.id = data.id;
    this.token = data.token;
    this.username = data.username;
    this.email = data.email;
    this.bio = data.bio;
    this.profileImg = data.profileImg;
    this.bannerImg = data.bannerImg;
    this.created = data.created;
  }
  posts = null;
}
