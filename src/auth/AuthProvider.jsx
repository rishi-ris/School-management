// AuthContext.js
import React, { createContext, useState } from 'react';

// Create context
export const AuthContext = createContext();

// Create provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // null when not logged in

  const login = (userData) => {
    setUser(userData); // Save user data
  };

  const logout = () => {
    setUser(null); // Clear user data
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
