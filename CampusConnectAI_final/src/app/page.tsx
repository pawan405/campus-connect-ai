"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Mic,
  Shield,
  Sparkles,
  ArrowRight,
  Brain,
  Rocket,
  Code,
  Lock,
  Zap,
  CheckCircle2,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FcGoogle } from "react-icons/fc";

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
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
  >
    {children}
  </motion.div>
);

const FeatureCard = ({
  icon: Icon,
  title,
  description,
  delay,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  delay: number;
}) => (
  <FadeIn delay={delay}>
    <Card className="group relative overflow-hidden bg-zinc-900/50 backdrop-blur-xl border-zinc-800/50 hover:border-blue-500/50 transition-all duration-500 cursor-pointer h-full border shadow-2xl">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <CardContent className="p-8 relative z-10">
        <div className="w-14 h-14 rounded-2xl bg-zinc-800 flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:scale-110 transition-all duration-300 shadow-xl">
          <Icon className="w-7 h-7 text-blue-400 group-hover:text-white transition-colors" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">
          {title}
        </h3>
        <p className="text-zinc-400 text-sm leading-relaxed mb-6">
          {description}
        </p>
        <div className="flex items-center text-blue-400 font-bold text-sm group-hover:gap-3 transition-all">
          Learn more <ArrowRight className="w-4 h-4 ml-2" />
        </div>
      </CardContent>
    </Card>
  </FadeIn>
);

export default function HomePage() {
  const router = useRouter();

  const handleGoogleLogin = () => {
    // Simulated Google Login - direct redirect
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500/30">
      {/* Premium Background Atmosphere */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px]" />
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-cyan-600/5 rounded-full blur-[100px]" />
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 z-50 w-full bg-black/50 backdrop-blur-xl border-b border-zinc-800/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:rotate-12 transition-transform">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tighter text-white">
              CampusConnect{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                AI
              </span>
            </span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/login">
              <Button
                variant="ghost"
                className="text-zinc-400 hover:text-white hover:bg-zinc-800/50 font-medium"
              >
                Login
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="relative pt-20">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 w-full py-20">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="relative z-10">
                <FadeIn delay={0.1}>
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-[0.2em] mb-8">
                    <Sparkles className="w-4 h-4" />
                    Revolutionizing Campus Life
                  </div>
                </FadeIn>

                <FadeIn delay={0.2}>
                  <h1 className="text-6xl lg:text-8xl font-black text-white leading-[1] mb-8 tracking-tighter">
                    Your Campus, <br />
                    <span className="bg-gradient-to-r from-blue-500 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                      Reimagined
                    </span>
                  </h1>
                </FadeIn>

                <FadeIn delay={0.3}>
                  <p className="text-xl text-zinc-400 mb-12 max-w-xl leading-relaxed font-medium">
                    AI-powered safety, peer learning, and career guidance — all
                    in one secure platform built for the next generation of
                    students.
                  </p>
                </FadeIn>

                <FadeIn delay={0.4}>
                  <div className="flex flex-col sm:flex-row gap-6">
                    <Link href="/login">
                      <Button
                        size="lg"
                        className="bg-blue-600 hover:bg-blue-500 text-white px-10 h-16 rounded-2xl text-lg font-bold shadow-2xl shadow-blue-500/20 group transition-all"
                      >
                        Get Started
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                    <Link href="/dashboard">
                      <Button
                        size="lg"
                        variant="outline"
                        className="h-16 px-10 rounded-2xl text-lg border-zinc-800 bg-transparent hover:bg-zinc-900 text-zinc-300 font-bold"
                      >
                        Explore Dashboard
                      </Button>
                    </Link>
                  </div>
                </FadeIn>

                <FadeIn delay={0.5}>
                  <div className="mt-12 flex items-center gap-4 text-zinc-500">
                    <div className="flex -space-x-3">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="w-10 h-10 rounded-full border-2 border-black bg-zinc-800 flex items-center justify-center"
                        >
                          <Users className="w-4 h-4" />
                        </div>
                      ))}
                    </div>
                    <p className="text-sm font-medium italic">
                      Joined by 2,000+ students this week
                    </p>
                  </div>
                </FadeIn>
              </div>

              <div className="relative hidden lg:block">
                <FadeIn delay={0.6} y={0}>
                  <div className="relative">
                    <motion.div
                      animate={{
                        y: [0, -20, 0],
                        rotateX: [0, 5, 0],
                        rotateY: [0, 5, 0],
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="relative z-10 w-full aspect-square max-w-[550px] mx-auto bg-zinc-900/40 rounded-[3rem] p-1 border border-zinc-800/50 shadow-2xl backdrop-blur-3xl overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 to-transparent" />

                      <div className="p-8 h-full flex flex-col justify-between">
                        <div className="flex items-center justify-between mb-8">
                          <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/20" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                            <div className="w-3 h-3 rounded-full bg-green-500/20" />
                          </div>
                          <div className="px-3 py-1 rounded-lg bg-zinc-800/50 text-[10px] text-zinc-500 font-mono">
                            campus-ai.v1.0
                          </div>
                        </div>

                        <div className="space-y-6">
                          <div className="space-y-3">
                            <div className="w-3/4 h-3 bg-zinc-800 rounded-full" />
                            <div className="w-1/2 h-3 bg-zinc-800/50 rounded-full" />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="aspect-video bg-zinc-800/30 rounded-2xl border border-zinc-800/50 flex items-center justify-center">
                              <Sparkles className="w-8 h-8 text-blue-500/20" />
                            </div>
                            <div className="aspect-video bg-zinc-800/30 rounded-2xl border border-zinc-800/50 flex items-center justify-center">
                              <Zap className="w-8 h-8 text-indigo-500/20" />
                            </div>
                          </div>

                          <div className="w-full h-24 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-2xl border border-blue-500/20" />
                        </div>

                        <div className="mt-8 flex justify-center">
                          <div className="w-12 h-1 bg-zinc-800 rounded-full" />
                        </div>
                      </div>
                    </motion.div>

                    {/* Floating Glows */}
                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-500/20 rounded-full blur-[100px] animate-pulse" />
                    <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-indigo-500/20 rounded-full blur-[100px] animate-pulse" />
                  </div>
                </FadeIn>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Section */}
        <section className="py-32 relative">
          <div className="max-w-7xl mx-auto px-6">
            <FadeIn>
              <div className="text-center mb-24">
                <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
                  Everything you need to{" "}
                  <span className="text-blue-500">thrive</span>
                </h2>
                <p className="text-zinc-500 max-w-2xl mx-auto text-xl font-medium">
                  Powerful AI tools designed to solve the real challenges
                  students face every day.
                </p>
              </div>
            </FadeIn>

            <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
              <FeatureCard
                icon={Mic}
                title="Silent Scream"
                description="Anonymous voice-based reporting. AI-powered transcription and summary while keeping your identity 100% secure."
                delay={0.1}
              />
              <FeatureCard
                icon={Rocket}
                title="AI Career Roadmap"
                description="Personalized career paths and skill gap analysis tailored specifically to your goals and interests."
                delay={0.2}
              />
              <FeatureCard
                icon={Code}
                title="CrackHack"
                description="The ultimate hub to discover top-tier hackathons, build elite teams, and showcase your engineering prowess."
                delay={0.3}
              />
            </div>
          </div>
        </section>

        {/* Trust & Quality Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="bg-zinc-900/30 backdrop-blur-3xl rounded-[3rem] border border-zinc-800/50 p-12 md:p-20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent" />
              <div className="grid md:grid-cols-3 gap-16 relative z-10">
                <FadeIn delay={0.1}>
                  <div className="flex flex-col items-center text-center gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-zinc-800 flex items-center justify-center border border-zinc-700/50 shadow-2xl">
                      <Lock className="w-8 h-8 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold text-white mb-2 tracking-tight">
                        College-only ecosystem
                      </h4>
                      <p className="text-zinc-500 font-medium">
                        Strict verification to ensure a safe, student-only
                        environment.
                      </p>
                    </div>
                  </div>
                </FadeIn>

                <FadeIn delay={0.2}>
                  <div className="flex flex-col items-center text-center gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-zinc-800 flex items-center justify-center border border-zinc-700/50 shadow-2xl">
                      <Zap className="w-8 h-8 text-indigo-400" />
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold text-white mb-2 tracking-tight">
                        Secure & AI-powered
                      </h4>
                      <p className="text-zinc-500 font-medium">
                        Cutting-edge models protecting your data and anonymity.
                      </p>
                    </div>
                  </div>
                </FadeIn>

                <FadeIn delay={0.3}>
                  <div className="flex flex-col items-center text-center gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-zinc-800 flex items-center justify-center border border-zinc-700/50 shadow-2xl">
                      <Shield className="w-8 h-8 text-cyan-400" />
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold text-white mb-2 tracking-tight">
                        Built for students
                      </h4>
                      <p className="text-zinc-500 font-medium">
                        Features developed by students, for students, with
                        privacy first.
                      </p>
                    </div>
                  </div>
                </FadeIn>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Login Section */}
        <section className="py-32 relative">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <FadeIn>
              <Card className="bg-gradient-to-b from-zinc-900 to-black text-white rounded-[3rem] overflow-hidden border border-zinc-800 shadow-2xl relative">
                <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-600/10 rounded-full blur-[100px]" />

                <CardContent className="p-12 md:p-24 relative z-10">
                  <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter">
                    Ready to get started?
                  </h2>
                  <p className="text-zinc-400 text-xl mb-12 max-w-xl mx-auto font-medium">
                    Join thousands of students and transform your campus
                    experience today.
                  </p>

                  <div className="flex flex-col items-center gap-8">
                    <motion.button
                      onClick={handleGoogleLogin}
                      whileHover={{ y: -5, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center gap-4 bg-white text-black px-12 py-5 rounded-2xl font-black text-lg shadow-2xl hover:bg-zinc-100 transition-all w-full max-w-sm justify-center"
                    >
                      <FcGoogle className="w-8 h-8" />
                      Continue with Google
                    </motion.button>

                    <div className="flex flex-wrap justify-center gap-8 text-zinc-500 text-xs font-bold tracking-[0.2em] uppercase">
                      <span className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-blue-500" /> Safe
                      </span>
                      <span className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-blue-500" />{" "}
                        Secure
                      </span>
                      <span className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-blue-500" />{" "}
                        Verified
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          </div>
        </section>
      </main>

      <footer className="py-16 border-t border-zinc-900 bg-black relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-zinc-900 flex items-center justify-center border border-zinc-800">
              <Brain className="w-6 h-6 text-blue-500" />
            </div>
            <span className="font-bold text-white text-xl tracking-tighter">
              CampusConnect AI
            </span>
          </div>
          <div className="flex items-center gap-8 text-zinc-500 text-sm font-medium">
            <Link href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Contact
            </Link>
          </div>
          <p className="text-zinc-600 text-sm">© 2025 CampusConnect AI.</p>
        </div>
      </footer>
    </div>
  );
}
