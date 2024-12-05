// src/contexts/AuthContext.tsx
import { createContext } from "react";
import { User } from "firebase/auth";
import { FirebaseError } from "firebase-admin";

// Define types for the context
interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ userId: string; token: string }> | Promise<{ userId: "", token: "", error: FirebaseError }>; // Modify the return type here
  logout: () => void; // Add the logout function
  signup: (email: string, password: string, username: string) => Promise<{ id: string; email: string, username: string } | undefined>; // Add the signup function
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
