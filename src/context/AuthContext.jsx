import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    try {
      const unsubscribe = onAuthStateChanged(
        auth,
        (currentUser) => {
          setUser(currentUser);
          setLoading(false);
          setAuthError(null);
        },
        (error) => {
          console.error("Auth Error:", error);
          setAuthError(error.message);
          setLoading(false);
        }
      );

      return () => unsubscribe();
    } catch (error) {
      console.error("Failed to initialize auth:", error);
      setAuthError(error.message);
      setLoading(false);
    }
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
      setAuthError(error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, authError, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
