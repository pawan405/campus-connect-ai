import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {
  FileText,
  User,
  GraduationCap,
  Code,
  Briefcase,
  Layers,
  Download,
  RotateCcw,
  Sparkles,
  ArrowLeft,
  Cpu,
  Plus,
  Trash2,
  CheckCircle2,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../components/ui/card";
import { toast } from "sonner";
import ThreeDBackground from "../components/ThreeDBackground";

export default function ResumeMaker() {
  const [personalInfo, setPersonalInfo] = useState({
    name: "Alex Rivera",
    email: "alex.rivera@neural.io",
    phone: "+1 (555) 000-2077",
    location: "San Francisco, CA",
    summary:
      "High-performance full-stack engineer specializing in neural architectures and AI-driven interfaces.",
  });

  const [education, setEducation] = useState([
    {
      id: 1,
      school: "Neo University",
      degree: "B.S. Computer Science",
      year: "2024",
    },
  ]);

  const [experience, setExperience] = useState([
    {
      id: 1,
      company: "TechNova AI",
      role: "Software Architect",
      duration: "2024 - Present",
      desc: "Leading the development of secure, decentralized communication protocols.",
    },
  ]);

  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "Silent Scream",
      tech: "React, Gemini AI",
      desc: "Anonymous reporting tool with neural voice scrubbing.",
    },
  ]);

  const [skills, setSkills] = useState([
    "React",
    "TypeScript",
    "Node.js",
    "AI Integration",
    "Cloud Native",
  ]);

  const [isGenerating, setIsGenerating] = useState(false);
  const resumeRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!resumeRef.current) return;

    const toastId = toast.loading("Synthesizing PDF assets...");

    async function saveBlobToDisk(blob: Blob, filename = "export.pdf") {
      try {
        if ((window as any).showSaveFilePicker) {
          const opts = {
            suggestedName: filename,
            types: [
              {
                description: "PDF",
                accept: { "application/pdf": [".pdf"] },
              },
            ],
          } as any;

          const handle = await (window as any).showSaveFilePicker(opts);
          const writable = await handle.createWritable();
          await writable.write(blob);
          await writable.close();
          return { ok: true, method: "picker" };
        } else {
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = filename;
          document.body.appendChild(a);
          a.click();
          a.remove();
          URL.revokeObjectURL(url);
          return { ok: true, method: "download" };
        }
      } catch (err) {
        return { ok: false, error: err };
      }
    }

    try {
      // Clone the resume node and strip complex styling (oklch colors, shadows)
      // so html2canvas doesn't attempt to parse unsupported color functions.
      const originalNode = resumeRef.current;
      const cloneNode = originalNode.cloneNode(true) as HTMLElement;
      // Force simple colors and remove shadows/borders on root
      cloneNode.style.backgroundColor = "#ffffff";
      cloneNode.style.color = "#000000";
      cloneNode.style.boxShadow = "none";
      cloneNode.style.border = "none";
      cloneNode.style.position = "fixed";
      cloneNode.style.left = "-9999px";
      cloneNode.style.top = "0";
      // Ensure the clone has the same width for accurate rendering
      const rect = originalNode.getBoundingClientRect();
      cloneNode.style.width = rect.width + "px";

      // Strip child styles that may contain modern color functions
      cloneNode.querySelectorAll("*").forEach((el) => {
        const e = el as HTMLElement;
        e.style.background = "transparent";
        e.style.backgroundColor = "transparent";
        e.style.borderColor = "transparent";
        e.style.boxShadow = "none";
        e.style.filter = "none";
        e.style.color = "inherit";
      });

      document.body.appendChild(cloneNode);
      const canvas = await html2canvas(cloneNode, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
      });
      document.body.removeChild(cloneNode);

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

      // Create a Blob from the generated PDF and try to save it using the
      // File System Access API. If not supported, fallback to standard download.
      const pdfBlob = pdf.output("blob") as Blob;
      const filename = `${personalInfo.name.replace(/\s+/g, "_")}_Resume.pdf`;
      const res = await saveBlobToDisk(pdfBlob, filename);

      if (res.ok) {
        toast.success("Resume exported successfully", { id: toastId });
      } else {
        console.error("Save failed:", res.error);
        toast.error("Export failed", { id: toastId });
      }
    } catch (error) {
      console.error("Export failed:", error);
      toast.error("Export failed", { id: toastId });
    }
  };

  const handleReset = () => {
    if (confirm("Reset all neural data?")) {
      setPersonalInfo({
        name: "",
        email: "",
        phone: "",
        location: "",
        summary: "",
      });
      setEducation([]);
      setExperience([]);
      setProjects([]);
      setSkills([]);
      toast.success("Interface reset complete");
    }
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      toast.success("Resume structure optimized by AI");
    }, 1500);
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
            <span className="text-[10px] font-black text-cyan-400 tracking-widest uppercase">
              Resume Module v1.0
            </span>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12 lg:py-20 relative z-10">
        <header className="mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest">
              Career Identity Forge
            </span>
          </div>
          <h1 className="text-6xl lg:text-8xl font-black tracking-tighter uppercase">
            Resume{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              Maker.
            </span>
          </h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Editor Panel */}
          <div className="space-y-8">
            <Card className="bg-black/40 backdrop-blur-3xl border-white/10 rounded-[32px] overflow-hidden">
              <CardHeader className="p-8 border-b border-white/5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
                    <User className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-black tracking-tight uppercase text-white/90 drop-shadow-sm">
                      Personal Matrix
                    </CardTitle>
                    <CardDescription className="text-slate-400 text-xs font-bold">
                      Core identification data
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-cyan-400 uppercase tracking-widest pl-1">
                      Full Name
                    </label>
                    <Input
                      value={personalInfo.name}
                      onChange={(e) =>
                        setPersonalInfo({
                          ...personalInfo,
                          name: e.target.value,
                        })
                      }
                      className="bg-white/[0.02] border-white/10 rounded-xl h-12 text-sm text-white placeholder:text-white/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-cyan-400 uppercase tracking-widest pl-1">
                      Email Signal
                    </label>
                    <Input
                      value={personalInfo.email}
                      onChange={(e) =>
                        setPersonalInfo({
                          ...personalInfo,
                          email: e.target.value,
                        })
                      }
                      className="bg-white/[0.02] border-white/10 rounded-xl h-12 text-sm text-white placeholder:text-white/20"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-cyan-400 uppercase tracking-widest pl-1">
                    Neural Summary
                  </label>
                  <Textarea
                    value={personalInfo.summary}
                    onChange={(e) =>
                      setPersonalInfo({
                        ...personalInfo,
                        summary: e.target.value,
                      })
                    }
                    className="bg-white/[0.02] border-white/10 rounded-xl min-h-[100px] text-sm resize-none text-white placeholder:text-white/20"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/40 backdrop-blur-3xl border-white/10 rounded-[32px] overflow-hidden">
              <CardHeader className="p-8 border-b border-white/5 flex flex-row items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                    <GraduationCap className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-black tracking-tight uppercase text-white/90 drop-shadow-sm">
                      Academic Core
                    </CardTitle>
                    <CardDescription className="text-slate-400 text-xs font-bold">
                      Educational milestones
                    </CardDescription>
                  </div>
                </div>
                <Button
                  onClick={() =>
                    setEducation([
                      ...education,
                      { id: Date.now(), school: "", degree: "", year: "" },
                    ])
                  }
                  variant="ghost"
                  className="h-10 w-10 p-0 rounded-xl hover:bg-white/10 border border-white/20"
                >
                  <Plus className="w-4 h-4 text-white" />
                </Button>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                {education.map((edu) => (
                  <div
                    key={edu.id}
                    className="p-6 bg-white/[0.05] border border-white/20 rounded-2xl space-y-4 relative group"
                  >
                    <button
                      onClick={() =>
                        setEducation(education.filter((e) => e.id !== edu.id))
                      }
                      className="absolute top-4 right-4 text-white/60 hover:text-rose-400 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        placeholder="Institution"
                        value={edu.school}
                        onChange={(e) =>
                          setEducation(
                            education.map((ed) =>
                              ed.id === edu.id
                                ? { ...ed, school: e.target.value }
                                : ed,
                            ),
                          )
                        }
                        className="bg-black/60 border-white/20 rounded-lg h-10 text-xs text-white placeholder:text-white/40 focus:border-cyan-500/50"
                      />
                      <Input
                        placeholder="Degree"
                        value={edu.degree}
                        onChange={(e) =>
                          setEducation(
                            education.map((ed) =>
                              ed.id === edu.id
                                ? { ...ed, degree: e.target.value }
                                : ed,
                            ),
                          )
                        }
                        className="bg-black/60 border-white/20 rounded-lg h-10 text-xs text-white placeholder:text-white/40 focus:border-cyan-500/50"
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-black/40 backdrop-blur-3xl border-white/10 rounded-[32px] overflow-hidden">
              <CardHeader className="p-8 border-b border-white/5 flex flex-row items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                    <Code className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-black tracking-tight uppercase text-white/90 drop-shadow-sm">
                      Skill Matrix
                    </CardTitle>
                    <CardDescription className="text-slate-400 text-xs font-bold">
                      Technical competencies
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-8">
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/20 group"
                    >
                      <span className="text-[11px] font-bold text-white/90">
                        {skill}
                      </span>
                      <button
                        onClick={() =>
                          setSkills(skills.filter((_, idx) => idx !== i))
                        }
                        className="text-white/40 hover:text-rose-400"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                  <Input
                    placeholder="Add Skill..."
                    className="w-32 h-9 bg-black/40 border-white/10 rounded-lg text-xs text-white placeholder:text-white/20"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && e.currentTarget.value) {
                        setSkills([...skills, e.currentTarget.value]);
                        e.currentTarget.value = "";
                      }
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preview Panel */}
          <div className="lg:sticky lg:top-32 space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black tracking-tight uppercase flex items-center gap-3">
                <Layers className="w-6 h-6 text-cyan-400" /> Live Preview
              </h2>
              <div className="flex items-center gap-2">
                <Button
                  onClick={handleReset}
                  variant="ghost"
                  className="text-white/70 hover:text-white gap-2"
                >
                  <RotateCcw className="w-4 h-4" /> Reset
                </Button>
                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="bg-white/5 hover:bg-white/10 border-white/20 gap-2"
                >
                  {isGenerating ? (
                    <Cpu className="w-4 h-4 animate-spin" />
                  ) : (
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                  )}
                  AI Optimize
                </Button>
              </div>
            </div>

            <div
              ref={resumeRef}
              className="aspect-[1/1.4] w-full bg-white text-black p-12 shadow-[0_40px_100px_rgba(0,0,0,0.5)] rounded-[2px] font-serif relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-cyan-500/20" />

              <div className="space-y-10">
                <header className="border-b-2 border-black pb-8 space-y-4">
                  <h3 className="text-4xl font-bold tracking-tight uppercase">
                    {personalInfo.name || "UNNAMED ENTITY"}
                  </h3>
                  <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm font-medium text-black/70">
                    <span>{personalInfo.email}</span>
                    <span>{personalInfo.phone}</span>
                    <span>{personalInfo.location}</span>
                  </div>
                </header>

                <section className="space-y-4">
                  <h4 className="text-xs font-black uppercase tracking-[0.2em] text-black/60 border-b border-black/10 pb-2">
                    Professional Summary
                  </h4>
                  <p className="text-sm leading-relaxed">
                    {personalInfo.summary}
                  </p>
                </section>

                <section className="space-y-4">
                  <h4 className="text-xs font-black uppercase tracking-[0.2em] text-black/60 border-b border-black/10 pb-2">
                    Technical Matrix
                  </h4>
                  <div className="flex flex-wrap gap-x-4 gap-y-2">
                    {skills.map((s, i) => (
                      <span
                        key={i}
                        className="text-xs font-bold px-2 py-0.5 border border-black/20 rounded-md bg-black/5"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </section>

                <section className="space-y-4">
                  <h4 className="text-xs font-black uppercase tracking-[0.2em] text-black/60 border-b border-black/10 pb-2">
                    Experience History
                  </h4>
                  {experience.map((exp) => (
                    <div key={exp.id} className="space-y-1">
                      <div className="flex justify-between items-baseline">
                        <span className="font-bold uppercase">
                          {exp.role} @ {exp.company}
                        </span>
                        <span className="text-[10px] font-bold">
                          {exp.duration}
                        </span>
                      </div>
                      <p className="text-xs text-black/80 leading-relaxed">
                        {exp.desc}
                      </p>
                    </div>
                  ))}
                </section>

                <section className="space-y-4">
                  <h4 className="text-xs font-black uppercase tracking-[0.2em] text-black/60 border-b border-black/10 pb-2">
                    Academic Record
                  </h4>
                  {education.map((edu) => (
                    <div
                      key={edu.id}
                      className="flex justify-between items-baseline"
                    >
                      <div className="flex flex-col">
                        <span className="font-bold text-xs uppercase">
                          {edu.school}
                        </span>
                        <span className="text-xs italic">{edu.degree}</span>
                      </div>
                      <span className="text-[10px] font-bold">
                        Class of {edu.year}
                      </span>
                    </div>
                  ))}
                </section>
              </div>

              {/* Download Overlay */}
              <div
                data-html2canvas-ignore
                className="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center flex-col gap-6"
              >
                <div className="w-20 h-20 rounded-3xl bg-cyan-500 flex items-center justify-center shadow-[0_0_50px_rgba(6,182,212,0.5)]">
                  <Download className="w-10 h-10 text-black" />
                </div>
                <Button
                  onClick={handleDownload}
                  className="h-14 px-8 rounded-2xl bg-white text-black font-black uppercase tracking-widest text-xs hover:bg-cyan-400 transition-all"
                >
                  Export PDF Interface
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-24 text-center">
        <div className="flex flex-col items-center gap-6 opacity-50">
          <div className="flex items-center gap-4">
            <div className="h-[1px] w-12 bg-white/20" />
            <Cpu className="w-5 h-5 text-white/40" />
            <div className="h-[1px] w-12 bg-white/20" />
          </div>
          <p className="text-[10px] font-black text-white/30 uppercase tracking-[1em]">
            Neural Forge // Resume Module // v1.0.0
          </p>
        </div>
      </footer>
    </div>
  );
}
