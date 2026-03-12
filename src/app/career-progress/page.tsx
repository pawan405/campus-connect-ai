"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  TrendingUp,
  Brain,
  Trophy,
  Rocket,
  Users,
  Activity,
  Target,
  Zap,
  ChevronRight,
  Sparkles,
  BarChart3,
  Radar,
  PieChart,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar as RechartsRadar,
  AreaChart,
  Area,
  Cell,
  PieChart as RechartsPieChart,
  Pie,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import ThreeDBackground from "@/components/ThreeDBackground";

// Mock Data
const growthData = [
  { month: "Jan", progress: 45 },
  { month: "Feb", progress: 52 },
  { month: "Mar", progress: 48 },
  { month: "Apr", progress: 61 },
  { month: "May", progress: 68 },
  { month: "Jun", progress: 75 },
  { month: "Jul", progress: 84 },
];

const skillData = [
  { subject: 'Technical', A: 90, fullMark: 100 },
  { subject: 'Problem Solving', A: 85, fullMark: 100 },
  { subject: 'Teamwork', A: 70, fullMark: 100 },
  { subject: 'Communication', A: 75, fullMark: 100 },
  { subject: 'Consistency', A: 95, fullMark: 100 },
  { subject: 'Leadership', A: 60, fullMark: 100 },
];

const activityImpact = [
  { name: 'Hackathons', value: 40, color: '#06b6d4' },
  { name: 'Skill Practice', value: 30, color: '#a855f7' },
  { name: 'Projects', value: 20, color: '#3b82f6' },
  { name: 'Other', value: 10, color: '#10b981' },
];

export default function CareerProgressPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#050508] text-white selection:bg-cyan-500/30 font-sans relative overflow-x-hidden">
      <ThreeDBackground />
      
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-white/5 bg-black/40 backdrop-blur-xl px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button 
            onClick={() => router.back()} 
            className="group flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-cyan-500/10 transition-all">
              <ArrowLeft className="w-5 h-5 text-white/40 group-hover:text-cyan-400" />
            </div>
            <span className="text-sm font-black tracking-widest uppercase text-white/70 group-hover:text-white transition-colors">
              Return to Core
            </span>
          </button>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
            <span className="text-[10px] font-black text-purple-400 tracking-widest uppercase">
              Neural Analytics Live
            </span>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12 lg:py-20 relative z-10 space-y-24">
        {/* Page Header */}
        <header className="space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 mb-4">
            <TrendingUp className="w-4 h-4 text-purple-400" />
            <span className="text-[10px] font-bold text-purple-300 uppercase tracking-widest">
              Performance Insight Engine
            </span>
          </div>
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
            <div className="space-y-4">
              <h1 className="text-6xl lg:text-8xl font-black tracking-tighter uppercase leading-[0.9]">
                Career Progress <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Overview.</span>
              </h1>
              <p className="text-white/60 text-xl font-medium max-w-xl">
                Your growth, skills, and readiness calculated by our neural networks. 
                Keep evolving to reach higher efficiency tiers.
              </p>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-purple-500/20 blur-3xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity" />
              <div className="relative w-48 h-48 rounded-[40px] bg-black/40 border-2 border-purple-500/30 backdrop-blur-3xl flex flex-col items-center justify-center shadow-2xl overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
                <span className="text-7xl font-black tracking-tighter text-white drop-shadow-[0_0_20px_rgba(168,85,247,0.5)]">84%</span>
                <span className="text-[10px] font-black text-purple-400 uppercase tracking-widest mt-2">Overall Score</span>
                
                {/* Visual indicator ring */}
                <svg className="absolute inset-0 w-full h-full -rotate-90">
                  <circle cx="96" cy="96" r="80" stroke="rgba(168,85,247,0.1)" strokeWidth="4" fill="transparent" />
                  <motion.circle
                    initial={{ strokeDashoffset: 502.6 }}
                    animate={{ strokeDashoffset: 502.6 * (1 - 0.84) }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    cx="96" cy="96" r="80" stroke="#a855f7" strokeWidth="4" fill="transparent"
                    strokeDasharray={502.6}
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </header>

        {/* AI Career Summary */}
        <section>
          <Card className="bg-black/60 border-white/10 rounded-[48px] overflow-hidden backdrop-blur-3xl shadow-2xl relative">
            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 blur-[100px] -z-10" />
            <CardHeader className="p-12 border-b border-white/5">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
                  <Brain className="w-8 h-8 text-cyan-400" />
                </div>
                <div>
                  <CardTitle className="text-3xl font-black tracking-tight uppercase text-white">Neural Career Synthesis</CardTitle>
                  <CardDescription className="text-cyan-400/60 font-black text-[10px] uppercase tracking-widest">AI-Generated Strategy</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-12 space-y-10">
              <div className="grid lg:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <p className="text-xl text-white font-medium leading-relaxed">
                    "You’ve shown strong consistency in hackathons and skill development. Your technical core is expanding rapidly, with high-affinity clusters in React and AI architectures."
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <div className="px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center gap-2">
                      <Zap className="w-4 h-4" /> Strong Consistency
                    </div>
                    <div className="px-4 py-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold flex items-center gap-2">
                      <Target className="w-4 h-4" /> Goal Oriented
                    </div>
                  </div>
                </div>
                <div className="space-y-8 bg-white/5 rounded-3xl p-8 border border-white/10">
                  <div className="space-y-4">
                    <h4 className="text-xs font-black text-white/40 uppercase tracking-widest">Improvement Vector</h4>
                    <p className="text-white/90">To reach the next level, focus more on real-world projects and leadership roles. Your technical depth is excellent, but your "Leadership Matrix" shows room for expansion.</p>
                  </div>
                  <div className="flex items-center gap-4 text-cyan-400 font-bold italic">
                    <Sparkles className="w-5 h-5" />
                    "Your potential is currently capped by lack of project deployment. Ship more products."
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Stats Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { label: "Hackathons Participated", value: 12, icon: Trophy, color: "cyan" },
            { label: "Hackathons Finalist", value: 5, icon: Target, color: "purple" },
            { label: "Skills Improved", value: "8", icon: Brain, color: "blue" },
            { label: "Projects Completed", value: 7, icon: Rocket, color: "emerald" },
            { label: "Team Collaborations", value: 14, icon: Users, color: "amber" },
            { label: "Consistency Score", value: "98%", icon: Activity, color: "rose" },
            { label: "Neural Syncs", value: 124, icon: Zap, color: "indigo" },
            { label: "Current Level", value: "4.2", icon: BarChart3, color: "cyan" },
          ].map((stat, i) => (
            <div key={i} className="group p-8 rounded-[32px] bg-black/40 border border-white/10 backdrop-blur-3xl hover:border-white/30 transition-all">
              <div className={`w-12 h-12 rounded-xl bg-${stat.color}-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-400`} />
              </div>
              <p className="text-4xl font-black text-white mb-2">{stat.value}</p>
              <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </section>

        {/* Visualizations Section */}
        <section className="grid lg:grid-cols-2 gap-12">
          {/* Career Growth Chart */}
          <Card className="bg-black/40 border-white/10 rounded-[48px] overflow-hidden backdrop-blur-3xl">
            <CardHeader className="p-10 border-b border-white/5">
              <CardTitle className="text-xl font-black tracking-tight uppercase">Growth Velocity</CardTitle>
              <CardDescription className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Career progress over 7 months</CardDescription>
            </CardHeader>
            <CardContent className="p-10 h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={growthData}>
                  <defs>
                    <linearGradient id="colorProgress" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis 
                    dataKey="month" 
                    stroke="rgba(255,255,255,0.3)" 
                    fontSize={10} 
                    tickLine={false} 
                    axisLine={false}
                  />
                  <YAxis 
                    stroke="rgba(255,255,255,0.3)" 
                    fontSize={10} 
                    tickLine={false} 
                    axisLine={false}
                    domain={[0, 100]}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0c0c12', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}
                    itemStyle={{ color: '#a855f7', fontSize: '12px', fontWeight: 'bold' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="progress" 
                    stroke="#a855f7" 
                    strokeWidth={4} 
                    fillOpacity={1} 
                    fill="url(#colorProgress)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Skill Radar Chart */}
          <Card className="bg-black/40 border-white/10 rounded-[48px] overflow-hidden backdrop-blur-3xl">
            <CardHeader className="p-10 border-b border-white/5">
              <CardTitle className="text-xl font-black tracking-tight uppercase">Skill Matrix Analysis</CardTitle>
              <CardDescription className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Strength comparison across vectors</CardDescription>
            </CardHeader>
            <CardContent className="p-10 h-[400px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillData}>
                  <PolarGrid stroke="rgba(255,255,255,0.1)" />
                  <PolarAngleAxis dataKey="subject" stroke="rgba(255,255,255,0.5)" fontSize={10} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="transparent" />
                  <RechartsRadar
                    name="Skills"
                    dataKey="A"
                    stroke="#06b6d4"
                    fill="#06b6d4"
                    fillOpacity={0.4}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </section>

        {/* Contribution Breakdown */}
        <section className="grid lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2 bg-black/40 border-white/10 rounded-[48px] overflow-hidden backdrop-blur-3xl">
            <CardHeader className="p-10 border-b border-white/5">
              <CardTitle className="text-xl font-black tracking-tight uppercase">Impact Distribution</CardTitle>
              <CardDescription className="text-white/40 text-[10px] font-bold uppercase tracking-widest">What contributed to your 84% score</CardDescription>
            </CardHeader>
            <CardContent className="p-10">
              <div className="space-y-8">
                {activityImpact.map((item, i) => (
                  <div key={i} className="space-y-3">
                    <div className="flex justify-between items-end">
                      <span className="text-sm font-black uppercase text-white/80">{item.name}</span>
                      <span className="text-lg font-black text-white">{item.value}%</span>
                    </div>
                    <div className="h-3 bg-white/5 rounded-full overflow-hidden border border-white/5">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.value}%` }}
                        transition={{ duration: 1.5, delay: i * 0.1 }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: item.color, boxShadow: `0 0 15px ${item.color}40` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border-white/20 rounded-[48px] p-10 flex flex-col items-center justify-center text-center space-y-6">
            <div className="w-20 h-20 rounded-3xl bg-black/60 border border-white/20 flex items-center justify-center relative group overflow-hidden">
               <Activity className="w-10 h-10 text-cyan-400 group-hover:scale-125 transition-transform" />
               <div className="absolute inset-0 bg-cyan-400/20 blur-2xl opacity-50" />
            </div>
            <div className="space-y-2">
              <h4 className="text-3xl font-black uppercase tracking-tighter">Readiness Level</h4>
              <p className="text-white/60 text-sm font-medium px-4">You are ready for Senior Internships and Junior Developer roles.</p>
            </div>
            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
              <div className="w-5/6 h-full bg-cyan-400 shadow-[0_0_15px_#06b6d4]" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400">Status: Optimized</span>
          </Card>
        </section>

        {/* Roadmap Section */}
        <section className="space-y-12 pb-20">
          <div className="flex items-center gap-6">
            <h2 className="text-4xl font-black tracking-tighter uppercase">Next Level Steps</h2>
            <div className="flex-1 h-[2px] bg-gradient-to-r from-white/30 via-white/10 to-transparent" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Lead a Project", desc: "Take a lead role in your next hackathon to improve leadership matrix.", icon: Users, color: "cyan" },
              { title: "Deploy 3 Products", desc: "Push your existing projects to production and gather real metrics.", icon: Rocket, color: "purple" },
              { title: "Master Next.js 15", desc: "Deep dive into App Router and Server Components to upgrade tech core.", icon: Brain, color: "blue" },
              { title: "Public Speaking", desc: "Share your knowledge in community calls or tech meetups.", icon: Mic, color: "emerald" },
            ].map((step, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="p-8 rounded-[40px] bg-black/40 border border-white/10 backdrop-blur-3xl hover:border-white/40 transition-all group"
              >
                <div className={`w-14 h-14 rounded-2xl bg-${step.color}-500/10 flex items-center justify-center mb-8 border border-${step.color}-500/20 group-hover:scale-110 transition-transform`}>
                  <step.icon className={`w-7 h-7 text-${step.color}-400`} />
                </div>
                <h3 className="text-xl font-black mb-4 uppercase tracking-tight group-hover:text-cyan-400 transition-colors">{step.title}</h3>
                <p className="text-white/60 text-sm font-medium leading-relaxed mb-6">
                  {step.desc}
                </p>
                <button className="flex items-center text-[10px] font-black uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">
                  Add to roadmap <ChevronRight className="w-3 h-3 ml-1" />
                </button>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <footer className="py-24 text-center border-t border-white/5">
        <div className="flex flex-col items-center gap-6 opacity-50">
          <p className="text-[10px] font-black text-white/30 uppercase tracking-[1em]">
            Neural Analytics Module // v5.2.0-INSIGHT
          </p>
        </div>
      </footer>

      <style jsx global>{`
        .recharts-cartesian-grid-horizontal line,
        .recharts-cartesian-grid-vertical line {
          stroke: rgba(255, 255, 255, 0.05);
        }
        .recharts-tooltip-cursor {
          stroke: rgba(168, 85, 247, 0.2);
          stroke-width: 2px;
        }
      `}</style>
    </div>
  );
}

const Mic = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/><line x1="8" x2="16" y1="22" y2="22"/></svg>
);
