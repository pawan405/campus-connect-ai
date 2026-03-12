import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Star,
  MessageSquare,
  Send,
  ArrowLeft,
  ThumbsUp,
  Heart,
  Zap,
  CheckCircle2,
  Cpu,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { toast } from "sonner";
import ThreeDBackground from "../components/ThreeDBackground";

export default function Feedback() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error("Please provide a neural rating before transmitting.");
      return;
    }
    
    setIsSubmitted(true);
    toast.success("Feedback successfully integrated into the system core.");
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
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
              <span className="text-[10px] font-black text-white/60 tracking-widest uppercase">
                Feedback Loop v1.0
              </span>
            </div>
          </div>
        </nav>

        <main className="max-w-4xl mx-auto px-6 py-12 lg:py-20 relative z-10">
          <header className="mb-16 space-y-4 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4">
              <Heart className="w-3.5 h-3.5 text-rose-400" />
              <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest">
                User Experience Synthesis
              </span>
            </div>
            <h1 className="text-6xl lg:text-8xl font-black tracking-tighter uppercase">
              User <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Feedback.</span>
            </h1>
            <p className="text-white/60 text-lg font-medium max-w-xl mx-auto italic">
              "Your insights accelerate our neural evolution. Help us build the future of campus connectivity."
            </p>
          </header>

          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="bg-black/40 backdrop-blur-3xl border-white/10 rounded-[48px] overflow-hidden shadow-2xl">
                  <CardContent className="p-12 space-y-12">
                    <div className="space-y-6 text-center">
                      <label className="text-[10px] font-black text-white/50 uppercase tracking-[0.4em]">Neural Satisfaction Rating</label>
                      <div className="flex justify-center gap-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            onClick={() => setRating(star)}
                            className="relative transition-all duration-300 hover:scale-125 group"
                          >
                            <Star
                              className={`w-12 h-12 transition-all duration-300 ${
                                (hoverRating || rating) >= star
                                  ? "fill-cyan-400 text-cyan-400 drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]"
                                  : "text-white/20 fill-transparent"
                              }`}
                              strokeWidth={1.5}
                            />
                            {(hoverRating || rating) >= star && (
                              <motion.div
                                layoutId="star-glow"
                                className="absolute inset-0 bg-cyan-400/20 blur-2xl rounded-full -z-10"
                              />
                            )}
                          </button>
                        ))}
                      </div>
                      <div className="h-6">
                        <p className="text-[10px] font-black uppercase tracking-widest text-cyan-400">
                          {rating === 5 ? "Peak Evolution" : rating === 4 ? "High Performance" : rating === 3 ? "Optimal Sync" : rating === 2 ? "Anomaly Detected" : rating === 1 ? "System Critical" : ""}
                        </p>
                      </div>
                    </div>
  
                    <form onSubmit={handleSubmit} className="space-y-8">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-white/50 uppercase tracking-widest pl-4">Insights & Suggestions</label>
                        <div className="relative group">
                          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-[32px] blur opacity-0 group-hover:opacity-100 transition duration-1000"></div>
                          <Textarea
                            placeholder="What features should we synthesize next?"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="relative bg-black/60 border-white/10 rounded-[32px] min-h-[200px] p-8 text-lg font-medium resize-none focus:border-cyan-500/50 focus:ring-cyan-500/10 transition-all text-white/90"
                          />
                        </div>
                      </div>
  
                      <Button type="submit" className="w-full h-20 bg-white text-black font-black uppercase tracking-[0.3em] text-xs rounded-[28px] hover:bg-cyan-400 hover:scale-[1.02] transition-all shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                        Transmit Feedback <Send className="w-4 h-4 ml-3" />
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-12 py-20"
              >
                <div className="relative inline-block">
                  <div className="absolute inset-0 bg-cyan-500/20 blur-[100px] rounded-full animate-pulse" />
                  <div className="relative w-32 h-32 rounded-[40px] bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-8 shadow-2xl">
                    <CheckCircle2 className="w-16 h-16 text-cyan-400" />
                  </div>
                </div>
                <div className="space-y-4">
                  <h2 className="text-4xl font-black uppercase tracking-tighter">Transmission Successful.</h2>
                  <p className="text-white/60 text-lg font-medium max-w-md mx-auto italic">
                    "Your contribution has been successfully integrated into the system's learning model. We appreciate your intelligence."
                  </p>
                </div>
                <div className="flex justify-center gap-6">
                   <Link to="/dashboard">
                     <Button variant="outline" className="h-14 px-10 rounded-2xl border-white/10 text-[10px] font-black uppercase tracking-widest text-white/80 hover:text-white">
                       Return to Hub
                     </Button>
                   </Link>
                   <Button onClick={() => setIsSubmitted(false)} className="h-14 px-10 rounded-2xl bg-cyan-500 text-black font-black uppercase tracking-widest text-[10px] hover:bg-cyan-400">
                     New Transmission
                   </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
  
          <section className="mt-32 grid grid-cols-1 md:grid-cols-2 gap-8">
             <Card className="bg-white/[0.02] border-white/10 rounded-[40px] p-10 space-y-6 group hover:bg-white/[0.04] transition-all cursor-pointer">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 group-hover:scale-110 transition-transform">
                  <ThumbsUp className="w-6 h-6 text-cyan-400" />
                </div>
                <div className="space-y-2">
                  <h4 className="font-black text-lg uppercase">System Reliability</h4>
                  <p className="text-xs text-white/60 leading-relaxed font-medium">99.9% uptime across all neural communication nodes.</p>
                </div>
             </Card>
             <Card className="bg-white/[0.02] border-white/10 rounded-[40px] p-10 space-y-6 group hover:bg-white/[0.04] transition-all cursor-pointer">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20 group-hover:scale-110 transition-transform">
                  <Zap className="w-6 h-6 text-purple-400" />
                </div>
                <div className="space-y-2">
                  <h4 className="font-black text-lg uppercase">Rapid Iteration</h4>
                  <p className="text-xs text-white/60 leading-relaxed font-medium">Average feedback integration cycle: 48 neural hours.</p>
                </div>
             </Card>
          </section>
        </main>

        <footer className="py-24 text-center">
          <div className="flex flex-col items-center gap-6 opacity-50">
            <div className="flex items-center gap-4">
              <div className="h-[1px] w-12 bg-white/20" />
              <Cpu className="w-5 h-5 text-white/40" />
              <div className="h-[1px] w-12 bg-white/20" />
            </div>
            <p className="text-[10px] font-black text-white/30 uppercase tracking-[1em]">
              Neural Feedback Loop // v1.0.0
            </p>
          </div>
        </footer>
    </div>
  );
}
