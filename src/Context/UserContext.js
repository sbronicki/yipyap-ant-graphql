import React, { createContext, useContext, useEffect, useState } from "react";

export const UserContext = createContext(null);

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user: user, setUser: setUser }}>
      {children}
    </UserContext.Provider>
  );
};

const User = (userObj) => {
  return {
    email: "",
    username: "",
    profileData: {
      banner: "",
      image: "",
      bio: "",
      memberDate: "",
      posts: [],
    },
    auth: {
      token: null,
    },
  };
};
