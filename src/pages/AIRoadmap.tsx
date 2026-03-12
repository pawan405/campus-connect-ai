import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  Brain,
  ArrowLeft,
  Sparkles,
  Target,
  BookOpen,
  Code,
  Briefcase,
  Clock,
  CheckCircle,
  Lightbulb,
  Rocket,
  ShieldCheck,
  AlertTriangle,
  LayoutGrid,
  Star,
  MapPin,
  Wand2,
  Users,
  ChevronDown,
  ChevronRight,
  TrendingUp,
  Zap,
  Activity,
  AlertCircle,
  BarChart3,
  Radar,
  LineChart as LineChartIcon,
  CircleDot,
  ArrowUpRight,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { toast } from "sonner";
import { useAuth } from "../components/AuthProvider";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { CampusConnectChatbot } from "../components/CampusConnectChatbot";

export default function AIRoadmapPage() {
  const { user } = useAuth();
  const [isGenerating, setIsGenerating] = useState(false);
  const [roadmap, setRoadmap] = useState<any>(null);
  const roadmapRef = useRef(null); // Create a ref for the roadmap content

  // FIXED: Added missing state variables
  const [mounted, setMounted] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [discipline, setDiscipline] = useState("");
  const [intent, setIntent] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleExport = () => {
    if (roadmapRef.current) {
      toast.info("Exporting PDF...");
      html2canvas(roadmapRef.current, {
        scale: 2, // Higher scale for better quality
        useCORS: true,
        backgroundColor: "#08080c", // Match your background color
      }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "px",
          format: [canvas.width, canvas.height],
        });
        pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
        pdf.save("CampusConnect_AI_Roadmap.pdf");
        toast.success("PDF exported successfully!");
      });
    }
  };

  const generateRoadmap = async () => {
    setIsGenerating(true);
    setLoading(true); // Use setLoading
    toast.loading("Analyzing neural patterns...", { duration: 1500 });
    setTimeout(() => {
      setIsGenerated(true);
      setIsGenerating(false);
      setLoading(false); // Use setLoading
      toast.success("Neural Roadmap Generated", {
        description: "Your path to excellence has been calculated.",
      });
    }, 1500);
  };

  const handleAction = (action: string) => {
    toast.info(`Initializing: ${action}`, {
      description: "Redirecting to specialized training module...",
    });
  };

  const handleResolveConflict = () => {
    toast.promise(new Promise((resolve) => setTimeout(resolve, 2000)), {
      loading: "Recalibrating skill vectors...",
      success: "Conflict resolved. Neural paths normalized.",
      error: "Recalibration failed. Please retry.",
    });
  };

  if (!mounted) return null;

  const roadmapSteps = [
    {
      month: "Month 1",
      title: "Foundations & Logic",
      description:
        "Mastering core algorithms and data structures. Building the logic bridge.",
      skills: ["Data Structures", "Algorithms", "Clean Code"],
      projects: ["Logic Engine", "Base Module"],
      color: "cyan",
    },
    {
      month: "Month 2",
      title: "Core Architecture",
      description: "Deep dive into system design and framework integration.",
      skills: ["System Design", "Advanced React", "Next.js"],
      projects: ["Neural Dashboard", "Flow System"],
      color: "purple",
    },
    {
      month: "Month 3",
      title: "Deployment & Scale",
      description:
        "Learning cloud infrastructure and high-performance scaling.",
      skills: ["AWS/Vercel", "Docker", "Edge Functions"],
      projects: ["Global Core", "Scale Shield"],
      color: "emerald",
    },
  ];

  return (
    <div className="min-h-screen bg-[#050508] text-white selection:bg-cyan-500/30 relative overflow-hidden font-sans">
      {/* Cinematic Background Elements */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[40px_40px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        <div className="absolute top-0 left-0 w-full h-full bg-linear-to-b from-cyan-500/5 via-transparent to-transparent pointer-events-none" />
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full" />
        <div className="absolute top-1/2 -right-24 w-96 h-96 bg-purple-500/10 blur-[120px] rounded-full" />
      </div>

      <CampusConnectChatbot />

      {/* Navigation */}
      <nav className="relative z-50 border-b border-white/5 bg-black/20 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-cyan-500/10 group-hover:border-cyan-500/20 transition-all duration-500">
              <ArrowLeft className="w-5 h-5 text-white/40 group-hover:text-cyan-400" />
            </div>
            <span className="text-sm font-bold tracking-widest uppercase text-white/40 group-hover:text-white transition-colors">
              Terminal
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
              <span className="text-[10px] font-black text-cyan-400 tracking-[0.2em] uppercase">
                Neural Core v4.0
              </span>
            </div>
          </div>
        </div>
      </nav>

      <main className="relative pt-32 pb-20 px-8 max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="mb-20 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">
              Autonomous Pathfinding
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl lg:text-7xl font-black tracking-tighter"
          >
            AI Career <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-400 to-purple-500">
              Roadmap.
            </span>
          </motion.h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* LEFT: Form Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-4"
          >
            <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[32px] p-8 relative overflow-hidden group shadow-2xl">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

              <div className="space-y-8">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold tracking-tight flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
                      <Target className="w-4 h-4 text-cyan-400" />
                    </div>
                    Parameters
                  </h3>
                  <p className="text-sm text-white/40 leading-relaxed font-medium">
                    Configure your neural profile to generate a precision
                    roadmap.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black text-white/20 uppercase tracking-widest pl-1">
                      Target Year
                    </Label>
                    <Select>
                      <SelectTrigger className="h-14 bg-white/[0.02] border-white/5 rounded-2xl focus:ring-cyan-500/20 hover:bg-white/[0.04] transition-all">
                        <SelectValue placeholder="Current Stage" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-white/10 text-black">
                        <SelectItem
                          className="text-black focus:bg-gray-100 focus:text-black"
                          value="1"
                        >
                          1st Year
                        </SelectItem>
                        <SelectItem
                          className="text-black focus:bg-gray-100 focus:text-black"
                          value="2"
                        >
                          2nd Year
                        </SelectItem>
                        <SelectItem
                          className="text-black focus:bg-gray-100 focus:text-black"
                          value="3"
                        >
                          3rd Year
                        </SelectItem>
                        <SelectItem
                          className="text-black focus:bg-gray-100 focus:text-black"
                          value="4"
                        >
                          4th Year
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[10px] font-black text-white/20 uppercase tracking-widest pl-1">
                      Primary Discipline
                    </Label>
                    <Select value={discipline} onValueChange={setDiscipline}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a discipline..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ai-ml">AI & Machine Learning</SelectItem>
                        <SelectItem value="full-stack">Full-Stack Development</SelectItem>
                        <SelectItem value="cyber-security">Cyber Security</SelectItem>
                        <SelectItem value="data-science">Data Science</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[10px] font-black text-white/20 uppercase tracking-widest pl-1">
                      Core Intent
                    </Label>
                    <Select value={intent} onValueChange={setIntent}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an intent..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mastery">Mastery & Specialization</SelectItem>
                        <SelectItem value="job-readiness">Job Readiness</SelectItem>
                        <SelectItem value="innovation">Innovation & Research</SelectItem>
                        <SelectItem value="entrepreneurship">
                          Entrepreneurship
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    onClick={generateRoadmap} // FIXED: Changed to correct function name
                    disabled={loading}
                    className="w-full h-16 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-black font-black text-xs tracking-[0.3em] uppercase transition-all shadow-[0_20px_40px_rgba(6,182,212,0.3)] hover:shadow-cyan-400/50 group relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    {loading ? (
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                        Analyzing...
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <Zap className="w-4 h-4 fill-current" />
                        Initiate Sequence
                      </div>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Roadmap Output */}
          <div className="lg:col-span-8 relative">
            <AnimatePresence mode="wait">
              {!isGenerated && !loading ? (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full min-h-[500px] flex flex-col items-center justify-center text-center space-y-6 border-2 border-dashed border-white/5 rounded-[40px] bg-white/[0.01]"
                >
                  <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center animate-pulse">
                    <Brain className="w-10 h-10 text-white/20" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-xl font-bold text-white/40 tracking-tight">
                      System Idle
                    </p>
                    <p className="text-sm text-white/20">
                      Waiting for parameter sync...
                    </p>
                  </div>
                </motion.div>
              ) : isGenerated ? (
                <motion.div
                  key="roadmap"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-12"
                  ref={roadmapRef} // Attach ref to the roadmap content
                >
                  {/* Timeline Header */}
                  <div className="flex items-center justify-between px-4">
                    <h3 className="text-2xl font-black tracking-tight flex items-center gap-4">
                      <MapPin className="w-6 h-6 text-cyan-400" />
                      Active Trajectory
                    </h3>
                    <div className="flex items-center gap-4">
                      <Badge className="bg-cyan-500/10 text-cyan-400 border-cyan-500/20 px-4 py-1.5 text-[9px] font-black tracking-widest uppercase">
                        3 Stages Locked
                      </Badge>
                    </div>
                  </div>

                  {/* Vertical Roadmap */}
                  <div className="relative pl-12 space-y-12">
                    <div className="absolute left-[23px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-cyan-500 via-purple-500 to-transparent shadow-[0_0_15px_rgba(6,182,212,0.5)]" />
                    {roadmapSteps.map((step, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.2 }}
                        className="relative"
                      >
                        <div className="absolute -left-[54px] top-0 w-11 h-11 flex items-center justify-center">
                          <div
                            className={`w-4 h-4 rounded-full bg-[#050508] border-2 z-10 relative ${
                              step.color === "cyan"
                                ? "border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.5)]"
                                : step.color === "purple"
                                  ? "border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.5)]"
                                  : "border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.5)]"
                            }`}
                          >
                            <motion.div
                              animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.5, 1, 0.5],
                              }}
                              transition={{
                                repeat: Infinity,
                                duration: 2,
                              }}
                              className={`absolute inset-0 rounded-full ${
                                step.color === "cyan"
                                  ? "bg-cyan-400/50"
                                  : step.color === "purple"
                                    ? "bg-purple-400/50"
                                    : "bg-emerald-400/50"
                              }`}
                            />
                          </div>
                        </div>
                        <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[32px] p-8 hover:bg-white/[0.05] transition-all duration-500 group relative overflow-hidden">
                          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 relative z-10">
                            <div className="space-y-4 flex-1">
                              <div className="flex items-center gap-4">
                                <span
                                  className={`text-[10px] font-black uppercase tracking-widest text-${step.color === "cyan" ? "cyan" : step.color === "purple" ? "purple" : "emerald"}-400`}
                                >
                                  {step.month}
                                </span>
                                <h4 className="text-xl font-black tracking-tight">
                                  {step.title}
                                </h4>
                              </div>
                              <p className="text-sm text-white/40 leading-relaxed font-medium">
                                {step.description}
                              </p>
                              <div className="flex flex-wrap gap-2 mt-4">
                                {step.skills.map((skill, si) => (
                                  <span
                                    key={si}
                                    className="text-[10px] font-bold px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/40"
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div className="md:w-48 space-y-4">
                              <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.3em]">
                                Project Milestones
                              </p>
                              <div className="space-y-2">
                                {step.projects.map((proj, pi) => (
                                  <div
                                    key={pi}
                                    className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 group-hover:border-white/10 transition-all"
                                  >
                                    <div
                                      className={`w-1.5 h-1.5 rounded-full bg-${step.color === "cyan" ? "cyan" : step.color === "purple" ? "purple" : "emerald"}-500`}
                                    />
                                    <span className="text-[11px] font-bold text-white/60">
                                      {proj}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>

        {/* SECTION: Career Risk & Gap Analyzer */}
        <AnimatePresence>
          {isGenerated && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-32 space-y-12"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
                  <AlertCircle className="w-6 h-6 text-orange-400" />
                </div>
                <div>
                  <h3 className="text-3xl font-black tracking-tighter">
                    Gap Analysis
                  </h3>
                  <p className="text-sm text-white/40 font-medium">
                    Identifying vulnerabilities in your neural career path.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Strengths",
                    items: ["Analytical Thinking", "Base Tech Stack", "Logic"],
                    icon: ShieldCheck,
                    color: "emerald",
                  },
                  {
                    title: "Neural Risks",
                    items: [
                      "Market Saturation",
                      "Legacy Tech Bind",
                      "Soft Skills",
                    ],
                    icon: AlertTriangle,
                    color: "rose",
                  },
                  {
                    title: "Skill Gaps",
                    items: [
                      "System Architecture",
                      "Edge Deployment",
                      "Security",
                    ],
                    icon: Target,
                    color: "orange",
                  },
                  {
                    title: "Direct Actions",
                    items: [
                      "Forge 2 Projects",
                      "Link with Mentors",
                      "Cert Sync",
                    ],
                    icon: Zap,
                    color: "cyan",
                  },
                ].map((card, i) => (
                  <div
                    key={i}
                    className="group relative bg-white/[0.02] backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 hover:bg-white/[0.04] transition-all duration-700 overflow-hidden"
                  >
                    <motion.div
                      animate={{
                        boxShadow: [
                          "0 0 0px rgba(244,63,94,0)",
                          "0 0 40px rgba(244,63,94,0.1)",
                          "0 0 0px rgba(244,63,94,0)",
                        ],
                      }}
                      transition={{ repeat: Infinity, duration: 4 }}
                      className="bg-rose-500/5 backdrop-blur-xl border border-rose-500/20 rounded-[40px] p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden"
                    >
                      <div className="absolute top-0 left-0 w-1 h-full bg-rose-500/50" />
                      <div className="flex items-center gap-8 relative z-10 text-center md:text-left">
                        <div className="w-20 h-20 rounded-[28px] bg-rose-500/10 border border-rose-500/20 flex items-center justify-center shrink-0">
                          <TrendingUp className="w-10 h-10 text-rose-400 rotate-180" />
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-2xl font-black tracking-tight text-white">
                            Critical Performance Warning
                          </h3>
                          <p className="text-sm text-white/40 font-medium max-w-lg">
                            Neural analysis detects a high probability of skill
                            stagnation in the next 12 cycles. Action
                            recommended.
                          </p>
                        </div>
                      </div>
                      <Button
                        onClick={handleResolveConflict}
                        className="h-16 px-10 rounded-2xl bg-rose-500 hover:bg-rose-400 text-white font-black text-xs tracking-widest uppercase transition-all shadow-[0_20px_40px_rgba(244,63,94,0.3)]"
                      >
                        Resolve Conflict
                      </Button>
                    </motion.div>
                  </div>
                ))}
              </div>

              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 0px rgba(244,63,94,0)",
                    "0 0 40px rgba(244,63,94,0.1)",
                    "0 0 0px rgba(244,63,94,0)",
                  ],
                }}
                transition={{ repeat: Infinity, duration: 4 }}
                className="bg-rose-500/5 backdrop-blur-xl border border-rose-500/20 rounded-[40px] p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-rose-500/50" />
                <div className="flex items-center gap-8 relative z-10 text-center md:text-left">
                  <div className="w-20 h-20 rounded-[28px] bg-rose-500/10 border border-rose-500/20 flex items-center justify-center shrink-0">
                    <TrendingUp className="w-10 h-10 text-rose-400 rotate-180" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black tracking-tight text-white">
                      Critical Performance Warning
                    </h3>
                    <p className="text-sm text-white/40 font-medium max-w-lg">
                      Neural analysis detects a high probability of skill
                      stagnation in the next 12 cycles. Action recommended.
                    </p>
                  </div>
                </div>
                <Button
                  onClick={handleResolveConflict}
                  className="h-16 px-10 rounded-2xl bg-rose-500 hover:bg-rose-400 text-white font-black text-xs tracking-widest uppercase transition-all shadow-[0_20px_40px_rgba(244,63,94,0.3)]"
                >
                  Resolve Conflict
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="relative z-10 max-w-7xl mx-auto px-6 py-12 border-t border-white/5 text-center">
        <p className="text-[10px] font-black text-white/10 uppercase tracking-[0.5em]">
          Neural Pathfinding Engine • v4.0.2 Stable Build
        </p>
      </footer>
    </div>
  );
}
