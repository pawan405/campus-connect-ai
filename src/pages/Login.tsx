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
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { useAuth } from "../components/AuthProvider";
import { auth } from "../lib/firebase";

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

  export default function LoginPage() {
    const navigate = useNavigate();
    const { user, signInWithGoogle, configured, loading } = useAuth();

    // Automatically redirect if already logged in
    React.useEffect(() => {
      if (!loading && user) {
        navigate("/dashboard", { replace: true });
      }
    }, [user, loading, navigate]);

    const handleGoogleLogin = async () => {
      try {
        await signInWithGoogle();
        // The useEffect above will handle redirection once the user state updates
      } catch (error: any) {
        console.error("Sign in error:", error);
        // Alert common Firebase popup issues
        if (error.code === "auth/popup-blocked") {
          alert("Sign-in popup was blocked by your browser. Please allow popups for this site.");
        } else if (error.code === "auth/cancelled-popup-request") {
          // This happens if the user closes the popup or another one is opened
        } else {
          alert(`Sign-in error: ${error.message || "Unknown error"}`);
        }
      }
    };


  return (
    <div className="min-h-screen bg-transparent text-white flex items-center justify-center p-6 relative overflow-hidden selection:bg-blue-500/30">
      {/* Premium Background Atmosphere */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px]" />
      </div>

      <Link to="/" className="absolute top-8 left-8 z-20">
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
              className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-2xl shadow-blue-500/40 mb-8"
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
              {!configured && (
                <div className="text-xs text-amber-300 bg-amber-900/30 border border-amber-700 rounded-xl p-3 mb-4">
                  Firebase is not configured. Add VITE_FIREBASE_* keys to .env
                  and restart dev.
                </div>
              )}

              <motion.button
                onClick={handleGoogleLogin}
                whileHover={{ y: -5, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-4 bg-white text-black w-full py-5 px-6 rounded-2xl font-black shadow-2xl hover:bg-zinc-100 transition-all justify-center mb-10 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!configured}
              >
                <FcGoogle className="w-7 h-7" />
                Continue with Google
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
