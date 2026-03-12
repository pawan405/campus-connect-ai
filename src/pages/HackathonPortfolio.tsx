import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Trophy, Medal, Star, Calendar } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import ThreeDBackground from "../components/ThreeDBackground";

export default function HackathonPortfolioPage() {
  const hackathons = [
    {
      name: "HackMIT 2025",
      placement: "1st Place",
      date: "Oct 2025",
      prize: "$10,000",
      project: "AI Study Buddy",
    },
    {
      name: "TreeHacks",
      placement: "2nd Place",
      date: "Feb 2025",
      prize: "$5,000",
      project: "EcoTrack",
    },
    {
      name: "CalHacks",
      placement: "Top 10",
      date: "Nov 2024",
      prize: "—",
      project: "MindfulAI",
    },
    {
      name: "PennApps",
      placement: "Finalist",
      date: "Sep 2024",
      prize: "—",
      project: "CodeReview Bot",
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
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-amber-400" />
                </div>
                <span className="font-bold">Hackathon Portfolio</span>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-6 py-12">
          <header className="mb-12">
            <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20 mb-4 px-3 py-1">
              <Medal className="w-3 h-3 mr-2" /> Your Achievements
            </Badge>
            <h1 className="text-4xl md:text-5xl font-black mb-4">
              Hackathon <span className="text-amber-400">Portfolio</span>
            </h1>
            <p className="text-white/40 text-lg max-w-2xl">
              Track your hackathon journey, achievements, and project showcase.
            </p>
          </header>

          <div className="grid md:grid-cols-2 gap-6">
            {hackathons.map((hack, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all h-full">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-black">{hack.name}</h3>
                        <div className="flex items-center gap-2 text-white/40 text-sm mt-1">
                          <Calendar className="w-4 h-4" />
                          {hack.date}
                        </div>
                      </div>
                      <Badge
                        className={`${hack.placement.includes("1st") ? "bg-amber-500/20 text-amber-400" : "bg-white/10 text-white/60"}`}
                      >
                        {hack.placement}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <p className="text-white/60 text-sm">
                        <span className="text-white/40">Project:</span>{" "}
                        {hack.project}
                      </p>
                      {hack.prize !== "—" && (
                        <p className="text-emerald-400 font-bold flex items-center gap-2">
                          <Star className="w-4 h-4" /> {hack.prize}
                        </p>
                      )}
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
