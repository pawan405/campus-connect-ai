"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Brain,
  Mic,
  Briefcase,
  TrendingUp,
  Bell,
  Search,
  Trophy,
  Rocket,
  ArrowRight,
  Activity,
  LogOut,
  User,
  Shield,
  Target,
  Menu,
  X,
  Sparkles,
  Zap,
  Globe,
  Cpu,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState, useEffect } from "react";
import ThreeDBackground from "@/components/ThreeDBackground";
import TiltCard from "@/components/TiltCard";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

const navItems = [
  { icon: Activity, label: "System Core", href: "/dashboard", active: true },
  { icon: Mic, label: "Silent Scream", href: "/silent-scream", badge: "Live" },
  { icon: Briefcase, label: "Internship Feed", href: "/internship-feed", badge: "Hot" },
  { icon: Brain, label: "AI Roadmap", href: "/ai-roadmap" },
  { icon: Trophy, label: "CrackHack", href: "/hackathons" },
];

const stats = [
  {
    label: "Active Reports",
    value: 3,
    icon: Shield,
    color: "cyan",
    desc: "+1 sync today",
    progress: 75,
    rgb: "6, 182, 212",
  },
  {
    label: "Career Progress",
    value: 84,
    suffix: "%",
    icon: TrendingUp,
    color: "purple",
    desc: "Level 4 reached",
    isCircular: true,
    rgb: "168, 85, 247",
  },
  {
    label: "Hackathons Joined",
    value: 12,
    icon: Trophy,
    color: "blue",
    desc: "3 upcoming events",
    rgb: "59, 130, 246",
  },
];

const features = [
  {
    title: "Silent Scream",
    desc: "Report issues anonymously with AI transcription. Your voice matters, safely.",
    icon: Mic,
    color: "cyan",
    href: "/silent-scream",
    accent: "#06b6d4",
  },
  {
    title: "AI Career Roadmap",
    desc: "Get your personalized career path in minutes. AI-driven success path.",
    icon: Brain,
    color: "purple",
    href: "/ai-roadmap",
    accent: "#a855f7",
  },
  {
    title: "CrackHack – Hub",
    desc: "Discover and track ongoing & upcoming hackathons. Join teams or create one.",
    icon: Rocket,
    color: "blue",
    href: "/hackathons",
    accent: "#3b82f6",
  },
  {
    title: "Internship Feed",
    desc: "Real-time updates on latest tech internships and student experiences.",
    icon: Briefcase,
    color: "emerald",
    href: "/internship-feed",
    accent: "#10b981",
  },
];

const activities = [
  { title: "Neuro-Report Synced", time: "12m ago", icon: Shield, color: "cyan", status: "online" },
  { title: "Career Path Updated", time: "4h ago", icon: Target, color: "purple", status: "syncing" },
  { title: "Hackathon Match Found", time: "1h ago", icon: Zap, color: "blue", status: "new" },
];

function CountUp({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;

    let totalMiliseconds = 2000;
    let incrementTime = (totalMiliseconds / end) > 10 ? (totalMiliseconds / end) : 10;

    let timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value]);

  return <span>{count}{suffix}</span>;
}

export default function DashboardPage() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [isLowPerformance, setIsLowPerformance] = useState(false);
  const [hackathonsModalOpen, setHackathonsModalOpen] = useState(false);
  const [notifications] = useState([
    { id: 1, title: "New Opportunities", message: "14 high-affinity opportunities found", time: "2m ago", read: false },
    { id: 2, title: "Career Update", message: "Your progress has increased by 5%", time: "1h ago", read: false },
    { id: 3, title: "Hackathon Reminder", message: "CYBERPUNK HACK 2077 starts in 2 days", time: "3h ago", read: true },
  ]);

  // Mock user interests (in real app, this would come from user profile)
  const userInterests = ["AI", "React", "Machine Learning", "Web Development"];

  // Participated hackathons
  const participatedHackathons = [
    { id: 1, name: "CYBERPUNK HACK 2077", date: "Jan 2024", status: "Completed", result: "Top 10", skills: ["AI", "React", "Blockchain"] },
    { id: 2, name: "NEURAL NETWORK JAM", date: "Feb 2024", status: "Completed", result: "Winner", skills: ["AI", "ML", "Python"] },
    { id: 3, name: "QUANTUM CODE CHALLENGE", date: "Mar 2024", status: "Completed", result: "Finalist", skills: ["Algorithms", "Quantum"] },
    { id: 4, name: "GALAXY BUILDER", date: "Apr 2024", status: "Completed", result: "Participated", skills: ["Data Visualization", "React"] },
    { id: 5, name: "AI INNOVATION SUMMIT", date: "May 2024", status: "Completed", result: "Top 5", skills: ["AI", "ML", "Deep Learning"] },
    { id: 6, name: "WEB WARRIORS", date: "Jun 2024", status: "Completed", result: "Winner", skills: ["React", "Node.js", "Full Stack"] },
    { id: 7, name: "BLOCKCHAIN BUILDER", date: "Jul 2024", status: "Completed", result: "Finalist", skills: ["Blockchain", "Smart Contracts"] },
    { id: 8, name: "DATA SCIENCE CHALLENGE", date: "Aug 2024", status: "Completed", result: "Top 10", skills: ["Data Science", "Python", "ML"] },
    { id: 9, name: "MOBILE APP MASTERS", date: "Sep 2024", status: "Completed", result: "Participated", skills: ["React Native", "Mobile"] },
    { id: 10, name: "CLOUD ARCHITECTS", date: "Oct 2024", status: "Completed", result: "Finalist", skills: ["Cloud", "DevOps", "AWS"] },
    { id: 11, name: "CYBER SECURITY HACK", date: "Nov 2024", status: "Completed", result: "Top 5", skills: ["Security", "Ethical Hacking"] },
    { id: 12, name: "FULL STACK FRENZY", date: "Dec 2024", status: "Completed", result: "Winner", skills: ["React", "Node.js", "MongoDB"] },
  ];

  // Recommended hackathons based on interests
  const recommendedHackathons = [
    { id: 101, name: "AI MASTERS LEAGUE", date: "Upcoming", status: "Upcoming", match: "95%", reason: "Perfect match for your AI/ML interests", skills: ["AI", "ML", "Deep Learning"], organizer: "AI Institute" },
    { id: 102, name: "REACT REVOLUTION", date: "Upcoming", status: "Upcoming", match: "90%", reason: "Matches your React expertise", skills: ["React", "Frontend", "Web Development"], organizer: "TechCorp" },
    { id: 103, name: "MACHINE LEARNING MARATHON", date: "Upcoming", status: "Upcoming", match: "88%", reason: "Based on your ML participation history", skills: ["ML", "Python", "Data Science"], organizer: "ML Academy" },
    { id: 104, name: "FULL STACK CHAMPIONSHIP", date: "Upcoming", status: "Upcoming", match: "85%", reason: "Combines your React + Backend skills", skills: ["React", "Node.js", "Full Stack"], organizer: "DevHub" },
    { id: 105, name: "AI FOR GOOD", date: "Upcoming", status: "Upcoming", match: "92%", reason: "AI focus aligns with your interests", skills: ["AI", "Ethics", "Social Impact"], organizer: "Tech for Good" },
  ];

  useEffect(() => {
    // Performance check - disable heavy animations on slower devices
    const checkPerformance = () => {
      const isSlowDevice = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2;
      const isSlowConnection = 'connection' in navigator && (navigator as any).connection?.effectiveType === 'slow-2g';
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      setIsLowPerformance(isSlowDevice || isSlowConnection || prefersReducedMotion);
    };

    checkPerformance();
    setMounted(true);

    // Get username from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const parsed = JSON.parse(userData);
        setUsername(parsed.username || parsed.displayName || 'User');
      } catch (error) {
        console.error('Error parsing user data:', error);
        setUsername('User');
      }
    }

    // Check authentication with Firebase
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-transparent text-white selection:bg-cyan-500/30 font-sans overflow-x-hidden">
      <ThreeDBackground />

      {/* Sidebar - Enhanced Glassmorphism */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-[280px] bg-black/40 backdrop-blur-3xl border-r border-white/5 transform transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-8 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div 
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.5 }}
              className="w-10 h-10 rounded-xl bg-linear-to-br from-cyan-400 to-purple-500 p-[1px] shadow-[0_0_20px_rgba(6,182,212,0.5)]"
            >
              <div className="w-full h-full rounded-[11px] bg-black flex items-center justify-center">
                <Cpu className="w-5 h-5 text-cyan-400" />
              </div>
            </motion.div>
            <span className="text-xl font-black tracking-tighter bg-clip-text text-transparent bg-linear-to-r from-white via-white to-white/40">
              CampusConnect
            </span>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-2 text-white/40 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="px-4 mt-8 space-y-2">
          {navItems.map((item, i) => (
            <Link key={i} href={item.href}>
              <motion.div
                whileHover={{ x: 10, backgroundColor: "rgba(255,255,255,0.12)" }}
                className={`flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all relative group ${item.active ? "bg-white/15 text-white shadow-[0_0_25px_rgba(6,182,212,0.2)] border border-white/20" : "text-white/60 hover:text-white"}`}
              >
                <div className="flex items-center gap-4">
                  <item.icon className={`w-5 h-5 transition-all duration-300 ${item.active ? "text-cyan-400 scale-110" : "group-hover:text-white"}`} />
                  <span className="font-bold text-sm tracking-wide">{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-cyan-500/20 text-cyan-400 border border-cyan-500/20 font-black animate-pulse">
                    {item.badge}
                  </span>
                )}
                {item.active && (
                  <motion.div 
                    layoutId="activeNav"
                    className="absolute left-0 w-1 h-6 bg-cyan-400 rounded-r-full"
                  />
                )}
              </motion.div>
            </Link>
          ))}
        </nav>


      </aside>

      {/* Main Content */}
      <div className="lg:pl-[280px] min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-40 px-8 py-6 bg-black/40 backdrop-blur-xl border-b border-white/5">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center gap-6">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 hover:bg-white/5 rounded-xl transition-colors">
                <Menu className="w-6 h-6 text-white/60" />
              </button>
              <div className="relative group hidden md:block">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-cyan-400 transition-colors" />
                <Input
                  placeholder="Query Neural Network..."
                  className="w-[300px] h-11 pl-12 bg-white/5 border-white/10 rounded-2xl text-sm focus:border-cyan-500/30 transition-all placeholder:text-white/20 focus:w-[400px] duration-300"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <DropdownMenu open={notificationsOpen} onOpenChange={setNotificationsOpen}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="w-11 h-11 rounded-2xl border border-white/5 hover:bg-white/5 relative group">
                    <Bell className="w-5 h-5 text-white/60 group-hover:text-cyan-400 transition-colors" />
                    <span className="absolute top-3 right-3 w-2 h-2 bg-cyan-500 rounded-full shadow-[0_0_10px_#06b6d4] animate-pulse" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80 bg-black/90 backdrop-blur-2xl border-white/10 rounded-3xl p-2 mt-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                  <div className="px-3 py-2 border-b border-white/10">
                    <h3 className="text-sm font-bold text-white">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notif) => (
                      <DropdownMenuItem
                        key={notif.id}
                        onClick={() => {
                          console.log("Notification clicked:", notif.title);
                          setNotificationsOpen(false);
                        }}
                        className="rounded-xl focus:bg-white/5 cursor-pointer p-3 gap-3 text-white hover:text-white border-b border-white/5 last:border-0"
                      >
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1">
                              <p className={`text-sm font-bold ${!notif.read ? 'text-white' : 'text-white/60'}`}>
                                {notif.title}
                              </p>
                              <p className="text-xs text-white/50 mt-1">{notif.message}</p>
                              <p className="text-[10px] text-white/30 mt-1">{notif.time}</p>
                            </div>
                            {!notif.read && (
                              <div className="w-2 h-2 bg-cyan-500 rounded-full mt-1" />
                            )}
                          </div>
                        </div>
                      </DropdownMenuItem>
                    ))}
                  </div>
                  {notifications.length === 0 && (
                    <div className="px-3 py-6 text-center text-white/50 text-sm">
                      No notifications
                    </div>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-3 p-1 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 transition-all hover:scale-105 duration-300">
                    <div className="w-8 h-8 rounded-xl overflow-hidden bg-linear-to-br from-cyan-500 to-purple-500 p-[1px]">
                      <div className="w-full h-full rounded-[11px] overflow-hidden bg-black">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sentinel" alt="avatar" />
                      </div>
                    </div>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-black/90 backdrop-blur-2xl border-white/10 rounded-3xl p-2 mt-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                  <DropdownMenuItem 
                    onClick={() => {
                      router.push("/settings");
                    }}
                    className="rounded-xl focus:bg-white/5 focus:text-cyan-400 cursor-pointer p-3 gap-3 text-white hover:text-white"
                  >
                    <User className="w-4 h-4 text-white" /> <span className="text-sm font-bold text-white">Profile Interface</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem 
                    onClick={async () => {
                      try {
                        await signOut(auth);
                        localStorage.removeItem('user');
                        router.push("/");
                      } catch (error) {
                        console.error("Logout failed:", error);
                        router.push("/");
                      }
                    }}
                    className="rounded-xl focus:bg-rose-500/20 focus:text-rose-400 cursor-pointer p-3 gap-3 text-white hover:text-white"
                  >
                    <LogOut className="w-4 h-4 text-white" /> <span className="text-sm font-bold text-white">Disconnect</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        <main className="p-8 lg:p-12 max-w-7xl mx-auto space-y-24">
          {/* Hero Section */}
          <section className="relative">
            <motion.div
              initial={isLowPerformance ? { opacity: 0 } : { opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: isLowPerformance ? 0 : 0 }}
              transition={{ duration: isLowPerformance ? 0.3 : 1, ease: [0.23, 1, 0.32, 1] }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 backdrop-blur-xl shadow-[0_0_30px_rgba(6,182,212,0.2)]">
                <Zap className="w-4 h-4 text-cyan-400 fill-cyan-400" />
                <span className="text-[10px] font-black text-cyan-400 tracking-[0.4em] uppercase">
                  A Living AI System // Active
                </span>
              </div>
              <h1 className="text-7xl lg:text-9xl font-black tracking-tighter leading-[0.85] mb-4">
                Evolve your <br />
                <span className="relative inline-block text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-purple-500 to-blue-600 animate-gradient-x">
                  destiny.
                  <motion.div 
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 1, duration: 1.5 }}
                    className="absolute -bottom-4 left-0 w-full h-2 bg-linear-to-r from-cyan-500/50 to-transparent rounded-full blur-sm"
                  />
                </span>
              </h1>
              {username && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="mb-6"
                >
                  <p className="text-cyan-400 text-lg lg:text-xl font-bold">
                    Welcome back, {username}! 👋
                  </p>
                </motion.div>
              )}
              <p className="text-white/80 text-xl lg:text-2xl max-w-2xl font-medium leading-relaxed">
                A high-performance AI ecosystem built to guide the next generation of innovators. 
                Your future, calculated in real-time.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Button 
                  onClick={() => {
                    router.push("/analytics");
                  }}
                  className="h-16 px-10 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-black font-black uppercase tracking-[0.2em] text-xs transition-all hover:shadow-[0_0_40px_#06b6d4] group overflow-hidden relative"
                >
                  <span className="relative z-10 flex items-center">
                    Analyze Matches <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-2 transition-transform duration-500" />
                  </span>
                  <motion.div 
                    className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                  />
                </Button>
                <Button 
                  onClick={() => {
                    // Navigate to network/connections page or show network modal
                    console.log("View Network clicked");
                    // You can add navigation here: router.push("/network")
                  }}
                  className="h-16 px-10 rounded-2xl bg-white/10 border border-white/20 hover:bg-white/20 text-white font-black uppercase tracking-[0.2em] text-xs transition-all backdrop-blur-md hover:border-white/40"
                >
                  View Network
                </Button>
              </div>
            </motion.div>
          </section>

          {/* Stats Grid */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  onClick={() => {
                    if (stat.label === "Hackathons Joined") {
                      setHackathonsModalOpen(true);
                    } else if (stat.label === "Career Progress") {
                      router.push("/career-progress");
                    }
                  }}
                  className="cursor-pointer"
                >
                  {isLowPerformance ? (
                  <div className="h-48 bg-black/60 backdrop-blur-3xl border border-white/20 rounded-[40px] p-8 flex flex-col justify-between relative overflow-hidden">
                    <div className="flex justify-between items-start">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center border border-white/20 bg-white/10 shadow-[inset_0_0_15px_rgba(255,255,255,0.05)] group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                      <stat.icon className="w-7 h-7" style={{ color: stat.rgb && `rgb(${stat.rgb})`, filter: `drop-shadow(0 0 12px rgb(${stat.rgb}))` }} />
                    </div>
                    {stat.isCircular && (
                      <div className="relative w-14 h-14 group-hover:rotate-12 transition-all duration-500">
                        <svg className="w-full h-full -rotate-90">
                          <circle cx="28" cy="28" r="24" stroke="rgba(255,255,255,0.1)" strokeWidth="4" fill="transparent" />
                          <circle
                            cx="28" cy="28" r="24" stroke="currentColor" strokeWidth="4" fill="transparent"
                            strokeDasharray={150.8}
                            strokeDashoffset={150.8 * (1 - 0.84)}
                            className="text-purple-400 drop-shadow-[0_0_15px_#a855f7]"
                          />
                          <span className="absolute inset-0 flex items-center justify-center text-xs font-black">84</span>
                        </svg>
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-5xl font-black tracking-tighter text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                      <CountUp value={stat.value} suffix={stat.suffix} />
                    </h3>
                    <p className="text-[10px] font-black text-white/50 uppercase tracking-[0.3em] mt-2 group-hover:text-white/80 transition-colors">
                      {stat.label}
                    </p>
                  </div>
                  </div>
                ) : (
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center border border-white/20 bg-white/10 shadow-[inset_0_0_15px_rgba(255,255,255,0.05)] group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                      <stat.icon className="w-7 h-7" style={{ color: stat.rgb && `rgb(${stat.rgb})`, filter: `drop-shadow(0 0 12px rgb(${stat.rgb}))` }} />
                    </div>
                    {stat.isCircular && (
                      <div className="relative w-14 h-14 group-hover:rotate-12 transition-all duration-500">
                        <svg className="w-full h-full -rotate-90">
                          <circle cx="28" cy="28" r="24" stroke="rgba(255,255,255,0.1)" strokeWidth="4" fill="transparent" />
                          <motion.circle
                            initial={{ strokeDashoffset: 150.8 }}
                            animate={{ strokeDashoffset: 150.8 * (1 - 0.84) }}
                            transition={{ duration: 2, delay: 1 }}
                            cx="28" cy="28" r="24" stroke="currentColor" strokeWidth="4" fill="transparent"
                            strokeDasharray={150.8}
                            className="text-purple-400 drop-shadow-[0_0_15px_#a855f7]"
                          />
                        </svg>
                        <span className="absolute inset-0 flex items-center justify-center text-xs font-black">84</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-5xl font-black tracking-tighter text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                      <CountUp value={stat.value} suffix={stat.suffix} />
                    </h3>
                    <p className="text-[10px] font-black text-white/50 uppercase tracking-[0.3em] mt-2 group-hover:text-white/80 transition-colors">
                      {stat.label}
                    </p>
                  </div>
                  </motion.div>
                ) : (
                  <Suspense fallback={<div className="h-48 bg-black/60 rounded-[40px]" />}>
                    <TiltCard className="h-48 group">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{
                          opacity: 1,
                          y: [0, -8, 0],
                        }}
                        transition={{
                          duration: 0.5,
                          delay: i * 0.2,
                          y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }
                        }}
                        style={{ willChange: "transform, opacity", backfaceVisibility: "hidden" }}
                        className="w-full h-full bg-black/60 backdrop-blur-3xl border border-white/20 rounded-[40px] p-8 flex flex-col justify-between relative overflow-hidden transition-all duration-500 group-hover:border-cyan-500/50 group-hover:bg-black/80 group-hover:shadow-[0_20px_80px_rgba(6,182,212,0.3)]"
                      >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-cyan-500/20 to-transparent blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                        <div className="flex justify-between items-start">
                          <div>
                            <motion.p
                              initial={{ scale: 0.8 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: i * 0.2 + 0.3, type: "spring", stiffness: 200 }}
                              className="text-4xl font-black text-white"
                            >
                              {stat.value}
                            </motion.p>
                            <p className="text-[10px] font-black text-white/50 uppercase tracking-[0.3em] mt-2 group-hover:text-white/80 transition-colors">
                              {stat.label}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    </TiltCard>
                  </Suspense>
                )}
              </div>
            ))}
          </section>

          {/* Hackathons Modal */}
          <AnimatePresence>
            {hackathonsModalOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
                style={{ 
                  pointerEvents: 'auto',
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  width: '100vw',
                  height: '100vh',
                }}
                onClick={(e) => {
                  if (e.target === e.currentTarget) setHackathonsModalOpen(false);
                }}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                  className="relative bg-[#0c0c12] border-2 border-blue-500/30 rounded-2xl p-8 max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
                >
                  <button
                    onClick={() => setHackathonsModalOpen(false)}
                    className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors z-10"
                  >
                    <X className="w-4 h-4 text-white/60" />
                  </button>

                  <div className="space-y-8">
                    {/* Header */}
                    <div>
                      <h3 className="text-3xl font-black text-white mb-2">Your Hackathon Journey</h3>
                      <p className="text-white/60 text-sm">You've participated in {participatedHackathons.length} hackathons</p>
                    </div>

                    {/* Participated Hackathons */}
                    <div>
                      <h4 className="text-xl font-black text-white mb-4 flex items-center gap-2">
                        <Trophy className="w-5 h-5 text-blue-400" />
                        Participated Hackathons ({participatedHackathons.length})
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[300px] overflow-y-auto pr-2">
                        {participatedHackathons.map((hack) => (
                          <div
                            key={hack.id}
                            className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/50 transition-all"
                          >
                            <div className="flex items-start justify-between mb-2">
                              <h5 className="text-sm font-black text-white flex-1">{hack.name}</h5>
                              <Badge className={`${
                                hack.result === "Winner" ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" :
                                hack.result === "Top 5" || hack.result === "Top 10" ? "bg-blue-500/20 text-blue-400 border-blue-500/30" :
                                hack.result === "Finalist" ? "bg-purple-500/20 text-purple-400 border-purple-500/30" :
                                "bg-white/10 text-white/60 border-white/20"
                              } text-[10px] ml-2`}>
                                {hack.result}
                              </Badge>
                            </div>
                            <p className="text-xs text-white/50 mb-2">{hack.date}</p>
                            <div className="flex flex-wrap gap-1">
                              {hack.skills.map((skill) => (
                                <Badge key={skill} variant="secondary" className="bg-white/5 text-white/60 border-none text-[9px]">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Recommended Hackathons */}
                    <div>
                      <h4 className="text-xl font-black text-white mb-4 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-purple-400" />
                        Recommended for You ({recommendedHackathons.length})
                      </h4>
                      <p className="text-sm text-white/60 mb-4">
                        Based on your interests: <span className="text-white font-bold">{userInterests.join(", ")}</span>
                      </p>
                      <div className="space-y-4">
                        {recommendedHackathons.map((hack) => (
                          <div
                            key={hack.id}
                            className="p-5 rounded-xl bg-linear-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 hover:border-purple-500/50 transition-all"
                          >
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <h5 className="text-lg font-black text-white">{hack.name}</h5>
                                  <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 text-[10px]">
                                    {hack.match} Match
                                  </Badge>
                                </div>
                                <p className="text-xs text-white/60 mb-2">{hack.organizer} • {hack.date}</p>
                                <p className="text-sm text-purple-300 mb-3">{hack.reason}</p>
                                <div className="flex flex-wrap gap-2">
                                  {hack.skills.map((skill) => (
                                    <Badge key={skill} variant="secondary" className="bg-white/10 text-white/80 border-white/20 text-[10px]">
                                      {skill}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <Button
                              onClick={() => {
                                router.push("/hackathons");
                                setHackathonsModalOpen(false);
                              }}
                              className="w-full bg-linear-to-r from-purple-500 to-blue-600 hover:from-purple-400 hover:to-blue-500 text-white font-bold"
                            >
                              View Details
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Feature Modules */}
          <section className="space-y-12">
            <div className="flex items-center gap-6">
              <h2 className="text-4xl font-black tracking-tighter uppercase">AI Modules</h2>
              <div className="flex-1 h-[2px] bg-linear-to-r from-white/30 via-white/10 to-transparent" />
              <div className="hidden sm:flex items-center gap-2">
                <Globe className="w-4 h-4 text-white/40" />
                <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Global Status: Online</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, i) => (
                <Link key={i} href={feature.href} className="group h-full">
                  <TiltCard className="h-full">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ 
                        opacity: 1, 
                        scale: 1,
                        y: [0, -12, 0]
                      }}
                      viewport={{ once: true }}
                      transition={{ 
                        delay: i * 0.1,
                        y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }
                      }}
                      style={{ willChange: "transform, opacity", backfaceVisibility: "hidden" }}
                      className="h-full bg-black/60 backdrop-blur-3xl border border-white/20 rounded-[48px] p-10 flex flex-col relative overflow-hidden transition-all duration-700 hover:bg-black/80 hover:border-white/40 hover:shadow-[0_30px_100px_rgba(0,0,0,0.6)]"
                    >
                      {/* Neon Highlight Top */}
                      <div 
                        className="absolute top-0 left-0 w-full h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ background: `linear-gradient(90deg, transparent, ${feature.accent}, transparent)` }}
                      />
                      
                      <div
                        className="w-20 h-20 rounded-4xl flex items-center justify-center mb-10 border border-white/20 bg-white/10 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-700 relative"
                      >
                        <div 
                          className="absolute inset-0 rounded-4xl opacity-30 blur-xl transition-all duration-500 group-hover:opacity-50"
                          style={{ backgroundColor: feature.accent }}
                        />
                        <feature.icon className="w-10 h-10 relative z-10 transition-all duration-500 group-hover:scale-110" style={{ color: feature.accent, filter: `drop-shadow(0 0 15px ${feature.accent})` }} />
                      </div>

                      <h3 className="text-3xl font-black tracking-tight mb-4 group-hover:translate-x-2 transition-transform duration-500 text-white">{feature.title}</h3>
                      <p className="text-white/60 text-sm leading-relaxed mb-10 font-medium group-hover:text-white/90 transition-colors">
                        {feature.desc}
                      </p>
                      
                      <div className="mt-auto flex items-center text-[10px] font-black text-white/50 uppercase tracking-[0.3em] group-hover:text-cyan-400 transition-all duration-500">
                        Access System <ArrowRight className="w-3 h-3 ml-3 group-hover:translate-x-3 transition-transform duration-500" />
                      </div>
                    </motion.div>
                  </TiltCard>
                </Link>
              ))}
            </div>
          </section>

          {/* Control Center & Activity */}
          <section className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="h-full bg-black/60 backdrop-blur-3xl border border-white/20 rounded-[56px] p-12 relative overflow-hidden group"
              >
                <div className="flex items-center justify-between mb-12">
                  <div className="space-y-1">
                    <h3 className="text-3xl font-black tracking-tight uppercase">System Log</h3>
                    <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em]">Real-time Event Stream</p>
                  </div>
                  <div className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/10 border border-white/20">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                    <span className="text-[10px] font-black text-white/80">LIVE FEED</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {activities.map((item, i) => (
                    <motion.div 
                      key={i} 
                      whileHover={{ x: 10, backgroundColor: "rgba(255,255,255,0.1)" }}
                      className="flex items-center gap-6 p-6 rounded-4xl bg-white/5 border border-white/10 group/item transition-all duration-300 hover:border-white/30"
                    >
                      <div className="w-14 h-14 rounded-2xl bg-black flex items-center justify-center border border-white/20 group-hover/item:border-cyan-500/50 transition-colors">
                        <item.icon className="w-6 h-6 text-white/60 group-hover/item:text-cyan-400 transition-colors" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <p className="font-black text-lg text-white/80 group-hover/item:text-white transition-colors">{item.title}</p>
                          {item.status === "new" && (
                            <span className="px-2 py-0.5 rounded-md bg-emerald-500/30 text-emerald-400 text-[8px] font-black border border-emerald-500/30">NEW</span>
                          )}
                        </div>
                        <p className="text-[10px] text-white/40 uppercase tracking-widest mt-1 font-black group-hover/item:text-white/60">{item.time} // {item.status}</p>
                      </div>
                      <div className="w-10 h-10 rounded-full flex items-center justify-center border border-white/10 group-hover/item:bg-white/20 transition-all">
                        <ArrowRight className="w-4 h-4 text-white/30 group-hover/item:text-white" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="h-full bg-linear-to-br from-cyan-900/60 via-purple-900/60 to-blue-900/60 backdrop-blur-3xl border border-white/30 rounded-[56px] p-12 flex flex-col justify-between group hover:border-white/60 transition-all duration-700 shadow-[0_40px_100px_rgba(6,182,212,0.3)]"
              >
                <div>
                  <div className="w-20 h-20 rounded-3xl bg-black/60 border border-white/20 flex items-center justify-center mb-12 group-hover:rotate-12 group-hover:scale-110 transition-all duration-700 relative">
                    <Brain className="w-10 h-10 text-cyan-400" />
                    <div className="absolute inset-0 bg-cyan-400/40 blur-2xl rounded-full" />
                  </div>
                  <h3 className="text-5xl font-black mb-6 tracking-tighter leading-[1] uppercase text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                    Neural <br />
                    Analysis <br />
                    Complete.
                  </h3>
                  <p className="text-white/90 text-lg font-medium leading-relaxed max-w-[280px]">
                    Your career vector has been updated with 14 new high-affinity opportunities.
                  </p>
                </div>
                <Button 
                  onClick={() => {
                    router.push("/analytics");
                  }}
                  className="mt-12 h-20 w-full rounded-4xl bg-linear-to-r from-cyan-500 to-purple-600 text-white font-black uppercase tracking-[0.3em] text-xs hover:scale-[1.02] transition-all duration-500 shadow-[0_20px_60px_rgba(6,182,212,0.4)] group border-none"
                >
                  Access Intelligence <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </Button>
              </motion.div>
            </div>
          </section>
        </main>

        <footer className="py-24 text-center">
          <motion.div 
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="flex flex-col items-center gap-6"
          >
            <div className="flex items-center gap-4">
              <div className="h-[1px] w-12 bg-white/10" />
              <Cpu className="w-5 h-5 text-white/20" />
              <div className="h-[1px] w-12 bg-white/10" />
            </div>
            <p className="text-[10px] font-black text-white/10 uppercase tracking-[1em]">
              CampusConnect AI // Neural Link Established // v5.0.0-PRO
            </p>
          </motion.div>
        </footer>
      </div>

      <style jsx global>{`
        @keyframes gradient-x {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 10s ease infinite;
        }
      `}</style>
    </div>
  );
}



