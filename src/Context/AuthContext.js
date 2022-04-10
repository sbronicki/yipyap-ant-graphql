import React, { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const signup = (email, username, password) => {};
  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};
