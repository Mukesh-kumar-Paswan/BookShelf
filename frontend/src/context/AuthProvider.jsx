import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currUser = await axios.get("/verify", {
          withCredentials: true,
        });
        // console.log(currUser.data.user.username);
        setUser(currUser.data.user.username);
        setIsLoggedIn(true);
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, isLoading , user , setUser}}>
      {children}
    </AuthContext.Provider>
  );
};
