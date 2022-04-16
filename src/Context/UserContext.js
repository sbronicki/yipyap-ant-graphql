import React, { createContext, useContext, useEffect, useState } from "react";

export const UserContext = createContext(null);

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  console.log(user);

  return (
    <UserContext.Provider value={{ user: user, setUser: setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export class User {
  constructor(data) {
    // this.userID = data.id;
    this.email = data.email;
    this.username = data.username;
    this.profileData = {
      banner: "",
      image: "",
      bio: "",
      memberDate: "",
      posts: [],
    };
    this.auth = {
      token: null,
    };
  }
}
