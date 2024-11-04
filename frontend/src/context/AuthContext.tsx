"use client";
import { signinApi, signupApi } from "@/services/authService";
import { useRouter } from "next/navigation";
import { createContext, ReactNode, useContext, useReducer, Dispatch } from "react";
import toast from "react-hot-toast";

interface AuthState {
  user: any; // Define a specific type for `user` if possible
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface AuthAction {
  type: "loading" | "rejected" | "signin" | "signup";
  payload?: any; // Define specific types for `payload` if possible
}

interface AuthContextProps extends AuthState {
  dispatch: Dispatch<AuthAction>;
  signin: (values: any) => Promise<void>; // Replace `any` with the correct type for `values`
  signup: (values: any) => Promise<void>; // Replace `any` with the correct type for `values`
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
        error: action.payload,
      };
    case "signin":
    case "signup":
      return {
        ...state,
        user: action.payload,
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

  async function signin(values: any) { // Replace `any` with the specific type if known
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

  async function signup(values: any) { // Replace `any` with the specific type if known
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
