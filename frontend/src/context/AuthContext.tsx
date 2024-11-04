"use client";
import { getUserApi, signinApi, signupApi } from "@/services/authService";
import { useRouter } from "next/navigation";
import { createContext, ReactNode, useContext, useReducer, Dispatch, useEffect } from "react";
import toast from "react-hot-toast";

// Define a more specific type for `user` if known
interface User {
  id: string;
  name: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface AuthAction {
  type: "loading" | "rejected" | "signin" | "signup" | "user/loaded";
  payload?: User | string | null;
}

interface AuthContextProps extends AuthState {
  dispatch: Dispatch<AuthAction>;
  signin: (values: Record<string, any>) => Promise<void>;
  signup: (values: Record<string, any>) => Promise<void>;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };
    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload as string,
      };
    case "signin":
    case "signup":
      return {
        ...state,
        user: action.payload as User,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case "user/loaded":
      return {
        ...state,
        user: action.payload as User,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    default:
      return state;
  }
};

export default function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [{ user, isAuthenticated, isLoading, error }, dispatch] = useReducer(authReducer, initialState);

  async function signin(values: Record<string, any>) {
    dispatch({ type: "loading" });

    try {
      const { user, message } = await signinApi(values);
      dispatch({ type: "signin", payload: user });
      toast.success(message);
      router.push("/profile");
    } catch (error: any) {
      const errorMsg = error?.response?.data?.message || "An error occurred";
      dispatch({ type: "rejected", payload: errorMsg });
      toast.error(errorMsg);
    }
  }

  async function signup(values: Record<string, any>) {
    dispatch({ type: "loading" });

    try {
      const { user, message } = await signupApi(values);
      dispatch({ type: "signup", payload: user });
      toast.success(message);
      router.push("/profile");
    } catch (error: any) {
      const errorMsg = error?.response?.data?.message || "An error occurred";
      dispatch({ type: "rejected", payload: errorMsg });
      toast.error(errorMsg);
    }
  }

  async function getUser() {
    dispatch({ type: "loading" });

    try {
      const { user } = await getUserApi();
      dispatch({ type: "user/loaded", payload: user });
    } catch (error: any) {
      const errorMsg = error?.response?.data?.message || "An error occurred";
      dispatch({ type: "rejected", payload: errorMsg });
      toast.error(errorMsg);
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, error, dispatch, signin, signup }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error("AuthContext not found");
  return context;
}
