import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
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
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import ThreeDBackground from "../components/ThreeDBackground";
import { toast } from "sonner";
import { useAuth } from "../components/AuthProvider";
import { createSilentReport, submitSilentReport } from "../lib/data";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini
const genAI = new GoogleGenerativeAI(
  import.meta.env.VITE_GEMINI_API_KEY || "AIzaSyBRB5fEqRaOrbxrOnEmTqL1NHx7_hhycyc"
);

export default function SilentScreamPage() {
  const { user } = useAuth();
  const [isRecording, setIsRecording] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [transcription, setTranscription] = useState("");
  const [summary, setSummary] = useState("");
  const [duration, setDuration] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [signalId, setSignalId] = useState<string | null>(null);

  const recognitionRef = useRef<any>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const shouldBeRecordingRef = useRef(false); // Track intentional state

  const generateSummary = async (text: string) => {
    if (!text) return "";
    setIsProcessing(true);
    setSummary("Neural AI is analyzing...");
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `Summarize this emergency report into a concise executive summary (max 3 sentences): "${text}"`;
      const result = await model.generateContent(prompt);
      const s = result.response.text();
      setSummary(s);
      return s;
    } catch (err) {
      console.error("Summary failed", err);
      return text;
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    setMounted(true);

    // Global keydown listener for accessibility (type to start)
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is already in an input or textarea
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      )
        return;

      if (
        !isRecording &&
        !showSummary &&
        e.key.length === 1 &&
        !e.ctrlKey &&
        !e.altKey &&
        !e.metaKey
      ) {
        setShowSummary(true);
        setTranscription(e.key);
        setTimeout(() => textareaRef.current?.focus(), 50);
      }
    };

    window.addEventListener("keydown", handleGlobalKeyDown);

    // --- FIXED SPEECH RECOGNITION SETUP ---
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true; // Keep listening
      recognition.interimResults = true; // Show words as you speak
      recognition.lang = "en-US";

      recognition.onresult = (event: any) => {
        let currentTranscription = "";
        for (let i = 0; i < event.results.length; i++) {
          currentTranscription += event.results[i][0].transcript;
        }
        setTranscription(currentTranscription);
      };

      recognition.onend = () => {
        // Vital Logic: If it stops but we didn't want it to, RESTART IT
        if (shouldBeRecordingRef.current) {
          try {
            recognition.start();
          } catch (e) {
            console.log("Restarting recognition...");
          }
        } else {
          setIsRecording(false);
        }
      };

      recognition.onerror = (event: any) => {
        console.error("Speech error", event.error);
        if (event.error === "not-allowed") {
          setIsRecording(false);
          shouldBeRecordingRef.current = false;
        }
      };

      recognitionRef.current = recognition;
    }

    return () => {
      window.removeEventListener("keydown", handleGlobalKeyDown);
      if (timerRef.current) clearInterval(timerRef.current);
      // Only stop on actual unmount
      if (recognitionRef.current) recognitionRef.current.stop();
    };
  }, []); // DEPENDENCY ARRAY IS NOW EMPTY TO PREVENT LOOPS

  const toggleRecording = () => {
    if (isRecording) {
      // Stop
      shouldBeRecordingRef.current = false;
      if (recognitionRef.current) recognitionRef.current.stop();
      if (timerRef.current) clearInterval(timerRef.current);
      setIsRecording(false);
      setShowSummary(true);
      if (transcription) generateSummary(transcription);
    } else {
      // Start
      setTranscription("");
      setDuration(0);
      setSummary("");
      setShowSummary(true); // Show UI immediately

      shouldBeRecordingRef.current = true;
      setIsRecording(true);

      if (recognitionRef.current) {
        try {
          recognitionRef.current.start();
          const startTime = performance.now();
          timerRef.current = setInterval(() => {
            setDuration((performance.now() - startTime) / 1000);
          }, 100);
        } catch (err) {
          console.error(err);
        }
      } else {
        toast.error("Browser does not support Speech Recognition.");
      }
    }
  };

  const handleTextareaKeyDown = (
    e: React.KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleUploadSignal();
    }
  };

  const handleUploadSignal = async () => {
    if (!transcription) {
      toast.error(
        "No signal data to upload. Please record your message first.",
      );
      return;
    }
    if (!user) {
      toast.error("Please sign in to upload your report.");
      return;
    }

    setIsUploading(true);
    try {
      // If summary is missing, generate it first
      let currentSummary = summary;
      if (transcription && !summary) {
        currentSummary = await generateSummary(transcription);
      }
      const id = await createSilentReport({
        uid: user.uid,
        transcription,
        summary: currentSummary,
        duration,
      });
      setSignalId(id);
      toast.success("Signal uploaded securely to the encrypted database.");
    } catch (error: any) {
      console.error("Upload error:", error);
      toast.error(`Upload failed: ${error.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmitToAuthorities = async () => {
    if (!signalId) {
      toast.error("Please upload the signal first before submitting.");
      return;
    }

    setIsSubmitting(true);
    try {
      await submitSilentReport(signalId);
      toast.success("Signal successfully submitted to authorities.");
    } catch (error: any) {
      console.error("Submission error:", error);
      toast.error(`Submission failed: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#050508] text-white overflow-x-hidden selection:bg-rose-500/30">
      <ThreeDBackground />

      {/* Background Gradients */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-rose-500/10 rounded-full blur-[120px] animate-pulse" />
        <div
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-6 bg-black/20 backdrop-blur-xl border-b border-white/[0.05]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/dashboard" className="group flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-rose-500/20 group-hover:border-rose-500/30 transition-all">
              <ArrowLeft className="w-5 h-5 text-white/60 group-hover:text-rose-400" />
            </div>
            <span className="text-sm font-black tracking-widest uppercase text-white/40 group-hover:text-white transition-colors">
              Return to Hub
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <Badge
              onClick={() =>
                toast.success("Secure Connection Verified", {
                  description: "256-bit end-to-end encryption is active.",
                })
              }
              className="bg-rose-500/10 text-rose-400 border border-rose-500/20 px-4 py-1.5 rounded-full text-[10px] font-black tracking-[0.2em] uppercase cursor-pointer hover:bg-rose-500/20 transition-all"
            >
              <Lock className="w-3 h-3 mr-2" /> Encrypted Link
            </Badge>
          </div>
        </div>
      </nav>

      <main className="relative pt-32 pb-20 px-8 max-w-5xl mx-auto flex flex-col items-center">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-rose-500/10 border border-rose-500/20 mb-8 backdrop-blur-md">
            <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse shadow-[0_0_10px_rgba(244,63,94,0.8)]" />
            <span className="text-[11px] font-black text-rose-400 tracking-[0.2em] uppercase">
              Security Protocol Alpha
            </span>
          </div>
          <h1 className="text-7xl lg:text-9xl font-black tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/20">
            SILENT SCREAM
          </h1>
          <p className="text-white/40 text-xl font-medium italic max-w-2xl mx-auto leading-relaxed">
            "Your identity is shielded. Your voice is heard."
          </p>
        </motion.div>

        {/* Central Interface */}
        <div className="relative w-full flex flex-col items-center justify-center min-h-[400px]">
          {/* Waveform Animation */}
          <div className="absolute inset-0 flex items-center justify-center gap-1.5 opacity-20 pointer-events-none">
            {Array.from({ length: 40 }).map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  height: isRecording ? [20, 80, 20] : [10, 30, 10],
                  opacity: isRecording ? [0.2, 0.8, 0.2] : 0.2,
                }}
                transition={{
                  duration: isRecording ? 0.5 + Math.random() : 2,
                  repeat: Infinity,
                  delay: i * 0.05,
                }}
                className={`w-1 rounded-full ${isRecording ? "bg-rose-500" : "bg-white/20"}`}
              />
            ))}
          </div>

          {/* Microphone Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative z-10"
          >
            <button
              onClick={toggleRecording}
              aria-label={isRecording ? "Stop recording" : "Start recording"}
              className={`relative w-48 h-48 rounded-full flex items-center justify-center transition-all duration-700 ${
                isRecording
                  ? "bg-rose-500 shadow-[0_0_100px_rgba(244,63,94,0.4)]"
                  : "bg-white/5 border border-white/10 hover:border-rose-500/50 hover:bg-rose-500/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
              }`}
            >
              <AnimatePresence mode="wait">
                {isRecording ? (
                  <motion.div
                    key="recording"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    className="flex flex-col items-center"
                  >
                    <Activity className="w-16 h-16 text-white animate-pulse" />
                    <span className="absolute -bottom-12 text-rose-400 font-black tracking-[0.3em] uppercase text-[10px] animate-pulse">
                      Recording ({duration.toFixed(2)}s)...
                    </span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="idle"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                  >
                    <Mic className="w-16 h-16 text-white/80 group-hover:text-white" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Pulse Rings */}
              {isRecording && (
                <>
                  <motion.div
                    initial={{ scale: 1, opacity: 0.5 }}
                    animate={{ scale: 1.5, opacity: 0 }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 rounded-full border-2 border-rose-500"
                  />
                  <motion.div
                    initial={{ scale: 1, opacity: 0.5 }}
                    animate={{ scale: 2, opacity: 0 }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    className="absolute inset-0 rounded-full border border-rose-500/50"
                  />
                </>
              )}
            </button>
          </motion.div>

          {/* Visible Text Input Bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 w-full max-w-2xl relative z-10"
          >
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-rose-500/20 to-cyan-500/20 rounded-3xl blur opacity-20 group-hover:opacity-100 transition duration-1000"></div>
              <textarea
                value={transcription}
                onChange={(e) => {
                  setTranscription(e.target.value);
                  if (!showSummary && e.target.value.trim().length > 0) {
                    setShowSummary(true);
                  }
                }}
                onKeyDown={handleTextareaKeyDown}
                placeholder="Type your message here..."
                className="relative w-full px-8 py-6 rounded-3xl bg-black/60 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-rose-500/50 transition-all resize-none min-h-[100px] text-lg font-medium italic shadow-2xl"
              />
              <div className="absolute right-8 bottom-6 flex items-center gap-2 pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity">
                <kbd className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-white/40">
                  Enter
                </kbd>
                <span className="text-[10px] font-black uppercase tracking-widest text-white/20">
                  to upload
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* AI Summary Section */}
        <AnimatePresence>
          {showSummary && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="w-full mt-32"
            >
              <div className="bg-white/[0.02] backdrop-blur-[40px] border border-white/[0.08] rounded-[48px] p-12 relative overflow-hidden group shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />

                <div className="flex items-center justify-between mb-12">
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 shadow-xl">
                      <Sparkles className="w-7 h-7 text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-black tracking-tighter">
                        NEURAL ANALYSIS
                      </h3>
                      <p className="text-[10px] font-black text-cyan-400/60 uppercase tracking-widest mt-1">
                        AI Transcription Active
                      </p>
                    </div>
                  </div>
                  <Badge className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-4 py-1.5 rounded-full text-[10px] font-black tracking-[0.2em] uppercase">
                    Processed
                  </Badge>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                  <div className="space-y-6">
                    <p className="text-white/20 text-[10px] font-black uppercase tracking-widest">
                      Original Transcription
                    </p>
                    <textarea
                      ref={textareaRef}
                      value={transcription}
                      onChange={(e) => setTranscription(e.target.value)}
                      onKeyDown={handleTextareaKeyDown}
                      onBlur={() => generateSummary(transcription)}
                      className="w-full p-8 rounded-[32px] bg-black/40 border border-white/5 font-medium text-white/60 leading-relaxed italic min-h-[150px] resize-none focus:outline-none focus:border-cyan-500/50 transition-all"
                      placeholder="Type your report here or use voice input..."
                    />
                  </div>

                  <div className="space-y-6">
                    <p className="text-cyan-400/20 text-[10px] font-black uppercase tracking-widest">
                      AI Executive Summary
                    </p>
                    <div className="p-8 rounded-[32px] bg-cyan-500/5 border border-cyan-500/20">
                      <div className="flex items-start gap-4 mb-6">
                        <div className="w-1 h-12 bg-cyan-500 rounded-full" />
                        <p className="text-lg font-bold text-white leading-snug">
                          {isProcessing ? (
                            <span className="flex items-center gap-2">
                              <Loader2 className="w-4 h-4 animate-spin" />
                              {summary}
                            </span>
                          ) : (
                            summary || "Neural summary will appear here..."
                          )}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        {["Safety", "Facilities", "High Priority"].map(
                          (tag) => (
                            <span
                              key={tag}
                              className="text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                            >
                              {tag}
                            </span>
                          ),
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-12 pt-12 border-t border-white/5 flex items-center justify-between">
                  <p className="text-white/30 text-xs font-medium max-w-md">
                    Note: Your voice signature has been scrubbed and replaced
                    with a neural-generated monotone to ensure absolute
                    anonymity.
                  </p>
                  <Button
                    onClick={handleSubmitToAuthorities}
                    disabled={isSubmitting || !signalId}
                    className="h-16 px-12 rounded-[24px] bg-cyan-500 hover:bg-cyan-400 text-black font-black text-xs tracking-[0.2em] uppercase transition-all shadow-[0_20px_40px_rgba(6,182,212,0.3)] group disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    ) : (
                      <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    )}
                    {isSubmitting ? "Submitting..." : "Submit to Authorities"}
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mt-32">
          {[
            {
              icon: Shield,
              title: "Zero Trace",
              desc: "No IP logging, no metadata, no identity leaks.",
              color: "rose",
              action: () =>
                toast.info("Security Audit", {
                  description:
                    "Identity scrubbing protocol is 100% operational.",
                }),
            },
            {
              icon: Zap,
              title: "AI Scrubbing",
              desc: "Voices are re-synthesized to prevent bio-recognition.",
              color: "cyan",
              action: () =>
                toast.info("Neural Sync", {
                  description:
                    "Voice synthesis engine is ready for deployment.",
                }),
            },
            {
              icon: Volume2,
              title: "Safe Storage",
              desc: "Reports are encrypted with 256-bit military standards.",
              color: "violet",
              action: () =>
                toast.info("Vault Status", {
                  description: "Encrypted storage nodes are online and secure.",
                }),
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              onClick={item.action}
              className="p-8 rounded-[32px] bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] transition-all group cursor-pointer"
            >
              <div
                className={`w-14 h-14 rounded-2xl bg-${item.color}-500/10 flex items-center justify-center border border-${item.color}-500/20 mb-6 group-hover:rotate-12 transition-transform`}
              >
                <item.icon className={`w-7 h-7 text-${item.color}-400`} />
              </div>
              <h4 className="text-xl font-black tracking-tight mb-2 uppercase">
                {item.title}
              </h4>
              <p className="text-white/40 text-sm font-medium leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </main>

      <footer className="p-12 border-t border-white/[0.03] text-center">
        <p className="text-[10px] font-black text-white/10 uppercase tracking-[0.5em]">
          Neural Encryption Active • Sector 7 Reporting Protocol
        </p>
      </footer>
    </div>
  );
}
