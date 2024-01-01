import React, { createContext, useContext, useEffect, useState } from "react";
import { IContextType, IUser } from "../validation/types";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../appwrite/api";
import GlobalSpinner from "../components/GlobalSpinner";

export const INITIAL_USER = {
  id: "",
  name: "",
  email: "",
};

const INITIAL_STATE = {
  user: INITIAL_USER,
  isLoading: false,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => false as boolean,
  isSidebarOpen: false,
  setIsSidebarOpen: () => {},
};

const AuthUser = createContext<IContextType>(INITIAL_STATE);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<IUser>(INITIAL_USER);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const checkAuthUser = async () => {
    setIsLoading(true);
    try {
      const currentAccount = await getCurrentUser();
      if (currentAccount) {
        setUser({
          id: currentAccount.$id,
          name: currentAccount.name,
          email: currentAccount.email,
        });

        setIsAuthenticated(true);
        return true;
      }
      setIsLoading(false);
      return false;
    } catch (error) {
      console.log(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (
      localStorage.getItem("cookieFallback") === null ||
      localStorage.getItem("cookieFallback") === "[]"
    ) {
      navigate("/sign-in");
    }
    checkAuthUser();
  }, []);

  const values = {
    user,
    isLoading,
    isAuthenticated,
    setUser,
    setIsAuthenticated,
    checkAuthUser,
    isSidebarOpen,
    setIsSidebarOpen,
  };

  return (
    <AuthUser.Provider value={values}>
      {isLoading ? <GlobalSpinner /> : children}
    </AuthUser.Provider>
  );
};

export const useAuthContext = () => useContext(AuthUser);
