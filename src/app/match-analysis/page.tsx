"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Brain,
  ArrowLeft,
  Search,
  Zap,
  Target,
  Trophy,
  Users,
  Activity,
  ChevronRight,
  Shield,
  Rocket,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import ThreeDBackground from "@/components/ThreeDBackground";
import { toast } from "sonner";

export default function MatchAnalysisPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const analysisMetrics = [
    { label: "Technical Skill Fit", value: "94%", color: "cyan", icon: Brain },
    { label: "Team Dynamic Match", value: "88%", color: "purple", icon: Users },
    { label: "Industry Alignment", value: "92%", color: "blue", icon: Target },
    { label: "Winning Probability", value: "76%", color: "emerald", icon: Rocket },
  ];

  const matchedHackathons = [
    {
      name: "AI Global Challenge",
      matchScore: 98,
      tags: ["Machine Learning", "Python"],
      difficulty: "Advanced",
      reason: "Matches your expertise in PyTorch and recent sentiment analysis projects.",
    },
    {
      name: "FinTech Innovation Summit",
      matchScore: 85,
      tags: ["Blockchain", "Security"],
      difficulty: "Intermediate",
      reason: "Aligns with your 'SecureChain' repository and interest in smart contract security.",
    },
    {
      name: "Eco-Tech Hackathon",
      matchScore: 72,
      tags: ["IoT", "Sustainability"],
      difficulty: "Beginner",
      reason: "Ideal for applying your hardware skills to environmental challenges.",
    },
  ];

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-transparent text-white font-sans overflow-x-hidden">
      <ThreeDBackground />

      <nav className="sticky top-0 z-50 border-b border-white/5 bg-black/40 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/dashboard">
            <Button variant="ghost" className="gap-2 text-white/60 hover:text-white hover:bg-white/5">
              <ArrowLeft className="w-4 h-4" /> Back to Core
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30">
              <Zap className="w-5 h-5 text-cyan-400" />
            </div>
            <span className="font-black tracking-tighter text-xl uppercase">Match Analysis</span>
          </div>
        </div>
      </nav>

        <main className="max-w-7xl mx-auto px-6 py-12 space-y-16">
          {/* Header */}
          <section className="space-y-6">
            <Badge className="bg-cyan-500/10 text-cyan-400 border-cyan-500/30 px-4 py-1">
              Analysis Results Generated
            </Badge>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none">
              MATCH <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                VERDICT.
              </span>
            </h1>
            <p className="text-white/80 text-xl max-w-2xl font-medium leading-relaxed">
              We analyzed your <span className="text-cyan-400">GitHub repositories</span>, <span className="text-purple-400">project history</span>, and <span className="text-emerald-400">skill endorsements</span>. 
              These recommendations prioritize hackathons where your technical stack guarantees a competitive edge.
            </p>
          </section>

            {/* Metrics Grid */}
            <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {analysisMetrics.map((metric, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="bg-gradient-to-br from-white/[0.08] to-transparent backdrop-blur-3xl border-white/20 p-8 rounded-[32px] hover:border-cyan-500/50 transition-all group relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-cyan-500/10 transition-colors" />
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:scale-110 group-hover:bg-cyan-500/10 group-hover:border-cyan-500/30 transition-all duration-300 shadow-inner">
                        <metric.icon className="w-7 h-7 text-cyan-400 group-hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                      </div>
                      <Badge variant="outline" className="border-cyan-500/40 text-cyan-300 bg-cyan-500/5 font-bold uppercase tracking-wider text-[10px]">Verified</Badge>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-white/50 uppercase tracking-[0.2em]">{metric.label}</p>
                      <h3 className="text-5xl font-black text-white tracking-tighter group-hover:text-cyan-400 transition-colors">{metric.value}</h3>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </section>

            {/* Recommendations */}
            <section className="space-y-8">
              <div className="flex items-center gap-6">
                <h2 className="text-4xl font-black tracking-tighter uppercase italic">Recommended <span className="text-cyan-400">Wins</span></h2>
                <div className="flex-1 h-[1px] bg-gradient-to-r from-white/20 to-transparent" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {matchedHackathons.map((hack, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ y: -12, scale: 1.02 }}
                    transition={{ 
                      delay: 0.4 + i * 0.1,
                      type: "spring",
                      stiffness: 260,
                      damping: 20 
                    }}
                    className="group"
                  >
                    <Card className="bg-gradient-to-br from-white/[0.12] to-white/[0.02] backdrop-blur-2xl border-white/10 rounded-[40px] p-8 h-full flex flex-col transition-all duration-500 hover:border-cyan-500/40 hover:shadow-[0_30px_60px_-15px_rgba(0,255,255,0.15)] border-l-4 border-l-cyan-500/50 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/5 rounded-full blur-[80px] -mr-24 -mt-24 group-hover:bg-purple-500/10 transition-colors" />
                      
                      <div className="flex justify-between items-start mb-8 relative z-10">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/30 to-purple-500/10 flex items-center justify-center border border-cyan-500/20 shadow-lg group-hover:scale-110 transition-transform duration-500">
                          <Trophy className="w-7 h-7 text-cyan-400" />
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] font-black text-cyan-400 uppercase tracking-widest mb-1">Match Score</p>
                          <div className="flex items-baseline justify-end gap-1">
                            <span className="text-5xl font-black text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-cyan-400 transition-all duration-500">{hack.matchScore}</span>
                            <span className="text-xl font-black text-cyan-500/60">%</span>
                          </div>
                        </div>
                      </div>

                      <h3 className="text-3xl font-black mb-4 text-white leading-none tracking-tighter group-hover:translate-x-1 transition-transform duration-300">
                        {hack.name}
                      </h3>
                      
                      <div className="relative mb-6">
                        <div className="absolute left-0 top-0 w-1 h-full bg-cyan-500/20 rounded-full" />
                        <p className="text-white/80 text-sm font-medium leading-relaxed pl-4">
                          {hack.reason}
                        </p>
                      </div>
  
                      <div className="flex flex-wrap gap-2 mb-10">
                        {hack.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="bg-white/5 text-white/90 border border-white/10 backdrop-blur-md px-3 py-1 font-bold text-[10px] uppercase tracking-wider group-hover:border-cyan-500/30 transition-colors">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="mt-auto pt-8 border-t border-white/10 flex items-center justify-between relative z-10">
                        <div className="flex flex-col">
                          <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] mb-1">Difficulty</span>
                          <span className="text-lg font-black text-white uppercase tracking-tighter italic">{hack.difficulty}</span>
                        </div>
                          <Button 
                            onClick={() => toast.success("Request sent to event organizers!")}
                            className="bg-white/5 hover:bg-cyan-500 text-cyan-400 hover:text-black border border-cyan-500/20 hover:border-cyan-500 px-6 h-12 rounded-2xl gap-2 font-black text-xs uppercase tracking-widest transition-all duration-300 group/btn"
                          >
                            Join Event <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                          </Button>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </section>

          {/* Team Analysis CTA */}
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative group overflow-hidden rounded-[48px]">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/20 via-transparent to-purple-600/20 blur-3xl opacity-50 group-hover:opacity-80 transition-opacity duration-1000" />
              <div className="relative bg-black/40 backdrop-blur-3xl border border-white/10 p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 group-hover:border-white/20 transition-all duration-500">
                <div className="space-y-6 relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center shadow-2xl mb-4 group-hover:scale-110 transition-transform duration-500">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic leading-none">
                    Optimize Your <span className="text-cyan-400">Squad.</span>
                  </h3>
                  <p className="text-white/70 max-w-md text-lg font-medium leading-relaxed">
                    Already have a team? Let&apos;s check your skill balance and predict project compatibility before you sign up.
                  </p>
                </div>
                <div className="relative z-10">
                  <Button 
                    onClick={() => toast.info("Team chemistry scanner starting...")}
                    className="h-24 px-16 rounded-[32px] bg-white text-black font-black uppercase tracking-[0.2em] text-sm hover:bg-cyan-400 hover:text-black hover:shadow-[0_0_50px_rgba(34,211,238,0.4)] transition-all duration-500 hover:scale-[1.02] active:scale-95 shadow-2xl"
                  >
                    Scan Team Chemistry
                  </Button>
                </div>
              </div>
            </div>
          </motion.section>
        </main>

        <footer className="py-24 text-center border-t border-white/5">
          <p className="text-[10px] font-black text-white/40 uppercase tracking-[1em]">
            CampusConnect Insight Engine // Analysis Stable
          </p>
        </footer>

    </div>
  );
}
