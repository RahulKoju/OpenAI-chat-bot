import { createContext, ReactNode, useEffect, useState } from "react";
import {
  checkAuthStatus,
  logoutUser,
  signInUser,
  signUpUser,
} from "../helpers/api-communicator";

type User = {
  name: string;
  email: string;
};

type UserAuth = {
  isSignedIn: boolean;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>; // Add this line
  setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>; // Add this line
  signin: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<UserAuth | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const data = await checkAuthStatus();
        if (data) {
          setUser({ email: data.email, name: data.name });
          setIsSignedIn(true);
        } else {
          // User is not authenticated
          setUser(null);
          setIsSignedIn(false);
        }
      } catch (error) {
        // This will now only log for unexpected errors
        console.error("Error checking auth status:", error);
        setUser(null);
        setIsSignedIn(false);
      } finally {
        setIsLoading(false);
      }
    };

    verifyAuth();
  }, []);

  const signin = async (email: string, password: string): Promise<boolean> => {
    try {
      const data = await signInUser(email, password);
      if (data) {
        setUser({ email: data.email, name: data.name });
        setIsSignedIn(true);
        return true;
      }
    } catch (error) {
      console.error("Error signing in:", error);
    }
    return false;
  };

  const signup = async (
    name: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      const data = await signUpUser(name, email, password);
      if (data) {
        setUser(null);
        setIsSignedIn(false);
        return true;
      }
    } catch (error) {
      console.error("Error signing up:", error);
    }
    return false;
  };

  const logout = async () => {
    await logoutUser();
    setIsSignedIn(false);
    setUser(null);
    window.location.reload();
  };

  const value = {
    user,
    isSignedIn,
    setUser, // Pass setUser in the context value
    setIsSignedIn, // Pass setIsSignedIn in the context value
    signin,
    signup,
    logout,
  };
  if (isLoading) {
    return <div>Loading...</div>; // Or a loading spinner
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
