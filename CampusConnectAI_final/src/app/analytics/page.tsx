"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  BarChart3,
  ArrowLeft,
  TrendingUp,
  Users,
  Target,
  Zap,
  Activity,
  Calendar,
  ChevronUp,
  Brain,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
    <div className="min-h-screen bg-[#08080c] text-white">
      {/* Animated background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-emerald-900/20 via-transparent to-transparent" />
        <div className="absolute top-20 left-20 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px]" />
      </div>

      <nav className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#08080c]/70 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/dashboard">
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2 text-white/60 hover:text-white hover:bg-white/[0.06]"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to Dashboard
                </Button>
              </Link>
            </div>
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

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04] transition-all group">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div
                      className={`p-3 rounded-xl bg-${stat.color}-500/10 border border-${stat.color}-500/20`}
                    >
                      <stat.icon className={`w-5 h-5 text-${stat.color}-400`} />
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

        {/* Charts Simulation */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <Card className="lg:col-span-2 bg-white/[0.02] border-white/[0.06]">
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
                    className="w-full bg-gradient-to-t from-emerald-500/20 to-emerald-500 rounded-t-lg group-hover:to-emerald-400 transition-all relative"
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-[#08080c] text-[10px] font-bold px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      {height}%
                    </div>
                  </motion.div>
                  <span className="text-[10px] font-black text-white/20 uppercase tracking-tighter">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i]}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-white/[0.02] border-white/[0.06]">
            <CardHeader>
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-400" /> Skill Distribution
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                { label: "Problem Solving", value: 85, color: "emerald" },
                { label: "Technical Skills", value: 72, color: "cyan" },
                { label: "Soft Skills", value: 94, color: "violet" },
                { label: "AI Awareness", value: 68, color: "rose" },
              ].map((skill, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-white/60">{skill.label}</span>
                    <span className={`text-${skill.color}-400`}>
                      {skill.value}%
                    </span>
                  </div>
                  <div className="h-2 bg-white/[0.06] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.value}%` }}
                      transition={{ duration: 1.5, delay: i * 0.2 }}
                      className={`h-full bg-${skill.color}-500`}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="bg-gradient-to-r from-emerald-500/10 to-transparent border border-emerald-500/20 rounded-[32px] p-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-2xl font-black mb-2 tracking-tight">
              Generate Detailed Report
            </h3>
            <p className="text-white/40 text-sm">
              Download your full AI analytics report for the last 30 days.
            </p>
          </div>
          <Button className="h-14 px-8 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-[#08080c] font-black uppercase tracking-widest text-sm transition-all shadow-lg shadow-emerald-500/20">
            Download PDF Report
          </Button>
        </div>
      </main>
    </div>
  );
}
