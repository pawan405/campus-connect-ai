import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  Mic,
  Shield,
  Sparkles,
  ArrowRight,
  Brain,
  Rocket,
  Code,
  Lock,
  Target,
  Menu,
  Zap,
  Cpu,
  Loader2,
  Activity,
  RefreshCw,
  Globe,
  Server,
  Terminal,
  Trophy,
  BarChart3,
  LinkIcon,
  Database,
  Check,
  Clock,
  Workflow,
} from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../components/ui/sheet";
import { FcGoogle } from "react-icons/fc";
import ThreeDBackground from "../components/ThreeDBackground";

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
  href,
  badge,
  status,
  actionLabel = "Execute Module",
}: {
  icon: React.ElementType<any>;
  title: string;
  description: string;
  delay: number;
  badge?: string;
  href: string;
  status?: string;
  actionLabel?: string;
}) => (
  <FadeIn delay={delay}>
    <Link to={href} className="block h-full group">
      <div className="relative h-full bg-zinc-900/40 backdrop-blur-md border border-white/5 hover:border-blue-500/30 transition-all duration-300 rounded-xl overflow-hidden group-hover:bg-zinc-900/60 shadow-xl">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-lg bg-zinc-800/50 border border-white/5 flex items-center justify-center group-hover:scale-110 group-hover:border-blue-500/20 transition-all duration-300">
              <Icon className="w-5 h-5 text-blue-400 group-hover:text-blue-300 transition-colors" />
            </div>
            <div className="flex flex-col items-end gap-1">
              {badge && (
                <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 font-bold uppercase tracking-wider">
                  {badge}
                </span>
              )}
              {status && (
                <span className="text-[9px] font-mono text-zinc-600 uppercase">
                  {status}
                </span>
              )}
            </div>
          </div>
          <h3 className="text-lg font-bold text-white mb-2 tracking-tight group-hover:text-blue-400 transition-colors">
            {title}
          </h3>
          <p className="text-zinc-500 text-xs leading-relaxed mb-4 group-hover:text-zinc-400 transition-colors">
            {description}
          </p>
          <div className="flex items-center text-[10px] font-black uppercase tracking-widest text-zinc-600 group-hover:text-blue-500 transition-all">
            {actionLabel} <ArrowRight className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  </FadeIn>
);

export default function Home() {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("CORE SYSTEM");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    setMounted(true);
    const initialLogs = [
      "SYSTEM_INITIALIZE: 0x4f2a",
      "NEURAL_LINK: ESTABLISHED",
      "DATA_SYNC: COMPLETED",
      "READY: WAITING_FOR_COMMAND",
    ];
    setLogs(initialLogs);
  }, []);

  if (!mounted) return null;

  const addLog = (message: string) => {
    setLogs((prev) => [
      `[${new Date().toLocaleTimeString()}] ${message}`,
      ...prev.slice(0, 9),
    ]);
  };

  const handleRunAnalysis = () => {
    setIsAnalyzing(true);
    addLog("ANALYSIS_START: SCANNING_CORES...");
    setTimeout(() => {
      setIsAnalyzing(false);
      addLog("ANALYSIS_COMPLETE: STATUS_OPTIMAL");
    }, 2000);
  };

  const handleRefreshData = () => {
    setIsRefreshing(true);
    addLog("SYNC_START: FETCHING_REMOTE_ASSETS...");
    setTimeout(() => {
      setIsRefreshing(false);
      addLog("SYNC_COMPLETE: 124_MODULES_UPDATED");
    }, 1500);
  };

  const handleGoogleLogin = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500/30 font-sans overflow-x-hidden">
      <ThreeDBackground />

        {/* Control Bar (Navbar) */}
        <nav className="fixed top-0 z-50 w-full bg-black/40 backdrop-blur-md border-b border-white/5">
          <div className="max-w-[1600px] mx-auto px-6 h-16 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-500 p-px shadow-lg shadow-blue-500/10">
                <div className="w-full h-full rounded-[7px] bg-black flex items-center justify-center">
                  <Cpu className="w-4 h-4 text-blue-400" />
                </div>
              </div>
              <span className="text-lg font-black tracking-tighter uppercase group-hover:text-blue-400 transition-colors">
                CampusConnect<span className="text-blue-500">AI</span>
              </span>
            </Link>

              <div className="hidden md:flex items-center gap-1 px-1 py-1 rounded-xl bg-white/5 border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                {[
                  "CORE SYSTEM",
                  "CAPABILITIES",
                  "NETWORK",
                ].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`text-[10px] font-black uppercase tracking-widest px-5 py-2.5 rounded-lg transition-all ${
                      activeTab === tab 
                        ? "text-white bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.3)]" 
                        : "text-zinc-400 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

            <div className="flex items-center gap-4">
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-10 h-10 rounded-lg border border-white/10 bg-white/5 hover:bg-blue-500/20 hover:border-blue-500/30 transition-all shadow-[0_0_15px_rgba(59,130,246,0.1)] group relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Menu className="w-5 h-5 text-blue-400 group-hover:text-blue-300" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-72 bg-black/95 border-r border-white/10 backdrop-blur-2xl p-0">
                  <div className="h-full flex flex-col">
                    <SheetHeader className="p-8 border-b border-white/5 text-left">
                      <SheetTitle className="text-xl font-black text-white uppercase tracking-tighter">
                        CampusConnect<span className="text-blue-500">AI</span>
                      </SheetTitle>
                    </SheetHeader>
                      <div className="flex-1 overflow-y-auto p-4 space-y-2">
                        {[
                          { label: "CORE SYSTEM", active: activeTab === "CORE SYSTEM" },
                          { label: "CAPABILITIES", active: activeTab === "CAPABILITIES" },
                          { label: "NETWORK", active: activeTab === "NETWORK" },
                        ].map((item) => (
                          <button
                            key={item.label}
                            onClick={() => {
                              setActiveTab(item.label);
                            }}
                            className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all ${
                              item.active ? "bg-white/10 text-blue-400 border border-white/10" : "text-white/60 hover:bg-white/5 hover:text-white"
                            }`}
                          >
                            <span className="font-bold text-[11px] tracking-widest uppercase">{item.label}</span>
                          </button>
                        ))}
                        <div className="pt-4 mt-4 border-t border-white/5">
                          <Link to="/dashboard">
                            <button className="w-full flex items-center gap-4 p-4 rounded-xl transition-all text-cyan-400 hover:bg-cyan-500/10 border border-cyan-500/20">
                              <span className="font-bold text-[11px] tracking-widest uppercase">Go to Dashboard</span>
                            </button>
                          </Link>
                        </div>
                      </div>
                  </div>
                </SheetContent>
              </Sheet>

              <Button
                onClick={handleGoogleLogin}
                variant="outline"
                className="h-10 px-5 rounded-lg border-white/10 bg-white/5 text-white hover:bg-white hover:text-black font-bold text-[11px] uppercase tracking-wider transition-all active:scale-95"
              >
                <FcGoogle className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">System Access</span>
                <span className="sm:hidden">Login</span>
              </Button>
            </div>
          </div>
        </nav>

        <main className="relative z-10 pt-32 px-6 max-w-[1400px] mx-auto pb-24">
          <AnimatePresence mode="wait">
            {activeTab === "CORE SYSTEM" && (
              <motion.div
                key="core"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-12"
              >
                {/* System Header (Hero) */}
                <section className="relative">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    <div className="lg:col-span-8 space-y-8">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                        <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">System Status: Optimal</span>
                      </div>
                      <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] uppercase">
                        <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50">
                          Build Your <br /> Future with AI.
                        </span>
                      </h1>
                      <div className="flex flex-wrap gap-4 pt-4">
                        <Button 
                          onClick={handleRunAnalysis}
                          disabled={isAnalyzing}
                          className="h-14 px-8 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-[0.2em] text-[11px] transition-all hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] group"
                        >
                          {isAnalyzing ? <Loader2 className="w-4 h-4 animate-spin mr-3" /> : <Activity className="w-4 h-4 mr-3" />}
                          Re-run System Analysis
                        </Button>
                        <Button 
                          variant="outline"
                          onClick={handleRefreshData}
                          disabled={isRefreshing}
                          className="h-14 px-8 rounded-xl border-white/10 bg-white/5 text-white font-black uppercase tracking-[0.2em] text-[11px] transition-all hover:bg-white/10"
                        >
                          {isRefreshing ? <Loader2 className="w-4 h-4 animate-spin mr-3" /> : <RefreshCw className="w-4 h-4 mr-3" />}
                          Refresh Data
                        </Button>
                      </div>
                    </div>
                    
                    <div className="lg:col-span-4">
                      <div className="relative p-8 rounded-3xl bg-zinc-900/40 border border-white/5 backdrop-blur-xl">
                        <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-600/20 blur-2xl rounded-full" />
                        <div className="space-y-6">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Neural Load</span>
                            <span className="text-[10px] font-mono text-blue-400">84%</span>
                          </div>
                          <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: "84%" }}
                              transition={{ duration: 1.5, ease: "easeOut" }}
                              className="h-full bg-blue-500" 
                            />
                          </div>
                          <div className="space-y-4 pt-4">
                            {[
                              { icon: Shield, label: "Security Layer", status: "Active" },
                              { icon: Activity, label: "Network Sync", status: "Online" },
                              { icon: Globe, label: "Global Reach", status: "Enabled" },
                            ].map((item, i) => (
                              <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                                <div className="flex items-center gap-3">
                                  <item.icon className="w-3.5 h-3.5 text-zinc-600" />
                                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">{item.label}</span>
                                </div>
                                <span className="text-[9px] font-mono text-zinc-600 uppercase">{item.status}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* System Stats & Logs */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-8 rounded-3xl bg-zinc-900/40 border border-white/5 space-y-6">
                    <h3 className="text-sm font-black uppercase tracking-widest text-white flex items-center gap-3">
                      <Server className="w-4 h-4 text-blue-500" />
                      Active Modules
                    </h3>
                    <div className="grid grid-cols-1 gap-3">
                      {[
                        { name: "AI Engine", desc: "Neural processing core", status: "Operational" },
                        { name: "Profile System", desc: "User data management", status: "Online" },
                        { name: "Analytics", desc: "Performance tracking", status: "Idle" },
                      ].map((mod, i) => (
                        <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 group hover:border-blue-500/30 transition-all">
                          <div>
                            <p className="text-[11px] font-black uppercase tracking-tight text-white">{mod.name}</p>
                            <p className="text-[10px] text-zinc-500 uppercase">{mod.desc}</p>
                          </div>
                          <span className="text-[9px] font-mono text-blue-400 bg-blue-500/10 px-2 py-1 rounded uppercase tracking-tighter">{mod.status}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-8 rounded-3xl bg-zinc-900/40 border border-white/5 space-y-6">
                    <h3 className="text-sm font-black uppercase tracking-widest text-white flex items-center gap-3">
                      <Terminal className="w-4 h-4 text-blue-500" />
                      System Logs
                    </h3>
                    <div className="bg-black/40 rounded-xl p-4 font-mono text-[10px] space-y-2 h-[180px] overflow-y-auto border border-white/5">
                      {logs.map((log, i) => (
                        <div key={i} className="text-zinc-500">
                          <span className="text-blue-500/50 mr-2">{">"}</span>
                          {log}
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              </motion.div>
            )}

            {activeTab === "CAPABILITIES" && (
              <motion.div
                key="capabilities"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-12"
              >
                <div className="flex items-center gap-6">
                  <h2 className="text-3xl font-black tracking-tighter uppercase whitespace-nowrap">
                    AI Capabilities
                  </h2>
                  <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <FeatureCard
                    icon={Brain}
                    title="Career Analysis"
                    description="Click to enter your personalized career intelligence dashboard, where AI evaluates your progress, strengths, and growth trajectory."
                    delay={0.1}
                    badge="Active"
                    status="READY"
                    href="/ai-roadmap"
                    actionLabel="Open Module"
                  />
                  <FeatureCard
                    icon={Trophy}
                    title="Hackathon Matching"
                    description="Click to access the live hackathon intelligence feed, showing real-time opportunities matched to your profile."
                    delay={0.2}
                    badge="Active"
                    status="SYNCED"
                    href="/hackathons"
                    actionLabel="View Feed"
                  />
                  <FeatureCard
                    icon={Rocket}
                    title="Skill Roadmap"
                    description="Click to open your skill analysis workspace, where AI identifies gaps and recommends next steps."
                    delay={0.3}
                    badge="Ready"
                    status="OPTIMIZED"
                    href="/ai-roadmap"
                    actionLabel="Analyze Skills"
                  />
                  <FeatureCard
                    icon={Mic}
                    title="Silent Scream"
                    description="Click to access a secure, anonymous support interface designed for private reporting and assistance."
                    delay={0.4}
                    badge="Protected"
                    status="SECURE"
                    href="/silent-scream"
                    actionLabel="Access Tool"
                  />
                  <FeatureCard
                    icon={BarChart3}
                    title="System Analytics"
                    description="Click to view detailed performance analytics, including growth metrics and system insights."
                    delay={0.5}
                    badge="Pro"
                    status="ACTIVE"
                    href="/analytics"
                    actionLabel="Open Report"
                  />
                  <div className="bg-gradient-to-br from-blue-900/20 to-indigo-900/20 rounded-xl p-8 border border-blue-500/20 flex flex-col justify-between group overflow-hidden relative">
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500/10 blur-3xl rounded-full" />
                    <div className="relative z-10">
                      <Sparkles className="w-8 h-8 text-blue-400 mb-6 group-hover:scale-110 transition-transform" />
                      <h3 className="text-xl font-black uppercase tracking-tight text-white mb-2">New Module</h3>
                      <p className="text-zinc-500 text-xs font-medium leading-relaxed">
                        Click to explore upcoming intelligence engines currently under active system development.
                      </p>
                    </div>
                    <div className="relative z-10 mt-8">
                      <Button 
                        onClick={() => navigate("/internship-feed")}
                        className="w-full h-12 bg-white text-black font-black uppercase tracking-widest text-[10px] hover:bg-blue-500 hover:text-white transition-all"
                      >
                        Explore Engine
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "NETWORK" && (
              <motion.div
                key="network"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-12"
              >
                <div className="flex items-center gap-6">
                  <h2 className="text-3xl font-black tracking-tighter uppercase whitespace-nowrap">
                    Network Intelligence
                  </h2>
                  <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-8 rounded-3xl bg-zinc-900/40 border border-white/5 space-y-6">
                    <h3 className="text-sm font-black uppercase tracking-widest text-white flex items-center gap-3">
                      <LinkIcon className="w-4 h-4 text-blue-500" />
                      Connected Services
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/5">
                        <div className="flex items-center gap-4">
                          <FcGoogle className="w-6 h-6" />
                          <div>
                            <p className="text-sm font-black uppercase tracking-tight text-white">Google Account</p>
                            <p className="text-[10px] text-zinc-500 uppercase">Primary Authentication</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
                          <Check className="w-3 h-3 text-green-500" />
                          <span className="text-[9px] font-black text-green-500 uppercase tracking-widest">Connected</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/5">
                        <div className="flex items-center gap-4">
                          <Database className="w-6 h-6 text-orange-500" />
                          <div>
                            <p className="text-sm font-black uppercase tracking-tight text-white">Supabase DB</p>
                            <p className="text-[10px] text-zinc-500 uppercase">System Intelligence Core</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
                          <Check className="w-3 h-3 text-green-500" />
                          <span className="text-[9px] font-black text-green-500 uppercase tracking-widest">Connected</span>
                        </div>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      onClick={handleRefreshData}
                      disabled={isRefreshing}
                      className="w-full h-12 border-white/10 bg-white/5 text-white font-black uppercase tracking-widest text-[10px] hover:bg-white/10"
                    >
                      {isRefreshing ? <Loader2 className="w-4 h-4 animate-spin mr-3" /> : <RefreshCw className="w-4 h-4 mr-3" />}
                      Refresh Connections
                    </Button>
                  </div>

                  <div className="p-8 rounded-3xl bg-zinc-900/40 border border-white/5 space-y-6">
                    <h3 className="text-sm font-black uppercase tracking-widest text-white flex items-center gap-3">
                      <Activity className="w-4 h-4 text-blue-500" />
                      Network Stats
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-2">
                        <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Sync Status</p>
                        <p className="text-2xl font-black text-white">100%</p>
                        <div className="flex items-center gap-1.5">
                          <div className="w-1 h-1 rounded-full bg-green-500" />
                          <span className="text-[9px] font-mono text-zinc-600 uppercase">Synchronized</span>
                        </div>
                      </div>
                      <div className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-2">
                        <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Last Update</p>
                        <p className="text-2xl font-black text-white">2m ago</p>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3 h-3 text-zinc-600" />
                          <span className="text-[9px] font-mono text-zinc-600 uppercase">Auto-sync active</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-6 rounded-2xl bg-blue-500/5 border border-blue-500/10 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Workflow className="w-4 h-4 text-blue-500" />
                        <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">System Latency</span>
                      </div>
                      <span className="text-[11px] font-mono text-blue-400">12ms</span>
                    </div>
                    <Button 
                      className="w-full h-12 bg-white text-black font-black uppercase tracking-widest text-[10px] hover:bg-blue-500 hover:text-white transition-all"
                      onClick={() => navigate("/settings")}
                    >
                      View Integration Details
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>


      <footer className="py-20 border-t border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8 opacity-40">
          <div className="flex items-center gap-3">
            <Cpu className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">CampusConnect AI // v5.0.0</span>
          </div>
          <p className="text-[10px] font-medium uppercase tracking-widest">
            Neural Link Established // All Rights Reserved 2026
          </p>
        </div>
      </footer>
    </div>
  );
}
