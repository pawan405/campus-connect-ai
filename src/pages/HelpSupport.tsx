import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  HelpCircle,
  Mail,
  AlertTriangle,
  ChevronDown,
  Send,
  ArrowLeft,
  LifeBuoy,
  MessageSquare,
  FileText,
  CheckCircle2,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { toast } from "sonner";
import ThreeDBackground from "../components/ThreeDBackground";

export default function HelpSupport() {
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [issueForm, setIssueForm] = useState({ type: "", description: "" });

  const faqs = [
    { q: "How does the AI Career Roadmap work?", a: "Our neural engine analyzes your current skills, academic year, and interests to calculate the most efficient path to your target career, matching you with real-world requirements." },
    { q: "Is the Silent Scream report truly anonymous?", a: "Yes. We use military-grade encryption and voice re-synthesis to ensure no metadata or biometric data is ever stored or transmitted." },
    { q: "Can I join multiple college groups?", a: "Absolutely. You can sync with any college community to collaborate on cross-campus projects and hackathons." },
    { q: "How do I export my resume?", a: "Once your resume is optimized, simply hit the 'Export PDF Interface' button in the live preview panel." },
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Signal sent. Support neurons will respond shortly.");
    setContactForm({ name: "", email: "", message: "" });
  };

  const handleIssueSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Issue logged in the system core. Tracking ID: #SEC-9021");
    setIssueForm({ type: "", description: "" });
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
              <LifeBuoy className="w-5 h-5 text-cyan-400" />
              <span className="text-[10px] font-black text-white/60 tracking-widest uppercase">
                Support Protocol v2.1
              </span>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-6 py-12 lg:py-20 relative z-10">
          <header className="mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4">
              <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest">
                System Assistance Matrix
              </span>
            </div>
            <h1 className="text-6xl lg:text-8xl font-black tracking-tighter uppercase">
              Help & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Support.</span>
            </h1>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* FAQ Accordion */}
            <div className="lg:col-span-7 space-y-12">
              <section className="space-y-8">
                <h2 className="text-2xl font-black uppercase tracking-tight flex items-center gap-3">
                  <MessageSquare className="w-6 h-6 text-cyan-400" /> Frequently Asked
                </h2>
                <Accordion type="single" collapsible className="space-y-4">
                  {faqs.map((faq, i) => (
                    <AccordionItem key={i} value={`item-${i}`} className="border-white/10 bg-white/[0.02] rounded-3xl px-8 overflow-hidden">
                      <AccordionTrigger className="hover:no-underline py-6">
                        <span className="text-left font-bold text-lg text-white/90 group-hover:text-white">{faq.q}</span>
                      </AccordionTrigger>
                      <AccordionContent className="text-white/60 text-sm leading-relaxed pb-8">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>

              {/* Contact Form */}
              <Card className="bg-black/40 backdrop-blur-3xl border-white/10 rounded-[40px] overflow-hidden">
                <CardHeader className="p-10 border-b border-white/10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                      <Mail className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-black tracking-tight uppercase">Direct Signal</CardTitle>
                      <CardDescription className="text-white/60 text-xs uppercase tracking-widest font-bold">Contact our support neurons</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-10">
                  <form onSubmit={handleContactSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-white/50 uppercase tracking-widest pl-1">Identity</label>
                        <Input 
                          placeholder="Your Name" 
                          value={contactForm.name}
                          onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                          className="bg-white/[0.02] border-white/10 rounded-xl h-12 text-sm text-white/90"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-white/50 uppercase tracking-widest pl-1">Communication Link</label>
                        <Input 
                          type="email" 
                          placeholder="Email Address" 
                          value={contactForm.email}
                          onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                          className="bg-white/[0.02] border-white/10 rounded-xl h-12 text-sm text-white/90"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-white/50 uppercase tracking-widest pl-1">Signal Content</label>
                      <Textarea 
                        placeholder="How can we assist your evolution?" 
                        value={contactForm.message}
                        onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                        className="bg-white/[0.02] border-white/10 rounded-xl min-h-[150px] text-sm resize-none text-white/90"
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full h-14 bg-white/5 border border-white/10 hover:bg-cyan-500 hover:text-black font-black uppercase tracking-[0.2em] text-[10px] rounded-2xl transition-all">
                      Transmit Signal <Send className="w-3 h-3 ml-2" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Report Issue Sidebar */}
            <div className="lg:col-span-5 space-y-8">
              <Card className="bg-gradient-to-br from-rose-500/10 to-transparent border-rose-500/20 rounded-[40px] overflow-hidden sticky top-32">
                <CardHeader className="p-10 border-b border-rose-500/10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-rose-500/10 flex items-center justify-center border border-rose-500/20">
                      <AlertTriangle className="w-6 h-6 text-rose-400" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-black tracking-tight uppercase text-rose-400">System Malfunction</CardTitle>
                      <CardDescription className="text-rose-400/60 text-xs uppercase tracking-widest font-bold">Report an interface issue</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-10">
                  <form onSubmit={handleIssueSubmit} className="space-y-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-white/50 uppercase tracking-widest pl-1">Issue Type</label>
                      <Select onValueChange={(val) => setIssueForm({...issueForm, type: val})}>
                        <SelectTrigger className="h-14 bg-black/40 border-white/10 rounded-2xl text-white/90">
                          <SelectValue placeholder="Select classification" />
                        </SelectTrigger>
                        <SelectContent className="bg-black border-white/10 text-white">
                          <SelectItem value="ui">Interface Glitch</SelectItem>
                          <SelectItem value="ai">Neural Logic Error</SelectItem>
                          <SelectItem value="account">Auth Link Failure</SelectItem>
                          <SelectItem value="other">Other Anomaly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-white/50 uppercase tracking-widest pl-1">Description</label>
                      <Textarea 
                        placeholder="Describe the malfunction in detail..." 
                        value={issueForm.description}
                        onChange={(e) => setIssueForm({...issueForm, description: e.target.value})}
                        className="bg-black/40 border-white/10 rounded-2xl min-h-[120px] text-sm resize-none text-white/90"
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full h-14 bg-rose-500 hover:bg-rose-400 text-white font-black uppercase tracking-[0.2em] text-[10px] rounded-2xl transition-all shadow-[0_10px_30px_rgba(244,63,94,0.2)]">
                      Report Anomaly
                    </Button>
                  </form>

                  <div className="mt-12 pt-12 border-t border-white/10 space-y-4">
                    <div className="flex items-center gap-3 text-white/60">
                      <FileText className="w-4 h-4" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Documentation Hub</span>
                    </div>
                    <p className="text-xs text-white/40 leading-relaxed italic">
                      For high-priority security breaches, please use the Silent Scream module for anonymous reporting.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <div className="p-8 bg-cyan-500/5 border border-cyan-500/10 rounded-[32px] flex items-center gap-6">
                 <div className="w-12 h-12 rounded-full bg-cyan-500 flex items-center justify-center shrink-0">
                   <CheckCircle2 className="w-6 h-6 text-black" />
                 </div>
                 <div>
                   <h4 className="font-black text-sm uppercase">Global Status: Optimal</h4>
                   <p className="text-[10px] text-white/60 font-bold uppercase tracking-widest">All neural nodes online</p>
                 </div>
              </div>
            </div>
          </div>
        </main>

        <footer className="py-24 text-center">
          <div className="flex flex-col items-center gap-6 opacity-50">
            <p className="text-[10px] font-black text-white/30 uppercase tracking-[1em]">
              CampusConnect Support // v2.1.0-STABLE
            </p>
          </div>
        </footer>
    </div>
  );
}
