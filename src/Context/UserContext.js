import React, { createContext, useContext, useEffect, useState } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  window.gl_user = user;

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{ user: user, setUser: setUser, logout: logout }}
    >
      {children}
    </UserContext.Provider>
  );
};

export class User {
  constructor(data) {
    // this.userID = data.id;
    this.email = data.email;
    this.username = data.username;
    this.id = data.id;
    this.profileData = {
      banner: data.banner,
      image: data.image,
      bio: data.bio,
      createDate: data.createDate,
      username: data.username,
      posts: data.posts,
    };
    this.auth = {
      token: data.token,
    };
  }
}
