import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Users,
  MessageSquare,
  HelpCircle,
  School,
  Send,
  Plus,
  ArrowLeft,
  Search,
  MessageCircle,
  ThumbsUp,
  Share2,
  Filter,
  MoreVertical,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { toast } from "sonner";
import ThreeDBackground from "../components/ThreeDBackground";

export default function CampusCommunity() {
  const [activeTab, setActiveTab] = useState<"discussion" | "doubts" | "groups">("discussion");
  const [message, setMessage] = useState("");

  const [posts, setPosts] = useState([
    { id: 1, user: "Elena Nox", content: "Anyone attending the Quantum Hackathon this weekend?", likes: 12, replies: 4, time: "2h ago" },
    { id: 2, user: "Marcus Vane", content: "Just finished the Neural Network module. The career roadmap feature is insane!", likes: 45, replies: 8, time: "5h ago" },
  ]);

  const [doubts, setDoubts] = useState([
    { id: 1, user: "Sarah J.", subject: "React Hooks", question: "When should I use useLayoutEffect instead of useEffect?", status: "Resolved", time: "1d ago" },
    { id: 2, user: "Kevin L.", subject: "Cloud Architecture", question: "What's the best way to handle global state in a microservices setup?", status: "Open", time: "3h ago" },
  ]);

  const colleges = [
    { name: "Neo Technical University", members: "4.2k", color: "cyan" },
    { name: "Global Institute of AI", members: "2.8k", color: "purple" },
    { name: "Cyber-Physics Academy", members: "1.5k", color: "emerald" },
    { name: "Silicon Valley Tech", members: "3.1k", color: "blue" },
  ];

  const handlePost = () => {
    if (!message) return;
    setPosts([{ id: Date.now(), user: "You", content: message, likes: 0, replies: 0, time: "Just now" }, ...posts]);
    setMessage("");
    toast.success("Signal broadcasted to community");
  };

  return (
    <div className="min-h-screen bg-[#050508] text-white selection:bg-cyan-500/30 font-sans relative overflow-hidden">
      <ThreeDBackground />
      
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-white/5 bg-black/40 backdrop-blur-xl px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link to="/dashboard" className="group flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-cyan-500/10 transition-all">
                <ArrowLeft className="w-5 h-5 text-white/40 group-hover:text-cyan-400" />
              </div>
              <span className="text-sm font-black tracking-widest uppercase text-white/70 group-hover:text-white transition-colors">
                Interface Hub
              </span>
            </Link>
            <div className="flex items-center gap-6">
              {["discussion", "doubts", "groups"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`text-[10px] font-black uppercase tracking-widest transition-all ${
                    activeTab === tab ? "text-cyan-400" : "text-white/60 hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </nav>

        <main className="max-w-6xl mx-auto px-6 py-12 lg:py-20 relative z-10">
          <header className="mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4">
              <Users className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest">
                Collective Intelligence Hub
              </span>
            </div>
            <h1 className="text-6xl lg:text-8xl font-black tracking-tighter uppercase">
              Campus <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Community.</span>
            </h1>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Main Content Area */}
            <div className="lg:col-span-8 space-y-8">
              <AnimatePresence mode="wait">
                {activeTab === "discussion" && (
                  <motion.div
                    key="discussion"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-8"
                  >
                    <Card className="bg-white/5 border-white/10 rounded-3xl overflow-hidden backdrop-blur-xl">
                      <CardContent className="p-6">
                        <div className="flex gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-500 p-px">
                            <div className="w-full h-full rounded-[15px] bg-black flex items-center justify-center">
                              <span className="text-xs font-black text-white/90">YOU</span>
                            </div>
                          </div>
                          <div className="flex-1 space-y-4">
                            <Textarea 
                              placeholder="Broadcast a signal to the community..." 
                              value={message}
                              onChange={(e) => setMessage(e.target.value)}
                              className="bg-transparent border-none text-lg resize-none p-0 focus-visible:ring-0 min-h-[100px] text-white/90"
                            />
                            <div className="flex items-center justify-between pt-4 border-t border-white/10">
                              <div className="flex gap-2">
                                <Button variant="ghost" size="icon" className="text-white/60 hover:text-cyan-400">
                                  <Search className="w-4 h-4" />
                                </Button>
                              </div>
                              <Button onClick={handlePost} className="bg-cyan-500 hover:bg-cyan-400 text-black font-black uppercase tracking-widest text-[10px] rounded-xl px-6 h-10">
                                Broadcast <Send className="w-3 h-3 ml-2" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <div className="space-y-6">
                      {posts.map((post) => (
                        <Card key={post.id} className="bg-black/40 border-white/10 rounded-3xl hover:bg-white/[0.02] transition-colors group">
                          <CardContent className="p-8 space-y-6">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center font-bold text-xs text-white/90">
                                  {post.user[0]}
                                </div>
                                <div>
                                  <h4 className="font-black text-sm text-white/90">{post.user}</h4>
                                  <p className="text-[10px] text-white/50 uppercase font-bold tracking-widest">{post.time}</p>
                                </div>
                              </div>
                              <Button variant="ghost" size="icon" className="text-white/40 opacity-0 group-hover:opacity-100">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </div>
                            <p className="text-lg font-medium leading-relaxed text-white/90">{post.content}</p>
                            <div className="flex items-center gap-6 pt-6 border-t border-white/10">
                              <button className="flex items-center gap-2 text-white/60 hover:text-cyan-400 transition-colors">
                                <ThumbsUp className="w-4 h-4" />
                                <span className="text-xs font-black">{post.likes}</span>
                              </button>
                              <button className="flex items-center gap-2 text-white/60 hover:text-purple-400 transition-colors">
                                <MessageCircle className="w-4 h-4" />
                                <span className="text-xs font-black">{post.replies}</span>
                              </button>
                              <button className="flex items-center gap-2 text-white/60 hover:text-emerald-400 transition-colors ml-auto">
                                <Share2 className="w-4 h-4" />
                              </button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === "doubts" && (
                  <motion.div
                    key="doubts"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-8"
                  >
                    <div className="flex items-center justify-between mb-8">
                      <h3 className="text-2xl font-black uppercase tracking-tight">Active Doubts</h3>
                      <Button className="bg-purple-500 hover:bg-purple-400 text-white font-black uppercase tracking-widest text-[10px] rounded-xl px-6 h-10">
                        Ask a Doubt <Plus className="w-3 h-3 ml-2" />
                      </Button>
                    </div>

                    <div className="space-y-4">
                      {doubts.map((doubt) => (
                        <Card key={doubt.id} className="bg-black/40 border-white/10 rounded-[32px] hover:border-purple-500/30 transition-all cursor-pointer group">
                          <CardContent className="p-8">
                            <div className="flex items-start justify-between mb-4">
                              <div className="space-y-1">
                                <Badge className={`${doubt.status === 'Resolved' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'} border-none font-black text-[9px] uppercase tracking-widest`}>
                                  {doubt.status}
                                </Badge>
                                <h4 className="text-xl font-black tracking-tight group-hover:text-purple-400 transition-colors">{doubt.subject}</h4>
                              </div>
                              <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest">{doubt.time}</span>
                            </div>
                            <p className="text-white/80 text-sm leading-relaxed mb-6">{doubt.question}</p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-[10px] font-bold text-white/90">
                                  {doubt.user[0]}
                                </div>
                                <span className="text-xs font-bold text-white/60">{doubt.user}</span>
                              </div>
                              <Button variant="ghost" className="text-[10px] font-black uppercase tracking-widest text-purple-400 hover:text-purple-300">
                                View Discussion <ChevronRight className="w-3 h-3 ml-1" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </motion.div>
                )}

                  {activeTab === "groups" && (
                    <motion.div
                      key="groups"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                        {colleges.map((college, i) => (
                          <Card key={i} className="bg-black/80 border-white/20 rounded-[40px] overflow-hidden hover:border-cyan-500/50 transition-all group backdrop-blur-3xl shadow-2xl">
                            <CardHeader className="p-8 border-b border-white/10">
                              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${
                                college.color === 'cyan' ? 'bg-cyan-500/20 border-cyan-500/30 text-cyan-400' :
                                college.color === 'purple' ? 'bg-purple-500/20 border-purple-500/30 text-purple-400' :
                                college.color === 'emerald' ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400' :
                                'bg-blue-500/20 border-blue-500/30 text-blue-400'
                              }`}>
                                <School className="w-7 h-7" />
                              </div>
                              <CardTitle className="text-2xl font-black tracking-tight uppercase leading-tight text-white/90 group-hover:text-cyan-400 transition-colors drop-shadow-md">{college.name}</CardTitle>
                              <CardDescription className="text-white font-black uppercase tracking-widest text-[10px] pt-2 drop-shadow-md">{college.members} Neurons Active</CardDescription>
                            </CardHeader>
                            <CardContent className="p-8">
                              <Button className="w-full h-12 rounded-2xl bg-white/10 border border-white/20 hover:bg-white/20 font-black uppercase tracking-widest text-[10px] text-white">
                                Sync with Group
                              </Button>
                            </CardContent>
                          </Card>
                        ))}
                    </motion.div>
                  )}
              </AnimatePresence>
            </div>

            {/* Sidebar / Trending */}
            <div className="lg:col-span-4 space-y-8">
              <Card className="bg-white/[0.02] border-white/10 rounded-[32px] overflow-hidden">
                <CardHeader className="p-8 border-b border-white/10">
                  <CardTitle className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">Trending Topics</CardTitle>
                </CardHeader>
                  <CardContent className="p-8 space-y-4">
                      {["#QuantumComputing", "#AIAesthetics", "#NeuralRoadmaps", "#CyberSecurity"].map((tag, i) => (
                        <div key={i} className="flex items-center justify-between group cursor-pointer border-b border-white/5 pb-3 last:border-0">
                          <span className="text-sm font-black text-white/90 group-hover:text-cyan-400 transition-colors drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">{tag}</span>
                          <Badge className="bg-cyan-500/10 border-cyan-500/20 text-[9px] font-black text-cyan-400 drop-shadow-sm">{12 + i * 5}k</Badge>
                        </div>
                      ))}
                  </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-500/10 to-cyan-500/10 border-white/10 rounded-[32px] p-8 space-y-6">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                  <HelpCircle className="w-6 h-6 text-purple-400" />
                </div>
                <div className="space-y-2">
                  <h4 className="font-black text-lg uppercase">Need Help?</h4>
                  <p className="text-xs text-white/60 leading-relaxed font-medium">
                    Connect with mentors and expert neurons to accelerate your learning curve.
                  </p>
                </div>
                <Button variant="outline" className="w-full rounded-xl border-white/10 text-[10px] font-black uppercase tracking-widest text-white/80 hover:text-white">
                  Access Mentors
                </Button>
              </Card>
            </div>
          </div>
        </main>

        <footer className="py-24 text-center">
          <div className="flex flex-col items-center gap-6 opacity-50">
            <p className="text-[10px] font-black text-white/30 uppercase tracking-[1em]">
              CampusConnect Collective // Community Module // v1.0.0
            </p>
          </div>
        </footer>
    </div>
  );
}

const ChevronRight = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m9 18 6-6-6-6"/></svg>
);
