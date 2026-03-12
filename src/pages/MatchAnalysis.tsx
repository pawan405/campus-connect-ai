import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Target, Sparkles, TrendingUp, Zap } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import ThreeDBackground from "../components/ThreeDBackground";

export default function MatchAnalysisPage() {
  const matches = [
    {
      company: "Google",
      role: "SWE Intern",
      match: 94,
      skills: ["React", "TypeScript", "Node.js"],
    },
    {
      company: "Microsoft",
      role: "PM Intern",
      match: 87,
      skills: ["Product", "Analytics", "SQL"],
    },
    {
      company: "Meta",
      role: "Frontend Intern",
      match: 91,
      skills: ["React", "GraphQL", "CSS"],
    },
    {
      company: "Amazon",
      role: "SDE Intern",
      match: 82,
      skills: ["Java", "AWS", "System Design"],
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
                <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                  <Target className="w-5 h-5 text-purple-400" />
                </div>
                <span className="font-bold">Match Analysis</span>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-6 py-12">
          <header className="mb-12">
            <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20 mb-4 px-3 py-1">
              <Sparkles className="w-3 h-3 mr-2" /> AI-Powered Matching
            </Badge>
            <h1 className="text-4xl md:text-5xl font-black mb-4">
              Your <span className="text-purple-400">Career Matches</span>
            </h1>
            <p className="text-white/40 text-lg max-w-2xl">
              AI-analyzed opportunities based on your skills, experience, and
              career goals.
            </p>
          </header>

          <div className="grid gap-6">
            {matches.map((match, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-2xl font-black">
                          {match.company[0]}
                        </div>
                        <div>
                          <h3 className="text-xl font-black">
                            {match.company}
                          </h3>
                          <p className="text-white/60">{match.role}</p>
                          <div className="flex gap-2 mt-2">
                            {match.skills.map((skill, j) => (
                              <Badge
                                key={j}
                                variant="outline"
                                className="text-xs border-white/20"
                              >
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-4xl font-black text-purple-400">
                          {match.match}%
                        </div>
                        <p className="text-white/40 text-xs uppercase tracking-widest">
                          Match Score
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
