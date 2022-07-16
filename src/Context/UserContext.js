import React, { createContext, useContext, useEffect, useState } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (data) => {
    const { token, username } = data;
    setUser(new User(data));

    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
  };

  const updateUser = (data) => {
    setUser(user.setPosts());
  };

  const logout = () => {
    setUser(null);

    localStorage.removeItem("token");
    localStorage.removeItem("username");
  };

  window.gl_user = user;

  return (
    <UserContext.Provider value={{ user, setUser, updateUser, logout, login }}>
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
}
