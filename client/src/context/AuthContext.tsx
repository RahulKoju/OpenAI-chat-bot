import {
  createContext,
  ReactNode,
  useEffect,
  useState
} from "react";
import { checkAuthStatus, signInUser } from "../helpers/api-communicator";

type User = {
  name: string;
  email: string;
};

type UserAuth = {
  isSignedIn: boolean;
  user: User | null;
  signin: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<UserAuth | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    async function checkStatus() {
      try {
        const data = await checkAuthStatus();
        if (data) {
          setUser({ email: data.email, name: data.name });
          setIsSignedIn(true);
        }
      } catch (error) {
        console.error("Error checking auth status:", error);
      }
    }
    checkStatus();
  }, []);

  const signin = async (email: string, password: string) => {
    try {
      const data = await signInUser(email, password);
      if (data) {
        setUser({ email: data.email, name: data.name });
        setIsSignedIn(true);
      }
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    // Implement signup logic or remove this function until needed
    console.log("Signup not implemented");
  };

  const logout = async () => {
    // Implement logout logic or remove this function until needed
    console.log("Logout not implemented");
  };

  const value = {
    user,
    isSignedIn,
    signin,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
