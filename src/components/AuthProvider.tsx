import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOutUser: () => Promise<void>;
  configured: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const configured = !!auth;

  useEffect(() => {
    if (!auth) {
      // Firebase not configured; keep UI usable without auth
      setLoading(false);
      return;
    }
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const signInWithGoogle = async () => {
    if (!auth)
      throw new Error(
        "Firebase not configured. Please set VITE_FIREBASE_* env vars.",
      );
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const signOutUser = async () => {
    if (!auth) return;
    await signOut(auth);
  };

  const value = useMemo(
    () => ({ user, loading, signInWithGoogle, signOutUser, configured }),
    [user, loading, configured],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
