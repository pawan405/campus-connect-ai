"use client";

import React from "react";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import {
  Brain,
  Shield,
  CheckCircle2,
  Lock,
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { signInWithPopup, signInWithRedirect, getRedirectResult } from "firebase/auth";
import { auth, googleProvider, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

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
    transition={{ duration: 0.4, delay, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  // Handle redirect result on page load
  React.useEffect(() => {
    const handleRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          const user = result.user;

          // Check if user has a username set
          try {
            const userDocRef = doc(db, "users", user.uid);
            const userDoc = await getDoc(userDocRef);
            const hasUsername = userDoc.exists() && userDoc.data()?.username;

            // Store user data in localStorage
            localStorage.setItem('user', JSON.stringify({
              uid: user.uid,
              email: user.email,
              displayName: user.displayName,
              photoURL: user.photoURL,
              username: hasUsername ? userDoc.data()?.username : null,
            }));

            // Redirect based on whether username is set
            if (hasUsername) {
              router.push("/dashboard");
            } else {
              router.push("/username-setup");
            }
          } catch (error) {
            console.error("Error checking username:", error);
            // Fallback: assume no username and redirect to setup
            localStorage.setItem('user', JSON.stringify({
              uid: user.uid,
              email: user.email,
              displayName: user.displayName,
              photoURL: user.photoURL,
              username: null,
            }));
            router.push("/username-setup");
          }
        }
      } catch (error) {
        console.error("Redirect result error:", error);
      }
    };

    handleRedirectResult();
  }, [router]);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      // Try popup first, fallback to redirect if popup fails
      let result;
      try {
        result = await signInWithPopup(auth, googleProvider);
      } catch (popupError: any) {
        console.log("Popup blocked, trying redirect...", popupError);
        // If popup is blocked, use redirect method
        await signInWithRedirect(auth, googleProvider);
        return; // Exit early as redirect will reload the page
      }

      const user = result.user;

      // Check if user has a username set
      try {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        const hasUsername = userDoc.exists() && userDoc.data()?.username;

        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          username: hasUsername ? userDoc.data()?.username : null,
        }));

        // Redirect based on whether username is set
        if (hasUsername) {
          router.push("/dashboard");
        } else {
          router.push("/username-setup");
        }
      } catch (error) {
        console.error("Error checking username:", error);
        // Fallback: assume no username and redirect to setup
        localStorage.setItem('user', JSON.stringify({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          username: null,
        }));
        router.push("/username-setup");
      }
    } catch (error: any) {
      console.error("Google login failed:", error);
      setIsLoading(false);

      // Show user-friendly error messages
      if (error.code === 'auth/popup-blocked') {
        alert("Popup was blocked. Please allow popups for this site and try again.");
      } else if (error.code === 'auth/popup-closed-by-user') {
        alert("Sign-in was cancelled. Please try again.");
      } else {
        alert("Sign-in failed. Please check your connection and try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6 relative overflow-hidden selection:bg-blue-500/30">
      {/* Premium Background Atmosphere - Optimized */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/5 rounded-full blur-[80px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/5 rounded-full blur-[80px]" />
      </div>

      <Link href="/" className="absolute top-8 left-8 z-20">
        <Button
          variant="ghost"
          className="text-zinc-500 hover:text-white hover:bg-zinc-900 gap-2 font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Button>
      </Link>

      <div className="w-full max-w-md relative z-10">
        <FadeIn>
          <div className="flex flex-col items-center text-center mb-10">
            <motion.div
              whileHover={{ rotate: 12, scale: 1.1 }}
              className="w-20 h-20 rounded-2xl bg-linear-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-2xl shadow-blue-500/40 mb-8"
            >
              <Brain className="w-10 h-10 text-white" />
            </motion.div>
            <h1 className="text-4xl font-black text-white mb-3 tracking-tighter">
              Welcome Back
            </h1>
            <p className="text-zinc-500 font-medium text-lg">
              Your AI-powered campus companion
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="bg-zinc-900/50 backdrop-blur-2xl border border-zinc-800 p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
            {/* Subtle card glow */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl" />

            <div className="relative z-10 flex flex-col items-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] mb-8">
                <Sparkles className="w-3 h-3" />
                Secure Student Portal
              </div>

              <h2 className="text-xl font-bold text-white mb-8 tracking-tight text-center">
                Sign in to CampusConnect AI
              </h2>

              <motion.button
                onClick={handleGoogleLogin}
                disabled={isLoading}
                whileHover={{ y: -5, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-4 bg-white text-black w-full py-5 px-6 rounded-2xl font-black shadow-2xl hover:bg-zinc-100 transition-all justify-center mb-10 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="w-7 h-7 border-2 border-black border-t-transparent rounded-full animate-spin" />
                ) : (
                  <FcGoogle className="w-7 h-7" />
                )}
                {isLoading ? "Connecting..." : "Continue with Google"}
              </motion.button>

              <div className="flex flex-col gap-5 w-full">
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-zinc-800/50 border border-zinc-700/30">
                  <Shield className="w-5 h-5 text-blue-500" />
                  <span className="text-xs font-bold text-zinc-300 uppercase tracking-widest">
                    College-only ecosystem
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="flex items-center justify-center gap-1.5 text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" /> Safe
                  </div>
                  <div className="flex items-center justify-center gap-1.5 text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />{" "}
                    Verified
                  </div>
                  <div className="flex items-center justify-center gap-1.5 text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />{" "}
                    Secure
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="mt-12 text-center">
            <p className="text-zinc-600 text-[10px] font-black tracking-[0.3em] uppercase">
              Built for students.{" "}
              <span className="text-blue-500/50">Powered by AI.</span>
            </p>
          </div>
        </FadeIn>
      </div>

      {/* Aesthetic Floating Elements - Simplified */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="fixed -bottom-[10%] -left-[5%] w-[30%] aspect-square bg-blue-600/3 rounded-full blur-[60px] pointer-events-none"
      />
    </div>
  );
}



