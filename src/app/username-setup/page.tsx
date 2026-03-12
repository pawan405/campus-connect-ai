"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, ArrowRight, Sparkles } from "lucide-react";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const FadeIn = ({
  children,
  delay = 0,
  y = 20,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
  >
    {children}
  </motion.div>
);

export default function UsernameSetupPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState<any>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push("/login");
        return;
      }
      setUser(currentUser);
      setCheckingAuth(false);
    });

    return () => unsubscribe();
  }, [router]);

  const isValidUsername = username.trim().length >= 3;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidUsername || !user) return;

    setIsLoading(true);
    setError("");

    try {
      // Save username to Firestore
      await setDoc(doc(db, "users", user.uid), {
        username: username.trim(),
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      // Update localStorage with username
      const userData = JSON.parse(localStorage.getItem('user') || '{}');
      userData.username = username.trim();
      localStorage.setItem('user', JSON.stringify(userData));

      // Redirect to dashboard
      router.push("/dashboard");
    } catch (error: any) {
      console.error("Error saving username:", error);
      setError("Failed to save username. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (checkingAuth || !user) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6 relative overflow-hidden selection:bg-blue-500/30">
      {/* Premium Background Atmosphere */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <FadeIn>
          <div className="flex flex-col items-center text-center mb-10">
            <motion.div
              whileHover={{ rotate: 12, scale: 1.1 }}
              className="w-20 h-20 rounded-2xl bg-linear-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-2xl shadow-blue-500/40 mb-8"
            >
              <User className="w-10 h-10 text-white" />
            </motion.div>
            <h1 className="text-4xl font-black text-white mb-3 tracking-tighter">
              Complete Your Profile
            </h1>
            <p className="text-zinc-500 font-medium text-lg">
              Choose a username to continue
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="bg-zinc-900/50 backdrop-blur-2xl border border-zinc-800 p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
            {/* Subtle card glow */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl" />

            <form onSubmit={handleSubmit} className="relative z-10 flex flex-col items-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] mb-8">
                <Sparkles className="w-3 h-3" />
                One-Time Setup
              </div>

              <div className="w-full mb-6">
                <label htmlFor="username" className="block text-sm font-bold text-zinc-300 mb-2">
                  Username
                </label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="w-full bg-zinc-800/50 border-zinc-700 text-white placeholder-zinc-500 focus:border-blue-500 focus:ring-blue-500"
                  disabled={isLoading}
                />
                <p className="text-xs text-zinc-500 mt-2">
                  Minimum 3 characters. This will be your display name.
                </p>
              </div>

              {error && (
                <div className="w-full mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  {error}
                </div>
              )}

              <motion.button
                type="submit"
                disabled={!isValidUsername || isLoading}
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-700 disabled:cursor-not-allowed text-white w-full py-4 px-6 rounded-2xl font-black shadow-2xl transition-all justify-center mb-6"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    Confirm & Continue
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </form>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="mt-8 text-center">
            <p className="text-zinc-600 text-xs font-medium">
              Welcome to CampusConnect AI! 🎓
            </p>
          </div>
        </FadeIn>
      </div>

      {/* Aesthetic Floating Elements */}
      <motion.div
        animate={{
          rotate: 360,
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="fixed -bottom-[10%] -left-[5%] w-[40%] aspect-square bg-blue-600/5 rounded-full blur-[120px] pointer-events-none"
      />
    </div>
  );
}