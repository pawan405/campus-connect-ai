"use client";

import { useState, useEffect } from "react";
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
  AlertTriangle,
  CheckCircle2,
  Lightbulb,
  ArrowRight,
  Shield,
  Trophy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// AI Analysis Engine - Analyzes user data and generates actionable matches
function analyzeUserMatches() {
  // Simulated user data (in real app, this would come from API/database)
  // Based on dashboard stats: Active Reports: 3, Career Progress: 84%, Hackathons: 12
  const userData = {
    activeReports: 3,
    careerProgress: 84,
    hackathonsJoined: 12,
    activityScore: 92,
    profileViews: 1284,
    aiQueries: 856,
    skills: {
      problemSolving: 85,
      technical: 72,
      soft: 94,
      aiAwareness: 68,
    },
    weeklyEngagement: [40, 70, 45, 90, 65, 80, 95],
  };

  const matches = [];

  // Match 1: High Problem-Solving Score → Leadership Opportunities
  if (userData.skills.problemSolving >= 80) {
    matches.push({
      id: 1,
      type: "opportunity",
      priority: "high",
      problem: "Underutilized problem-solving strength",
      insight: `Your problem-solving score is ${userData.skills.problemSolving}% (top 15% of users), but you've only submitted ${userData.activeReports} safety reports.`,
      action: "Lead campus safety initiatives or peer support programs where your problem-solving skills can create real impact.",
      reasoning: "High problem-solving + low safety engagement = missed opportunity to help others",
      icon: Shield,
      color: "cyan",
      metric: `${userData.skills.problemSolving}% problem-solving`,
    });
  }

  // Match 2: Low AI Awareness → Skill Gap
  if (userData.skills.aiAwareness < 75) {
    matches.push({
      id: 2,
      type: "skill-gap",
      priority: "medium",
      problem: "AI awareness below optimal level",
      insight: `Your AI awareness is ${userData.skills.aiAwareness}% while your technical skills are ${userData.skills.technical}%. This gap limits your ability to leverage AI tools effectively.`,
      action: "Complete AI Roadmap modules focused on practical AI applications. Your high technical skills (72%) suggest you can quickly bridge this gap.",
      reasoning: "Technical skills exist but AI knowledge gap prevents full utilization",
      icon: Brain,
      color: "violet",
      metric: `${userData.skills.aiAwareness}% AI awareness`,
    });
  }

  // Match 3: Engagement Drop → Action Required
  const avgEngagement = userData.weeklyEngagement.reduce((a, b) => a + b, 0) / userData.weeklyEngagement.length;
  const recentEngagement = userData.weeklyEngagement.slice(-3).reduce((a, b) => a + b, 0) / 3;
  if (recentEngagement < avgEngagement * 0.8) {
    matches.push({
      id: 3,
      type: "engagement",
      priority: "high",
      problem: "Recent engagement decline detected",
      insight: `Your weekly engagement dropped from ${Math.round(avgEngagement)}% average to ${Math.round(recentEngagement)}% in the last 3 days (${Math.round(((avgEngagement - recentEngagement) / avgEngagement) * 100)}% decrease).`,
      action: "Re-engage through Silent Scream reporting or join upcoming hackathons. Your 12 hackathon participations show you're active when engaged.",
      reasoning: "Engagement pattern shows decline that could impact career progress momentum",
      icon: Activity,
      color: "rose",
      metric: `${Math.round(recentEngagement)}% recent engagement`,
    });
  }

  // Match 4: High Career Progress → Next Level Opportunities
  if (userData.careerProgress >= 80) {
    matches.push({
      id: 4,
      type: "opportunity",
      priority: "medium",
      problem: "Ready for advanced opportunities",
      insight: `Your career progress is ${userData.careerProgress}% (Level 4), indicating strong foundation. However, your AI queries (${userData.aiQueries}) suggest you're not fully leveraging AI for career planning.`,
      action: "Use AI Roadmap to identify leadership roles or specialized tracks. Your high soft skills (94%) combined with technical foundation make you ideal for team leadership positions.",
      reasoning: "High progress + high soft skills = ready for leadership/mentorship roles",
      icon: Target,
      color: "emerald",
      metric: `${userData.careerProgress}% career progress`,
    });
  }

  // Match 5: Hackathon Activity → Community Impact
  if (userData.hackathonsJoined >= 10) {
    matches.push({
      id: 5,
      type: "strength",
      priority: "low",
      problem: "Strong hackathon participation not leveraged for safety",
      insight: `You've joined ${userData.hackathonsJoined} hackathons (excellent), showing strong community engagement. However, this collaborative energy could extend to campus safety initiatives.`,
      action: "Apply your hackathon collaboration skills to peer support or safety response teams. Your problem-solving (85%) + hackathon experience = ideal for crisis response roles.",
      reasoning: "Proven collaboration in hackathons can translate to safety/peer support",
      icon: Trophy,
      color: "blue",
      metric: `${userData.hackathonsJoined} hackathons joined`,
    });
  }

  // Match 6: Profile Views vs Activity Mismatch
  if (userData.profileViews > 1000 && userData.activeReports < 5) {
    matches.push({
      id: 6,
      type: "engagement",
      priority: "medium",
      problem: "High visibility, low safety engagement",
      insight: `You have ${userData.profileViews.toLocaleString()} profile views (high visibility) but only ${userData.activeReports} active safety reports. Your visibility suggests others look to you for leadership.`,
      action: "Leverage your visibility to lead safety initiatives. Your profile views indicate trust from peers - use this to create positive campus impact.",
      reasoning: "High visibility without safety engagement = missed leadership opportunity",
      icon: Users,
      color: "amber",
      metric: `${userData.profileViews.toLocaleString()} profile views`,
    });
  }

  return matches.sort((a, b) => {
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    return priorityOrder[b.priority] - priorityOrder[a.priority];
  });
}

export default function AnalyticsPage() {
  const [aiMatches, setAiMatches] = useState<any[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(true);

  useEffect(() => {
    // Simulate AI analysis
    setTimeout(() => {
      const matches = analyzeUserMatches();
      setAiMatches(matches);
      setIsAnalyzing(false);
    }, 1500);
  }, []);
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
            <Brain className="w-3 h-3 mr-2" /> AI Matches Analysis
          </Badge>
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            AI <span className="text-emerald-400">Problem-Solving Matches</span>
          </h1>
          <p className="text-white/40 text-lg max-w-2xl">
            Based on your activity patterns, skills, and engagement data. Each match identifies a problem, explains why it matters, and suggests actionable next steps.
          </p>
        </header>

        {/* AI Matches Section */}
        {isAnalyzing ? (
          <Card className="bg-white/[0.02] border-white/[0.06] mb-12">
            <CardContent className="p-12 text-center">
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
                <p className="text-white/60">Analyzing your activity patterns and generating actionable matches...</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6 mb-12">
            {aiMatches.map((match, i) => (
              <motion.div
                key={match.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04] transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-xl bg-${match.color}-500/10 border border-${match.color}-500/20 flex-shrink-0`}>
                        <match.icon className={`w-5 h-5 text-${match.color}-400`} />
                      </div>
                      <div className="flex-1 space-y-3">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge
                                variant="outline"
                                className={`text-[10px] border-${match.color}-500/20 text-${match.color}-400`}
                              >
                                {match.type === "opportunity" ? "Opportunity" : match.type === "skill-gap" ? "Skill Gap" : match.type === "engagement" ? "Engagement" : "Strength"}
                              </Badge>
                              <Badge
                                variant="outline"
                                className={`text-[10px] ${
                                  match.priority === "high"
                                    ? "border-rose-500/20 text-rose-400"
                                    : match.priority === "medium"
                                    ? "border-amber-500/20 text-amber-400"
                                    : "border-blue-500/20 text-blue-400"
                                }`}
                              >
                                {match.priority.toUpperCase()} PRIORITY
                              </Badge>
                            </div>
                            <h3 className="text-lg font-black text-white mb-2">
                              Problem Detected: {match.problem}
                            </h3>
                            <div className="space-y-2">
                              <div className="flex items-start gap-2">
                                <Lightbulb className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                                <p className="text-sm text-white/80">
                                  <span className="font-bold text-white">AI Insight:</span> {match.insight}
                                </p>
                              </div>
                              <div className="flex items-start gap-2">
                                <ArrowRight className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                                <p className="text-sm text-white/80">
                                  <span className="font-bold text-white">Suggested Action:</span> {match.action}
                                </p>
                              </div>
                              <div className="flex items-start gap-2 mt-2 pt-2 border-t border-white/5">
                                <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                                <p className="text-xs text-white/60 italic">
                                  {match.reasoning}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p className="text-xs text-white/40 mb-1">Based on</p>
                            <p className={`text-sm font-black text-${match.color}-400`}>
                              {match.metric}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

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
                  <p className="text-xs font-bold text-white/70 uppercase tracking-widest mb-1">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-black text-white">{stat.value}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Charts Simulation */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <Card className="lg:col-span-2 bg-white/[0.02] border-white/[0.06]">
            <CardHeader>
              <CardTitle className="text-lg font-bold flex items-center gap-2 text-white">
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
                    className="w-full bg-linear-to-t from-emerald-500/20 to-emerald-500 rounded-t-lg group-hover:to-emerald-400 transition-all relative"
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-[#08080c] text-[10px] font-bold px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      {height}%
                    </div>
                  </motion.div>
                  <span className="text-[10px] font-black text-white/60 uppercase tracking-tighter">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i]}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-white/[0.02] border-white/[0.06]">
            <CardHeader>
              <CardTitle className="text-lg font-bold flex items-center gap-2 text-white">
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
                    <span className="text-white/80">{skill.label}</span>
                    <span className={`text-${skill.color}-400 font-black`}>
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

        <div className="bg-linear-to-r from-emerald-500/10 to-transparent border border-emerald-500/20 rounded-4xl p-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-2xl font-black mb-2 tracking-tight">
              Generate Detailed Report
            </h3>
            <p className="text-white/40 text-sm">
              Download your full AI analytics report for the last 30 days.
            </p>
          </div>
          <Button 
            onClick={() => {
              // Generate and download PDF report
              const reportData = {
                stats: stats,
                date: new Date().toLocaleDateString(),
                // Add more data as needed
              };
              
              // Create a simple text report (you can enhance this to generate actual PDF)
              const reportText = `AI Analytics Report\nGenerated: ${reportData.date}\n\n${stats.map(s => `${s.label}: ${s.value} (${s.change})`).join('\n')}`;
              
              // Create blob and download
              const blob = new Blob([reportText], { type: 'text/plain' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `analytics-report-${Date.now()}.txt`;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              URL.revokeObjectURL(url);
            }}
            className="h-14 px-8 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-[#08080c] font-black uppercase tracking-widest text-sm transition-all shadow-lg shadow-emerald-500/20"
          >
            Download PDF Report
          </Button>
        </div>
      </main>
    </div>
  );
}



