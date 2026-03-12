"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Trophy,
  Target,
  Zap,
  Star,
  Users,
  Brain,
  Rocket,
  ArrowRight,
  Shield,
  Activity,
  Code,
  ArrowLeft,
    ExternalLink,
    Github,
    Globe,
    Cpu,
    TrendingUp,
  } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import ThreeDBackground from "@/components/ThreeDBackground";
import TiltCard from "@/components/TiltCard";

const colorMap = {
  blue: "text-blue-400",
  emerald: "text-emerald-400",
  amber: "text-amber-400",
  purple: "text-purple-400",
  cyan: "text-cyan-400",
};

const bgMap = {
  blue: "bg-blue-500/20 border-blue-500/30",
  emerald: "bg-emerald-500/20 border-emerald-500/30",
  amber: "bg-amber-500/20 border-amber-500/30",
  purple: "bg-purple-500/20 border-purple-500/30",
  cyan: "bg-cyan-500/20 border-cyan-500/30",
};

const iconColorMap = {
  blue: "text-blue-400",
  emerald: "text-emerald-400",
  amber: "text-amber-400",
  purple: "text-purple-400",
  cyan: "text-cyan-400",
};

const statsData = [
  { label: "Total Joined", value: 12, icon: Trophy, color: "blue" as const },
  { label: "Completed", value: 10, icon: Shield, color: "emerald" as const },
  { label: "Wins/Top Pos", value: 3, icon: Star, color: "amber" as const },
  { label: "Finalists", value: 5, icon: Target, color: "purple" as const },
  { label: "Ongoing", value: 1, icon: Activity, color: "cyan" as const },
];

const hackathonEntries = [
  {
    title: "Global AI Hackathon",
    year: "2025",
    mode: "Remote",
    tech: ["Python", "PyTorch", "FastAPI", "React"],
    domain: "Artificial Intelligence",
    result: "1st Place Winner",
    role: "ML Engineer",
    built: "Neural sentiment analysis engine for edge devices.",
    contribution: "I architected the model compression pipeline and optimized inference speed by 40% using quantization.",
    responsibilities: ["Model Architecture", "Edge Deployment", "Performance Optimization"],
    impact: "Resulted in a winning solution for real-world IoT use cases.",
    icon: Trophy,
    color: "amber" as const,
    links: {
      live: "https://ai-hackathon-win.vercel.app",
      github: "https://github.com/username/ai-hackathon-engine"
    }
  },
  {
    title: "Ethereum Global London",
    year: "2024",
    mode: "In-Person",
    tech: ["Solidity", "Hardhat", "TypeScript", "Ethers.js"],
    domain: "Blockchain / Web3",
    result: "Top 10 Finalist",
    role: "Smart Contract Dev",
    built: "Gas-optimized quadratic voting protocol for DAOs.",
    contribution: "I implemented the core voting logic in Solidity and reduced gas costs by 25% through storage packing.",
    responsibilities: ["Solidity Development", "Gas Profiling", "Unit Testing"],
    impact: "Demonstrated significant efficiency gains for decentralized governance.",
    icon: Star,
    color: "blue" as const,
    links: {
      live: "https://eth-london-finalist.vercel.app",
      github: "https://github.com/username/quadratic-voting"
    }
  },
  {
    title: "EcoTech Innovate",
    year: "2024",
    mode: "Hybrid",
    tech: ["Node.js", "React Native", "MQTT", "AWS"],
    domain: "Sustainability / IoT",
    result: "Shortlisted / Finalist",
    role: "Full Stack Developer",
    built: "IoT-based waste management tracker for smart cities.",
    contribution: "I developed the real-time dashboard and integrated the sensor API with a Node.js backend.",
    responsibilities: ["Real-time Dashboard", "API Integration", "Cloud Architecture"],
    impact: "Helped the team reach the finalist round with a working prototype.",
    icon: Users,
    color: "purple" as const,
    links: {
      live: "https://ecotech-innovate.vercel.app",
      github: "https://github.com/username/waste-tracker"
    }
  },
  {
    title: "Campus Safety Jam",
    year: "2023",
    mode: "University Hosted",
    tech: ["Next.js", "Tailwind CSS", "Firebase", "Google Maps API"],
    domain: "Social Impact / Safety",
    result: "Participant / Deployment",
    role: "Team Lead & UI/UX",
    built: "Campus-wide emergency response and alert system.",
    contribution: "I led the product vision, designed the mobile interface, and managed the 48-hour sprint.",
    responsibilities: ["Product Leadership", "UI/UX Design", "Project Management"],
    impact: "Improved system usability and resulted in a pilot deployment for 500+ students.",
    icon: Rocket,
    color: "emerald" as const,
    links: {
      live: "https://campus-safety-jam.vercel.app",
      github: "https://github.com/username/campus-safety"
    }
  },
];

const skills = [
  { name: "Teamwork", level: 90 },
  { name: "Problem Solving", level: 95 },
  { name: "Time Management", level: 85 },
  { name: "Full Stack Dev", level: 80 },
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

export default function HackathonPortfolioPage() {
  const [mounted, setMounted] = useState(false);

  const handleDownloadCV = () => {
    toast.promise(new Promise((resolve) => setTimeout(resolve, 2000)), {
      loading: "Generating Neural CV...",
      success: "Neural CV downloaded successfully!",
      error: "Failed to generate CV.",
    });
  };

  const handleSharePortfolio = () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    navigator.clipboard.writeText(url);
    toast.success("Portfolio link copied to clipboard!", {
      description: "You can now share your neural journey with the world.",
    });
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-transparent text-white selection:bg-cyan-500/30 font-sans overflow-x-hidden pb-20">
      <ThreeDBackground />

      <main className="max-w-7xl mx-auto px-6 pt-12 lg:px-8 space-y-16 relative z-10">
        {/* Header Section */}
        <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <Link 
              href="/dashboard" 
              className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-white/40 hover:text-cyan-400 transition-colors group"
            >
              <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
            </Link>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-3xl bg-blue-500/20 flex items-center justify-center border border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.3)]">
                <Trophy className="w-8 h-8 text-blue-400" />
              </div>
              <div>
                <h1 className="text-5xl lg:text-7xl font-black tracking-tighter text-white uppercase leading-none">
                  Hackathon <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Portfolio</span>
                </h1>
                <p className="text-white/40 font-black text-[10px] uppercase tracking-[0.4em] mt-2 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981] animate-pulse" />
                  Neural Performance & Contributions // ACTIVE_SYNC
                </p>
                <p className="text-white/60 text-sm max-w-xl mt-6 leading-relaxed font-medium">
                  Welcome to your neural portfolio. This dedicated interface showcases your competitive engineering journey, 
                  highlighting specific technical contributions, product impact, and AI-synthesized performance metrics 
                  from every hackathon you've conquered.
                </p>
              </div>
            </div>
          </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-4"
              >
                <Button 
                  onClick={handleDownloadCV}
                  className="h-14 px-8 rounded-2xl bg-zinc-900 border border-white/20 hover:bg-zinc-800 text-white font-black uppercase tracking-[0.2em] text-[10px] backdrop-blur-md transition-all"
                >
                  Download CV
                </Button>
                <Button 
                  onClick={handleSharePortfolio}
                  className="h-14 px-8 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-black font-black uppercase tracking-[0.2em] text-[10px] shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all"
                >
                  Share Portfolio
                </Button>
              </motion.div>
        </section>

          {/* Summary Stats Grid */}
          <section className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {statsData.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => toast.info(`Syncing ${stat.label}`, { description: `Aggregating neural metrics for ${stat.label} across all event nodes.` })}
                className="p-8 rounded-[32px] bg-black/40 backdrop-blur-3xl border border-white/10 flex flex-col items-center justify-center text-center group hover:bg-black/60 hover:border-white/20 transition-all shadow-xl cursor-pointer"
              >
                <div className={`w-12 h-12 rounded-2xl ${bgMap[stat.color]} flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                  <stat.icon className={`w-6 h-6 ${iconColorMap[stat.color]}`} />
                </div>
                <span className="text-4xl font-black text-white tracking-tighter">
                  <CountUp value={stat.value} />
                </span>
                <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] mt-2">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </section>

          {/* AI Performance Summary */}
          <motion.section 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-3xl opacity-50" />
            <TiltCard>
              <div 
                onClick={() => toast.info("Neural Synthesis", { description: "Recalculating performance summary based on recent hackathon data." })}
                className="relative p-10 rounded-[48px] bg-black/40 backdrop-blur-3xl border border-white/10 shadow-2xl overflow-hidden group cursor-pointer"
              >
                <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-100 transition-opacity duration-700">
                  <Brain className="w-32 h-32 text-purple-500 blur-2xl" />
                </div>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-purple-500/20 flex items-center justify-center border border-purple-500/30">
                    <Brain className="w-6 h-6 text-purple-400" />
                  </div>
                  <h3 className="text-sm font-black text-white uppercase tracking-[0.4em]">AI Performance Synthesis</h3>
                </div>
                <p className="text-2xl lg:text-3xl text-white/90 leading-tight font-black tracking-tight max-w-4xl">
                  “You have actively participated in multiple hackathons, showing strong <span className="text-blue-400 italic">consistency</span> and competitive spirit. 
                  Your performance is strongest in <span className="text-purple-400">problem-solving</span> and <span className="text-emerald-400 underline decoration-emerald-500/30">team collaboration</span>. 
                  You demonstrate a unique ability to bridge the gap between complex backend logic and user-centric design.”
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  {["Competitive", "Architect", "Collaborator", "High-Performance"].map((tag, i) => (
                    <Badge key={i} variant="outline" className="px-4 py-2 rounded-xl bg-white/5 border-white/10 text-white/60 font-black uppercase text-[9px] tracking-widest group-hover:border-purple-500/40 group-hover:text-purple-400 transition-all duration-500">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </TiltCard>
          </motion.section>

        {/* Detailed Experience List */}
        <section className="space-y-12">
          <div className="flex items-center gap-6">
            <h2 className="text-4xl font-black tracking-tighter uppercase">Participation History</h2>
            <div className="flex-1 h-[1px] bg-gradient-to-r from-white/20 to-transparent" />
          </div>

          <div className="grid grid-cols-1 gap-8">
            {hackathonEntries.map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-10 rounded-[56px] bg-black/40 backdrop-blur-3xl border border-white/10 flex flex-col lg:flex-row gap-12 group hover:bg-black/60 hover:border-white/20 transition-all shadow-2xl relative overflow-hidden"
              >
                {/* Year Badge */}
                <div className="absolute top-8 right-12 text-[80px] font-black text-white/5 pointer-events-none group-hover:text-white/10 transition-colors duration-700">
                  {item.year}
                </div>

                <div className="flex flex-col items-center gap-6 shrink-0">
                  <div className={`w-24 h-24 rounded-[32px] ${bgMap[item.color]} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-700`}>
                    <item.icon className={`w-12 h-12 ${iconColorMap[item.color]}`} />
                  </div>
                  <div className="flex flex-col items-center gap-3 w-full">
                    <Badge variant="outline" className={`px-4 py-1.5 rounded-full border-none font-black text-[10px] uppercase tracking-widest ${bgMap[item.color]} ${iconColorMap[item.color]}`}>
                      {item.result}
                    </Badge>
                    <div className="flex items-center gap-2 text-white/40 font-black text-[9px] uppercase tracking-widest">
                      <Globe className="w-3 h-3" /> {item.mode}
                    </div>
                  </div>
                </div>

                <div className="flex-1 space-y-8 relative">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                      <h4 className="text-4xl lg:text-5xl font-black text-white tracking-tighter uppercase italic leading-none">{item.title}</h4>
                      <div className="flex flex-wrap items-center gap-3 mt-4">
                        <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Role:</span>
                        <span className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.2em] bg-cyan-400/10 px-3 py-1 rounded-xl border border-cyan-400/20">
                          {item.role}
                        </span>
                        <div className="w-[1px] h-4 bg-white/10 mx-2" />
                        {item.tech.slice(0, 3).map((t, idx) => (
                          <span key={idx} className="text-[10px] font-black text-white/60 uppercase tracking-widest bg-white/5 px-2 py-1 rounded-lg">
                            {t}
                          </span>
                        ))}
                        {item.tech.length > 3 && (
                          <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">+{item.tech.length - 3}</span>
                        )}
                      </div>
                    </div>
                      <div className="flex items-center gap-3">
                        <a 
                          href={item.links.github} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          onClick={() => toast.info("Opening GitHub Repository", { description: "Decrypting source code access..." })}
                          className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:text-cyan-400 transition-all group/link"
                        >
                          <Github className="w-5 h-5" />
                        </a>
                        <a 
                          href={item.links.live} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          onClick={() => toast.info("Accessing Live Deployment", { description: "Establishing secure neural connection..." })}
                          className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-black font-black uppercase tracking-widest text-[10px] transition-all group/link"
                        >
                          Live Project <ExternalLink className="w-4 h-4 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                        </a>
                      </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-6">
                        <div>
                          <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-3 flex items-center gap-2">
                            <Target className="w-3 h-3 text-white/20" /> What We Built
                          </p>
                          <p className="text-lg text-white/90 leading-relaxed font-medium">
                            {item.built}
                          </p>
                        </div>

                        <div>
                          <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-3 flex items-center gap-2">
                            <Zap className="w-3 h-3 text-white/20" /> What I Did
                          </p>
                          <p className="text-sm text-white/60 leading-relaxed font-medium italic">
                            {item.contribution}
                          </p>
                        </div>
                        
                        <div className="p-6 rounded-3xl bg-white/5 border border-white/5 group-hover:border-white/10 transition-all">
                          <p className="text-[9px] font-black text-white/30 uppercase tracking-widest mb-2 flex items-center gap-2">
                            <TrendingUp className="w-3 h-3 text-emerald-500" /> Impact / Outcome
                          </p>
                          <p className="text-sm text-emerald-400 font-black italic">
                            "{item.impact}"
                          </p>
                        </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-4 flex items-center gap-2">
                          <Code className="w-3 h-3 text-white/20" /> Technical Focus
                        </p>
                        <div className="grid grid-cols-1 gap-3">
                          {item.responsibilities.map((resp, idx) => (
                            <div key={idx} className="flex items-center gap-4 p-3 rounded-2xl bg-white/5 border border-white/5 hover:border-white/20 transition-all group/item">
                              <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee] opacity-40 group-hover/item:opacity-100 transition-opacity" />
                              <span className="text-xs font-black text-white/70 group-hover/item:text-white transition-colors uppercase tracking-widest">{resp}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Skill Impact & Future Path */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="p-12 rounded-[56px] bg-black/40 backdrop-blur-3xl border border-white/10 space-y-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                <Brain className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Skill Growth Matrix</h3>
            </div>
            <div className="space-y-8">
              {skills.map((skill, i) => (
                <div key={i} className="space-y-3">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em]">
                    <span className="text-white/60">{skill.name}</span>
                    <span className="text-emerald-400">Sync Rank: {skill.level}%</span>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                      className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 shadow-[0_0_20px_rgba(16,182,212,0.4)]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-12 rounded-[56px] bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-transparent border border-white/20 flex flex-col justify-between group">
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Neural Coaching</h3>
              </div>
              <div className="space-y-6">
                {[
                  "Participate in higher-difficulty international hackathons to test your scale limits.",
                  "Focus on taking Leadership/Team Lead roles to develop project management skills.",
                  "Target domain-specific challenges in Web3 or FinTech where your skill set shows high affinity."
                ].map((step, i) => (
                  <motion.div 
                    key={i} 
                    whileHover={{ x: 10 }}
                    className="flex items-start gap-5 p-4 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all"
                  >
                    <div className="mt-1.5 w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_10px_#60a5fa] animate-pulse" />
                    <p className="text-sm text-white/90 font-medium leading-relaxed">{step}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            <Link href="/hackathons">
              <Button className="mt-12 w-full h-16 rounded-2xl bg-white text-black font-black uppercase tracking-widest text-[10px] hover:bg-cyan-400 transition-all group">
                Discover Next Challenge <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </Button>
            </Link>
          </div>
        </section>

        {/* Footer info */}
        <footer className="pt-24 text-center">
          <p className="text-[10px] font-black text-white/10 uppercase tracking-[1em]">
            Neural Portfolio v1.0 // Data Synced with CampusConnectAI
          </p>
        </footer>
      </main>
    </div>
  );
}
