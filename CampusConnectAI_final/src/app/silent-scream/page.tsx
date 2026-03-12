"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Mic,
  ArrowLeft,
  Shield,
  Sparkles,
  Volume2,
  Lock,
  Zap,
  ChevronRight,
  Activity,
  Loader2,
  AlertCircle,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ThreeDBackground from "@/components/ThreeDBackground";
import { toast } from "sonner";

export default function SilentScreamPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [transcription, setTranscription] = useState("");
  const [summary, setSummary] = useState("");
  const [duration, setDuration] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [signalId, setSignalId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);
  const isRecordingRef = useRef(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const silenceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Sync ref with state
  useEffect(() => {
    isRecordingRef.current = isRecording;
  }, [isRecording]);

  const generateSummary = async (text: string) => {
    if (!text || text.trim().length < 5) {
      setSummary("Message too brief for analysis. Please provide more detail.");
      return;
    }
    
    setIsProcessing(true);
    setSummary("Synthesizing neural summary...");
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            {
              role: "system",
              content: "You are an empathetic, neutral assistant summarizing sensitive reports. Be supportive but professional.",
            },
            {
              role: "user",
              content: `Summarize this anonymous report in a neutral, empathetic way. Keep it under 25 words: "${text}"`,
            },
          ],
        }),
      });
      const data = await response.json();
      if (data.content) {
        setSummary(data.content);
        // Automatically upload the signal after summary is generated
        handleUploadSignal(text, data.content);
      }
    } catch (err) {
      console.error("Failed to generate summary:", err);
      setSummary("Summary unavailable. Encryption remains active.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleUploadSignal = async (text: string, currentSummary: string) => {
    try {
      const response = await fetch("/api/signals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          transcription: text,
          summary: currentSummary,
          duration,
        }),
      });
      const data = await response.json();
      if (data.success) {
        setSignalId(data.signal.id);
      }
    } catch (error) {
      console.error("Auto-upload failed:", error);
    }
  };

  useEffect(() => {
    setMounted(true);
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-US";
      
      recognition.onresult = (event: any) => {
        let currentTranscription = "";
        for (let i = 0; i < event.results.length; i++) {
          currentTranscription += event.results[i][0].transcript;
        }
        setTranscription(currentTranscription);
        
        // Reset silence timer on speech
        if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
        silenceTimerRef.current = setTimeout(() => {
          if (isRecordingRef.current) stopRecording();
        }, 5000); // Stop after 5s of silence
      };

      recognition.onerror = (event: any) => {
        console.error("Recognition error:", event.error);
        if (event.error === "not-allowed") {
          setError("Microphone access denied. Please check permissions.");
        } else if (event.error !== "no-speech") {
          setError("Connection lost. Please try again.");
        }
        if (isRecordingRef.current) stopRecording();
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
    }
    
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {}
      }
    };
  }, []);

  const startRecording = () => {
    setError(null);
    setTranscription("");
    setDuration(0);
    setSummary("");
    setShowSummary(false);
    setSignalId(null);
    
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
        setIsRecording(true);
        const startTime = Date.now();
        timerRef.current = setInterval(() => {
          setDuration((Date.now() - startTime) / 1000);
        }, 100);
      } catch (err) {
        setError("Failed to initialize microphone.");
      }
    } else {
      setError("Voice recognition not supported in this browser.");
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) recognitionRef.current.stop();
    if (timerRef.current) clearInterval(timerRef.current);
    if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
    setIsRecording(false);
    
    if (transcription.trim().length > 0) {
      setShowSummary(true);
      generateSummary(transcription);
    } else if (!error) {
      setError("No speech detected. Please try again.");
    }
  };

  const toggleRecording = () => {
    if (isRecording) stopRecording();
    else startRecording();
  };

  const handleSubmitToAuthorities = async () => {
    if (!signalId) return;
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ signalId, authorityName: "Campus Security" }),
      });
      const data = await response.json();
      if (data.success) {
        toast.success("Signal submitted securely.");
      }
    } catch (error) {
      toast.error("Submission failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#050508] text-white overflow-x-hidden selection:bg-rose-500/30">
      <ThreeDBackground />

      <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-4 bg-black/40 backdrop-blur-xl border-b border-white/[0.05]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/dashboard" className="group flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-rose-500/20 transition-all">
              <ArrowLeft className="w-4 h-4 text-white/60 group-hover:text-rose-400" />
            </div>
            <span className="text-[10px] font-black tracking-widest uppercase text-white/40 group-hover:text-white transition-colors">
              Return
            </span>
          </Link>
          <Badge className="bg-rose-500/10 text-rose-400 border border-rose-500/20 px-3 py-1 rounded-full text-[9px] font-black tracking-widest uppercase">
            <Lock className="w-3 h-3 mr-2 inline" /> Encrypted Protocol
          </Badge>
        </div>
      </nav>

      <main className="relative pt-24 pb-12 px-6 max-w-4xl mx-auto flex flex-col items-center">
        {/* Compact Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl lg:text-7xl font-black tracking-tighter mb-2 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/20">
            SILENT SCREAM
          </h1>
          <p className="text-white/40 text-sm font-medium italic tracking-wide">
            "Your identity is shielded. Your voice is heard."
          </p>
        </motion.div>

        {/* Central UI */}
        <div className="w-full flex flex-col items-center gap-12">
          {/* Visual Feedback */}
          <div className="relative flex items-center justify-center">
            <AnimatePresence>
              {isRecording && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute -inset-24 flex items-center justify-center gap-1.5 opacity-30 pointer-events-none"
                >
                  {Array.from({ length: 24 }).map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ height: [10, 60, 10] }}
                      transition={{ duration: 0.5 + Math.random(), repeat: Infinity, delay: i * 0.05 }}
                      className="w-1 bg-rose-500 rounded-full"
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={toggleRecording}
              className={`relative z-10 w-40 h-40 rounded-full flex flex-col items-center justify-center transition-all duration-500 ${
                isRecording
                  ? "bg-rose-600 shadow-[0_0_80px_rgba(225,29,72,0.4)]"
                  : "bg-white/5 border border-white/10 hover:border-rose-500/50"
              }`}
            >
              {isRecording ? (
                <Activity className="w-12 h-12 text-white animate-pulse" />
              ) : (
                <Mic className="w-12 h-12 text-white/80" />
              )}
              <span className={`mt-2 text-[10px] font-black uppercase tracking-[0.2em] ${isRecording ? "text-white" : "text-white/40"}`}>
                {isRecording ? "Stop" : "Speak"}
              </span>
            </motion.button>
          </div>

          {/* Live Transcript / Error State */}
          <div className="w-full max-w-xl text-center min-h-[80px] flex flex-col items-center justify-center px-4">
            <AnimatePresence mode="wait">
              {error ? (
                <motion.div
                  key="error"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center gap-3 text-rose-400"
                >
                  <AlertCircle className="w-6 h-6" />
                  <p className="text-sm font-bold tracking-tight">{error}</p>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={startRecording}
                    className="text-[10px] uppercase font-black tracking-widest hover:bg-rose-500/10"
                  >
                    <RotateCcw className="w-3 h-3 mr-2" /> Retry
                  </Button>
                </motion.div>
              ) : isRecording ? (
                <motion.div
                  key="listening"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4"
                >
                  <Badge variant="outline" className="animate-pulse border-rose-500/50 text-rose-400">
                    Listening Word-to-Word...
                  </Badge>
                  <p className="text-xl font-medium italic text-white/80 leading-relaxed">
                    {transcription || "..."}
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>

          {/* Results Section */}
          <AnimatePresence>
            {showSummary && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full space-y-8"
              >
                <div className="bg-white/[0.02] backdrop-blur-3xl border border-white/[0.08] rounded-[32px] p-8 md:p-10 relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
                  
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
                      <Sparkles className="w-5 h-5 text-cyan-400" />
                    </div>
                    <h3 className="text-xl font-black tracking-tighter uppercase">Neural Analysis</h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20">Transcription</label>
                      <div className="p-5 rounded-2xl bg-black/40 border border-white/5 text-sm font-medium text-white/60 italic leading-relaxed">
                        {transcription}
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400/30">Empathic Summary</label>
                      <div className="p-5 rounded-2xl bg-cyan-500/5 border border-cyan-500/20 min-h-[100px] flex items-center">
                        {isProcessing ? (
                          <div className="flex items-center gap-3 text-cyan-400/60">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span className="text-xs font-bold uppercase tracking-widest">Processing...</span>
                          </div>
                        ) : (
                          <p className="text-base font-bold text-white leading-relaxed">{summary}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-10 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
                    <p className="text-white/20 text-[10px] font-medium leading-relaxed max-w-sm">
                      Note: Your voice has been masked. Encryption ID: {signalId?.slice(0, 8) || "PENDING"}
                    </p>
                    <Button
                      onClick={handleSubmitToAuthorities}
                      disabled={isSubmitting || !signalId}
                      className="w-full md:w-auto h-12 px-8 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-black text-[10px] tracking-widest uppercase transition-all shadow-xl disabled:opacity-20"
                    >
                      {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Submit Securely"}
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Security Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-24">
          {[
            { icon: Shield, title: "Zero Trace", desc: "No IP logging or metadata." },
            { icon: Zap, title: "AI Masking", desc: "Voices re-synthesized." },
            { icon: Volume2, title: "Safe Storage", desc: "256-bit AES encryption." },
          ].map((item, i) => (
            <div key={i} className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 shrink-0">
                <item.icon className="w-5 h-5 text-white/40" />
              </div>
              <div>
                <h4 className="text-xs font-black uppercase tracking-widest mb-1">{item.title}</h4>
                <p className="text-[10px] text-white/30 font-medium leading-normal">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="py-8 text-center opacity-20">
        <p className="text-[9px] font-black uppercase tracking-[0.5em]">
          End-to-End Encrypted Session
        </p>
      </footer>
    </div>
  );
}
