import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  BarChart3,
  ArrowLeft,
  TrendingUp,
  Users,
  Target,
  Zap,
  Activity,
  ChevronUp,
  Brain,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import ThreeDBackground from "../components/ThreeDBackground";

export default function AnalyticsPage() {
  const stats = [
    {
      label: "Profile Views",
      value: "1,284",
      change: "+12.5%",
      icon: Users,
      color: "emerald",
    },
    {
      label: "AI Queries",
      value: "856",
      change: "+5.2%",
      icon: Brain,
      color: "violet",
    },
    {
      label: "Roadmap Progress",
      value: "84%",
      change: "+2.1%",
      icon: Target,
      color: "cyan",
    },
    {
      label: "Activity Score",
      value: "92",
      change: "+0.8%",
      icon: Activity,
      color: "rose",
    },
  ];

  return (
    <div className="min-h-screen bg-transparent text-white">
      <ThreeDBackground />
<div className="relative z-10">
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/dashboard">
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 text-white/60 hover:text-white"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Dashboard
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-emerald-400" />
              </div>
              <span className="font-bold">Analytics Hub</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <header className="mb-12">
          <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 mb-4 px-3 py-1">
            <TrendingUp className="w-3 h-3 mr-2" /> Performance Insights
          </Badge>
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            Your AI <span className="text-emerald-400">Growth Metrics</span>
          </h1>
          <p className="text-white/40 text-lg max-w-2xl">
            Deep dive into your campus activity, career progress, and AI
            interaction patterns.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 rounded-xl bg-white/10 border border-white/20">
                      <stat.icon className="w-5 h-5 text-emerald-400" />
                    </div>
                    <Badge
                      variant="outline"
                      className="text-[10px] border-emerald-500/20 text-emerald-400 flex items-center gap-1"
                    >
                      <ChevronUp className="w-3 h-3" /> {stat.change}
                    </Badge>
                  </div>
                  <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-1">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-black">{stat.value}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <Card className="lg:col-span-2 bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <Activity className="w-5 h-5 text-emerald-400" /> Weekly
                Engagement
              </CardTitle>
            </CardHeader>
            <CardContent className="h-[300px] flex items-end justify-between gap-2 px-8 pb-12">
              {[40, 70, 45, 90, 65, 80, 95].map((height, i) => (
                <div
                  key={i}
                  className="flex-1 flex flex-col items-center gap-3 group"
                >
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                    className="w-full bg-gradient-to-t from-emerald-500/20 to-emerald-500 rounded-t-lg"
                  />
                  <span className="text-[10px] font-black text-white/20 uppercase">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i]}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-400" /> Skill Distribution
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                { label: "Problem Solving", value: 85 },
                { label: "Technical Skills", value: 72 },
                { label: "Soft Skills", value: 94 },
                { label: "AI Awareness", value: 68 },
              ].map((skill, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-white/60">{skill.label}</span>
                    <span className="text-emerald-400">{skill.value}%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.value}%` }}
                      transition={{ duration: 1.5, delay: i * 0.2 }}
                      className="h-full bg-emerald-500"
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
    </div>
  );
}
